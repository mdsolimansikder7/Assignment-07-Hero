"use client";

import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/utils";

export type MobileSession = {
  user?: { name?: string | null };
} | null;

type MobileNavProps = {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  categories: Category[];
  pathname: string;
  today: string;
  isPending: boolean;
  session: MobileSession;
  onSignOut: () => void;
};

export default function MobileNav({
  open,
  onToggle,
  onClose,
  categories,
  pathname,
  today,
  isPending,
  session,
  onSignOut,
}: MobileNavProps) {
  return (
    <div className="md:hidden">
      {/* Hamburger (বাম দিকে) */}
      <button
        type="button"
        aria-label="মেনু খুলুন"
        aria-expanded={open}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition hover:border-green-600 hover:text-green-700"
        onClick={onToggle}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Mobile Drawer */}
      {open && (
        <>
          <div
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
          ></div>
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="মেনু"
            className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-[#FAFCFA] shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <span className="text-lg font-bold text-gray-900">
                বাজার দর
              </span>
              <button
                type="button"
                aria-label="মেনু বন্ধ করুন"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100"
                onClick={onClose}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18"></path>
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-5">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {session?.user?.name || "অতিথি"}
                  </p>
                  <p className="text-xs text-gray-500">{today}</p>
                </div>
              </div>
              <nav className="mt-5 flex flex-col gap-1">
                <Link
                  href="/"
                  className="rounded-lg px-3 py-2.5 font-medium text-gray-800 transition hover:bg-green-50 hover:text-green-700"
                  onClick={onClose}
                >
                  হোম
                </Link>
                <Link
                  href="/#সব-পণ্য"
                  className="rounded-lg px-3 py-2.5 font-medium text-gray-800 transition hover:bg-green-50 hover:text-green-700"
                  onClick={onClose}
                >
                  সব পণ্য
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className={`rounded-lg px-3 py-2.5 font-medium transition ${
                      pathname === `/category/${cat.slug}`
                        ? "bg-green-50 text-green-700"
                        : "text-gray-800 hover:bg-green-50 hover:text-green-700"
                    }`}
                    onClick={onClose}
                  >
                    <span>{cat.icon}</span> {cat.nameBn}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t border-gray-200 px-4 py-4">
              {isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : session ? (
                <div className="flex gap-2">
                  <Link
                    href="/profile"
                    className="flex-1 rounded-lg bg-green-50 px-3 py-2.5 text-center font-medium text-green-700 transition hover:bg-green-100"
                    onClick={onClose}
                  >
                    প্রোফাইল
                  </Link>
                  <button
                    onClick={onSignOut}
                    className="flex-1 rounded-lg bg-red-50 px-3 py-2.5 font-medium text-red-600 transition hover:bg-red-100"
                  >
                    সাইন আউট
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/signin"
                    className="flex-1 rounded-lg border border-green-700 px-3 py-2.5 text-center font-medium text-green-700 transition hover:bg-green-50"
                    onClick={onClose}
                  >
                    সাইন ইন
                  </Link>
                  <Link
                    href="/signup"
                    className="flex-1 rounded-lg bg-green-700 px-3 py-2.5 text-center font-medium text-white transition hover:bg-green-800"
                    onClick={onClose}
                  >
                    সাইন আপ
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </>
      )}
    </div>
  );
}