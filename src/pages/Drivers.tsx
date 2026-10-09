import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
    Plus,
    Upload,
    Download,
    Truck,
    Filter,
    Settings2,
    Table2,
    LayoutGrid,
    List,
} from "lucide-react";
import drivers from "../data/driversData";
import DriverStats from "../components/drivers/DriverState";
import DriverFilter from "../components/drivers/DriverFilter";
import DriverTable from "../components/drivers/DriverTable";
import DriverPagination from "../components/drivers/DriverPagination";
import ScrollReveal from "../components/ScrollReveal";
import DriverCard from "../components/drivers/DriverCard";
import DriverHorizontalCard from "../components/drivers/DriverHorizontalCard";
import DriverDetails from "../components/drivers/DriverDetails";

function Drivers() {
    const navigate = useNavigate();
    const [allDrivers, setAllDrivers] = useState(drivers);

    useEffect(() => {
        const savedDrivers = JSON.parse(
            localStorage.getItem("drivers") || "[]"
        );

        setAllDrivers([...drivers, ...savedDrivers]);
    }, []);

    // Statistics
    const totalDrivers = allDrivers.length;

    const activeDrivers = allDrivers.filter(
        (driver) => driver.status === "Active"
    ).length;

    const onRouteDrivers = allDrivers.filter(
        (driver) => driver.status === "On Route"
    ).length;

    const inactiveDrivers = allDrivers.filter(
        (driver) => driver.status === "Inactive"
    ).length;

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [groupFilter, setGroupFilter] = useState("All");
    const [carrierFilter, setCarrierFilter] = useState("All");
    const [sortBy, setSortBy] = useState("Name");

    const [viewMode, setViewMode] = useState<
        "table" | "grid" | "list"
    >(() => {
        return (
            (localStorage.getItem("driverViewMode") as
                | "table"
                | "grid"
                | "list") || "table"
        );
    });

    useEffect(() => {
        localStorage.setItem("driverViewMode", viewMode);
    }, [viewMode]);

    const [showFilters, setShowFilters] = useState(false);
    const [showColumns, setShowColumns] = useState(false);

    const [settingsPosition, setSettingsPosition] = useState({
        top: 0,
        left: 0,
    });

    useEffect(() => {
        if (!showColumns) return;

        const handlePositionUpdate = () => {
            updateSettingsPosition();
        };

        window.addEventListener("scroll", handlePositionUpdate);
        window.addEventListener("resize", handlePositionUpdate);

        return () => {
            window.removeEventListener("scroll", handlePositionUpdate);
            window.removeEventListener("resize", handlePositionUpdate);
        };
    }, [showColumns]);

    const [visibleColumns, setVisibleColumns] = useState(() => {
        const savedColumns = localStorage.getItem("driverVisibleColumns");

        return savedColumns
            ? JSON.parse(savedColumns)
            : {
                driver: true,
                contact: true,
                driverGroup: true,
                carrier: true,
                status: true,
                currentLocation: true,
                assignedVehicle: true,
            };
    });

    useEffect(() => {
        localStorage.setItem(
            "driverVisibleColumns",
            JSON.stringify(visibleColumns)
        );
    }, [visibleColumns]);

    const updateSettingsPosition = () => {
        if (!settingsButtonRef.current) {
            return;
        }

        const rect = settingsButtonRef.current.getBoundingClientRect();

        setSettingsPosition({
            top: Math.max(rect.bottom + 8, 72),
            left: rect.right - 256,
        });
    };

    const settingsButtonRef = useRef<HTMLButtonElement>(null);

    const filteredDrivers = allDrivers.filter((driver) => {
        const matchesSearch =
            driver.firstName.toLowerCase().includes(search.toLowerCase()) ||
            driver.lastName.toLowerCase().includes(search.toLowerCase()) ||
            driver.email.toLowerCase().includes(search.toLowerCase()) ||
            driver.id.toLowerCase().includes(search.toLowerCase()) ||
            driver.currentLocation
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            driver.assignedVehicle
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            driver.status === statusFilter;

        const matchesGroup =
            groupFilter === "All" ||
            driver.driverGroup === groupFilter;

        const matchesCarrier =
            carrierFilter === "All" ||
            driver.carrier === carrierFilter;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesGroup &&
            matchesCarrier
        );
    });

    const sortedDrivers = [...filteredDrivers].sort((a, b) => {
        if (sortBy === "Name") {
            return `${a.firstName} ${a.lastName}`.localeCompare(
                `${b.firstName} ${b.lastName}`
            );
        }

        if (sortBy === "Newest") {
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
        }

        if (sortBy === "Oldest") {
            return (
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            );
        }

        return 0;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const totalRecords = sortedDrivers.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const currentDrivers = sortedDrivers.slice(startIndex, endIndex);

    const handleDeleteDriver = (driverId: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this driver?"
        );

        if (!confirmDelete) {
            return;
        }

        const savedDrivers = JSON.parse(
            localStorage.getItem("drivers") || "[]"
        );

        const updatedDrivers = savedDrivers.filter(
            (driver: any) => driver.id !== driverId
        );

        localStorage.setItem(
            "drivers",
            JSON.stringify(updatedDrivers)
        );

        setAllDrivers(
            allDrivers.filter((driver) => driver.id !== driverId)
        );
    };

    const primaryColor =
        localStorage.getItem("primaryColor") || "#111827";

    const [selectedDriver, setSelectedDriver] = useState<
        typeof import("../data/driversData").default[number] | null
    >(null);

    return (
        <div className="w-full min-w-0">
            {/* Page Header */}
            <div
                className="slide-up flex flex-col gap-5 pb-6 mb-4 border-b border-gray-200 lg:flex-row lg:items-end lg:justify-between"
            >
                {/* Left Side */}
                <div>
                    {/* Title */}
                    <div className="flex items-center gap-3">
                        <Truck size={28} className="text-gray-700" />

                        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                            Drivers
                        </h1>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 mt-2">
                        Manage, monitor and track your drivers
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* View Mode */}
                    <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1">
                        <button
                            type="button"
                            onClick={() => setViewMode("table")}
                            style={
                                viewMode === "table"
                                    ? {
                                        backgroundColor: primaryColor,
                                        color: "white",
                                    }
                                    : undefined
                            }
                            className={`rounded-md p-2 transition ${viewMode === "table"
                                    ? ""
                                    : "text-gray-500 hover:bg-gray-100"
                                }`}
                            aria-label="Table view"
                        >
                            <Table2 size={18} />
                        </button>

                        <button
                            type="button"
                            onClick={() => setViewMode("grid")}
                            style={
                                viewMode === "grid"
                                    ? {
                                        backgroundColor: primaryColor,
                                        color: "white",
                                    }
                                    : undefined
                            }
                            className={`rounded-md p-2 transition ${viewMode === "grid"
                                    ? ""
                                    : "text-gray-500 hover:bg-gray-100"
                                }`}
                            aria-label="Grid view"
                        >
                            <LayoutGrid size={18} />
                        </button>

                        <button
                            type="button"
                            onClick={() => setViewMode("list")}
                            style={
                                viewMode === "list"
                                    ? {
                                        backgroundColor: primaryColor,
                                        color: "white",
                                    }
                                    : undefined
                            }
                            className={`rounded-md p-2 transition ${viewMode === "list"
                                    ? ""
                                    : "text-gray-500 hover:bg-gray-100"
                                }`}
                            aria-label="List view"
                        >
                            <List size={18} />
                        </button>
                    </div>
                    {/* Add Driver */}
                    <button
                        onClick={() => navigate("/drivers/add")}
                        style={{
                            backgroundColor: "var(--primary-color)",
                        }}
                        className="flex items-center gap-2 rounded-lg
    px-4 py-2.5
    text-sm font-medium text-white
    transition"
                    >
                        <Plus size={17} />
                        <span className="hidden sm:inline">
                            Add Driver
                        </span>
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div
                className="slide-up"
                style={{ animationDelay: "100ms" }}
            >
                <div className="relative z-[100] mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <DriverStats
                        totalDrivers={totalDrivers}
                        activeDrivers={activeDrivers}
                        onRouteDrivers={onRouteDrivers}
                        inactiveDrivers={inactiveDrivers}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                    />

                    <div className="flex items-center gap-2">

                        {/* Filters */}
                        <button
                            onClick={() =>
                                setShowFilters(!showFilters)
                            }
                            className={`flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition ${showFilters
                                    ? "border-(--primary-color) text-white"
                                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                            style={
                                showFilters
                                    ? {
                                        backgroundColor:
                                            "var(--primary-color)",
                                    }
                                    : undefined
                            }
                        >
                            <Filter size={16} />
                            Filters
                        </button>

                        {/* Display Settings */}
                        <div className="relative">
                            <button
                                ref={settingsButtonRef}
                                onClick={() => {
                                    if (!showColumns) {
                                        updateSettingsPosition();
                                    }

                                    setShowColumns(!showColumns);
                                }}
                                className={`flex h-10 items-center justify-center rounded-lg border px-3 transition ${showColumns
                                        ? "border-(--primary-color) text-white"
                                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                style={
                                    showColumns
                                        ? {
                                            backgroundColor:
                                                "var(--primary-color)",
                                        }
                                        : undefined
                                }
                                aria-label="Display settings"
                            >
                                <Settings2 size={16} />
                            </button>

                            {showColumns &&
                                settingsButtonRef.current &&
                                createPortal(
                                    <div
                                        className="fixed z-[9999] w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl"
                                        style={{
                                            top: settingsPosition.top,
                                            left: settingsPosition.left,
                                        }}
                                    >
                                        <div className="mb-3">
                                            <h3 className="text-sm font-semibold text-gray-900">
                                                Display Settings
                                            </h3>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Choose the information you want to display.
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-3 text-sm text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        visibleColumns.driver
                                                    }
                                                    onChange={() =>
                                                        setVisibleColumns({
                                                            ...visibleColumns,
                                                            driver: !visibleColumns.driver,
                                                        })
                                                    }
                                                />
                                                Driver
                                            </label>

                                            <label className="flex items-center gap-3 text-sm text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        visibleColumns.contact
                                                    }
                                                    onChange={() =>
                                                        setVisibleColumns({
                                                            ...visibleColumns,
                                                            contact: !visibleColumns.contact,
                                                        })
                                                    }
                                                />
                                                Contact
                                            </label>

                                            <label className="flex items-center gap-3 text-sm text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        visibleColumns.driverGroup
                                                    }
                                                    onChange={() =>
                                                        setVisibleColumns({
                                                            ...visibleColumns,
                                                            driverGroup:
                                                                !visibleColumns.driverGroup,
                                                        })
                                                    }
                                                />
                                                Driver Group
                                            </label>

                                            <label className="flex items-center gap-3 text-sm text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        visibleColumns.carrier
                                                    }
                                                    onChange={() =>
                                                        setVisibleColumns({
                                                            ...visibleColumns,
                                                            carrier:
                                                                !visibleColumns.carrier,
                                                        })
                                                    }
                                                />
                                                Carrier
                                            </label>

                                            <label className="flex items-center gap-3 text-sm text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        visibleColumns.status
                                                    }
                                                    onChange={() =>
                                                        setVisibleColumns({
                                                            ...visibleColumns,
                                                            status:
                                                                !visibleColumns.status,
                                                        })
                                                    }
                                                />
                                                Status
                                            </label>

                                            <label className="flex items-center gap-3 text-sm text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        visibleColumns.currentLocation
                                                    }
                                                    onChange={() =>
                                                        setVisibleColumns({
                                                            ...visibleColumns,
                                                            currentLocation:
                                                                !visibleColumns.currentLocation,
                                                        })
                                                    }
                                                />
                                                Current Location
                                            </label>

                                            <label className="flex items-center gap-3 text-sm text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        visibleColumns.assignedVehicle
                                                    }
                                                    onChange={() =>
                                                        setVisibleColumns({
                                                            ...visibleColumns,
                                                            assignedVehicle:
                                                                !visibleColumns.assignedVehicle,
                                                        })
                                                    }
                                                />
                                                Assigned Vehicle
                                            </label>
                                        </div>
                                    </div>,
                                    document.body
                                )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div
                className="relative z-0 slide-up"
                style={{ animationDelay: "200ms" }}
            >
                {showFilters && (
                    <DriverFilter
                        search={search}
                        setSearch={setSearch}
                        groupFilter={groupFilter}
                        setGroupFilter={setGroupFilter}
                        carrierFilter={carrierFilter}
                        setCarrierFilter={setCarrierFilter}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                )}
            </div>

            {/* Drivers Table */}
            <ScrollReveal>
                {viewMode === "table" ? (
                    <DriverTable
                        drivers={currentDrivers}
                        onDelete={handleDeleteDriver}
                        onRowClick={(driver) =>
                            setSelectedDriver(driver)
                        }
                        visibleColumns={visibleColumns}
                    />
                ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {currentDrivers.map((driver) => (
                            <DriverCard
                                key={driver.id}
                                driver={driver}
                                visibleColumns={visibleColumns}
                                onDelete={handleDeleteDriver}
                                onRowClick={setSelectedDriver}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {currentDrivers.map((driver) => (
                            <DriverHorizontalCard
                                key={driver.id}
                                driver={driver}
                                visibleColumns={visibleColumns}
                                onDelete={handleDeleteDriver}
                                onRowClick={setSelectedDriver}
                            />
                        ))}
                    </div>
                )}
            </ScrollReveal>

            {/* Pagination */}
            <ScrollReveal>
                <DriverPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRecords={totalRecords}
                    recordsPerPage={recordsPerPage}
                    setCurrentPage={setCurrentPage}
                />
            </ScrollReveal>

            {selectedDriver && (
                <DriverDetails
                    driver={selectedDriver}
                    onClose={() => setSelectedDriver(null)}
                />
            )}
        </div>
    );
}

export default Drivers;