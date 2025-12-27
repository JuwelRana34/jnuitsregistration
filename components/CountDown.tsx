"use client";

import { useDeadlineCountdown } from "@/hooks/useDeadlineCountdown";



export default function CountdownTimer() {
  // ✅ 15 January 2026, 23:59:59 (future date!)
  const DEADLINE = new Date("2026-01-15T23:59:59").getTime();

  const timeLeft = useDeadlineCountdown(DEADLINE);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <span className="font-semibold tabular-nums text-blue-600 text-xs">
      {days}d {hours.toString().padStart(2, "0")}:
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </span>
  );
}
