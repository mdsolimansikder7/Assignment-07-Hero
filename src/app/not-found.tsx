import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-[#f0f7f1] via-white to-[#dcfce7] px-4 py-8">
      <div className="flex w-full max-w-sm flex-col items-center rounded-3xl border border-green-100 bg-white/80 p-8 text-center shadow-xl backdrop-blur sm:p-10">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-green-100 text-3xl shadow-inner sm:h-20 sm:w-20 sm:text-4xl">
          🔍
        </span>
        <h1 className="mt-6 text-lg font-bold text-gray-900 sm:text-xl">
          পেজটি পাওয়া যায়নি
        </h1>
        <p className="mt-1.5 text-sm text-gray-500">
          আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি। এটি সরিয়ে ফেলা হয়ে
          থাকতে পারে বা ঠিকানাটি ভুল হতে পারে।
        </p>
        <Link
          href="/"
          className="mt-5 rounded-lg bg-green-700 px-5 py-2.5 font-semibold text-white shadow-md transition hover:bg-green-800"
        >
          🏠 হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
