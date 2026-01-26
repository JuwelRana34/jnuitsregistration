"use client";

import { deleteEvent } from "@/action/adminaction";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import UpdateModal from "./UpdateModal"; // আগের বানানো মডাল

// টাইপ ডিফিনিশন
interface EventCardProps {
  event: {
    id: string;
    title: string;
    target_date: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm bg-white">
      {/* ইভেন্টের তথ্য */}
      <div>
        <h3 className="font-semibold text-lg">{event.title}</h3>
        <p className="text-sm text-gray-500">
          Target: {new Date(event.target_date).toLocaleString()}
        </p>
      </div>

      {/* অ্যাকশন বাটনস  */}
      <div className="flex items-center gap-2">
        
        {/* ✅ Update Modal Trigger */}
        <UpdateModal event={event} />

        {/* ✅ Delete Button Form */}
        <form action={deleteEvent}>
          <input type="hidden" name="id" value={event.id} />
          <Button variant="destructive" size="icon" type="submit">
            <Trash2 className="h-4 w-4" />
          </Button>
        </form>
        
      </div>
    </div>
  );
}