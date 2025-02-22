import { Coordinates as CoordinatesType } from "@/ts/api";

export default function Coordinates({ coordinates, onChange }: { coordinates?: CoordinatesType; onChange: (coordinates: CoordinatesType) => void }) {
    return (
        <div className="flex gap-2">
            <input
                type="number"
                placeholder="Lat"
                defaultValue={coordinates?.lat || ""}
                onChange={(e) => {
                    onChange({ lat: e.target.valueAsNumber, lon: coordinates?.lon || NaN });
                }}
                className="h-12 w-36 rounded-lg border border-gunmetal/25 bg-transparent p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50"
            />
            <input
                type="number"
                placeholder="Lon"
                defaultValue={coordinates?.lon || ""}
                onChange={(e) => {
                    onChange({ lat: coordinates?.lat || NaN, lon: e.target.valueAsNumber });
                }}
                className="h-12 w-36 rounded-lg border border-gunmetal/25 bg-transparent p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50"
            />
        </div>
    );
}
