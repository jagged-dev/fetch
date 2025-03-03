"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, LoaderCircle } from "lucide-react";
import { logOut } from "@/ts/api";

export default function Leave() {
    const [icon, setIcon] = useState(<LogOut />);
    const router = useRouter();

    async function leave() {
        setIcon(<LoaderCircle className="animate-spin" />);
        const response = await logOut();
        if (response.ok) router.push("/");
    }

    return (
        <button onClick={leave} className="text-coal transition-font hover:text-red dark:text-snow">
            {icon}
        </button>
    );
}
