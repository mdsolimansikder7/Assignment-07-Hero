export default function LoadingScreen() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[70vh] items-center justify-center bg-[#F0F5F0] px-4 py-8"
    >
      <div className="flex w-full max-w-xs flex-col items-center text-center">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-md ring-1 ring-green-100 sm:h-28 sm:w-28">
          <span className="text-5xl animate-bounce [animation-duration:1.2s] sm:text-6xl">
            🛒
          </span>
        </div>

        <h2 className="mt-6 text-lg font-bold text-gray-900 sm:text-xl">
          লোড হচ্ছে...
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          বাজারের দাম আনা হচ্ছে
        </p>

        <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-green-100">
          <div className="h-full w-1/2 animate-[loadbar_1.4s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-green-500 to-green-700" />
        </div>

        <span className="sr-only">পেজ লোড হচ্ছে</span>
      </div>

      <style>{`
        @keyframes loadbar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
}