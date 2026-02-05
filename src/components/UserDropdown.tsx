"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { logout } from "@/app/account/actions";

interface UserDropdownProps {
  email: string;
}

export default function UserDropdown({ email }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get initials from email
  const initials = email.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-white transition-opacity hover:opacity-90"
        aria-label="Account menu"
      >
        {initials}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg border border-foreground/10 bg-background shadow-lg">
          <div className="border-b border-foreground/10 px-4 py-3">
            <p className="text-sm font-medium">Signed in as</p>
            <p className="truncate text-sm text-foreground/70">{email}</p>
          </div>

          <div className="py-1">
            <Link
              href="/account"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm transition-colors hover:bg-foreground/5"
            >
              My Account
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-foreground/5 dark:text-red-400"
              >
                Log Out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
