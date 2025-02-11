"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
    const params = useSearchParams();
    const path = usePathname();
    const router = useRouter();

    const search = useDebouncedCallback((term) => {
        const searchParams = new URLSearchParams(params);
        searchParams.set("page", "1");
        if (term) {
            searchParams.set("query", term);
        } else {
            searchParams.delete("query");
        }
        router.replace(`${path}?${searchParams.toString()}`);
    }, 300);

    return (
        <input
            type="text"
            placeholder="Search"
            defaultValue={params.get("query")?.toString()}
            onChange={(e) => {
                search(e.target.value);
            }}
            className="h-12 w-full rounded-lg border border-gunmetal/25 bg-snow p-4 transition hover:border-gunmetal/50 xl:w-96 dark:border-silver/25 dark:bg-coal dark:hover:border-silver/50"
        />
    );
}
