import Link from "next/link";
import Image from "next/image";
import Search from "@/components/search";
import Filter from "@/components/filter";
import Table from "@/components/table";
import Pagination from "@/components/pagination";

type searchParams = {
    size?: number;
    from?: number;
    sort?: string;
    total?: number;
};

export default async function Page(props: { searchParams?: Promise<searchParams> }) {
    const params = await props.searchParams;
    const size = Number(params?.size) || 10;
    const from = Number(params?.from) || 0;
    const sort = params?.sort || "breed:asc";
    const total = Number(params?.total);

    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex h-full w-11/12 flex-col gap-2 xl:w-10/12">
                <div className="-mt-22 mb-4 hidden w-full justify-center xl:flex">
                    <Link href="/">
                        <Image src="/samoyed.svg" alt="Samoyed graphic" height={120} width={180} priority={true} className="transition hover:-translate-y-2" />
                    </Link>
                </div>
                <div className="flex w-full gap-2 xl:-mt-14 xl:w-1/3">
                    <Search />
                    <Filter />
                </div>
                <Table key={from} size={size} from={from} sort={sort} />
                <Pagination size={size} from={from} total={total} />
            </div>
        </div>
    );
}
