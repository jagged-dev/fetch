import Link from "next/link";
import Image from "next/image";
import Search from "@/components/search";
import Filter from "@/components/filter";
import Table from "@/components/table";
import Pagination from "@/components/pagination";

export default function Page() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-2">
            <Link href="/">
                <Image src="/samoyed.svg" alt="Samoyed graphic" height={160} width={240} priority={true} className="mb-4" />
            </Link>
            <div className="flex h-full w-11/12 flex-col gap-2 xl:w-10/12">
                <div className="flex w-full gap-2">
                    <Search />
                    <Filter />
                </div>
                <Table />
                <Pagination />
            </div>
        </div>
    );
}
