"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Dog } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <p className="flex text-10xl font-bold leading-none xl:text-[20rem]">
                <span>5</span>
                <Dog size={160} className="xl:h-[320px] xl:w-[320px]" />
                <Dog size={160} className="xl:h-[320px] xl:w-[320px]" />
            </p>
            <p className="text-lg font-bold xl:text-xl">Something went wrong.</p>
            <p className="text-gunmetal transition-font dark:text-silver">
                <span>Please</span>
                <span onClick={() => reset()} className="cursor-pointer font-bold text-coal transition-font hover:text-blue dark:text-snow">{` try again `}</span>
                <span>or head back to the</span>
                <Link href="/">
                    <span className="font-bold text-coal transition-font hover:text-blue dark:text-snow">{` Home `}</span>
                </Link>
                <span>page.</span>
            </p>
        </div>
    );
}
