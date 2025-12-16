"use client";

import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface FileUploadFieldProps {
  label: string;
  previewUrl: string | null;
  onFileSelect: (file: File | null) => void;
  onClear: () => void;
}

export function FileUploadField({
  label,
  onFileSelect,
  previewUrl,
  onClear,
}: FileUploadFieldProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      toast.error("File is too large (Max 4MB)");
      return;
    }
    onFileSelect(file);

    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      <FormLabel className={previewUrl ? "" : "label-required"}>
        {label}
      </FormLabel>

      {!previewUrl ? (
        <div className="relative group">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">Click to select image</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
      ) : (
        <div className="relative w-full p-2 border rounded-md flex items-center justify-between bg-white">
          <div className="relative h-50 bg-amber-200 w-full rounded overflow-hidden border">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            type="button"
            className="text-red-600 absolute bg-red-100 -top-2 -right-2 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
