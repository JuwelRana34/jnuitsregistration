'use client';
import { useTransition } from "react";
import { toast } from "sonner";
import { createEvent } from "@/action/adminaction";

export default function CreateEventForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
     try {
         await createEvent(formData);
          toast.success("Event created successfully!");

     } catch (error: unknown) {
        toast.error("Failed to create event.", { description: (error as Error).message });
     }
      }

    
    );
  };

  return (
    <form
      action={handleSubmit}
      className="mb-10 p-5 border rounded bg-gray-100 space-y-3"
    >
      <h2 className="font-bold text-lg">Create Countdown</h2>

      <input
        name="title"
        placeholder="Event Name (e.g. Picnic)"
        required
        className="border p-2 w-full"
      />

      <input
        name="target_date"
        type="datetime-local"
        required
        className="border p-2 w-full"
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {isPending ? "Creating..." : "Add Event"}
      </button>
    </form>
  );
}
