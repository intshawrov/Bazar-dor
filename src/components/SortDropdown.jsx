"use client";
import { useRouter, useSearchParams } from "next/navigation";

const SortDropdown = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSortChange = (e) => {
        const sortValue = e.target.value;
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", sortValue);
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="price-sort" className="text-xs font-semibold text-neutral-600">
                সাজান:
            </label>
            <select
                id="price-sort"
                defaultValue={searchParams.get("sort") || "highest-increase"}
                onChange={handleSortChange}
                className="h-9 rounded-xl border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-800 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 cursor-pointer"
            >
                <option value="high-to-low">দাম (বেশি থেকে কম)</option>
                <option value="low-to-high">দাম (কম থেকে বেশি)</option>
            </select>
        </div>
    );
};

export default SortDropdown;