"use client";

import { useState, useTransition, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";
import { SlidersHorizontal, Heart, X, Check, LoaderCircle } from "lucide-react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { fetchBreeds } from "@/ts/api";
import Chip from "@/components/chip";
import Checkbox from "@/components/checkbox";

export default function Filter() {
    const [open, setOpen] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);
    const [breeds, setBreeds] = useState({ all: [] as string[], selected: [] as string[] });
    const [age, setAge] = useState({ min: "", max: "" });
    const [isPending, startTransition] = useTransition();
    const path = usePathname();
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (open) {
            startTransition(async () => {
                setShowFavorites(params.has("showFavorites", "true"));
                const breeds = await fetchBreeds();
                setBreeds({ all: breeds, selected: breeds.filter((breed: string) => params.has("breeds", breed)) });
                setAge({ min: params.get("ageMin") || "", max: params.get("ageMax") || "" });
            });
        }
    }, [open]);

    function toggleBreed(breed: string, checked: boolean) {
        if (checked) setBreeds({ all: breeds.all, selected: [...breeds.selected, breed] });
        else setBreeds({ all: breeds.all, selected: breeds.selected.filter((item: string) => item !== breed) });
    }

    function apply() {
        const searchParams = new URLSearchParams(params);
        searchParams.set("from", "0");
        if (showFavorites) searchParams.set("showFavorites", "true");
        else searchParams.delete("showFavorites");
        searchParams.delete("breeds");
        breeds.selected.forEach((breed: string) => searchParams.append("breeds", breed));
        if (age.min) searchParams.set("ageMin", age.min);
        else searchParams.delete("ageMin");
        if (age.max) searchParams.set("ageMax", age.max);
        else searchParams.delete("ageMax");
        router.push(`${path}?${searchParams.toString()}`);
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
                <div className="fixed inset-0 flex w-screen items-center justify-center p-8">
                    <DialogPanel transition className="flex h-full w-full flex-col gap-8 overflow-y-auto rounded-lg bg-snow p-8 transition data-[closed]:scale-95 data-[closed]:opacity-0 dark:bg-coal">
                        <DialogTitle className="text-3xl font-bold leading-none">Filters</DialogTitle>
                        <button onClick={() => setShowFavorites(!showFavorites)} className="group flex w-fit items-center gap-2 rounded-lg border border-gunmetal/25 p-2 transition hover:border-pink dark:border-silver/25 dark:hover:border-pink">
                            <Heart className={clsx("transition group-hover:text-pink", { "fill-pink text-pink": showFavorites })} />
                            <p className="text-md leading-none">Favorites only</p>
                        </button>
                        <div className="flex flex-col gap-2">
                            <p>Breeds</p>
                            <div className="flex flex-wrap items-center gap-2">
                                <button onClick={() => setBreeds({ all: breeds.all, selected: [] })} disabled={breeds.selected.length === 0} className="group">
                                    <Chip Icon={X} label="Clear selection" className="transition group-enabled:text-red group-enabled:hover:border-red group-disabled:text-gunmetal group-disabled:dark:text-silver" />
                                </button>
                                {breeds.selected.map((breed: string) => (
                                    <Chip key={breed} Icon={Check} label={breed} />
                                ))}
                            </div>
                            {isPending ? (
                                <div className="flex h-96 w-full items-center justify-center rounded-lg border border-gunmetal/25 p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                                    <LoaderCircle size={48} className="animate-spin" />
                                </div>
                            ) : (
                                <div className="flex h-96 w-full flex-col gap-2 overflow-y-auto rounded-lg border border-gunmetal/25 p-2 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                                    {breeds.all.map((breed: string) => (
                                        <Checkbox key={breed} id={breed} label={breed} checked={breeds.selected.includes(breed)} onCheck={(checked: boolean) => toggleBreed(breed, checked)} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Age</p>
                            <div className="flex gap-2">
                                <input type="number" placeholder="Min" defaultValue={age.min} onChange={(e) => setAge({ min: e.target.value, max: age.max })} className="h-12 w-24 rounded-lg border border-gunmetal/25 bg-transparent p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50" />
                                <input type="number" placeholder="Max" defaultValue={age.max} onChange={(e) => setAge({ min: age.min, max: e.target.value })} className="h-12 w-24 rounded-lg border border-gunmetal/25 bg-transparent p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50" />
                            </div>
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
