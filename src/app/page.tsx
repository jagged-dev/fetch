import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-8 xl:flex-row xl:gap-16">
            <Image src="/chihuahua.svg" alt="Chihuahua graphic" height={200} width={240} priority={true} className="xl:h-[320px] xl:w-[400px]" />
            <div className="flex flex-col items-center gap-2 xl:items-start">
                <h1 className="text-3xl font-bold leading-none xl:text-5xl">fetch a friend</h1>
                <p className="text-gunmetal transition-font xl:text-xl dark:text-silver">one fetch closer to your new best friend</p>
                <Link href="/login">
                    <button className="mt-4 h-12 w-36 rounded-lg bg-coal p-2 transition hover:translate-x-2 hover:bg-opacity-75 dark:bg-snow">
                        <span className="text-snow dark:text-coal">{`Get Started ->`}</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}
