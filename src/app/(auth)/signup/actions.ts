"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    redirect("/signup?error=" + encodeURIComponent("Passwords do not match"));
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect("/signup?error=" + encodeURIComponent(error.message));
  }

  revalidatePath("/", "layout");
  redirect("/signup?message=" + encodeURIComponent("Check your email to confirm your account"));
}
