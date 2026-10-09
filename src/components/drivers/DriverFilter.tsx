import { Search } from "lucide-react";

type DriverFiltersProps = {
    search: string;
    setSearch: (value: string) => void;
    groupFilter: string;
    setGroupFilter: (value: string) => void;
    carrierFilter: string;
    setCarrierFilter: (value: string) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
};

function DriverFilter({
    search,
    setSearch,
    groupFilter,
    setGroupFilter,
    carrierFilter,
    setCarrierFilter,
    sortBy,
    setSortBy,
}: DriverFiltersProps) {

    return (
        <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4">

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-[minmax(280px,1fr)_auto_auto_auto_auto_auto] lg:items-center">

                <div className="relative col-span-2 w-full lg:flex-1">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{
                            color: "var(--primary-color)",
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Search drivers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-10 w-full rounded-lg border border-gray-200
bg-white px-3 pl-10 text-sm text-gray-700
outline-none transition
placeholder:text-gray-400
focus:border-(--primary-color)
focus:ring-2 focus:ring-(--primary-color)/10"
                    />
                </div>

                {/* Driver Group */}
                <select
                    value={groupFilter}
                    onChange={(e) => setGroupFilter(e.target.value)}
                    className="h-10 w-full rounded-lg border border-gray-200
bg-white px-3 text-sm text-gray-700
outline-none transition
focus:border-(--primary-color)
focus:ring-2 focus:ring-(--primary-color)/10
lg:w-auto lg:min-w-40"
                >
                    <option value="All">All Groups</option>
                    <option value="West Coast Haulers">
                        West Coast Haulers
                    </option>
                    <option value="East Coast Haulers">
                        East Coast Haulers
                    </option>
                    <option value="Central Haulers">
                        Central Haulers
                    </option>
                </select>

                {/* Carrier */}
                <select
                    value={carrierFilter}
                    onChange={(e) => setCarrierFilter(e.target.value)}
                    className="h-10 w-full rounded-lg border border-gray-200
bg-white px-3 text-sm text-gray-700
outline-none transition
focus:border-(--primary-color)
focus:ring-2 focus:ring-(--primary-color)/10
lg:w-auto lg:min-w-40"
                >
                    <option value="All">All Carriers</option>
                    <option value="Prime Logistics">
                        Prime Logistics
                    </option>
                    <option value="Global Transport">
                        Global Transport
                    </option>
                </select>


                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-10 w-full rounded-lg border border-gray-200
bg-white px-3 text-sm text-gray-700
outline-none transition
focus:border-(--primary-color)
focus:ring-2 focus:ring-(--primary-color)/10
lg:w-auto lg:min-w-32"
                >
                    <option value="Name">Name</option>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                </select>


                {/* Reset */}
                <button
                    onClick={() => {
                        setSearch("");
                        setGroupFilter("All");
                        setCarrierFilter("All");
                        setSortBy("Name");
                    }}
                    className="h-10 w-full rounded-lg border border-gray-200
    bg-white px-4 text-sm font-medium text-gray-600
    outline-none transition
    hover:bg-gray-100 hover:text-gray-900
    focus:border-(--primary-color)
    focus:ring-2 focus:ring-(--primary-color)/10
    lg:w-auto"
                >
                    Reset
                </button>

            </div>

        </div >
    );
}

export default DriverFilter;