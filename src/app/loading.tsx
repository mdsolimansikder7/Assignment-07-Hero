export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="skeleton h-64 w-full rounded-3xl" />
      <div className="skeleton mt-8 h-8 w-56" />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-28 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}