import { redirect } from "next/navigation";
import { Dog } from "lucide-react";

export default function Home() {
    return (
        <button onClick={() => redirect("/")} className="text-coal transition-font hover:text-blue dark:text-snow">
            <Dog />
        </button>
    );
}
