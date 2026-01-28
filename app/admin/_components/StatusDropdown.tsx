"use client";
import { updateBccStatus } from "@/action/registration";
import { useState } from "react";
import { toast } from "sonner";

export default function StatusDropdown({fullName, email, currentStatus, tnxId }: {fullName: string, email: string, currentStatus: string; tnxId: string}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus); // Update UI immediately
    setLoading(true);

    try {
      const res = await updateBccStatus(fullName,email,tnxId, newStatus);
      if (res.success) {
        toast.success(`Status Updated Successfully — Status changed to ${res.message} for ${fullName}`);
      }
    } catch {
      toast.error("Failed to update status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // dynamic styling based on status
  const getColorClass = (s: string) => {
    if (s === "success") return "text-green-700 bg-green-50 ring-green-600/20";
    if (s === "cancel") return "text-red-700 bg-red-50 ring-red-600/10";
    return "text-yellow-800 bg-yellow-50 ring-yellow-600/20";
  };

  return (
    <div className="relative">
      <select
        value={status}
        onChange={handleChange}
        disabled={loading}
        className={`block w-full rounded-md border-0 py-1 pl-2  text-xs font-medium  sm:text-sm sm:leading-6 cursor-pointer ${getColorClass(status)} ${loading ? "opacity-50" : ""}`}
      >
        <option value="pending">Pending</option>
        <option value="success">Success</option>
        <option value="cancel">Cancel</option>
      </select>
    </div>
  );
}
