export default function Coordinate({ placeholder, defaultValue, onChange }: { placeholder: string; defaultValue: string; onChange: (value: number) => void }) {
    return (
        <input
            type="number"
            placeholder={placeholder}
            defaultValue={defaultValue || ""}
            onChange={(e) => {
                onChange(e.target.valueAsNumber);
            }}
            className="h-12 w-36 rounded-lg border border-gunmetal/25 bg-transparent p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50"
        />
    );
}
