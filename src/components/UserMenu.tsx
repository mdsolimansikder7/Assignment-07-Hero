"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  IoChevronDown,
  IoCreateOutline,
  IoLogOutOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { authClient } from "@/lib/auth-client";

type AvatarSize = "sm" | "md" | "lg";

const sizeClass: Record<AvatarSize, string> = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-14 w-14 text-xl sm:h-16 sm:w-16 sm:text-2xl",
};

export function UserAvatar({
  name,
  image,
  size = "md",
}: {
  name?: string | null;
  image?: string | null;
  size?: AvatarSize;
}) {
  const initial = name?.trim().charAt(0).toUpperCase() || "?";
  const base = `flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 font-bold text-green-800 ${sizeClass[size]}`;

  if (image) {
    return (
      // সাধারণ <img> ব্যবহার করেছি: width/height বা next.config লাগে না
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name ?? "User"}
        referrerPolicy="no-referrer"
        className={`${base} object-cover`}
      />
    );
  }

  return <div className={base}>{initial}</div>;
}

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // বাইরে ক্লিক করলে বা Escape চাপলে মেনু বন্ধ
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  if (isPending) {
    return <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />;
  }

  if (!session?.user) {
    return (
      <Link
        href="/sign-in"
        className="rounded-lg bg-[#05893E] px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800"
      >
        সাইন ইন
      </Link>
    );
  }

  const { user } = session;

  const handleSignOut = async () => {
    setOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট হয়েছে।");
          router.push("/");
          router.refresh();
        },
        onError: () => {
          toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        },
      },
    });
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-gray-100"
      >
        <UserAvatar name={user.name} image={user.image} size="md" />
        <span className="hidden max-w-[120px] truncate text-sm font-medium text-gray-800 sm:block">
          {user.name}
        </span>
        <IoChevronDown
          className={`text-gray-500 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
        >
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="truncate text-sm font-semibold text-gray-900">
              {user.name}
            </p>
            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>

          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            <IoPersonOutline />
            আমার প্রোফাইল
          </Link>

          <Link
            href="/profile/update-profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            <IoCreateOutline />
            তথ্য হালনাগাদ করুন
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="flex w-full cursor-pointer items-center gap-2 border-t border-gray-100 px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
          >
            <IoLogOutOutline />
            সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}