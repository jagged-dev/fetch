"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Heart } from "lucide-react";

export default function Favorite({ id }: { id: string }) {
    const path = usePathname();
    const params = useSearchParams();
    const router = useRouter();

    function toggleFavorite(id: string) {
        const searchParams = new URLSearchParams(params);
        if (searchParams.has("favorite", id)) searchParams.delete("favorite", id);
        else searchParams.append("favorite", id);
        router.replace(`${path}?${searchParams.toString()}`);
    }

    return (
        <button onClick={() => toggleFavorite(id)} className="text-coal transition-font hover:text-pink dark:text-snow">
            {params.has("favorite", id) ? <Heart className="fill-pink text-pink" /> : <Heart />}
        </button>
    );
}
