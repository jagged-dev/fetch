import Link from "next/link";
import { Dog } from "lucide-react";
import Footer from "@/components/footer";

export default function NotFound() {
    return (
        <div className="grid h-screen grid-cols-1 grid-rows-1 gap-8 p-8 xl:gap-16 xl:p-16">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex text-10xl font-bold leading-none transition-font xl:text-[20rem]">
                    4<Dog size={160} className="xl:h-[320px] xl:w-[320px]" />4
                </div>
                <p className="text-lg font-bold transition-font xl:text-xl">The requested page could not be found.</p>
                <div className="text-gunmetal transition-font dark:text-silver">
                    Try a different URL or head back to the
                    <Link href="/">
                        <b className="text-coal transition-font hover:text-blue dark:text-snow">{` Home `}</b>
                    </Link>
                    page.
                </div>
            </div>
            <Footer />
        </div>
    );
}
