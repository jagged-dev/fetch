"use client";

import { useState, useTransition } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";
import { logIn } from "@/ts/api";

export default function Page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({ name: "", email: "" });
    const [isPending, startTransition] = useTransition();

    function submitForm() {
        setErrors({ name: "", email: "" });
        startTransition(async () => {
            const validatedFields = z
                .object({
                    name: z.string().min(2, { message: "Name must be at least 2 characters long." }).trim(),
                    email: z.string().email({ message: "Please enter a valid email." }).trim(),
                })
                .safeParse({
                    name: name,
                    email: email,
                });
            if (validatedFields.success) {
                const response = await logIn(name, email);
                if (response.ok) redirect("/dashboard");
            } else {
                const nameErrors = validatedFields.error.flatten().fieldErrors.name;
                const emailErrors = validatedFields.error.flatten().fieldErrors.email;
                setErrors({ name: nameErrors ? nameErrors[0] : "", email: emailErrors ? emailErrors[0] : "" });
            }
        });
    }

    return (
        <div className="flex h-full flex-col items-center justify-center gap-2">
            <Link href="/">
                <Image src="/chihuahua.svg" alt="Chihuahua graphic" height={200} width={240} priority={true} className="mb-4" />
            </Link>
            <div className="flex flex-col gap-2">
                <input id="name" name="name" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} className="h-12 w-96 rounded-lg border border-gunmetal border-opacity-25 bg-snow p-4 transition hover:border-opacity-50 dark:border-silver dark:border-opacity-25 dark:bg-coal" />
                {errors.name ? <p className="text-sm text-red">{errors.name}</p> : null}
            </div>
            <div className="flex flex-col gap-2">
                <input id="email" name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="h-12 w-96 rounded-lg border border-gunmetal border-opacity-25 bg-snow p-4 transition hover:border-opacity-50 dark:border-silver dark:border-opacity-25 dark:bg-coal" />
                {errors.email ? <p className="text-sm text-red">{errors.email}</p> : null}
            </div>
            <button onClick={submitForm} disabled={isPending} className="h-12 w-96 rounded-lg bg-coal p-2 text-snow transition hover:bg-opacity-75 disabled:cursor-not-allowed dark:bg-snow dark:text-coal">
                <div className="flex justify-center">{isPending ? <LoaderCircle className="animate-spin text-snow dark:text-coal" /> : `Log In`}</div>
            </button>
        </div>
    );
}
