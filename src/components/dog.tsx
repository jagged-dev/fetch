"use client";

import { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import { LoaderCircle, X, Dog as DogFace, PawPrint, MapPin, Locate } from "lucide-react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Dog as DogType, Location, fetchLocations } from "@/ts/api";

export default function Dog({ dog }: { dog: DogType }) {
    const [open, setOpen] = useState(false);
    const [location, setLocation] = useState({} as Location);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (open) {
            startTransition(async () => {
                const locations = await fetchLocations([dog.zip_code]);
                setLocation(locations[0]);
            });
        }
    }, [open]);

    return (
        <>
            <button onClick={() => setOpen(true)} className="group flex items-center gap-4">
                <Image src={dog.img} alt={dog.name} height={28} width={28} className="h-7 w-7 rounded-full" />
                <p className="text-md text-coal transition-font group-hover:text-blue dark:text-silver">{dog.name}</p>
            </button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogBackdrop transition className="fixed inset-0 bg-gunmetal/75 transition data-[closed]:opacity-0 dark:bg-silver/25" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-8">
                    <DialogPanel transition className="flex h-full w-full rounded-lg bg-snow transition data-[closed]:scale-95 data-[closed]:opacity-0 dark:bg-coal">
                        {isPending ? (
                            <div className="flex h-full w-full items-center justify-center p-4">
                                <LoaderCircle size={48} className="animate-spin" />
                            </div>
                        ) : (
                            <div className="grid h-full w-full grid-cols-1 grid-rows-2 xl:grid-cols-2 xl:grid-rows-1">
                                <div className="relative">
                                    {dog.img ? (
                                        <Image src={dog.img} alt={dog.name} fill={true} sizes="(max-width: 1280px) 100vw, 50vw" priority={true} className="rounded-t-lg object-cover xl:rounded-l-lg xl:rounded-r-none" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <LoaderCircle size={48} className="animate-spin" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col items-center p-8">
                                    <div className="flex w-full justify-end">
                                        <button onClick={() => setOpen(false)} className="text-coal transition-font hover:text-red dark:text-snow">
                                            <X />
                                        </button>
                                    </div>
                                    <div className="flex h-full flex-col justify-center gap-2">
                                        <h1 className="mb-4 text-3xl font-bold leading-none xl:text-5xl">{dog.name}</h1>
                                        <div className="flex items-center gap-2">
                                            <DogFace />
                                            <p>{dog.breed}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <PawPrint />
                                            <p>{`${dog.age} ${dog.age === 1 ? "year" : "years"} old`}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin />
                                            <p>{`${location.city}, ${location.county}, ${location.state} ${location.zip_code}`}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Locate />
                                            <p>{`${location.latitude}, ${location.longitude}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
