"use client"

import { Copy } from "lucide-react"
import { toast } from "sonner";

export default function TextCopyBtn({ text }: { text: string }) {
   
    const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text); 
      toast.success("Copied to clipboard!",{
        description: text,
      });   
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
}
  return (
    <button className="px-2"
      onClick={() => copyToClipboard(text)}
    >
      <Copy size={15} className=" cursor-pointer "/>
    </button>
  )
}
