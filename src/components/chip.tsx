import clsx from "clsx";

export default function Chip({ Icon, label, className }: { Icon: React.ComponentType<{ size: number }>; label: string; className?: string }) {
    return (
        <div className={clsx("flex items-center gap-1 rounded-md border border-gunmetal/25 p-1 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50", className)}>
            <Icon size={12} />
            <p className="text-sm leading-none">{label}</p>
        </div>
    );
}
