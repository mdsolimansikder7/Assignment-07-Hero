"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getBanglaDate, type Category } from "@/lib/utils";
import UserMenu from "@/components/UserMenu";
import MobileNav from "@/components/MobileNav";
import MobileAuth from "@/components/MobileAuth";

const noopSubscribe = () => () => {};
function useToday() {
  return useSyncExternalStore(
    noopSubscribe,
    () => getBanglaDate(),
    () => ""
  );
}

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
  const today = useToday();

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
            {/* Mobile: হামবার্গার (বামে) + ড্রয়ার */}
            <MobileNav
              open={mobileMenuOpen}
              onToggle={() => setMobileMenuOpen((o) => !o)}
              onClose={() => setMobileMenuOpen(false)}
              categories={categories}
              pathname={pathname}
              today={today}
              isPending={isPending}
              session={session ?? null}
              onSignOut={handleSignOut}
            />

            {/* Logo */}
            <Link
              href="/"
              className="flex min-w-0 items-center gap-2 sm:gap-3"
            >
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
                <div className="min-h-4 truncate whitespace-nowrap text-[10px] text-gray-500 min-[400px]:text-[11px] sm:text-xs">
                  {today}
                </div>
              </div>
            </Link>
          </div>

          {/* Mobile: ডান দিকে সাইন ইন / avatar */}
          <MobileAuth isPending={isPending} session={session ?? null} />

          {/* Auth Buttons (Desktop) */}
          <div className="hidden shrink-0 md:block">
            {isPending ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : session ? (
              <UserMenu />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="rounded-lg border border-green-700 px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-800"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Category Chips Row */}
      <nav className="border-b border-gray-200 bg-[#FAFCFA]">
        <div className="container mx-auto flex items-center gap-1.5 overflow-x-auto overscroll-x-contain whitespace-nowrap px-4 py-2 [scrollbar-width:none] sm:gap-2 sm:py-2.5 [&::-webkit-scrollbar]:hidden">
          {categories.length === 0 &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 shrink-0 animate-pulse rounded-lg bg-gray-200"
              />
            ))}

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