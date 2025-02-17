"use client";

import { useState, useTransition, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X, Check, LoaderCircle } from "lucide-react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { fetchBreeds } from "@/ts/api";
import Chip from "@/components/chip";
import Checkbox from "@/components/checkbox";

export default function Filter() {
    const [open, setOpen] = useState(false);
    const [breeds, setBreeds] = useState([]);
    const [selected, setSelected] = useState({ breeds: [""] });
    const [isPending, startTransition] = useTransition();
    const path = usePathname();
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (open) {
            startTransition(async () => {
                const breeds = await fetchBreeds();
                setBreeds(breeds);
                setSelected({ breeds: breeds.filter((breed: string) => params.has("breeds", breed)) });
            });
        }
    }, [open]);

    function toggleBreed(breed: string, checked: boolean) {
        if (checked) setSelected({ breeds: [...selected.breeds, breed] });
        else setSelected({ breeds: selected.breeds.filter((item: string) => item !== breed) });
    }

    function apply() {
        const searchParams = new URLSearchParams(params);
        searchParams.set("from", "0");
        searchParams.delete("breeds");
        selected.breeds.forEach((breed: string) => searchParams.append("breeds", breed));
        router.replace(`${path}?${searchParams.toString()}`);
        setOpen(false);
    }

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
                        <div className="flex h-1/3 w-full flex-col gap-2">
                            <p>Breeds</p>
                            {!isPending && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <button onClick={() => setSelected({ breeds: [] })} disabled={selected.breeds.length === 0} className="group">
                                        <Chip Icon={X} label="Clear selection" className="transition group-enabled:text-red group-enabled:hover:border-red group-disabled:text-gunmetal group-disabled:dark:text-silver" />
                                    </button>
                                    {selected.breeds.map((breed: string) => (
                                        <Chip key={breed} Icon={Check} label={breed} />
                                    ))}
                                </div>
                            )}
                            {isPending ? (
                                <div className="flex h-full w-full items-center justify-center rounded-lg border border-gunmetal/25 p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                                    <LoaderCircle size={48} className="animate-spin" />
                                </div>
                            ) : (
                                <div className="flex w-full flex-col gap-2 overflow-y-auto rounded-lg border border-gunmetal/25 p-2 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                                    {breeds.map((breed: string) => (
                                        <Checkbox key={breed} id={breed} label={breed} checked={selected.breeds.includes(breed)} onCheck={(checked: boolean) => toggleBreed(breed, checked)} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="mt-auto flex gap-2">
                            <button onClick={() => setOpen(false)} className="h-12 w-24 rounded-lg bg-coal p-2 transition hover:bg-opacity-75 dark:bg-snow">
                                <span className="text-snow transition-font dark:text-coal">Cancel</span>
                            </button>
                            <button onClick={apply} className="h-12 w-24 rounded-lg bg-coal p-2 transition hover:bg-opacity-75 dark:bg-snow">
                                <span className="text-snow transition-font dark:text-coal">Apply</span>
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
