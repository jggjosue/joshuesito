interface iAppProps {
    totalPages: number;
    currentPage: number;
    basePath: string;
}

export function Pagination({ totalPages, currentPage, basePath }: iAppProps) {
    const prevPage = currentPage - 1 > 0;
    const nextPage = currentPage + 1 <= totalPages;

    return (
        <div className="flex items-center justify-center mt-8 sm:mt-10">
            <div className="flex items-center gap-x-4">
                {prevPage ? (
                    <a
                        href={`${basePath}?page=${currentPage - 1}`}
                        className="flex items-center gap-x-2 rounded-md border bg-card px-3 sm:px-4 py-2 text-sm font-medium hover:bg-accent"
                    >
                        <p>Previous</p>
                    </a>
                ) : (
                    <div className="flex items-center gap-x-2 rounded-md border border-gray-300 bg-gray-100 px-3 sm:px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed">
                        <p>Previous</p>
                    </div>
                )}

                <p className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                </p>

                {nextPage ? (
                    <a
                        href={`${basePath}?page=${currentPage + 1}`}
                        className="flex items-center gap-x-2 rounded-md border bg-card px-3 sm:px-4 py-2 text-sm font-medium hover:bg-accent"
                    >
                        <p>Next</p>
                    </a>
                ) : (
                    <div className="flex items-center gap-x-2 rounded-md border border-gray-300 bg-gray-100 px-3 sm:px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed">
                        <p>Next</p>
                    </div>
                )}
            </div>
        </div>
    );
}
