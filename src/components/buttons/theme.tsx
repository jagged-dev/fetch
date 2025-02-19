"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function Theme() {
    const [icon, setIcon] = useState(<Moon />);

    useEffect(() => {
        if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
            setIcon(<Sun />);
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
            setIcon(<Moon />);
        }
    }, []);

    function toggleTheme() {
        document.documentElement.classList.toggle("dark");
        localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
        setIcon(document.documentElement.classList.contains("dark") ? <Sun /> : <Moon />);
    }

    return (
        <button onClick={toggleTheme} className="text-coal transition-font hover:text-purple dark:text-snow dark:hover:text-yellow">
            {icon}
        </button>
    );
}
