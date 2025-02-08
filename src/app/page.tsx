import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";

export default function Page() {
    return (
        <main className="grid h-screen grid-cols-2 grid-rows-1 gap-16 p-16">
            <div className="self-center justify-self-end">
                <Image src="/chihuahua.svg" alt="Chihuahua" width={400} height={320} />
            </div>
            <div className="flex flex-col gap-2 self-center justify-self-start">
                <h1 className="text-5xl font-bold leading-none transition-font">fetch a friend</h1>
                <p className="text-xl text-gunmetal transition-font dark:text-silver">one fetch closer to your new best friend</p>
                <Link href="/login">
                    <button className="mt-4 h-10 w-32 rounded-md bg-coal p-2 text-snow transition hover:translate-x-2 hover:bg-opacity-75 dark:bg-snow dark:text-coal">{`Get Started ->`}</button>
                </Link>
            </div>
            <div className="col-span-2">
                <Footer />
            </div>
        </main>
    );
}
