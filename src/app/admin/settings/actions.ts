"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin";

export async function updateSetting(key: string, value: unknown) {
  const admin = await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("site_settings")
    .update({
      value: value,
      updated_by: admin.id,
    })
    .eq("key", key);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/settings");
  return { success: true };
}

export async function updateMultipleSettings(
  settings: Array<{ key: string; value: unknown }>
) {
  const admin = await requireAdmin();
  const supabase = await createClient();

  const errors: string[] = [];

  for (const setting of settings) {
    const { error } = await supabase
      .from("site_settings")
      .update({
        value: setting.value,
        updated_by: admin.id,
      })
      .eq("key", setting.key);

    if (error) {
      errors.push(`${setting.key}: ${error.message}`);
    }
  }

  revalidatePath("/admin/settings");

  if (errors.length > 0) {
    return { success: false, error: errors.join(", ") };
  }

  return { success: true };
}
