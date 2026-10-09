import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Mail,
    Phone,
    MapPin,
    Truck,
    Pencil,
    Trash2,
    MoreHorizontal,
} from "lucide-react";

type DriverCardProps = {
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

const DriverCard = ({
    driver,
    visibleColumns,
    onDelete,
    onRowClick,
}: DriverCardProps) => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            onClick={() => onRowClick(driver)}
            className={`cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 ${
                driver.status === "Active"
                    ? "shadow-[inset_0_0_30px_rgba(34,197,94,0.30)]"
                    : driver.status === "On Route"
                        ? "shadow-[inset_0_0_30px_rgba(245,158,11,0.30)]"
                        : driver.status === "Suspended"
                            ? "shadow-[inset_0_0_30px_rgba(239,68,68,0.30)]"
                            : "shadow-[inset_0_0_30px_rgba(156,163,175,0.30)]"
            }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between gap-3">

                {/* Avatar + Driver Info */}
                {visibleColumns.driver && (
                    <div className="flex min-w-0 items-center gap-3">

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
                    <span
                        className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
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
                )}

            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-100" />

            {/* Contact */}
            {visibleColumns.contact && (
                <div className="space-y-2">

                    <div className="flex items-center gap-2">
                        <Mail
                            size={14}
                            className="shrink-0 text-gray-400"
                        />

                        <span className="truncate text-sm text-gray-700">
                            {driver.email}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Phone
                            size={14}
                            className="shrink-0 text-gray-400"
                        />

                        <span className="text-sm text-gray-500">
                            {driver.phone}
                        </span>
                    </div>

                </div>
            )}

            {/* Driver Group + Carrier */}
            <div className="mt-4 grid grid-cols-2 gap-4">

                {visibleColumns.driverGroup && (
                    <div className="min-w-0">
                        <p className="text-xs text-gray-400">
                            Driver Group
                        </p>

                        <p className="mt-1 truncate text-sm font-medium text-gray-700">
                            {driver.driverGroup}
                        </p>
                    </div>
                )}

                {visibleColumns.carrier && (
                    <div className="min-w-0">
                        <p className="text-xs text-gray-400">
                            Carrier
                        </p>

                        <p className="mt-1 truncate text-sm font-medium text-gray-700">
                            {driver.carrier}
                        </p>
                    </div>
                )}

            </div>

            {/* Current Location */}
            {visibleColumns.currentLocation && (
                <div className="mt-4 flex items-center gap-2">

                    <MapPin
                        size={15}
                        className="shrink-0"
                        style={{
                            color: "var(--primary-color)",
                        }}
                    />

                    <div className="min-w-0">
                        <p className="text-xs text-gray-400">
                            Current Location
                        </p>

                        <p className="mt-1 truncate text-sm font-medium text-gray-700">
                            {driver.currentLocation}
                        </p>
                    </div>

                </div>
            )}

            {/* Assigned Vehicle */}
            {visibleColumns.assignedVehicle && (
                <div className="mt-4 flex items-center gap-2">

                    <Truck
                        size={15}
                        className="shrink-0"
                        style={{
                            color: "var(--primary-color)",
                        }}
                    />

                    <div className="min-w-0">
                        <p className="text-xs text-gray-400">
                            Assigned Vehicle
                        </p>

                        <p className="mt-1 truncate text-sm font-medium text-gray-700">
                            {driver.assignedVehicle}
                        </p>
                    </div>

                </div>
            )}

            {/* Actions */}
            <div
                className="mt-4 border-t border-gray-100 pt-4"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="flex items-center gap-2">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                `/drivers/${driver.id}/edit`
                            )
                        }
                        className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            gap-2
                            rounded-lg
                            border
                            border-gray-200
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-gray-700
                            transition
                            hover:bg-gray-50
                        "
                    >
                        <Pencil size={15} />
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            onDelete(driver.id)
                        }
                        className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            gap-2
                            rounded-lg
                            border
                            border-red-200
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-red-600
                            transition
                            hover:bg-red-50
                        "
                    >
                        <Trash2 size={15} />
                        Delete
                    </button>

                </div>
            </div>

        </div>
    );
};

export default DriverCard;