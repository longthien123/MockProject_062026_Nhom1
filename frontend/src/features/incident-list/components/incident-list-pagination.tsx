import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export function IncidentListPagination() {
    return (
        <div className="mt-4 flex flex-col gap-4 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
            <p>Showing 1-6 of 24 incidents</p>

            <Pagination className="mx-0 w-auto">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            text="Prev"
                            className="rounded-none opacity-50"
                        />
                    </PaginationItem>

                    {[1, 2, 3, 4, 5].map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={page === 1}
                                className="rounded-none"
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            text="Next"
                            className="rounded-none"
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}