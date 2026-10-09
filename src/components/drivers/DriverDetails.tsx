import {
    Mail,
    Phone,
    MapPin,
    Truck,
} from "lucide-react";

type DriverDetailsProps = {
    driver: typeof import("../../data/driversData").default[number];
    onClose: () => void;
};

const DriverDetails = ({
    driver,
    onClose,
}: DriverDetailsProps) => {
    return (
        <div>
            <div className="fixed inset-0 z-50">
                {/* Background overlay */}
                <div
                    onClick={onClose}
                    className="absolute inset-0 bg-black/30"
                />

                {/* Drawer */}
                <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
                    <div className="flex items-center justify-between border-b border-gray-200 p-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Driver Details
                        </h2>

                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="min-h-0 flex-1 overflow-y-auto">
                        <div className="border-b border-gray-200 p-5">
                            <div className="flex items-center gap-4">
                                <div
                                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold"
                                    style={{
                                        backgroundColor:
                                            "color-mix(in srgb, var(--primary-color) 10%, white)",
                                        color: "var(--primary-color)",
                                    }}
                                >
                                    {driver.firstName.charAt(0)}
                                    {driver.lastName.charAt(0)}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate text-base font-semibold text-gray-800">
                                        {driver.firstName} {driver.lastName}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {driver.id}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-200 p-5">
                            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                                Status
                            </p>

                            <span
                                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${driver.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : driver.status === "On Route"
                                        ? "bg-amber-100 text-amber-700"
                                        : driver.status === "Suspended"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                <span
                                    className={`h-2 w-2 rounded-full ${driver.status === "Active"
                                        ? "bg-green-500"
                                        : driver.status === "On Route"
                                            ? "bg-amber-500"
                                            : driver.status === "Suspended"
                                                ? "bg-red-500"
                                                : "bg-gray-400"
                                        }`}
                                />

                                {driver.status}
                            </span>
                        </div>

                        <div className="border-b border-gray-200 p-5">
                            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
                                Contact Information
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                        <Mail size={16} className="text-gray-500" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400">
                                            Email
                                        </p>

                                        <p className="mt-1 truncate text-sm font-medium text-gray-700">
                                            {driver.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                        <Phone size={16} className="text-gray-500" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Phone
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-gray-700">
                                            {driver.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-200 p-5">
                            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
                                Driver Information
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-400">
                                        Driver Group
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-700">
                                        {driver.driverGroup}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Carrier
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-700">
                                        {driver.carrier}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-200 p-5">
                            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
                                Current Location
                            </p>

                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                    style={{
                                        backgroundColor:
                                            "color-mix(in srgb, var(--primary-color) 10%, white)",
                                    }}
                                >
                                    <MapPin
                                        size={17}
                                        style={{ color: "var(--primary-color)" }}
                                    />
                                </div>

                                <p className="text-sm font-medium text-gray-700">
                                    {driver.currentLocation}
                                </p>
                            </div>
                        </div>

                        <div className="border-b border-gray-200 p-5">
                            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
                                Assigned Vehicle
                            </p>

                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                    style={{
                                        backgroundColor:
                                            "color-mix(in srgb, var(--primary-color) 10%, white)",
                                    }}
                                >
                                    <Truck
                                        size={17}
                                        style={{ color: "var(--primary-color)" }}
                                    />
                                </div>

                                <p className="text-sm font-medium text-gray-700">
                                    {driver.assignedVehicle}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverDetails;