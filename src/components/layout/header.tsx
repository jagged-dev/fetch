"use client";

import { usePathname } from "next/navigation";
import Theme from "@/components/buttons/theme";
import Leave from "@/components/buttons/leave";

export default function Header() {
    const path = usePathname();

    return (
        <div className="flex justify-end gap-8 p-8">
            <Theme />
            {path === "/dashboard" && <Leave />}
        </div>
    );
}
