"use client";

import { usePathname } from "next/navigation";
import Theme from "@/components/theme";
import Leave from "@/components/leave";

export default function Navbar() {
    const path = usePathname();

    return (
        <div className="flex justify-end gap-8 p-8 xl:p-16">
            <Theme />
            {path === "/dashboard" ? <Leave /> : null}
        </div>
    );
}
