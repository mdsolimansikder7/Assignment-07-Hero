"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#F0F5F0] px-4 py-8">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-md ring-1 ring-green-100 sm:h-28 sm:w-28">
          <span className="text-5xl sm:text-6xl">🧺</span>
          <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-lg font-bold text-white shadow-md">
            ?
          </span>
        </div>

        <p className="mt-6 text-6xl font-extrabold tracking-tight text-green-700 sm:text-7xl">
          ৪০৪
        </p>

        <h1 className="mt-2 text-lg font-bold text-gray-900 sm:text-xl">
          পেজটি পাওয়া যায়নি
        </h1>
        <p className="mt-1.5 text-sm text-gray-500">
          আপনি যে পাতাটি খুঁজছেন সেটি সরিয়ে ফেলা হয়েছে বা ঠিকানাটি ভুল।
        </p>

        <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="rounded-lg bg-green-700 px-5 py-2.5 text-center font-semibold text-white shadow-md transition hover:bg-green-800"
          >
            হোম পেজে ফিরে যান
          </Link>
          <button
            type="button"
            onClick={() => router.back()}
            className="cursor-pointer rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            ← আগের পাতায় যান
          </button>
        </div>
      </div>
    </div>
  );
}