'use client';

/**
 * ProjectCard — per-project rainbow folder. Card starts inside the folder
 * and springs upward into the sky gap above when scrolled into view.
 *
 * Geometry:
 *
 *   outer wrapper  height = cardH (sky gap) + TAB_H + cardH (folder body) + LIP_H
 *                  no overflow:hidden — sky gap must be visible
 *
 *   [TAB]    absolute, top = cardH,            left=0 right=0
 *   [BODY]   absolute, top = cardH + TAB_H,    height = cardH    ← decorative slab
 *   [LIP]    absolute, top = cardH + TAB_H + cardH,  left=0 right=0
 *   [CARD]   absolute, top = cardH + TAB_H,    zIndex = 3
 *            initial:  y = 0    → card sits inside the folder body (body is on top, z=1 < z=3 …)
 *
 * Wait — the folder body is z:1 and the card is z:3, so the card would always
 * be on top even at y:0. The hiding mechanism is different:
 *
 *   The CARD starts at top = cardH + TAB_H, y = 0 → visible OVER the folder body.
 *   We need it UNDER. So:
 *     - Folder body zIndex = 4  (covers the card when card is inside)
 *     - Card        zIndex = 3
 *     - Card animates y: 0 → -cardH  (moves above the folder body top edge)
 *     - Once card top < folder body top, card is in sky gap, above all folder layers
 *
 * The folder body does NOT need overflow:hidden — it simply sits on top of
 * the card (higher z-index) until the card translates above it.
 */

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import type { Project } from '@/lib/types';

// ─── Fixed layout constants ───────────────────────────────────────────────────
const TAB_H = 26;   // folder tab height
const LIP_H = 13;   // folder lip height

// ─── Colour helpers ───────────────────────────────────────────────────────────
const hue        = (h: number) => `hsl(${h}, 80%, 60%)`;
const hueD       = (h: number) => `hsl(${h}, 55%, 28%)`;
// Folder colours — warm, saturated, paper-like
const fTab       = (h: number) => `hsl(${h}, 72%, 62%)`;   // tab top highlight
const fTabBase   = (h: number) => `hsl(${h}, 65%, 52%)`;   // tab body
const fBody1     = (h: number) => `hsl(${h}, 62%, 56%)`;   // body top
const fBody2     = (h: number) => `hsl(${h}, 55%, 44%)`;   // body bottom
const fEdge      = (h: number) => `hsl(${h}, 50%, 36%)`;   // bottom fold edge
const fShadowC   = (h: number) => `hsl(${h}, 60%, 20%)`;   // drop shadow colour

function toFilename(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.ts';
}

// ─── Syntax tokens ────────────────────────────────────────────────────────────
const syn = {
  comment: 'rgba(148,163,184,0.7)',
  keyword: '#c792ea',
  string:  '#c3e88d',
  module:  '#82aaff',
  punct:   'rgba(255,255,255,0.3)',
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function CodeLine({ n, accent, children }: { n: number; accent: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: 20 }}>
      <span style={{
        width: 30, flexShrink: 0, textAlign: 'right', paddingRight: 12,
        color: accent, fontSize: 10, fontFamily: 'monospace',
        lineHeight: '20px', userSelect: 'none', opacity: 0.35,
      }}>{n}</span>
      <span style={{ flex: 1, fontSize: 11, fontFamily: 'monospace', lineHeight: '20px' }}>
        {children}
      </span>
    </div>
  );
}

