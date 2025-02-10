"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Theme from "@/components/theme";
import Leave from "@/components/leave";

export default function Navbar() {
    const path = usePathname();

    return (
        <div className="flex p-8 xl:p-16">
            <div className="flex w-1/3 items-start justify-start gap-8"></div>
            <div className="flex w-1/3 items-center justify-center gap-8">
                {path === "/dashboard" ? (
                    <Link href="/">
                        <Image src="/dog.svg" alt="Dog icon" height={64} width={64} className="cursor-pointer transition hover:opacity-50" />
                    </Link>
                ) : null}
            </div>
            <div className="flex w-1/3 items-start justify-end gap-8">
                <Theme />
                {path === "/dashboard" ? <Leave /> : null}
            </div>
        </div>
    );
}
