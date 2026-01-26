import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// এই ক্লায়েন্ট সব সিকিউরিটি রুল বাইপাস করতে পারে
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
