"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createEvent(formData: FormData): Promise<void> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect("/api/auth/login");

  const title = formData.get("title");

  const targetDate = formData.get("target_date");
  try {
    const res = await supabaseAdmin.from("events").insert({
      title: title,
      target_date: targetDate,
    });

    if (res.status === 201) {
      revalidateTag("active-event-tag", { expire: 86000 });
      revalidatePath("/");
    }
  } catch (error: unknown) {
    console.log("Something went wrong", error);
  }
}



// ✅ DELETE Action
export async function deleteEvent(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) redirect("/api/auth/login");

  const id = formData.get("id") as string;

  if (!id) return;

  try {
    const { error } = await supabaseAdmin
      .from("events")
      .delete()
      .eq("id", id);

    if (error) throw error;

    // ৩. ক্যাশ ক্লিয়ার
    revalidateTag("active-event-tag", { expire: 86000 }); 
    revalidatePath("/admin"); 

  } catch (error) {
    console.log("Delete Error:", error);
  }
}

// ✅ UPDATE Action
export async function updateEvent(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) redirect("/api/auth/login");

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const targetDate = formData.get("target_date") as string;

  try {
    const { error } = await supabaseAdmin
      .from("events")
      .update({ title, target_date: targetDate })
      .eq("id", id);

    if (error) throw error;

    // ক্যাশ আপডেট
    revalidateTag("active-event-tag", { expire: 86000 });
    revalidatePath("/admin");

  } catch (error) {
    console.log("Update Error:", error);
  }
}