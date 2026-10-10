"use client";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <label className="flex items-center justify-between gap-2 text-sm text-gray-600 sm:justify-start sm:text-base">
      সাজান
      <select
        className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 outline-none focus:border-green-600 sm:flex-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
        <option value="rise">দাম বেশি বেড়েছে</option>
        <option value="fall">দাম বেশি কমেছে</option>
      </select>
    </label>
  );
}
