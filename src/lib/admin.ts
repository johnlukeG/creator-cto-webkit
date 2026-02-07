import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  is_banned: boolean;
  banned_at: string | null;
  banned_reason: string | null;
  last_sign_in_at: string | null;
  created_at: string;
  updated_at: string;
};

export type SiteSetting = {
  id: string;
  key: string;
  value: unknown;
  description: string | null;
  updated_at: string;
  updated_by: string | null;
};

export type AdminStats = {
  total_users: number;
  admin_users: number;
  banned_users: number;
  users_today: number;
  users_this_week: number;
  users_this_month: number;
};

export type SignupDataPoint = {
  date: string;
  count: number;
};

/**
 * Get the current user's profile
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile;
}

/**
 * Check if the current user is an admin
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
  const profile = await getCurrentProfile();
  return profile?.is_admin ?? false;
}

/**
 * Require admin access - redirects to home if not admin
 */
export async function requireAdmin(): Promise<Profile> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.is_admin) {
    redirect("/");
  }

  return profile;
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(): Promise<Profile[]> {
  const supabase = await createClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return profiles ?? [];
}

/**
 * Get admin statistics
 */
export async function getAdminStats(): Promise<AdminStats> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_admin_stats");

  if (error) {
    console.error("Error fetching admin stats:", error);
    return {
      total_users: 0,
      admin_users: 0,
      banned_users: 0,
      users_today: 0,
      users_this_week: 0,
      users_this_month: 0,
    };
  }

  return data;
}

/**
 * Get signup analytics for charts
 */
export async function getSignupAnalytics(daysBack: number = 30): Promise<SignupDataPoint[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_signup_analytics", {
    days_back: daysBack,
  });

  if (error) {
    console.error("Error fetching signup analytics:", error);
    return [];
  }

  return data ?? [];
}

/**
 * Get all site settings
 */
export async function getSiteSettings(): Promise<SiteSetting[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("key");

  if (error) {
    console.error("Error fetching site settings:", error);
    return [];
  }

  return data ?? [];
}

/**
 * Update a user's admin status
 */
export async function updateUserAdminStatus(
  userId: string,
  isAdmin: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ is_admin: isAdmin })
    .eq("id", userId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Ban or unban a user
 */
export async function updateUserBanStatus(
  userId: string,
  isBanned: boolean,
  reason?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      is_banned: isBanned,
      banned_at: isBanned ? new Date().toISOString() : null,
      banned_reason: isBanned ? reason : null,
    })
    .eq("id", userId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Update a site setting
 */
export async function updateSiteSetting(
  key: string,
  value: unknown
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("site_settings")
    .update({
      value: JSON.stringify(value),
      updated_by: user?.id
    })
    .eq("key", key);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
