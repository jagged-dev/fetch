"use client";

import { useState, useTransition, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import { Dog as DogType, searchDogs, fetchDogs } from "@/ts/api";
import Sort from "@/components/buttons/sort";
import Dog from "@/components/dog";
import Favorite from "@/components/buttons/favorite";

export default function Table({ size, from, sort }: { size: number; from: number; sort: string }) {
    const [dogs, setDogs] = useState([]);
    const [isPending, startTransition] = useTransition();
    const path = usePathname();
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        startTransition(async () => {
            const searchParams = new URLSearchParams(params);
            searchParams.set("size", size.toString());
            searchParams.set("from", from.toString());
            searchParams.set("sort", sort);
            const results = await searchDogs(`?${searchParams.toString()}`);
            searchParams.set("total", results.total);
            router.replace(`${path}?${searchParams.toString()}`);
            const dogs = await fetchDogs(results.resultIds);
            setDogs(dogs);
            if (searchParams.has("showFavorites", "true")) {
                const favorites = searchParams.getAll("favorite");
                searchParams.set("total", favorites.length.toString());
                router.replace(`${path}?${searchParams.toString()}`);
                const dogs = await fetchDogs(favorites);
                setDogs(dogs);
            }
        });
    }, []);

    return (
        <>
            {isPending ? (
                <div
                    className={clsx("flex w-full items-center justify-center rounded-lg border border-gunmetal/25 p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50", {
                        "h-[400px]": size === 5,
                        "h-[750px]": size === 10,
                    })}
                >
                    <LoaderCircle size={48} className="animate-spin" />
                </div>
            ) : (
                <div className="flex w-full flex-col gap-2">
                    <div className="grid grid-cols-4 items-center rounded-lg border border-gunmetal/25 p-4 hover:border-gunmetal/50 md:grid-cols-5 dark:border-silver/25 dark:hover:border-silver/50">
                        <div className="flex items-center gap-4">
                            <p className="text-md font-bold leading-none">Name</p>
                            <Sort field="name" />
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-md font-bold leading-none">Breed</p>
                            <Sort field="breed" />
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-md font-bold leading-none">Age</p>
                            <Sort field="age" />
                        </div>
                        <p className="text-md font-bold leading-none">Zip Code</p>
                    </div>
                    {dogs.map((dog: DogType) => (
                        <div key={dog.id} className="grid grid-cols-5 items-center rounded-lg border border-gunmetal/25 p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                            <div className="col-span-4 md:col-span-1">
                                <Dog dog={dog} />
                            </div>
                            <p className="hidden text-md md:flex">{dog.breed}</p>
                            <p className="hidden text-md md:flex">{dog.age}</p>
                            <p className="hidden text-md md:flex">{dog.zip_code}</p>
                            <div className="row-span-2 flex items-center justify-end md:row-span-1">
                                <Favorite id={dog.id} />
                            </div>
                            <div className="col-span-4 mt-2 flex items-center gap-2 md:hidden">
                                <p className="flex gap-1 text-sm">
                                    <span className="text-gunmetal transition-font dark:text-silver">Breed:</span>
                                    <span>{dog.breed}</span>
                                </p>
                                <p className="flex gap-1 text-sm">
                                    <span className="text-gunmetal transition-font dark:text-silver">Age:</span>
                                    <span>{dog.age}</span>
                                </p>
                                <p className="flex gap-1 text-sm">
                                    <span className="text-gunmetal transition-font dark:text-silver">Zip Code:</span>
                                    <span>{dog.zip_code}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
