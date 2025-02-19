"use client";

import { useState, useTransition, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { fetchMatch } from "@/ts/api";

export default function Match() {
    const [open, setOpen] = useState(false);
    const [favorites, setFavorites] = useState([""]);
    const [isPending, startTransition] = useTransition();
    const path = usePathname();
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        setFavorites(params.getAll("favorite"));
    }, [params]);

    function findMatch() {
        startTransition(async () => {
            const match = await fetchMatch(favorites);
            router.push(`${path}/${match.match}/match`);
        });
    }

    return (
        <>
            <button onClick={() => (favorites.length ? findMatch() : setOpen(true))} disabled={isPending} className="h-12 w-36 rounded-lg bg-coal p-2 transition hover:translate-x-2 hover:bg-opacity-75 disabled:cursor-not-allowed dark:bg-snow">
                <span className="flex justify-center text-snow transition-font dark:text-coal">{isPending ? <LoaderCircle className="animate-spin" /> : `Find Match ->`}</span>
            </button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogBackdrop transition className="fixed inset-0 bg-gunmetal/75 transition data-[closed]:opacity-0 dark:bg-silver/25" />
                <div className="fixed inset-0 flex w-screen items-end justify-center p-8">
                    <DialogPanel transition className="flex items-center gap-8 rounded-lg bg-snow p-8 transition data-[closed]:translate-y-8 data-[closed]:opacity-0 dark:bg-coal">
                        <p>Please select at least one favorite dog before finding a match!</p>
                        <button onClick={() => setOpen(false)} className="h-12 w-24 rounded-lg bg-coal p-2 transition hover:bg-opacity-75 dark:bg-snow">
                            <span className="text-snow transition-font dark:text-coal">OK</span>
                        </button>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