function WindowDots({ accent }: { accent: string }) {
  return (
    <div data-testid="titlebar-dots" style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
      <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57' }} />
      <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#febc2e' }} />
      <div style={{ width: 9, height: 9, borderRadius: '50%', background: accent }} />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
interface ProjectCardProps { project: Project; index: number; }

export function ProjectCard({ project, index }: ProjectCardProps) {
  const accentA  = hue(project.hueA);
  const accentB  = hue(project.hueB);
  const gutterBg = hueD(project.hueA);
  const filename = toFilename(project.name);

  const h      = project.hueA;
  const tabBg  = `linear-gradient(to bottom, ${fTab(h)}, ${fTabBase(h)})`;
  // Body: paper-like layered gradient with subtle diagonal sheen
  const bodyBg = `
    linear-gradient(175deg,
      rgba(255,255,255,0.10) 0%,
      rgba(255,255,255,0.00) 40%,
      rgba(0,0,0,0.08) 100%
    ),
    linear-gradient(to bottom, ${fBody1(h)}, ${fBody2(h)})
  `;
  const lipBg  = fEdge(h);
  const shadowC = fShadowC(h);

  // ── Measure card height ──────────────────────────────────────────────────
  const cardRef    = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [cardH, setCardH] = useState(0);
  const isVisible  = useRef(false);  // tracks live intersection state
  const controls   = useAnimation(); // drives card y

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const h = entries[0]?.contentRect.height;
      if (h && h > 0) setCardH(h);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Re-attach IntersectionObserver whenever cardH is measured.
  // Fires on every enter/exit — springs out when visible, tucks in when not.
  useEffect(() => {
    if (cardH === 0) return;
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          controls.start({
            y: -cardH,
            transition: { type: 'spring', bounce: 0.28, duration: 1.0 },
          });
        } else {
          controls.start({
            y: 0,
            transition: { type: 'spring', stiffness: 260, damping: 32 },
          });
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [cardH, controls]);

  // Hover: card springs out/lifts. Folder body never moves.
  const onMouseEnter = useCallback(() => {
    if (cardH === 0) return;
    const target = isVisible.current ? -cardH - 12 : -cardH;
    controls.start({
      y: target,
      transition: { type: 'spring', stiffness: 320, damping: 26 },
    });
  }, [cardH, controls]);

  const onMouseLeave = useCallback(() => {
    if (cardH === 0) return;
    const target = isVisible.current ? -cardH : 0;
    controls.start({
      y: target,
      transition: { type: 'spring', stiffness: 280, damping: 30 },
    });
  }, [cardH, controls]);

  // Word-wrap description → JSDoc comment lines ≤50 chars
  const commentLines: string[] = [];
  let buf = '';
  for (const word of project.description.split(' ')) {
    if ((buf + ' ' + word).trim().length > 50) { commentLines.push(buf.trim()); buf = word; }
    else buf = (buf + ' ' + word).trim();
  }
  if (buf) commentLines.push(buf.trim());
  const importStart = commentLines.length + 5;

  // wrapperH: sky gap (cardH) + tab + folder body (cardH) + lip
  // Before measure, collapse to just the folder shell so there's no giant gap.
  const wrapperH = cardH > 0
    ? cardH + TAB_H + cardH + LIP_H
    : TAB_H + LIP_H + 40; // minimal pre-measure height

  return (
    <div
      ref={wrapperRef}
      data-testid="project-card-container"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative',
        height: wrapperH,
        marginBottom: 40,
        cursor: 'pointer',
        // NO overflow:hidden — the sky gap above the folder must stay visible
      }}
    >
      {/* ── Folder tab — left-aligned notch ──────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        top: cardH,
        left: 0,
        width: 160,
        height: TAB_H,
        background: tabBg,
        borderRadius: '8px 12px 0 0',
        display: 'flex', alignItems: 'center', gap: 7,
        paddingLeft: 12,
        boxShadow: [
          'inset 0 2px 0 rgba(255,255,255,0.35)',
          'inset 2px 0 0 rgba(255,255,255,0.15)',
        ].join(', '),
        zIndex: 5,
      }}>
        {/* File icon — two-tone page with folded corner */}
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
          <path d="M1 0h5l3 3v8a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1z" fill="rgba(0,0,0,0.22)" />
          <path d="M6 0l3 3H7a1 1 0 01-1-1V0z" fill="rgba(0,0,0,0.18)" />
          <line x1="2" y1="5" x2="7.5" y2="5" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
          <line x1="2" y1="7" x2="7.5" y2="7" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
          <line x1="2" y1="9" x2="5.5" y2="9" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
        </svg>
        <span style={{
          fontFamily: 'monospace', fontSize: 10,
          color: 'rgba(0,0,0,0.60)', letterSpacing: '0.03em', fontWeight: 700,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          maxWidth: 110,
        }}>{filename}</span>
      </div>

      {/* ── Folder body — static, never moves ────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: cardH + TAB_H,
          left: 0, right: 0,
          height: cardH > 0 ? cardH : 40,
          background: bodyBg,
          borderRadius: '0 6px 0 0',
          boxShadow: [
            'inset 0 2px 0 rgba(255,255,255,0.22)',
            'inset 2px 0 0 rgba(0,0,0,0.08)',
            `0 8px 32px ${shadowC}80`,
          ].join(', '),
          zIndex: 4,
        }}
      />

      {/* ── Folder bottom fold — darker strip, the folded paper edge ─────────────── */}
      <div style={{
        position: 'absolute',
        top: cardH > 0 ? cardH + TAB_H + cardH : TAB_H + 40,
        left: 0, right: 0,
        height: LIP_H,
        background: lipBg,
        borderRadius: '0 0 10px 10px',
        boxShadow: [
          `0 6px 24px ${shadowC}`,
          `0 12px 40px ${shadowC}60`,
        ].join(', '),
        zIndex: 5,
      }} />

      {/* ── Card — z:3, hidden under folder body (z:4) until y < 0 ──────────── */}
      {/* At y=0 the card is flush with the folder body top — covered by it.     */}
      {/* At y=-cardH the card has fully exited into the sky gap above.          */}
      <motion.div
        ref={cardRef}
        animate={controls}
        initial={{ y: 0 }}
        style={{
          position: 'absolute',
          top: cardH + TAB_H,
          left: 16, right: 16,
          borderRadius: 10,
          overflow: 'hidden',
          background: '#0d1117',
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.07)',
            '0 16px 40px rgba(0,0,0,0.65)',
            '0 4px 12px rgba(0,0,0,0.4)',
          ].join(', '),
          zIndex: 3,
        }}
      >
        {/* Titlebar */}
        <div
          data-testid="card-front"
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 14px',
            background: '#161b22',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <WindowDots accent={accentA} />
          <span style={{
            fontFamily: 'monospace', fontSize: 11,
            color: 'rgba(255,255,255,0.38)', letterSpacing: '0.03em', marginLeft: 4,
          }}>{filename}</span>
          <span style={{
            marginLeft: 'auto', fontFamily: 'monospace', fontSize: 10,
            color: accentA, letterSpacing: '0.12em', opacity: 0.6,
          }}>{String(index + 1).padStart(2, '0')}</span>
        </div>

        {/* Code body */}
        <div data-testid="card-back" style={{ display: 'flex' }}>
          <div style={{ width: 30, flexShrink: 0, background: gutterBg, opacity: 0.18, alignSelf: 'stretch' }} />
          <div style={{ flex: 1, padding: '12px 14px 16px 0', marginLeft: -30 }}>

            <CodeLine n={1} accent={accentA}>
              <span style={{ color: syn.comment }}>{'// '}</span>
              <span style={{ color: accentA, fontWeight: 700 }}>{project.name}</span>
            </CodeLine>
            <CodeLine n={2} accent={accentA}><span /></CodeLine>
            <CodeLine n={3} accent={accentA}>
              <span style={{ color: syn.comment }}>{'/**'}</span>
            </CodeLine>
            {commentLines.map((line, li) => (
              <CodeLine key={li} n={4 + li} accent={accentA}>
                <span style={{ color: syn.comment }}>{' * '}{line}</span>
              </CodeLine>
            ))}
            <CodeLine n={4 + commentLines.length} accent={accentA}>
              <span style={{ color: syn.comment }}>{' */'}</span>
            </CodeLine>
            <CodeLine n={importStart - 1} accent={accentA}><span /></CodeLine>
            {project.tech?.map((t, ti) => (
              <CodeLine key={t} n={importStart + ti} accent={accentA}>
                <span style={{ color: syn.keyword }}>import </span>
                <span style={{ color: syn.module }}>{t.toLowerCase().replace(/[^a-z0-9]/g, '')}</span>
                <span style={{ color: syn.keyword }}> from </span>
                <span style={{ color: syn.string }}>&apos;{t.toLowerCase().replace(/\s+/g, '-')}&apos;</span>
                <span style={{ color: syn.punct }}>;</span>
                <span data-testid="tech-pill" style={{ display: 'none' }}>{t}</span>
              </CodeLine>
            ))}
            <CodeLine n={importStart + (project.tech?.length ?? 0)} accent={accentA}><span /></CodeLine>
            <CodeLine n={importStart + (project.tech?.length ?? 0) + 1} accent={accentA}>
              <span style={{ color: syn.keyword }}>export default </span>
              <a
                data-testid="project-card"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: accentB, textDecoration: 'none',
                  fontFamily: 'monospace', fontSize: 11,
                  borderBottom: `1px solid ${accentB}44`,
                }}
                onMouseEnter={e => (e.currentTarget.style.borderBottomColor = accentB)}
                onMouseLeave={e => (e.currentTarget.style.borderBottomColor = `${accentB}44`)}
              >viewProject</a>
              <span style={{ color: syn.punct }}>{'() // →'}</span>
            </CodeLine>

          </div>
        </div>
      </motion.div>

    </div>
  );
}
