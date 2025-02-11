"use client";

import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { logOut } from "@/ts/api";

export default function Leave() {
    async function leave() {
        await logOut();
        redirect("/");
    }

    return (
        <button onClick={leave} className="text-coal transition-font hover:text-red dark:text-snow">
            <LogOut />
        </button>
    );
}
