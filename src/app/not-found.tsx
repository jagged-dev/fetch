import Link from "next/link";
import { Dog } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <p className="flex text-10xl font-bold leading-none xl:text-[20rem]">
                <span>4</span>
                <Dog size={160} className="xl:h-[320px] xl:w-[320px]" />
                <span>4</span>
            </p>
            <p className="text-lg font-bold xl:text-xl">The requested page could not be found.</p>
            <p className="text-gunmetal transition-font dark:text-silver">
                <span>Try a different URL or head back to the</span>
                <Link href="/">
                    <span className="font-bold text-coal transition-font hover:text-blue dark:text-snow">{` Home `}</span>
                </Link>
                <span>page.</span>
            </p>
        </div>
    );
}
