"use client";

import { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { Dog, searchDogs, fetchDogs } from "@/ts/api";
import Favorite from "@/components/buttons/favorite";

export default function Table({ query, page }: { query: string; page: number }) {
    const [dogs, setDogs] = useState([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            const result = await searchDogs("?sort=breed:asc&size=10");
            let dogs = await fetchDogs(result.resultIds);
            dogs = dogs.filter(
                (dog: Dog) => !query || (query && dog.name.toLowerCase().includes(query.toLowerCase())) || (query && dog.breed.toLowerCase().includes(query.toLowerCase())) || (query && dog.age.toString().toLowerCase().includes(query.toLowerCase())) || (query && dog.zip_code.toLowerCase().includes(query.toLowerCase())),
            );
            setDogs(dogs);
        });
    }, []);

    return (
        <>
            {isPending ? (
                <div className="flex h-full w-full items-center justify-center rounded-lg border border-gunmetal/25 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                    <LoaderCircle size={48} className="animate-spin" />
                </div>
            ) : (
                <div className="flex w-full flex-col gap-2">
                    <div className="grid grid-cols-5 items-center rounded-lg border border-gunmetal/25 p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                        <p className="text-md font-bold">Name</p>
                        <p className="text-md font-bold">Breed</p>
                        <p className="text-md font-bold">Age</p>
                        <p className="text-md font-bold">Zip Code</p>
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
