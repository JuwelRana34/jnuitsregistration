"use client";

import { revalidateUserList } from "@/action/registration";
import { Button } from "@/components/ui/button";
import { Loader, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function RefreshBtn() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(async () => {
      try {
        await revalidateUserList(); // Clear server cache
        router.refresh(); // Refresh client view
        toast.success("List refreshed successfully");
      } catch {
        toast.error("Failed to refresh");
      }
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefresh}
      disabled={isPending}
      className="gap-2 bg-white"
    >
      {isPending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <RefreshCw className="h-4 w-4" />
      )}
      Refresh List
    </Button>
  );
}
