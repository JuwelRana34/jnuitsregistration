import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { unstable_cache } from "next/cache";

// ডাটা ক্যাশ 
export const getActiveEvent = unstable_cache(
  async () => {
    const { data } = await supabaseAdmin
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })
      console.log(data)
    return data;
  },
  ['active-event-tag'],
  { revalidate: 87000 }
);