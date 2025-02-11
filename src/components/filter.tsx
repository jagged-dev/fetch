"use client";

import { SlidersHorizontal } from "lucide-react";

export default function Filter() {
    return (
        <button className="h-12 w-12 rounded-lg border border-gunmetal/25 p-2 transition hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
            <span className="flex justify-center text-gunmetal transition-font dark:text-silver">
                <SlidersHorizontal />
            </span>
        </button>
    );
}
