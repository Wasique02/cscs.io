import { useNavigate } from "react-router-dom";
import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    Truck,
    Pencil,
    Trash2,
} from "lucide-react";

type DriverHorizontalCardProps = {
    driver: typeof import("../../data/driversData").default[number];

    visibleColumns: {
        driver: boolean;
        contact: boolean;
        driverGroup: boolean;
        carrier: boolean;
        status: boolean;
        currentLocation: boolean;
        assignedVehicle: boolean;
    };

    onDelete: (driverId: string) => void;

    onRowClick: (
        driver: typeof import("../../data/driversData").default[number]
    ) => void;
};

const DriverHorizontalCard = ({
    driver,
    visibleColumns,
    onDelete,
    onRowClick,
}: DriverHorizontalCardProps) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => onRowClick(driver)}
            className={`w-full min-w-0 cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 ${
                driver.status === "Active"
                    ? "shadow-[inset_0_0_30px_rgba(34,197,94,0.30)]"
                    : driver.status === "On Route"
                        ? "shadow-[inset_0_0_30px_rgba(245,158,11,0.30)]"
                        : driver.status === "Suspended"
                            ? "shadow-[inset_0_0_30px_rgba(239,68,68,0.30)]"
                            : "shadow-[inset_0_0_30px_rgba(156,163,175,0.30)]"
            }`}
        >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-5">

                {/* Driver */}
                {visibleColumns.driver && (
                    <div className="flex min-w-[220px] flex-1 items-center gap-3">
                        <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                            style={{
                                backgroundColor:
                                    "color-mix(in srgb, var(--primary-color) 10%, white)",
                                color: "var(--primary-color)",
                            }}
                        >
                            {driver.firstName.charAt(0)}
                            {driver.lastName.charAt(0)}
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-800">
                                {driver.firstName} {driver.lastName}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                {driver.id}
                            </p>
                        </div>
                    </div>
                )}

                {/* Status */}
                {visibleColumns.status && (
                    <div className="min-w-[120px]">
                        <p className="mb-1 text-xs text-gray-400">
                            Status
                        </p>

                        <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                                driver.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : driver.status === "On Route"
                                        ? "bg-amber-100 text-amber-700"
                                        : "bg-gray-100 text-gray-600"
                            }`}
                        >
                            <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                    driver.status === "Active"
                                        ? "bg-green-500"
                                        : driver.status === "On Route"
                                            ? "bg-amber-500"
                                            : "bg-gray-400"
                                }`}
                            />

                            {driver.status}
                        </span>
                    </div>
                )}

                {/* Contact */}
                {visibleColumns.contact && (
                    <div className="min-w-[220px] flex-1">
                        <p className="mb-1 text-xs text-gray-400">
                            Contact
                        </p>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Mail
                                    size={13}
                                    className="shrink-0 text-gray-400"
                                />

                                <span className="truncate text-xs text-gray-700">
                                    {driver.email}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Phone
                                    size={13}
                                    className="shrink-0 text-gray-400"
                                />

                                <span className="text-xs text-gray-500">
                                    {driver.phone}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Driver Group */}
                {visibleColumns.driverGroup && (
                    <div className="min-w-[120px]">
                        <p className="text-xs text-gray-400">
                            Driver Group
                        </p>

                        <p className="mt-1 truncate text-sm font-medium text-gray-700">
                            {driver.driverGroup}
                        </p>
                    </div>
                )}

                {/* Carrier */}
                {visibleColumns.carrier && (
                    <div className="min-w-[120px]">
                        <p className="text-xs text-gray-400">
                            Carrier
                        </p>

                        <p className="mt-1 truncate text-sm font-medium text-gray-700">
                            {driver.carrier}
                        </p>
                    </div>
                )}

                {/* Location */}
                {visibleColumns.currentLocation && (
                    <div className="min-w-[180px] flex-1">
                        <p className="text-xs text-gray-400">
                            Current Location
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                            <MapPin
                                size={14}
                                className="shrink-0"
                                style={{
                                    color: "var(--primary-color)",
                                }}
                            />

                            <p className="truncate text-sm font-medium text-gray-700">
                                {driver.currentLocation}
                            </p>
                        </div>
                    </div>
                )}

                {/* Vehicle */}
                {visibleColumns.assignedVehicle && (
                    <div className="min-w-[150px]">
                        <p className="text-xs text-gray-400">
                            Assigned Vehicle
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                            <Truck
                                size={14}
                                className="shrink-0"
                                style={{
                                    color: "var(--primary-color)",
                                }}
                            />

                            <p className="truncate text-sm font-medium text-gray-700">
                                {driver.assignedVehicle}
                            </p>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div
                    className="flex shrink-0 items-center gap-2"
                    onClick={(event) =>
                        event.stopPropagation()
                    }
                >
                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                `/drivers/${driver.id}/edit`
                            )
                        }
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-gray-200
                            text-gray-600
                            transition
                            hover:bg-gray-50
                        "
                        title="Edit"
                    >
                        <Pencil size={15} />
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            onDelete(driver.id)
                        }
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-red-200
                            text-red-600
                            transition
                            hover:bg-red-50
                        "
                        title="Delete"
                    >
                        <Trash2 size={15} />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DriverHorizontalCard;