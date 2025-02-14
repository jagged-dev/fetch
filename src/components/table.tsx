"use client";

import { useState, useTransition, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import { Dog, searchDogs, fetchDogs } from "@/ts/api";
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
        });
    }, []);

    return (
        <>
            {isPending ? (
                <div
                    className={clsx("flex w-full items-center justify-center rounded-lg border border-gunmetal/25 p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50", {
                        "h-[398px]": size === 5,
                        "h-[748px]": size === 10,
                    })}
                >
                    <LoaderCircle size={48} className="animate-spin" />
                </div>
            ) : (
                <div className="flex w-full flex-col gap-2">
                    <div className="grid grid-cols-5 items-center rounded-lg border border-gunmetal/25 p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                        <p className="text-md font-bold leading-none">Name</p>
                        <p className="text-md font-bold leading-none">Breed</p>
                        <p className="text-md font-bold leading-none">Age</p>
                        <p className="text-md font-bold leading-none">Zip Code</p>
                    </div>
                    {dogs.map((dog: Dog) => (
                        <div key={dog.id} className="grid grid-cols-5 items-center rounded-lg border border-gunmetal/25 p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                            <div className="flex items-center gap-4">
                                <Image src={dog.img} alt={dog.name} height={28} width={28} className="h-7 w-7 rounded-full" />
                                <p className="text-md">{dog.name}</p>
                            </div>
                            <p className="text-md">{dog.breed}</p>
                            <p className="text-md">{dog.age}</p>
                            <p className="text-md">{dog.zip_code}</p>
                            <div className="flex items-center justify-end">
                                <Favorite id={dog.id} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
