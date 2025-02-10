"use client";

import { useEffect } from "react";
import { Dog } from "lucide-react";
import Footer from "@/components/footer";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="grid h-screen grid-cols-1 grid-rows-1 gap-8 p-8 xl:gap-16 xl:p-16">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex text-10xl font-bold leading-none transition-font xl:text-[20rem]">
                    5
                    <Dog size={160} className="xl:h-[320px] xl:w-[320px]" />
                    <Dog size={160} className="xl:h-[320px] xl:w-[320px]" />
                </div>
                <p className="text-lg font-bold transition-font xl:text-xl">Something went wrong.</p>
                <div className="text-gunmetal transition-font dark:text-silver">
                    Please
                    <b onClick={() => reset()} className="cursor-pointer text-coal transition-font hover:text-blue dark:text-snow">
                        {` try again`}
                    </b>
                    .
                </div>
            </div>
            <Footer />
        </div>
    );
}
