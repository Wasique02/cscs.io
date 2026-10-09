import {
    Pencil,
    Trash2,
    MoreVertical,
    Mail,
    Phone,
    MapPin,
    Truck
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type DriverTableProps = {
    drivers: typeof import("../../data/driversData").default;
    onDelete: (driverId: string) => void;

    onRowClick: (
        driver: typeof import("../../data/driversData").default[number]
    ) => void;

    visibleColumns: {
        driver: boolean;
        contact: boolean;
        driverGroup: boolean;
        carrier: boolean;
        status: boolean;
        currentLocation: boolean;
        assignedVehicle: boolean;
    };
};

function DriverTable({
    drivers,
    onDelete,
    onRowClick,
    visibleColumns,
}: DriverTableProps) {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    return (
        <div className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="w-full overflow-x-auto custom-scrollbar">
                <table className="min-w-275 w-full">

                    {/* Table Header */}
                    <thead className="bg-gray-50 border-b border-gray-200">

                        <tr>
                            {visibleColumns.driver && (
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Driver
                                </th>
                            )}

                            {visibleColumns.contact && (
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Contact
                                </th>
                            )}

                            {visibleColumns.driverGroup && (
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Driver Group
                                </th>
                            )}

                            {visibleColumns.carrier && (
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Carrier
                                </th>
                            )}

                            {visibleColumns.status && (
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Status
                                </th>
                            )}

                            {visibleColumns.currentLocation && (
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Current Location
                                </th>
                            )}

                            {visibleColumns.assignedVehicle && (
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    Assigned Vehicle
                                </th>
                            )}

                            <th
                                className="sticky right-0 z-20 text-sm
    w-20 min-w-20
    sm:w-auto sm:min-w-0
    border-l border-gray-200
    bg-gray-50
    px-4 py-3
    text-left font-semibold text-gray-600
    whitespace-nowrap
    shadow-[-4px_0_6px_-6px_rgba(0,0,0,0.25)]"
                            >
                                Actions
                            </th>

                        </tr>

                    </thead>


                    {/* Table Body */}
                    <tbody>

                        {drivers.map((driver) => (

                            <tr
                                key={driver.id}
                                onClick={() => onRowClick(driver)}
                                className="cursor-pointer border-b border-gray-100 transition hover:bg-gray-50"
                            >

                                {/* Driver */}
                                {visibleColumns.driver && (
                                    <td className="px-4 py-4 whitespace-nowrap">

                                        <div className="flex items-center gap-3">

                                            {/* Avatar */}
                                            <div
                                                className="flex h-9 w-9 shrink-0 items-center
    justify-center rounded-full
    text-sm font-semibold"
                                                style={{
                                                    backgroundColor:
                                                        "color-mix(in srgb, var(--primary-color) 10%, white)",
                                                    color: "var(--primary-color)",
                                                }}
                                            >
                                                {driver.firstName.charAt(0)}
                                                {driver.lastName.charAt(0)}
                                            </div>

                                            {/* Driver Info */}
                                            <div className="min-w-0">

                                                <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
                                                    {driver.firstName} {driver.lastName}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500 whitespace-nowrap">
                                                    {driver.id}
                                                </p>

                                            </div>

                                        </div>

                                    </td>
                                )}


                                {/* Contact */}
                                {visibleColumns.contact && (
                                    <td className="px-4 py-4 whitespace-nowrap">

                                        <div className="space-y-1.5">

                                            {/* Email */}
                                            <div className="flex items-center gap-2">

                                                <Mail
                                                    size={14}
                                                    className="shrink-0 text-gray-400"
                                                />

                                                <span className="text-sm text-gray-700 whitespace-nowrap">
                                                    {driver.email}
                                                </span>

                                            </div>


                                            {/* Phone */}
                                            <div className="flex items-center gap-2">

                                                <Phone
                                                    size={14}
                                                    className="shrink-0 text-gray-400"
                                                />

                                                <span className="text-sm text-gray-500 whitespace-nowrap">
                                                    {driver.phone}
                                                </span>

                                            </div>

                                        </div>

                                    </td>
                                )}


                                {/* Driver Group */}
                                {visibleColumns.driverGroup && (
                                    <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                                        {driver.driverGroup}
                                    </td>
                                )}


                                {/* Carrier */}
                                {visibleColumns.carrier && (
                                    <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                                        {driver.carrier}
                                    </td>
                                )}


                                {/* Status */}
                                {visibleColumns.status && (
                                    <td className="px-4 py-4 whitespace-nowrap">

                                        <span
                                            className={`inline-flex items-center gap-2
                    rounded-full px-3 py-1 text-sm font-medium
                    ${driver.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : driver.status === "On Route"
                                                        ? "bg-amber-100 text-amber-700"
                                                        : driver.status === "Inactive"
                                                            ? "bg-gray-100 text-gray-600"
                                                            : "bg-red-100 text-red-700"
                                                }`}
                                        >

                                            <span
                                                className={`h-1.5 w-1.5 shrink-0 rounded-full
                        ${driver.status === "Active"
                                                        ? "bg-green-500"
                                                        : driver.status === "On Route"
                                                            ? "bg-amber-500"
                                                            : driver.status === "Inactive"
                                                                ? "bg-gray-400"
                                                                : "bg-red-500"
                                                    }`}
                                            />

                                            {driver.status}

                                        </span>

                                    </td>
                                )}


                                {/* Current Location */}
                                {visibleColumns.currentLocation && (
                                    <td className="px-4 py-4 whitespace-nowrap">

                                        <div className="flex items-center gap-2">

                                            <MapPin
                                                size={15}
                                                className="shrink-0"
                                                style={{
                                                    color: "var(--primary-color)",
                                                }}
                                            />

                                            <span className="text-sm text-gray-700 whitespace-nowrap">
                                                {driver.currentLocation}
                                            </span>

                                        </div>

                                    </td>
                                )}

                                {/* Assigned Vehicle */}
                                {visibleColumns.assignedVehicle && (
                                    <td className="px-4 py-4 whitespace-nowrap">

                                        <div className="flex items-center gap-2">

                                            <Truck
                                                size={15}
                                                className="shrink-0"
                                                style={{
                                                    color: "var(--primary-color)",
                                                }}
                                            />

                                            <span className="text-sm text-gray-700 whitespace-nowrap">
                                                {driver.assignedVehicle}
                                            </span>

                                        </div>

                                    </td>
                                )}

                                {/* Actions */}
                                <td
                                    className={`sticky right-0
    w-20 min-w-20
    sm:w-auto sm:min-w-0
    border-l border-gray-200
    bg-white
    px-2 py-3
    shadow-[-4px_0_6px_-6px_rgba(0,0,0,0.25)]
    ${openMenu === driver.id ? "z-30" : "z-10"}`}
                                >

                                    <div className="flex items-center gap-1">

                                        {/* Edit */}
                                        <button
                                            onClick={() => navigate(`/drivers/${driver.id}/edit`)}
                                            className="rounded-lg p-2 text-gray-500
hover:bg-gray-100 transition"
                                            style={{
                                                color: "var(--primary-color)",
                                            }}
                                            title="Edit Driver"
                                        >
                                            <Pencil size={17} />
                                        </button>


                                        {/* Delete */}
                                        <button
                                            onClick={() => onDelete(driver.id)}
                                            className="rounded-lg p-2 text-gray-500
hover:bg-red-50 hover:text-red-600 transition"
                                            title="Delete Driver"
                                        >
                                            <Trash2 size={17} />
                                        </button>


                                        {/* More */}
                                        <div className="relative">

                                            <button
                                                onClick={() =>
                                                    setOpenMenu(
                                                        openMenu === driver.id
                                                            ? null
                                                            : driver.id
                                                    )
                                                }
                                                className="rounded-lg p-2 text-gray-500
hover:bg-gray-100 hover:text-gray-800 transition"
                                                title="More"
                                            >
                                                <MoreVertical size={18} />
                                            </button>


                                            {/* More Menu */}
                                            {openMenu === driver.id && (

                                                <div
                                                    className="absolute right-0 top-10 z-20 w-36
                                rounded-lg border border-gray-200
                                bg-white py-1 shadow-lg"
                                                >

                                                    <button
                                                        className="w-full px-4 py-2 text-left
    text-sm text-gray-700
    hover:bg-[color-mix(in_srgb,var(--primary-color)_8%,white)]"
                                                    >
                                                        View Details
                                                    </button>

                                                    <button
                                                        className="w-full px-4 py-2 text-left
    text-sm text-gray-700
    hover:bg-[color-mix(in_srgb,var(--primary-color)_8%,white)]"
                                                    >
                                                        View Trips
                                                    </button>

                                                </div>

                                            )}

                                        </div>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default DriverTable;