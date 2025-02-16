import { Check } from "lucide-react";

export default function Checkbox({ id, label, checked, onCheck }: { id: string; label: string; checked: boolean; onCheck: (checked: boolean) => void }) {
    return (
        <div className="flex items-center gap-2">
            <div className="grid items-center justify-items-center">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                        onCheck(e.target.checked);
                    }}
                    className="peer col-start-1 row-start-1 h-4 w-4 cursor-pointer appearance-none rounded border border-gunmetal/25 checked:border-blue checked:bg-blue hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50"
                />
                <Check size={12} strokeWidth={4} className="pointer-events-none invisible col-start-1 row-start-1 text-snow peer-checked:visible" />
            </div>
            <label htmlFor={id} className="cursor-pointer text-md leading-none">
                {label}
            </label>
        </div>
    );
}
