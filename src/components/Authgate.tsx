"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

// লগইন থাকলে ভেতরের কনটেন্ট দেখায়, না থাকলে সাইন ইনের বার্তা দেখায়
export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();

  // সেশন চেক হওয়ার সময় ফাঁকা জায়গা রাখি
  if (isPending) {
    return <div className="min-h-40" />;
  }

  if (!session) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
          <div className="text-4xl mb-3">🔒</div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">
            পণ্যের দাম দেখতে সাইন ইন করুন
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            সব পণ্যের বিস্তারিত দাম দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
          <div className="flex justify-center gap-2">
            <Link href="/sign-in" className="btn btn-sm btn-success text-white">
              সাইন ইন
            </Link>
            <Link href="/sign-up" className="btn btn-sm btn-outline btn-success">
              সাইন আপ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}