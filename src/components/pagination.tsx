"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ChevronFirst, ChevronLeft, ChevronRight, ChevronLast } from "lucide-react";

export default function Pagination({ size, from, total }: { size: number; from: number; total: number }) {
    const path = usePathname();
    const params = useSearchParams();
    const router = useRouter();
    const currentPage = Math.floor(from / size) + 1 || 1;
    const totalPages = Math.ceil(total / size) || 1;

    const pagination = (length: number) => {
        const middle = Math.ceil(length / 2);
        if (totalPages <= length) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= middle) return Array.from({ length: length }, (_, i) => i + 1);
        if (currentPage > totalPages - middle) return Array.from({ length: length }, (_, i) => i + 1 + (totalPages - length));
        return Array.from({ length: length }, (_, i) => i + 1 + (currentPage - middle));
    };

    function setPage(page: number) {
        const searchParams = new URLSearchParams(params);
        const from = (page - 1) * size;
        searchParams.set("from", from.toString());
        router.push(`${path}?${searchParams.toString()}`);
    }

    return (
        <div className="flex w-full items-center justify-center gap-4 rounded-lg border border-gunmetal/25 p-2 hover:border-gunmetal/50 md:gap-8 dark:border-silver/25 dark:hover:border-silver/50">
            <button onClick={() => setPage(1)} disabled={currentPage === 1} className="text-coal transition-font enabled:hover:text-blue disabled:opacity-25 dark:text-snow">
                <ChevronFirst strokeWidth={1} />
            </button>
            <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1} className="text-coal transition-font enabled:hover:text-blue disabled:opacity-25 dark:text-snow">
                <ChevronLeft strokeWidth={1} />
            </button>
            {pagination(5).map((page) => (
                <div key={page}>
                    {currentPage === page ? (
                        <select value={page} onChange={(e) => setPage(Number(e.target.value))} className="w-12 cursor-pointer appearance-none rounded-md border border-gunmetal/25 bg-transparent text-center text-md font-bold hover:border-gunmetal/50 hover:text-blue dark:border-silver/25 dark:hover:border-silver/50">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page: number) => (
                                <option key={page} value={page} className="bg-snow text-md text-coal dark:bg-coal dark:text-snow">
                                    {page}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <button onClick={() => setPage(page)} className="text-md text-coal transition-font hover:text-blue dark:text-snow">
                            {page}
                        </button>
                    )}
                </div>
            ))}
            <button onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages} className="text-coal transition-font enabled:hover:text-blue disabled:opacity-25 dark:text-snow">
                <ChevronRight strokeWidth={1} />
            </button>
            <button onClick={() => setPage(totalPages)} disabled={currentPage === totalPages} className="text-coal transition-font enabled:hover:text-blue disabled:opacity-25 dark:text-snow">
                <ChevronLast strokeWidth={1} />
            </button>
        </div>
    );
}
