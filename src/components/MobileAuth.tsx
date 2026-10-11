"use client";

import Link from "next/link";
import type { MobileSession } from "@/components/MobileNav";

type MobileAuthProps = {
  isPending: boolean;
  session: MobileSession;
};

// মোবাইলে nav এর ডান দিকে: লগইন না থাকলে "সাইন ইন", থাকলে avatar
export default function MobileAuth({ isPending, session }: MobileAuthProps) {
  return (
    <div className="shrink-0 md:hidden">
      {isPending ? null : session ? (
        <Link
          href="/profile"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700"
        >
          {session.user?.name?.charAt(0) || "U"}
        </Link>
      ) : (
        <Link
          href="/sign-in"
          className="rounded-lg bg-green-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-800"
        >
          সাইন ইন
        </Link>
      )}
    </div>
  );
}
