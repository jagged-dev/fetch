"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
    const router = useRouter();

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
                if (response.ok) router.push("/dashboard");
            } else {
                const nameErrors = validatedFields.error.flatten().fieldErrors.name;
                const emailErrors = validatedFields.error.flatten().fieldErrors.email;
                setErrors({ name: nameErrors ? nameErrors[0] : "", email: emailErrors ? emailErrors[0] : "" });
            }
        });
    }

    return (
        <form onSubmit={submitForm} className="flex h-full flex-col items-center justify-center gap-2">
            <Link href="/">
                <Image src="/chihuahua.svg" alt="Chihuahua graphic" height={200} width={240} priority={true} className="mb-4 transition-transform hover:-translate-x-2" />
            </Link>
            <div className="flex flex-col gap-2">
                <input id="name" name="name" type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} className="h-12 w-96 rounded-lg border border-gunmetal/25 bg-transparent p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50" />
                {errors.name && <p className="text-sm text-red">{errors.name}</p>}
            </div>
            <div className="flex flex-col gap-2">
                <input id="email" name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="h-12 w-96 rounded-lg border border-gunmetal/25 bg-transparent p-4 hover:border-gunmetal/50 dark:border-silver/25 dark:hover:border-silver/50" />
                {errors.email && <p className="text-sm text-red">{errors.email}</p>}
            </div>
            <button onClick={submitForm} disabled={isPending} className="h-12 w-96 rounded-lg bg-coal p-2 transition hover:bg-opacity-75 disabled:cursor-not-allowed dark:bg-snow">
                <span className="flex justify-center text-snow transition-font dark:text-coal">{isPending ? <LoaderCircle className="animate-spin" /> : `Log In`}</span>
            </button>
        </form>
    );
}
