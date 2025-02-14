"use client";

import { usePathname } from "next/navigation";
import Theme from "@/components/buttons/theme";
import Leave from "@/components/buttons/leave";

export default function Navbar() {
    const path = usePathname();

    return (
        <div className="grid grid-cols-3 p-8 xl:p-16">
            <div className="xl:col-span-2"></div>
            <div className="flex justify-center xl:hidden">{path === "/dashboard" ? <Home /> : null}</div>
            <div className="flex justify-end gap-8">
                <Theme />
                {path === "/dashboard" ? <Leave /> : null}
            </div>
        </div>
    );
}
