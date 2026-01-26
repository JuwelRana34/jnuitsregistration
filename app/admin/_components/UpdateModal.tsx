"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react"; // আইকনের জন্য
import { updateEvent } from "@/action/adminaction";

// Props Type
interface UpdateModalProps {
  event: {
    id: string;
    title: string;
    target_date: string;
  };
}

export default function UpdateModal({ event }: UpdateModalProps) {
  const [open, setOpen] = useState(false);

  // ফর্ম সাবমিট হ্যান্ডলার 
  async function handleSubmit(formData: FormData) {
    await updateEvent(formData); 
    setOpen(false); 
  }

  const defaultDate = new Date(event.target_date).toLocaleString();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        
        {/* ফর্ম শুরু */}
        <form action={handleSubmit} className="grid gap-4 py-4">
          {/* Hidden ID */}
          <input type="hidden" name="id" value={event.id} />

          {/* Title Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              defaultValue={event.title}
              className="col-span-3"
              required
            />
          </div>

          {/* Date Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              id="date"
              name="target_date"
              type="datetime-local"
              defaultValue={defaultDate}
              className="col-span-3"
              required
            />
          </div>

          <DialogFooter>
             {/* সাবমিট বাটন */}
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}