"use client";

import { useState, useTransition, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Map, X, Check, ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { State, States } from "@/ts/states";
import { Location, searchLocations } from "@/ts/api";
import Chip from "@/components/chip";
import Checkbox from "@/components/checkbox";
import Coordinate from "@/components/coordinate";

export default function LocationFilter() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [city, setCity] = useState("");
    const [states, setStates] = useState({ all: States, selected: [] as string[] });
    const [geoBoundingBox, setGeoBoundingBox] = useState({} as any);
    const [tab, setTab] = useState(0);
    const [size] = useState(100);
    const [from, setFrom] = useState(0);
    const [page, setPage] = useState({ current: 1, total: 1 });
    const [locations, setLocations] = useState({ all: [] as Location[], selected: [] as string[] });
    const [isPending, startTransition] = useTransition();
    const path = usePathname();
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (open2) {
            startTransition(async () => {
                const results = await searchLocations(city, states.selected.length ? states.selected : undefined, Object.keys(geoBoundingBox).length ? geoBoundingBox : undefined, size, from);
                const locations = results.results;
                setLocations({ all: locations, selected: params.getAll("zipCodes") });
                const total = results.total;
                setPage({ current: Math.floor(from / size) + 1, total: Math.ceil(total / size) });
            });
        }
    }, [open2, from]);

    const search = useDebouncedCallback((term) => {
        setCity(term);
        setFrom(0);
    }, 300);

    function toggleState(state: string, checked: boolean) {
        if (checked) setStates({ ...states, selected: [...states.selected, state] });
        else setStates({ ...states, selected: states.selected.filter((item: string) => item !== state) });
        setFrom(0);
    }

    function toggleLocation(zipCode: string, checked: boolean) {
        if (checked) setLocations({ ...locations, selected: [...locations.selected, zipCode] });
        else setLocations({ ...locations, selected: locations.selected.filter((item: string) => item !== zipCode) });
    }

    function apply() {
        const searchParams = new URLSearchParams(params);
        searchParams.set("from", "0");
        searchParams.delete("zipCodes");
        locations.selected.forEach((zipCode: string) => searchParams.append("zipCodes", zipCode));
        router.push(`${path}?${searchParams.toString()}`);
        setOpen1(false);
        setOpen2(false);
    }

    return (
        <>
            <button onClick={() => setOpen1(true)} className="group h-12 w-12 rounded-lg border border-gunmetal/25 p-2 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                <span className="flex justify-center text-gunmetal transition-font group-hover:text-green dark:text-silver">
                    <Map />
                </span>
            </button>
            <Dialog open={open1} onClose={() => setOpen1(false)}>
                <DialogBackdrop transition className="fixed inset-0 bg-gunmetal/75 transition data-[closed]:opacity-0 dark:bg-silver/25" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-8">
                    <DialogPanel transition className="flex h-full w-full flex-col gap-8 overflow-y-auto rounded-lg bg-snow p-8 transition data-[closed]:scale-95 data-[closed]:opacity-0 dark:bg-coal">
                        <DialogTitle className="text-3xl font-bold leading-none">Filters</DialogTitle>
                        <input type="text" placeholder="City" defaultValue={city} onChange={(e) => search(e.target.value)} className="h-12 w-full max-w-96 rounded-lg border border-gunmetal/25 bg-transparent p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50" />
                        <div className="flex flex-col gap-2">
                            <p>States</p>
                            <div className="flex flex-wrap items-center gap-2">
                                <button onClick={() => setStates({ ...states, selected: [] })} disabled={states.selected.length === 0} className="group">
                                    <Chip Icon={X} label="Clear selection" className="transition group-enabled:text-red group-enabled:hover:border-red group-disabled:text-gunmetal group-disabled:dark:text-silver" />
                                </button>
                                {states.selected.map((state: string) => (
                                    <Chip key={state} Icon={Check} label={state} />
                                ))}
                            </div>
                            <div className="flex h-96 w-full flex-col gap-2 overflow-y-auto rounded-lg border border-gunmetal/25 p-2 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                                {states.all.map((state: State) => (
                                    <Checkbox key={state.abbr} id={state.abbr} label={state.name} checked={states.selected.includes(state.abbr)} onCheck={(checked: boolean) => toggleState(state.abbr, checked)} />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Coordinates</p>
                            <TabGroup selectedIndex={tab}>
                                <TabList className="hidden">
                                    <Tab></Tab>
                                    <Tab></Tab>
                                    <Tab></Tab>
                                </TabList>
                                <TabPanels className="rounded-lg border border-gunmetal/25 p-2 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                                    <TabPanel className="flex flex-wrap gap-2">
                                        <div className="grid grid-cols-2 gap-2">
                                            <p className="col-span-2 text-md">Top:</p>
                                            <Coordinate placeholder="Lat" defaultValue={geoBoundingBox.top?.lat} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, top: { lat: value, lon: geoBoundingBox?.top?.lon } })} />
                                            <Coordinate placeholder="Lon" defaultValue={geoBoundingBox.top?.lon} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, top: { lat: geoBoundingBox?.top?.lat, lon: value } })} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <p className="col-span-2 text-md">Left:</p>
                                            <Coordinate placeholder="Lat" defaultValue={geoBoundingBox.left?.lat} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, left: { lat: value, lon: geoBoundingBox?.left?.lon } })} />
                                            <Coordinate placeholder="Lon" defaultValue={geoBoundingBox.left?.lon} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, left: { lat: geoBoundingBox?.left?.lat, lon: value } })} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <p className="col-span-2 text-md">Bottom:</p>
                                            <Coordinate placeholder="Lat" defaultValue={geoBoundingBox.bottom?.lat} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, bottom: { lat: value, lon: geoBoundingBox?.bottom?.lon } })} />
                                            <Coordinate placeholder="Lon" defaultValue={geoBoundingBox.bottom?.lon} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, bottom: { lat: geoBoundingBox?.bottom?.lat, lon: value } })} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <p className="col-span-2 text-md">Right:</p>
                                            <Coordinate placeholder="Lat" defaultValue={geoBoundingBox.right?.lat} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, right: { lat: value, lon: geoBoundingBox?.right?.lon } })} />
                                            <Coordinate placeholder="Lon" defaultValue={geoBoundingBox.right?.lon} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, right: { lat: geoBoundingBox?.right?.lat, lon: value } })} />
                                        </div>
                                    </TabPanel>
                                    <TabPanel className="flex flex-wrap gap-2">
                                        <div className="grid grid-cols-2 gap-2">
                                            <p className="col-span-2 text-md">Top Left:</p>
                                            <Coordinate placeholder="Lat" defaultValue={geoBoundingBox.top_left?.lat} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, top_left: { lat: value, lon: geoBoundingBox?.top_left?.lon } })} />
                                            <Coordinate placeholder="Lon" defaultValue={geoBoundingBox.top_left?.lon} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, top_left: { lat: geoBoundingBox?.top_left?.lat, lon: value } })} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <p className="col-span-2 text-md">Bottom Right:</p>
                                            <Coordinate placeholder="Lat" defaultValue={geoBoundingBox.bottom_right?.lat} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, bottom_right: { lat: value, lon: geoBoundingBox?.bottom_right?.lon } })} />
                                            <Coordinate placeholder="Lon" defaultValue={geoBoundingBox.bottom_right?.lon} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, bottom_right: { lat: geoBoundingBox?.bottom_right?.lat, lon: value } })} />
                                        </div>
                                    </TabPanel>
                                    <TabPanel className="flex flex-wrap gap-2">
                                        <div className="grid grid-cols-2 gap-2">
                                            <p className="col-span-2 text-md">Bottom Left:</p>
                                            <Coordinate placeholder="Lat" defaultValue={geoBoundingBox.bottom_left?.lat} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, bottom_left: { lat: value, lon: geoBoundingBox?.bottom_left?.lon } })} />
                                            <Coordinate placeholder="Lon" defaultValue={geoBoundingBox.bottom_left?.lon} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, bottom_left: { lat: geoBoundingBox?.bottom_left?.lat, lon: value } })} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <p className="col-span-2 text-md">Top Right:</p>
                                            <Coordinate placeholder="Lat" defaultValue={geoBoundingBox.top_right?.lat} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, top_right: { lat: value, lon: geoBoundingBox?.top_right?.lon } })} />
                                            <Coordinate placeholder="Lon" defaultValue={geoBoundingBox.top_right?.lon} onChange={(value: number) => setGeoBoundingBox({ ...geoBoundingBox, top_right: { lat: geoBoundingBox?.top_right?.lat, lon: value } })} />
                                        </div>
                                    </TabPanel>
                                </TabPanels>
                            </TabGroup>
                            <div className="flex w-fit items-center justify-center gap-8 rounded-lg border border-gunmetal/25 p-2 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                                <button
                                    onClick={() => {
                                        setTab((tab) => tab - 1);
                                        setGeoBoundingBox({});
                                    }}
                                    disabled={tab === 0}
                                    className="text-coal transition-font enabled:hover:text-blue disabled:opacity-25 dark:text-snow"
                                >
                                    <ChevronLeft strokeWidth={1} />
                                </button>
                                <button
                                    onClick={() => {
                                        setTab((tab) => tab + 1);
                                        setGeoBoundingBox({});
                                    }}
                                    disabled={tab === 2}
                                    className="text-coal transition-font enabled:hover:text-blue disabled:opacity-25 dark:text-snow"
                                >
                                    <ChevronRight strokeWidth={1} />
                                </button>
                            </div>
                        </div>
                        <div className="mt-auto flex gap-2">
                            <button onClick={() => setOpen1(false)} className="h-12 w-24 rounded-lg bg-coal p-2 transition hover:bg-opacity-75 dark:bg-snow">
                                <span className="text-snow transition-font dark:text-coal">Cancel</span>
                            </button>
                            <button onClick={() => setOpen2(true)} className="h-12 w-24 rounded-lg bg-coal p-2 transition hover:bg-opacity-75 dark:bg-snow">
                                <span className="text-snow transition-font dark:text-coal">Next</span>
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <Dialog open={open2} onClose={() => setOpen2(false)}>
                <DialogBackdrop transition className="fixed inset-0 bg-gunmetal/75 transition data-[closed]:opacity-0 dark:bg-silver/25" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-8">
                    <DialogPanel transition className="flex h-full w-full flex-col gap-8 overflow-y-auto rounded-lg bg-snow p-8 transition data-[closed]:translate-x-16 data-[closed]:opacity-0 dark:bg-coal">
                        <DialogTitle className="text-3xl font-bold leading-none">Locations</DialogTitle>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <button onClick={() => setLocations({ ...locations, selected: [] })} disabled={locations.selected.length === 0} className="group">
                                    <Chip Icon={X} label="Clear selection" className="transition group-enabled:text-red group-enabled:hover:border-red group-disabled:text-gunmetal group-disabled:dark:text-silver" />
                                </button>
                                {locations.selected.map((zipCode: string) => (
                                    <Chip key={zipCode} Icon={Check} label={zipCode} />
                                ))}
                            </div>
                            {isPending ? (
                                <div className="flex h-96 w-full items-center justify-center rounded-lg border border-gunmetal/25 p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                                    <LoaderCircle size={48} className="animate-spin" />
                                </div>
                            ) : (
                                <div className="flex max-h-96 w-full flex-col gap-2 overflow-y-auto rounded-lg border border-gunmetal/25 p-2 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                                    {locations.all.map((location: Location) => (
                                        <Checkbox key={location.zip_code} id={location.zip_code} label={`${location.city}, ${location.county}, ${location.state} ${location.zip_code}`} checked={locations.selected.includes(location.zip_code)} onCheck={(checked: boolean) => toggleLocation(location.zip_code, checked)} />
                                    ))}
                                </div>
                            )}
                            <div className="flex w-fit items-center justify-center gap-8 rounded-lg border border-gunmetal/25 p-2 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50">
                                <button onClick={() => setFrom((page.current - 2) * size)} disabled={page.current === 1} className="text-coal transition-font enabled:hover:text-blue disabled:opacity-25 dark:text-snow">
                                    <ChevronLeft strokeWidth={1} />
                                </button>
                                <select
                                    value={(page.current - 1) * size}
                                    onChange={(e) => setFrom(Number(e.target.value))}
                                    className="w-12 cursor-pointer appearance-none rounded-md border border-gunmetal/25 bg-transparent text-center text-md font-bold hover:border-gunmetal/50 hover:text-blue dark:border-silver/25 dark:hover:border-silver/50"
                                >
                                    {Array.from({ length: page.total }, (_, i) => i + 1).map((page: number) => (
                                        <option key={(page - 1) * size} value={(page - 1) * size} className="bg-snow text-md text-coal dark:bg-coal dark:text-snow">
                                            {page}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => setFrom(page.current * size)} disabled={page.current === page.total} className="text-coal transition-font enabled:hover:text-blue disabled:opacity-25 dark:text-snow">
                                    <ChevronRight strokeWidth={1} />
                                </button>
                            </div>
                        </div>
                        <div className="mt-auto flex gap-2">
                            <button onClick={() => setOpen2(false)} className="h-12 w-24 rounded-lg bg-coal p-2 transition hover:bg-opacity-75 dark:bg-snow">
                                <span className="text-snow transition-font dark:text-coal">Back</span>
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
