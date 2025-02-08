import Theme from "@/components/theme";

export default function Footer() {
    return (
        <div className="flex justify-between">
            <div className="w-6"></div>
            <p className="text-gunmetal transition-font dark:text-silver">powered by &copy; Fetch</p>
            <Theme />
        </div>
    );
}
