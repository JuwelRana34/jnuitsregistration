"use client";
import { authenticator } from "@/lib/handelUpload";
import { upload } from "@imagekit/next";
import { Loader2, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { FormLabel } from "./ui/form";

/* ------------------
   COMPONENT: FILE UPLOAD (Updated with SDK)
------------------- */
export function FileUploadField({
  value,
  onChange,
  label,
}: {
  value?: string;
  onChange: (url: string) => void;
  label: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large (Max 5MB)");
      return;
    }

    setUploading(true);
    try {
      // 1. Get Authentication parameters
      const { signature, expire, token, publicKey } = await authenticator();

      // 2. Upload using ImageKit SDK
      const uploadResponse = await upload({
        file,
        fileName: file.name,
        expire,
        token,
        signature,
        publicKey,
        folder: "/member_uploads",
        useUniqueFileName: true,
      });

      if (!uploadResponse.url) {
  throw new Error("Upload failed: URL not returned");
}


      // 3. Update form with the returned URL
      onChange(uploadResponse.url);
      toast.success(`${label} uploaded!`);
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(`Failed to upload ${label}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <FormLabel className="label-required">{label}</FormLabel>
      {!value ? (
        <div className="relative flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 border-gray-300 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <Loader2 className="w-8 h-8 mb-2 animate-spin text-gray-500" />
              ) : (
                <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
              )}
              <p className="text-sm text-gray-500">
                {uploading ? "Uploading..." : "Click to upload image"}
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              disabled={uploading}
              onChange={handleFileChange}
            />
          </label>
        </div>
      ) : (
        <div className="relative w-full p-2 border rounded-md flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2 overflow-hidden">
            <Image
              src={value}
              alt="Preview"
              className="h-100 w-100 object-cover rounded bg-gray-200"
              width={1000}
              height={1000}
            />
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-600 truncate underline max-w-50"
            >
              View Image
            </a>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange("")}
            type="button"
            className="hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
