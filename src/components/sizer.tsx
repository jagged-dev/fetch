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
            <Dot strokeWidth={1} className="opacity-25" />
            {sizes.map((size) => (
                <div key={size}>
                    {currentSize === size ? (
                        <button onClick={() => setSize(size)} disabled className="w-12 rounded-md border border-gunmetal/25 text-md font-bold hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                            {size}
                        </button>
                    ) : (
                        <button onClick={() => setSize(size)} className="text-md text-coal transition-font hover:text-blue dark:text-snow">
                            {size}
                        </button>
                    )}
                </div>
            ))}
            <CircleSmall strokeWidth={1} className="opacity-25" />
        </div>
    );
}
