
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type PurchaseOrderTableProps = {
    orders: typeof import("../../data/purchaseOrdersData").default;

    onRowClick: (
        order: typeof import("../../data/purchaseOrdersData").default[number]
    ) => void;

    onDelete: (orderId: string) => void;

    visibleColumns: Record<string, boolean>;
};

const PurchaseOrderTable = ({
    orders,
    onRowClick,
    onDelete,
    visibleColumns,
}: PurchaseOrderTableProps) => {
    const navigate = useNavigate();

    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const headerClass =
        "px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap";

    const cellClass =
        "px-4 py-4 text-sm text-gray-600 whitespace-nowrap";

    return (
        <div className="w-full min-w-0 rounded-xl border border-gray-200 bg-white">
            <div className="w-full overflow-x-auto custom-scrollbar">
                <table className="min-w-275 w-full rounded-xl">
                    {/* Table Header */}
                    <thead className="border-b border-gray-200 bg-gray-50">
                        <tr>
                            {visibleColumns.poNumber && (
                                <th className={headerClass}>PO Number</th>
                            )}

                            {visibleColumns.externalId && (
                                <th className={headerClass}>External ID</th>
                            )}

                            {visibleColumns.supplier && (
                                <th className={headerClass}>Supplier</th>
                            )}

                            {visibleColumns.supplierCode && (
                                <th className={headerClass}>Supplier Code</th>
                            )}

                            {visibleColumns.type && (
                                <th className={headerClass}>Type</th>
                            )}

                            {visibleColumns.status && (
                                <th className={headerClass}>Status</th>
                            )}

                            {visibleColumns.businessUnit && (
                                <th className={headerClass}>Business Unit</th>
                            )}

                            {visibleColumns.orderDate && (
                                <th className={headerClass}>Order Date</th>
                            )}

                            {visibleColumns.dueDate && (
                                <th className={headerClass}>Due Date</th>
                            )}

                            {visibleColumns.cancelDate && (
                                <th className={headerClass}>Cancel Date</th>
                            )}

                            {visibleColumns.originFacility && (
                                <th className={headerClass}>Origin Facility</th>
                            )}

                            {visibleColumns.originFacilityCode && (
                                <th className={headerClass}>Origin Code</th>
                            )}

                            {visibleColumns.destinationFacility && (
                                <th className={headerClass}>Destination Facility</th>
                            )}

                            {visibleColumns.destinationFacilityCode && (
                                <th className={headerClass}>Destination Code</th>
                            )}

                            {visibleColumns.pickupStart && (
                                <th className={headerClass}>Pickup Start</th>
                            )}

                            {visibleColumns.pickupEnd && (
                                <th className={headerClass}>Pickup End</th>
                            )}

                            {visibleColumns.currency && (
                                <th className={headerClass}>Currency</th>
                            )}

                            {visibleColumns.subtotal && (
                                <th className={headerClass}>Subtotal</th>
                            )}

                            {visibleColumns.tax && (
                                <th className={headerClass}>Tax</th>
                            )}

                            {visibleColumns.shippingCost && (
                                <th className={headerClass}>Shipping Cost</th>
                            )}

                            {visibleColumns.totalAmount && (
                                <th className={headerClass}>Total Amount</th>
                            )}

                            {visibleColumns.totalItems && (
                                <th className={headerClass}>Total Items</th>
                            )}

                            {visibleColumns.totalQuantity && (
                                <th className={headerClass}>Total Quantity</th>
                            )}

                            {visibleColumns.createdBy && (
                                <th className={headerClass}>Created By</th>
                            )}

                            {visibleColumns.createdAt && (
                                <th className={headerClass}>Created At</th>
                            )}

                            {/* Actions always visible */}
                            <th
                                className="
                                    sticky right-0 z-20
                                    w-20 min-w-20 sm:w-auto sm:min-w-0
                                    border-l border-gray-200 bg-gray-50
                                    px-4 py-3 text-left text-sm font-semibold
                                    text-gray-600 whitespace-nowrap
                                    shadow-[-4px_0_6px_-6px_rgba(0,0,0,0.25)]
                                "
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                onClick={() => onRowClick(order)}
                                className="
                                    cursor-pointer border-b border-gray-100
                                    transition hover:bg-gray-50
                                "
                            >
                                {visibleColumns.poNumber && (
                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        {order.id}
                                    </td>
                                )}

                                {visibleColumns.externalId && (
                                    <td className={cellClass}>
                                        {order.externalId}
                                    </td>
                                )}

                                {visibleColumns.supplier && (
                                    <td className={cellClass}>
                                        {order.supplier}
                                    </td>
                                )}

                                {visibleColumns.supplierCode && (
                                    <td className={cellClass}>
                                        {order.supplierCode}
                                    </td>
                                )}

                                {visibleColumns.type && (
                                    <td className={cellClass}>
                                        {order.type}
                                    </td>
                                )}

                                {visibleColumns.status && (
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span
                                            className={`
                                                inline-flex items-center gap-2
                                                rounded-full px-3 py-1
                                                text-sm font-medium
                                                ${
                                                    order.status === "Completed"
                                                        ? "bg-green-100 text-green-700"
                                                        : order.status === "Approved"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : order.status === "In Progress"
                                                                ? "bg-amber-100 text-amber-700"
                                                                : order.status === "Pending"
                                                                    ? "bg-gray-100 text-gray-600"
                                                                    : "bg-red-100 text-red-700"
                                                }
                                            `}
                                        >
                                            <span
                                                className={`
                                                    h-1.5 w-1.5 shrink-0 rounded-full
                                                    ${
                                                        order.status === "Completed"
                                                            ? "bg-green-500"
                                                            : order.status === "Approved"
                                                                ? "bg-blue-500"
                                                                : order.status === "In Progress"
                                                                    ? "bg-amber-500"
                                                                    : order.status === "Pending"
                                                                        ? "bg-gray-400"
                                                                        : "bg-red-500"
                                                    }
                                                `}
                                            />
                                            {order.status}
                                        </span>
                                    </td>
                                )}

                                {visibleColumns.businessUnit && (
                                    <td className={cellClass}>
                                        {order.businessUnit}
                                    </td>
                                )}

                                {visibleColumns.orderDate && (
                                    <td className={cellClass}>
                                        {order.orderDate}
                                    </td>
                                )}

                                {visibleColumns.dueDate && (
                                    <td className={cellClass}>
                                        {order.dueDate}
                                    </td>
                                )}

                                {visibleColumns.cancelDate && (
                                    <td className={cellClass}>
                                        {order.cancelDate || "-"}
                                    </td>
                                )}

                                {visibleColumns.originFacility && (
                                    <td className={cellClass}>
                                        {order.originFacility}
                                    </td>
                                )}

                                {visibleColumns.originFacilityCode && (
                                    <td className={cellClass}>
                                        {order.originFacilityCode}
                                    </td>
                                )}

                                {visibleColumns.destinationFacility && (
                                    <td className={cellClass}>
                                        {order.destinationFacility}
                                    </td>
                                )}

                                {visibleColumns.destinationFacilityCode && (
                                    <td className={cellClass}>
                                        {order.destinationFacilityCode}
                                    </td>
                                )}

                                {visibleColumns.pickupStart && (
                                    <td className={cellClass}>
                                        {order.pickupStart}
                                    </td>
                                )}

                                {visibleColumns.pickupEnd && (
                                    <td className={cellClass}>
                                        {order.pickupEnd}
                                    </td>
                                )}

                                {visibleColumns.currency && (
                                    <td className={cellClass}>
                                        {order.currency}
                                    </td>
                                )}

                                {visibleColumns.subtotal && (
                                    <td className={cellClass}>
                                        ₹{order.subtotal.toLocaleString("en-IN")}
                                    </td>
                                )}

                                {visibleColumns.tax && (
                                    <td className={cellClass}>
                                        ₹{order.tax.toLocaleString("en-IN")}
                                    </td>
                                )}

                                {visibleColumns.shippingCost && (
                                    <td className={cellClass}>
                                        ₹{order.shippingCost.toLocaleString("en-IN")}
                                    </td>
                                )}

                                {visibleColumns.totalAmount && (
                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        ₹{order.totalAmount.toLocaleString("en-IN")}
                                    </td>
                                )}

                                {visibleColumns.totalItems && (
                                    <td className={cellClass}>
                                        {order.totalItems}
                                    </td>
                                )}

                                {visibleColumns.totalQuantity && (
                                    <td className={cellClass}>
                                        {order.totalQuantity}
                                    </td>
                                )}

                                {visibleColumns.createdBy && (
                                    <td className={cellClass}>
                                        {order.createdBy}
                                    </td>
                                )}

                                {visibleColumns.createdAt && (
                                    <td className={cellClass}>
                                        {order.createdAt}
                                    </td>
                                )}

                                {/* Actions */}
                                <td
                                    className={`
                                        sticky right-0
                                        w-20 min-w-20 sm:w-auto sm:min-w-0
                                        border-l border-gray-200 bg-white
                                        px-2 py-3
                                        shadow-[-4px_0_6px_-6px_rgba(0,0,0,0.25)]
                                        ${openMenu === order.id ? "z-20" : "z-10"}
                                    `}
                                >
                                    <div className="flex items-center gap-1">
                                        {/* Edit */}
                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                navigate(
                                                    `/purchase-orders/${order.id}/edit`
                                                );
                                            }}
                                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
                                            style={{
                                                color: "var(--primary-color)",
                                            }}
                                            title="Edit Purchase Order"
                                        >
                                            <Pencil size={17} />
                                        </button>

                                        {/* Delete */}
                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                onDelete(order.id);
                                            }}
                                            className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                                            title="Delete Purchase Order"
                                        >
                                            <Trash2 size={17} />
                                        </button>

                                        {/* More */}
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();

                                                    setOpenMenu(
                                                        openMenu === order.id
                                                            ? null
                                                            : order.id
                                                    );
                                                }}
                                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                                                title="More"
                                            >
                                                <MoreVertical size={18} />
                                            </button>

                                            {/* More Menu */}
                                            {openMenu === order.id && (
                                                <div
                                                    className="
                                                        absolute right-0 top-10 z-20
                                                        w-36 rounded-lg border
                                                        border-gray-200 bg-white
                                                        py-1 shadow-lg
                                                    "
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            console.log(
                                                                "View Details:",
                                                                order.id
                                                            );
                                                        }}
                                                        className="
                                                            w-full px-4 py-2
                                                            text-left text-sm
                                                            text-gray-700
                                                            hover:bg-[color-mix(in_srgb,var(--primary-color)_8%,white)]
                                                        "
                                                    >
                                                        View Details
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            console.log(
                                                                "View Items:",
                                                                order.id
                                                            );
                                                        }}
                                                        className="
                                                            w-full px-4 py-2
                                                            text-left text-sm
                                                            text-gray-700
                                                            hover:bg-[color-mix(in_srgb,var(--primary-color)_8%,white)]
                                                        "
                                                    >
                                                        View Items
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
};

export default PurchaseOrderTable;