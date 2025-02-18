"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Dot, CircleSmall } from "lucide-react";

export default function Sizer({ size }: { size: number }) {
    const path = usePathname();
    const params = useSearchParams();
    const router = useRouter();
    const currentSize = size || 5;
    const sizes = [5, 10, 25, 50, 100];

    function setSize(size: number) {
        const searchParams = new URLSearchParams(params);
        searchParams.set("size", size.toString());
        searchParams.set("from", "0");
        router.push(`${path}?${searchParams.toString()}`);
    }

    return (
        <div className="flex w-full items-center justify-center gap-4 rounded-lg border border-gunmetal/25 p-2 hover:border-gunmetal/50 md:gap-8 dark:border-silver/25 dark:hover:border-silver/50">
            <Dot strokeWidth={1} />
            {sizes.map((size) => (
                <button key={size} onClick={() => setSize(size)} disabled={currentSize === size} className="text-coal transition-font enabled:hover:text-blue disabled:font-bold disabled:text-blue dark:text-snow">
                    <span className="text-md">{size}</span>
                </button>
            ))}
            <CircleSmall strokeWidth={1} />
        </div>
    );
}
