"use client";

import { useDeadlineCountdown } from "@/hooks/useDeadlineCountdown";

type Event = {
  id: number;
  title: string;
  target_date: string;
  created_at: string;
};


export default function CountdownTimer({
  events,
}: {
  events: Event[] | null;
}) {
  const DEADLINE = new Date(events?.[0].target_date || "").getTime();

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
