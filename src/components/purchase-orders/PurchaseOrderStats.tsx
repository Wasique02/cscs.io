type PurchaseOrderStatsProps = {
    totalOrders: number;
    pendingOrders: number;
    approvedOrders: number;
    inProgressOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
};

function PurchaseOrderStats({
    totalOrders,
    pendingOrders,
    approvedOrders,
    inProgressOrders,
    completedOrders,
    cancelledOrders,
    statusFilter,
    setStatusFilter,
}: PurchaseOrderStatsProps) {

    return (
        <div className="w-full min-w-0 overflow-x-auto custom-scrollbar">

            <div className="flex w-max min-w-full items-center gap-2">

                {/* All */}
                <button
                    type="button"
                    onClick={() => setStatusFilter("All")}
                    className={`shrink-0 whitespace-nowrap rounded-lg border px-3.5 py-2.5 text-sm font-medium transition sm:px-4 ${
                        statusFilter === "All"
                            ? "border-transparent text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                    style={
                        statusFilter === "All"
                            ? {
                                  backgroundColor:
                                      "var(--primary-color)",
                              }
                            : undefined
                    }
                >
                    All {totalOrders}
                </button>

                {/* Pending */}
                <button
                    type="button"
                    onClick={() => setStatusFilter("Pending")}
                    className={`shrink-0 whitespace-nowrap rounded-lg border px-3.5 py-2.5 text-sm font-medium transition sm:px-4 ${
                        statusFilter === "Pending"
                            ? "border-transparent text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                    style={
                        statusFilter === "Pending"
                            ? {
                                  backgroundColor:
                                      "var(--primary-color)",
                              }
                            : undefined
                    }
                >
                    Pending {pendingOrders}
                </button>

                {/* Approved */}
                <button
                    type="button"
                    onClick={() => setStatusFilter("Approved")}
                    className={`shrink-0 whitespace-nowrap rounded-lg border px-3.5 py-2.5 text-sm font-medium transition sm:px-4 ${
                        statusFilter === "Approved"
                            ? "border-transparent text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                    style={
                        statusFilter === "Approved"
                            ? {
                                  backgroundColor:
                                      "var(--primary-color)",
                              }
                            : undefined
                    }
                >
                    Approved {approvedOrders}
                </button>

                {/* In Progress */}
                <button
                    type="button"
                    onClick={() => setStatusFilter("In Progress")}
                    className={`shrink-0 whitespace-nowrap rounded-lg border px-3.5 py-2.5 text-sm font-medium transition sm:px-4 ${
                        statusFilter === "In Progress"
                            ? "border-transparent text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                    style={
                        statusFilter === "In Progress"
                            ? {
                                  backgroundColor:
                                      "var(--primary-color)",
                              }
                            : undefined
                    }
                >
                    In Progress {inProgressOrders}
                </button>

                {/* Completed */}
                <button
                    type="button"
                    onClick={() => setStatusFilter("Completed")}
                    className={`shrink-0 whitespace-nowrap rounded-lg border px-3.5 py-2.5 text-sm font-medium transition sm:px-4 ${
                        statusFilter === "Completed"
                            ? "border-transparent text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                    style={
                        statusFilter === "Completed"
                            ? {
                                  backgroundColor:
                                      "var(--primary-color)",
                              }
                            : undefined
                    }
                >
                    Completed {completedOrders}
                </button>

                {/* Cancelled */}
                <button
                    type="button"
                    onClick={() => setStatusFilter("Cancelled")}
                    className={`shrink-0 whitespace-nowrap rounded-lg border px-3.5 py-2.5 text-sm font-medium transition sm:px-4 ${
                        statusFilter === "Cancelled"
                            ? "border-transparent text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                    style={
                        statusFilter === "Cancelled"
                            ? {
                                  backgroundColor:
                                      "var(--primary-color)",
                              }
                            : undefined
                    }
                >
                    Cancelled {cancelledOrders}
                </button>

            </div>

        </div>
    );
}

export default PurchaseOrderStats;