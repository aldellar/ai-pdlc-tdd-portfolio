'use client';

/**
 * TerminalPanel — single full-viewport terminal slide.
 *
 * Layout:
 *   Left column  — company logo (sticky feel within the panel)
 *   Right column — macOS-style terminal window
 *
 * The terminal types in a scripted "session":
 *   $ whoami           → andrew.dellaringa
 *   $ cat role.txt     → role + location + dates
 *   $ ls ./highlights/ → bullet points stagger in
 *   > █  (blinking cursor)
 *
 * Animation is triggered once via `isActive` prop (set by the parent when
 * this panel scrolls into the visible slot).
 */

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypewriterLine } from './TypewriterLine';
import type { WorkEntry } from '@/lib/types';

interface TerminalPanelProps {
  entry: WorkEntry;
  index: number;
  /** True when this panel is scrolled into the active (centred) position */
  isActive: boolean;
}

// Cumulative typing delays so each block starts after the previous finishes.
// All values in ms. Adjust to taste.
const SPEED = 16; // ms per character
const GAP   = 180; // ms pause between command + output blocks

function charMs(text: string) {
  return text.length * SPEED;
}

export function TerminalPanel({ entry, index, isActive }: TerminalPanelProps) {
  // Phase gates — each truthy flag unlocks the next block
  const [phase1Done, setPhase1Done] = useState(false); // whoami answer shown
  const [phase2Done, setPhase2Done] = useState(false); // cat role.txt done
  const [phase3Done, setPhase3Done] = useState(false); // ls command done

  const CMD_WHOAMI   = '$ whoami';
  const CMD_CAT      = '$ cat role.txt';
  const CMD_LS       = '$ ls ./highlights/';
  const ROLE_LINE    = `> ${entry.role}`;
  const META_LINE    = `> ${entry.company} · ${entry.location} · ${entry.startDate} – ${entry.endDate}`;

  // Delays (ms from isActive becoming true)
  const d0 = 200;                                        // CMD_WHOAMI starts
  const d1 = d0 + charMs(CMD_WHOAMI)   + GAP;           // whoami answer
  const BULLET_STAGGER = 220; // ms between each bullet appearing

  return (
    <div
      data-testid="terminal-panel"
      data-company={entry.company}
      data-role={entry.role}
      className="relative flex-shrink-0 w-screen h-screen flex items-center justify-center gap-8 px-8 md:px-16 lg:px-24"
    >
      {/* Hidden static text for test/SEO discoverability regardless of animation state */}
      <span className="sr-only">{entry.role}</span>
      <span className="sr-only">{entry.company}</span>

      {/* ── LEFT: company logo + label ─────────────────────────────────── */}
      <div className="relative z-10 hidden md:flex flex-col items-center gap-4 w-[180px] shrink-0">
        {/* Shadow behind logo + text — z-[-1] keeps it behind the logo */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '185px',
            height: '200px',
            zIndex: -1,
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.45) 60%, transparent 100%)',
            filter: 'blur(10px)',
          }}
        />
        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${entry.company}`}
          className="group w-28 h-28 rounded-2xl bg-white/5 border border-white/10
                     flex items-center justify-center
                     transition-all duration-300
                     hover:bg-white/10 hover:border-white/25 hover:scale-105"
        >
          <Image
            data-testid="company-logo"
            src={entry.logoSrc}
            alt={`${entry.company} logo`}
            width={80}
            height={80}
            className="object-contain p-2"
            unoptimized
          />
        </a>
        <div className="text-center">
          <p className="text-white font-semibold text-sm leading-tight">{entry.company}</p>
          <p className="text-white/40 text-[10px] mt-1 uppercase tracking-widest font-mono">
            {String(index + 1).padStart(2, '0')} / 04
          </p>
        </div>
      </div>

      {/* ── RIGHT: terminal window ──────────────────────────────────────── */}
      <div
        className="relative z-10 w-full max-w-2xl rounded-xl overflow-hidden
                   border border-white/10 bg-[#0d0d1a] shadow-2xl"
      >
        {/* Terminal chrome — traffic-light dots + path */}
        <div
          data-testid="terminal-chrome"
          className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10"
        >
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" aria-hidden="true" />
          <span className="ml-4 text-white/30 text-xs font-mono">
            ~/career/{entry.company.toLowerCase().replace(/[^a-z0-9]/g, '-')}
          </span>
          <span className="ml-auto text-white/20 text-xs font-mono">zsh</span>
        </div>

        {/* Terminal body */}
        <div className="px-5 py-5 font-mono text-sm leading-relaxed space-y-1 min-h-[320px]">

          {/* CMD: whoami */}
          <p className="text-[#3b82d4]">
            <TypewriterLine text={CMD_WHOAMI} trigger={isActive} delay={d0} speed={SPEED} onDone={() => {}} />
          </p>
          {/* Answer: whoami */}
          {(isActive || phase1Done) && (
            <p className="text-green-400">
              <TypewriterLine
                text="> andrew.dellaringa"
                trigger={isActive}
                delay={d1}
                speed={SPEED}
                onDone={() => setPhase1Done(true)}
              />
            </p>
          )}

          {/* Blank line spacer */}
          {phase1Done && <p>&nbsp;</p>}

          {/* CMD: cat role.txt */}
          {phase1Done && (
            <p className="text-[#3b82d4]">
              <TypewriterLine text={CMD_CAT} trigger={phase1Done} delay={GAP} speed={SPEED} />
            </p>
          )}
          {/* role line */}
          {phase1Done && (
            <p className="text-white/90">
              <TypewriterLine text={ROLE_LINE} trigger={phase1Done} delay={GAP + charMs(CMD_CAT) + GAP} speed={SPEED} />
            </p>
          )}
          {/* meta line */}
          {phase1Done && (
            <p className="text-white/50">
              <TypewriterLine
                text={META_LINE}
                trigger={phase1Done}
                delay={GAP + charMs(CMD_CAT) + GAP + charMs(ROLE_LINE) + GAP / 2}
                speed={SPEED}
                onDone={() => setPhase2Done(true)}
              />
            </p>
          )}

          {/* Blank line spacer */}
          {phase2Done && <p>&nbsp;</p>}

          {/* CMD: ls ./highlights/ */}
          {phase2Done && (
            <p className="text-[#3b82d4]">
              <TypewriterLine
                text={CMD_LS}
                trigger={phase2Done}
                delay={GAP}
                speed={SPEED}
                onDone={() => setPhase3Done(true)}
              />
            </p>
          )}

          {/* Bullet highlights — stagger in after ls command finishes */}
          {phase3Done && entry.bullets.slice(0, 3).map((bullet, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * (BULLET_STAGGER / 1000), duration: 0.35, ease: 'easeOut' }}
              className="text-white/60 flex gap-2"
            >
              <span className="text-[#3b82d4] shrink-0">▸</span>
              <span>{bullet}</span>
            </motion.p>
          ))}

          {/* Blinking cursor */}
          {phase3Done && (
            <p className="text-white/70 mt-1">
              <span className="animate-pulse">█</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
