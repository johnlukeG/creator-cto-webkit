"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin";

export async function toggleAdminStatus(userId: string, makeAdmin: boolean) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ is_admin: makeAdmin })
    .eq("id", userId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/users");
  return { success: true };
}

export async function toggleBanStatus(
  userId: string,
  ban: boolean,
  reason?: string
) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      is_banned: ban,
      banned_at: ban ? new Date().toISOString() : null,
      banned_reason: ban ? reason || "No reason provided" : null,
    })
    .eq("id", userId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/users");
  return { success: true };
}
