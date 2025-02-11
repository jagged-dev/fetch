"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { LogOut, LoaderCircle } from "lucide-react";
import { logOut } from "@/ts/api";

export default function Leave() {
    const [icon, setIcon] = useState(<LogOut />);

    async function leave() {
        setIcon(<LoaderCircle className="animate-spin" />);
        await logOut();
        redirect("/");
    }

    return (
        <button onClick={leave} className="text-coal transition-font hover:text-red dark:text-snow">
            {icon}
        </button>
    );
}
