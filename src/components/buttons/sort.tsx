"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ArrowDownUp } from "lucide-react";

export default function Sort({ field }: { field: string }) {
    const path = usePathname();
    const params = useSearchParams();
    const router = useRouter();

    function toggleSort(field: string) {
        const searchParams = new URLSearchParams(params);
        searchParams.set("from", "0");
        if (searchParams.has("sort", `${field}:asc`)) searchParams.set("sort", `${field}:desc`);
        else searchParams.set("sort", `${field}:asc`);
        router.replace(`${path}?${searchParams.toString()}`);
    }

    return (
        <button onClick={() => toggleSort(field)} className="text-coal transition-font hover:text-blue dark:text-snow">
            <ArrowDownUp size={16} />
        </button>
    );
}
