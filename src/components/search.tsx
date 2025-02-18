"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { fetchBreeds } from "@/ts/api";

export default function Search() {
    const path = usePathname();
    const params = useSearchParams();
    const router = useRouter();

    const search = useDebouncedCallback(async (term) => {
        const searchParams = new URLSearchParams(params);
        searchParams.set("from", "0");
        if (term) {
            if (isNaN(term)) {
                searchParams.set("breeds", term.charAt(0).toUpperCase() + term.slice(1));
                const breeds = await fetchBreeds();
                breeds.forEach((breed: string) => {
                    if (breed.toLowerCase().includes(term.toLowerCase())) searchParams.append("breeds", breed);
                });
            } else searchParams.set("zipCodes", term);
        } else {
            searchParams.delete("breeds");
            searchParams.delete("zipCodes");
        }
        router.replace(`${path}?${searchParams.toString()}`);
    }, 300);

    return (
        <input
            type="text"
            placeholder="Search (breed, zip code)"
            defaultValue={params.get("term") || ""}
            onChange={(e) => {
                search(e.target.value);
            }}
            className="h-12 grow rounded-lg border border-gunmetal/25 bg-transparent p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50"
        />
    );
}
