"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";
import { Heart } from "lucide-react";

export default function Favorite({ id }: { id: string }) {
    const path = usePathname();
    const params = useSearchParams();
    const router = useRouter();

    function toggleFavorite(id: string) {
        const searchParams = new URLSearchParams(params);
        if (!searchParams.has("favorite", id)) searchParams.append("favorite", id);
        else searchParams.delete("favorite", id);
        router.replace(`${path}?${searchParams.toString()}`);
    }

    return (
        <button onClick={() => toggleFavorite(id)} className="text-coal transition-font hover:text-pink dark:text-snow">
            <Heart className={clsx({ "fill-pink text-pink": params.has("favorite", id) })} />
        </button>
    );
}
