"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
    const path = usePathname();
    const params = useSearchParams();
    const router = useRouter();

    const search = useDebouncedCallback((term) => {
        const searchParams = new URLSearchParams(params);
        if (term) searchParams.set("term", term);
        else searchParams.delete("term");
        router.replace(`${path}?${searchParams.toString()}`);
    }, 300);

    return (
        <input
            type="text"
            placeholder="Search"
            defaultValue={params.get("term") || ""}
            onChange={(e) => {
                search(e.target.value);
            }}
            className="h-12 grow rounded-lg border border-gunmetal/25 bg-transparent p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50"
        />
    );
}
