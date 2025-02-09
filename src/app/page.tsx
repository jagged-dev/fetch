import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";

export default function Page() {
    return (
        <main className="grid h-screen grid-cols-1 grid-rows-2 gap-8 p-8 xl:grid-cols-2 xl:grid-rows-1 xl:gap-16 xl:p-16">
            <div className="self-end justify-self-center xl:self-center xl:justify-self-end">
                <Image src="/chihuahua.svg" alt="Chihuahua graphic" height={200} width={240} priority={true} className="xl:h-[320px] xl:w-[400px]" />
            </div>
            <div className="flex flex-col items-center gap-2 self-start justify-self-center xl:items-start xl:self-center xl:justify-self-start">
                <h1 className="text-3xl font-bold leading-none transition-font xl:text-5xl">fetch a friend</h1>
                <p className="text-gunmetal transition-font xl:text-xl dark:text-silver">one fetch closer to your new best friend</p>
                <Link href="/login">
                    <button className="mt-4 h-12 w-36 rounded-lg bg-coal p-2 text-snow transition hover:translate-x-2 hover:bg-opacity-75 dark:bg-snow dark:text-coal">{`Get Started ->`}</button>
                </Link>
            </div>
            <div className="xl:col-span-2">
                <Footer />
            </div>
        </main>
    );
}
