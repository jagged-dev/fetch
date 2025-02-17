import Link from "next/link";
import Image from "next/image";
import Search from "@/components/search";
import Filter from "@/components/filter";
import Table from "@/components/table";
import Pagination from "@/components/pagination";
import Sizer from "@/components/sizer";

type searchParams = {
    size?: number;
    from?: number;
    sort?: string;
    total?: number;
    showFavorites?: string;
    breeds?: string;
    zipCodes?: number;
    ageMin?: number;
    ageMax?: number;
};

export default async function Page(props: { searchParams?: Promise<searchParams> }) {
    const params = await props.searchParams;
    const size = Number(params?.size) || 5;
    const from = Number(params?.from) || 0;
    const sort = params?.sort || "breed:asc";
    const total = Number(params?.total);
    const showFavorites = params?.showFavorites;
    const breeds = params?.breeds;
    const zipCodes = Number(params?.zipCodes);
    const ageMin = Number(params?.ageMin);
    const ageMax = Number(params?.ageMax);

    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex h-full w-11/12 flex-col items-center gap-2 xl:w-10/12">
                <Link href="/">
                    <Image src="/samoyed.svg" alt="Samoyed graphic" height={120} width={180} priority={true} className="mb-4 transition-transform hover:-translate-y-2" />
                </Link>
                <div className="flex w-full gap-2">
                    <Search />
                    <Filter />
                </div>
                <Table key={size + from + sort + showFavorites + breeds + zipCodes + ageMin + ageMax} size={size} from={from} sort={sort} />
                <Pagination size={size} from={from} total={total} />
                <Sizer size={size} />
            </div>
        </div>
    );
}
