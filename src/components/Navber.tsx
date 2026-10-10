"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getBanglaDate, type Category } from "@/lib/utils";
import UserMenu from "@/components/UserMenu";

export default function Navber({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const today = getBanglaDate();

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/categories")
      .then((res) => {
        if (!res.ok) throw new Error("Categories API response ঠিক নেই");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch((err) => console.warn("Error fetching categories:", err));
  }, []);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে!");
          router.push("/");
        },
      },
    });
  };

  return (
    <div className="sticky top-0 z-50">
      <header className="border-b border-gray-200 bg-[#FAFCFA]">
        <div className="container mx-auto flex items-center justify-between gap-2 px-4 py-2.5 sm:py-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                type="button"
                aria-label="মেনু খুলুন"
                aria-expanded={mobileMenuOpen}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition hover:border-green-600 hover:text-green-700"
                onClick={() => setMobileMenuOpen(true)}
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
            </div>

            {/* Mobile Drawer */}
            {mobileMenuOpen && (
              <>
                <div
                  aria-hidden="true"
                  className="fixed inset-0 z-40 bg-black/40"
                  onClick={() => setMobileMenuOpen(false)}
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
                      onClick={() => setMobileMenuOpen(false)}
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
                        src="/icon.png"
                        alt="logo"
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {session?.user?.name || "অতিথি"}
                        </p>
                        <p className="text-xs text-gray-500" suppressHydrationWarning>
                          {today}
                        </p>
                      </div>
                    </div>
                    <nav className="mt-5 flex flex-col gap-1">
                      <Link
                        href="/"
                        className="rounded-lg px-3 py-2.5 font-medium text-gray-800 transition hover:bg-green-50 hover:text-green-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        হোম
                      </Link>
                      <Link
                        href="/#all-products"
                        className="rounded-lg px-3 py-2.5 font-medium text-gray-800 transition hover:bg-green-50 hover:text-green-700"
                        onClick={() => setMobileMenuOpen(false)}
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
                          onClick={() => setMobileMenuOpen(false)}
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
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          প্রোফাইল
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="flex-1 rounded-lg bg-red-50 px-3 py-2.5 font-medium text-red-600 transition hover:bg-red-100"
                        >
                          সাইন আউট
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Link
                          href="/sign-in"
                          className="flex-1 rounded-lg border border-green-700 px-3 py-2.5 text-center font-medium text-green-700 transition hover:bg-green-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          সাইন ইন
                        </Link>
                        <Link
                          href="/sign-up"
                          className="flex-1 rounded-lg bg-green-700 px-3 py-2.5 text-center font-medium text-white transition hover:bg-green-800"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          সাইন আপ
                        </Link>
                      </div>
                    )}
                  </div>
                </aside>
              </>
            )}

            {/* Logo */}
            <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
              <Image
                src="/logo.png"
                alt="logo"
                width={40}
                height={40}
                className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
              />
              <div className="min-w-0 leading-tight">
                <span className="block truncate text-base font-bold sm:text-lg">
                  বাজার দর
                </span>
                <div
                  className="truncate whitespace-nowrap text-[10px] text-gray-500 min-[400px]:text-[11px] sm:text-xs"
                  suppressHydrationWarning
                >
                  {today}
                </div>
              </div>
            </Link>
          </div>

          {/* Mobile auth avatar */}
          <div className="h-8 w-8 shrink-0 md:hidden">
            {!isPending && session && (
              <Link href="/profile" className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                {session.user.name?.charAt(0) || "U"}
              </Link>
            )}
          </div>

          
        {/* Auth Buttons (Desktop) */}
<div className="hidden shrink-0 md:block">
  {isPending ? (
    <span className="loading loading-spinner loading-sm"></span>
  ) : session ? (
    <UserMenu />
  ) : (
    <div className="flex items-center gap-2">
      <Link
        href="/sign-in"
        className="rounded-lg border border-green-700 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50"
      >
        সাইন ইন
      </Link>
      <Link
        href="/sign-up"
        className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-800"
      >
        সাইন আপ
      </Link>
    </div>
  )}
</div>
        </div>
      </header>

  
      <nav className="border-b border-gray-200 bg-[#FAFCFA]">
        <div className="container mx-auto flex items-center gap-1.5 overflow-x-auto overscroll-x-contain whitespace-nowrap px-4 py-2 [scrollbar-width:none] sm:gap-2 sm:py-2.5 [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm font-semibold shadow-sm transition sm:gap-2 sm:px-3 ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-gray-800 shadow-none hover:bg-gray-100 hover:text-green-700"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {children}
    </div>
  );
}