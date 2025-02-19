"use client";

import { useState, useTransition, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { LoaderCircle, ArrowLeft, X, Dog as DogFace, PawPrint, MapPin, Locate } from "lucide-react";
import { Dog, Location, fetchDogs, fetchLocations } from "@/ts/api";

export default function Page() {
    const [dog, setDog] = useState({} as Dog);
    const [location, setLocation] = useState({} as Location);
    const [isPending, startTransition] = useTransition();
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        startTransition(async () => {
            const dogs = await fetchDogs([params.id!.toString()]);
            setDog(dogs[0]);
            const locations = await fetchLocations([dogs[0].zip_code]);
            setLocation(locations[0]);
        });
    }, []);

    return (
        <div className="flex h-full items-center justify-center">
            {isPending ? (
                <div className="flex h-full w-11/12 items-center justify-center rounded-lg border border-gunmetal/25 p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                    <LoaderCircle size={48} className="animate-spin" />
                </div>
            ) : (
                <div className="grid h-full w-11/12 grid-cols-1 grid-rows-2 rounded-lg border border-gunmetal/25 hover:border-gunmetal/50 xl:grid-cols-2 xl:grid-rows-1 dark:border-silver/25 dark:hover:border-silver/50">
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
                        <div className="flex w-full justify-between">
                            <button onClick={() => router.back()} className="text-coal transition-font hover:text-blue dark:text-snow">
                                <ArrowLeft />
                            </button>
                            <button onClick={() => router.push("/")} className="text-coal transition-font hover:text-red dark:text-snow">
                                <X />
                            </button>
                        </div>
                        <div className="flex h-full flex-col justify-center gap-2">
                            <h1 className="mb-4 text-3xl font-bold leading-none xl:text-5xl">{`Meet ${dog.name}!`}</h1>
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
        </div>
    );
}
