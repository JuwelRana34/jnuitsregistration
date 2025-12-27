"use client";

import { useEffect, useState } from "react";

export function useDeadlineCountdown(deadline: number) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let timerId: number;

    const tick = () => {
      const now = Date.now();
      const diff = Math.max(deadline - now, 0);
      setTimeLeft(diff);

      if (diff > 0) {
        // align to the next second → no drift
        timerId = window.setTimeout(tick, 1000 - (now % 1000));
      }
    };

    tick();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [deadline]);

  return timeLeft;
}
