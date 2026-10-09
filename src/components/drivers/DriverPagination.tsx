type DriverPaginationProps = {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    recordsPerPage: number;
    setCurrentPage: (page: number) => void;
};

function DriverPagination({
    currentPage,
    totalPages,
    totalRecords,
    recordsPerPage,
    setCurrentPage,
}: DriverPaginationProps) {

    const startRecord =
        totalRecords === 0
            ? 0
            : (currentPage - 1) * recordsPerPage + 1;

    const endRecord =
        Math.min(currentPage * recordsPerPage, totalRecords);

    return (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">

            {/* Record Count */}
            <p className="text-sm text-gray-500">
                Showing {startRecord} - {endRecord} of {totalRecords} records
            </p>


            {/* Pagination */}
            <div className="flex items-center gap-1">

                {/* Previous */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm
                    text-gray-600 hover:bg-gray-50
                    disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Previous
                </button>


                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => {

                    const page = index + 1;

                    return (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            style={
                                currentPage === page
                                    ? {
                                        backgroundColor: "var(--primary-color)",
                                    }
                                    : undefined
                            }
                            className={`rounded-lg px-3 py-1.5 text-sm transition-all duration-200 ${currentPage === page
                                    ? "text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}


                {/* Next */}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm
                    text-gray-600 hover:bg-gray-50
                    disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Next
                </button>

            </div>

        </div>
    );
}

export default DriverPagination;