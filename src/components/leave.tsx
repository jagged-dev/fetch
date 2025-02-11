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
        <button onClick={leave} className="hover:text-red">
            <LogOut />
        </button>
    );
}
