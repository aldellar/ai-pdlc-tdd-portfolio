'use client';

/**
 * TypewriterLine — types a string character-by-character.
 *
 * Props:
 *   text     — the string to type
 *   trigger  — set true to start the animation
 *   delay    — ms to wait before the first character is typed (default 0)
 *   speed    — ms per character (default 38)
 *   onDone   — optional callback fired when typing is complete
 *   className
 */

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface TypewriterLineProps {
  text: string;
  trigger?: boolean;
  delay?: number;
  speed?: number;
  onDone?: () => void;
  className?: string;
}

export function TypewriterLine({
  text,
  trigger = true,
  delay = 0,
  speed = 19,
  onDone,
  className,
}: TypewriterLineProps) {
  const reduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(reduceMotion ? text : '');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!trigger) return;

    // Reduced-motion: show instantly
    if (reduceMotion) {
      setDisplayed(text);
      onDone?.();
      return;
    }

    let index = 0;

    const startTyping = () => {
      timerRef.current = setTimeout(function tick() {
        index++;
        setDisplayed(text.slice(0, index));

        if (index < text.length) {
          timerRef.current = setTimeout(tick, speed);
        } else {
          onDone?.();
        }
      }, speed);
    };

    const delayTimer = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // trigger is the only reactive dep — text/delay/speed are treated as static config
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <span className={className} aria-label={text}>
      {displayed}
    </span>
  );
}
