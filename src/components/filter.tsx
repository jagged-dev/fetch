"use client";

import { useState, useTransition, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { fetchBreeds } from "@/ts/api";

export default function Filter() {
    const [open, setOpen] = useState(false);
    const [breeds, setBreeds] = useState([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            const breeds = await fetchBreeds();
            setBreeds(breeds);
        });
    }, []);

    return (
        <>
            <button onClick={() => setOpen(true)} className="h-12 w-12 rounded-lg border border-gunmetal/25 p-2 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                <span className="flex justify-center text-gunmetal transition-font hover:text-blue dark:text-silver">
                    <SlidersHorizontal />
                </span>
            </button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogBackdrop transition className="fixed inset-0 bg-gunmetal/75 transition data-[closed]:opacity-0 dark:bg-silver/25" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-8 xl:p-16">
                    <DialogPanel transition className="flex h-full w-full flex-col gap-8 rounded-lg bg-snow p-8 transition data-[closed]:scale-95 data-[closed]:opacity-0 xl:p-16 dark:bg-coal">
                        <DialogTitle className="text-3xl font-bold leading-none xl:text-5xl">Filters</DialogTitle>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
