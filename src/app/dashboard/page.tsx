import Link from "next/link";
import Image from "next/image";
import Search from "@/components/search";
import Filter from "@/components/filter";
import Table from "@/components/table";
import Pagination from "@/components/pagination";

export default async function Page(props: { searchParams?: Promise<{ query?: string; page?: string }> }) {
    const params = await props.searchParams;
    const query = params?.query || "";
    const page = Number(params?.page) || 1;

    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex h-full w-11/12 flex-col gap-2 xl:w-10/12">
                <div className="-mt-22 mb-4 hidden w-full justify-center xl:flex">
                    <Link href="/">
                        <Image src="/samoyed.svg" alt="Samoyed graphic" height={120} width={180} priority={true} />
                    </Link>
                </div>
                <div className="flex w-full gap-2 xl:-mt-14 xl:w-1/3">
                    <Search />
                    <Filter />
                </div>
                <Table key={query + page} query={query} page={page} />
                <Pagination />
            </div>
        </div>
    );
}
