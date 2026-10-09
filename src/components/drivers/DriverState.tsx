type DriverStatsProps = {
    totalDrivers: number;
    activeDrivers: number;
    onRouteDrivers: number;
    inactiveDrivers: number;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
};

function DriverStats({
    totalDrivers,
    activeDrivers,
    onRouteDrivers,
    inactiveDrivers,
    statusFilter,
    setStatusFilter,
}: DriverStatsProps) {

    return (
        <div className="flex items-center gap-2">
            {/* All */}
            <button
                onClick={() => setStatusFilter("All")}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${statusFilter === "All"
                        ? "border-transparent text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                style={
                    statusFilter === "All"
                        ? { backgroundColor: "var(--primary-color)" }
                        : undefined
                }
            >
                All {totalDrivers}
            </button>

            {/* Available */}
            <button
                onClick={() => setStatusFilter("Active")}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${statusFilter === "Active"
                        ? "border-transparent text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                style={
                    statusFilter === "Active"
                        ? { backgroundColor: "var(--primary-color)" }
                        : undefined
                }
            >
                Available {activeDrivers}
            </button>

            {/* On Route */}
            <button
                onClick={() => setStatusFilter("On Route")}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${statusFilter === "On Route"
                        ? "border-transparent text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                style={
                    statusFilter === "On Route"
                        ? { backgroundColor: "var(--primary-color)" }
                        : undefined
                }
            >
                On Route {onRouteDrivers}
            </button>

            {/* Attention */}
            <button
                onClick={() => setStatusFilter("Inactive")}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${statusFilter === "Inactive"
                        ? "border-transparent text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                style={
                    statusFilter === "Inactive"
                        ? { backgroundColor: "var(--primary-color)" }
                        : undefined
                }
            >
                Attention {inactiveDrivers}
            </button>
        </div>
    );
}

export default DriverStats;