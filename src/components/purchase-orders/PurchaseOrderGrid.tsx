import {
    MoreVertical,
    Pencil,
    Trash2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type PurchaseOrderGridProps = {
    orders: typeof import("../../data/purchaseOrdersData").default;

    onRowClick: (
        order: typeof import("../../data/purchaseOrdersData").default[number]
    ) => void;

    onDelete: (orderId: string) => void;

    visibleColumns: Record<string, boolean>;
};

const PurchaseOrderGrid = ({
    orders,
    onRowClick,
    onDelete,
    visibleColumns,
}: PurchaseOrderGridProps) => {

    const navigate = useNavigate();

    const [openMenu, setOpenMenu] =
        useState<string | null>(null);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

            {orders.map((order) => (

                <div
                    key={order.id}
                    onClick={() => onRowClick(order)}
                    className={` 
            group
            cursor-pointer
            rounded-xl
            border
            border-gray-200
            bg-white
            p-5
            transition-all
            duration-200
            hover:border-gray-300
            ${order.status === "Pending"
                            ? "shadow-[inset_0_0_30px_rgba(245,158,11,0.30)]"
                            : order.status === "Approved"
                                ? "shadow-[inset_0_0_30px_rgba(34,197,94,0.30)]"
                                : order.status === "In Progress"
                                    ? "shadow-[inset_0_0_30px_rgba(59,130,246,0.30)]"
                                    : order.status === "Completed"
                                        ? "shadow-[inset_0_0_30px_rgba(34,197,94,0.30)]"
                                        : order.status === "Cancelled"
                                            ? "shadow-[inset_0_0_30px_rgba(239,68,68,0.30)]"
                                            : "shadow-[inset_0_0_30px_rgba(156,163,175,0.30)]"
                        }
        `}
                >

                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                            {visibleColumns.poNumber && (
                                <p className="text-sm font-semibold text-gray-900">
                                    {order.id}
                                </p>
                            )}

                            {visibleColumns.externalId && (
                                <p className="mt-1 truncate text-sm text-gray-500">
                                    {order.externalId}
                                </p>
                            )}

                        </div>

                        {/* Actions */}
                        <div
                            className="relative flex shrink-0 items-center gap-1"
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        >

                            {/* Edit */}
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/purchase-orders/${order.id}/edit`
                                    )
                                }
                                className="
                                    rounded-lg
                                    p-2
                                    text-gray-500
                                    transition
                                    hover:bg-gray-100
                                "
                                style={{
                                    color:
                                        "var(--primary-color)",
                                }}
                                title="Edit"
                            >
                                <Pencil size={16} />
                            </button>

                            {/* Delete */}
                            <button
                                type="button"
                                onClick={() =>
                                    onDelete(order.id)
                                }
                                className="
                                    rounded-lg
                                    p-2
                                    text-gray-500
                                    transition
                                    hover:bg-red-50
                                    hover:text-red-600
                                "
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>

                            {/* More */}
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenMenu(
                                        openMenu === order.id
                                            ? null
                                            : order.id
                                    )
                                }
                                className="
                                    rounded-lg
                                    p-2
                                    text-gray-500
                                    transition
                                    hover:bg-gray-100
                                "
                                title="More"
                            >
                                <MoreVertical size={17} />
                            </button>

                            {/* More Menu */}
                            {openMenu === order.id && (

                                <div
                                    className="
                                        absolute
                                        right-0
                                        top-10
                                        z-30
                                        w-36
                                        rounded-lg
                                        border
                                        border-gray-200
                                        bg-white
                                        py-1
                                        shadow-lg
                                    "
                                >

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOpenMenu(null);
                                            onRowClick(order);
                                        }}
                                        className="
                                            w-full
                                            px-4
                                            py-2
                                            text-left
                                            text-sm
                                            text-gray-700
                                            hover:bg-gray-50
                                        "
                                    >
                                        View Details
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOpenMenu(null);
                                            console.log(
                                                "View Items:",
                                                order.id
                                            );
                                        }}
                                        className="
                                            w-full
                                            px-4
                                            py-2
                                            text-left
                                            text-sm
                                            text-gray-700
                                            hover:bg-gray-50
                                        "
                                    >
                                        View Items
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                    {/* Supplier */}
                    {visibleColumns.supplier && (
                        <div className="mt-5">
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Supplier
                            </p>

                            <p className="mt-1 truncate text-sm font-medium text-gray-800">
                                {order.supplier}
                            </p>
                        </div>
                    )}

                    {/* Status */}
                    {visibleColumns.status && (
                        <div className="mt-4">

                            <span
                                className={`
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                px-3
                                py-1
                                text-xs
                                font-medium

                                ${order.status === "Completed"
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
                                    h-1.5
                                    w-1.5
                                    rounded-full

                                    ${order.status === "Completed"
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

                        </div>
                    )}

                    {/* Details */}
                    <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">

                        {visibleColumns.type && (
                            <div>
                                <p className="text-xs text-gray-400">
                                    Type
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-700">
                                    {order.type}
                                </p>
                            </div>
                        )}

                        {visibleColumns.businessUnit && (
                            <div>
                                <p className="text-xs text-gray-400">
                                    Business Unit
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-700">
                                    {order.businessUnit}
                                </p>
                            </div>
                        )}

                        {visibleColumns.orderDate && (
                            <div>
                                <p className="text-xs text-gray-400">
                                    Order Date
                                </p>

                                <p className="mt-1 text-sm text-gray-700">
                                    {order.orderDate}
                                </p>
                            </div>
                        )}

                        {visibleColumns.dueDate && (
                            <div>
                                <p className="text-xs text-gray-400">
                                    Due Date
                                </p>

                                <p className="mt-1 text-sm text-gray-700">
                                    {order.dueDate}
                                </p>
                            </div>
                        )}

                        {visibleColumns.totalItems && (
                            <div>
                                <p className="text-xs text-gray-400">
                                    Total Items
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-700">
                                    {order.totalItems}
                                </p>
                            </div>
                        )}

                        {visibleColumns.totalQuantity && (
                            <div>
                                <p className="text-xs text-gray-400">
                                    Quantity
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-700">
                                    {order.totalQuantity}
                                </p>
                            </div>
                        )}

                    </div>

                    {/* Total */}
                    <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-4">

                        {/* Total Amount */}
                        {visibleColumns.totalAmount && (
                            <div>
                                <p className="text-xs text-gray-400">
                                    Total Amount
                                </p>

                                <p className="mt-1 text-lg font-semibold text-gray-900">
                                    ₹{order.totalAmount.toLocaleString("en-IN")}
                                </p>
                            </div>
                        )}

                        {/* Currency */}
                        {visibleColumns.currency && (
                            <span className="text-xs text-gray-400">
                                {order.currency}
                            </span>
                        )}

                    </div>

                </div>

            ))}

        </div>
    );
};

export default PurchaseOrderGrid;