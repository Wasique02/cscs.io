import { X, MapPin, Calendar, Building2, User, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PurchaseOrderDetailsProps = {
    order: typeof import("../../data/purchaseOrdersData").default[number];
    onClose: () => void;
};

function PurchaseOrderDetails({
    order,
    onClose,
}: PurchaseOrderDetailsProps) {

    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-50">

            {/* Background Overlay */}
            <div
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-white shadow-xl">

                {/* Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4">

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Purchase Order Details
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {order.id}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Scrollable Content */}
                <div className="min-h-0 flex-1 overflow-y-auto p-5">

                    {/* Order Header */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

                        <div className="flex items-start justify-between gap-4">

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {order.id}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {order.supplier}
                                </p>
                            </div>

                            {/* Status */}
                            <span
                                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${order.status === "Completed"
                                        ? "bg-green-100 text-green-700"
                                        : order.status === "Approved"
                                            ? "bg-blue-100 text-blue-700"
                                            : order.status === "In Progress"
                                                ? "bg-amber-100 text-amber-700"
                                                : order.status === "Pending"
                                                    ? "bg-gray-100 text-gray-600"
                                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                <span
                                    className={`h-1.5 w-1.5 rounded-full ${order.status === "Completed"
                                            ? "bg-green-500"
                                            : order.status === "Approved"
                                                ? "bg-blue-500"
                                                : order.status === "In Progress"
                                                    ? "bg-amber-500"
                                                    : order.status === "Pending"
                                                        ? "bg-gray-400"
                                                        : "bg-red-500"
                                        }`}
                                />

                                {order.status}
                            </span>

                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">

                            <div>
                                <p className="text-xs text-gray-500">
                                    External ID
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-800">
                                    {order.externalId}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Order Type
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-800">
                                    {order.type}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Supplier & Business */}
                    <div className="mt-5">

                        <h3 className="mb-3 text-sm font-semibold text-gray-900">
                            Supplier & Business
                        </h3>

                        <div className="grid grid-cols-2 gap-4">

                            <div className="rounded-lg border border-gray-200 p-3">
                                <div className="flex items-center gap-2">
                                    <Building2
                                        size={16}
                                        style={{
                                            color: "var(--primary-color)",
                                        }}
                                    />

                                    <span className="text-xs text-gray-500">
                                        Supplier
                                    </span>
                                </div>

                                <p className="mt-2 text-sm font-medium text-gray-800">
                                    {order.supplier}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    {order.supplierCode}
                                </p>
                            </div>

                            <div className="rounded-lg border border-gray-200 p-3">
                                <div className="flex items-center gap-2">
                                    <Package
                                        size={16}
                                        style={{
                                            color: "var(--primary-color)",
                                        }}
                                    />

                                    <span className="text-xs text-gray-500">
                                        Business Unit
                                    </span>
                                </div>

                                <p className="mt-2 text-sm font-medium text-gray-800">
                                    {order.businessUnit}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Dates */}
                    <div className="mt-5">

                        <h3 className="mb-3 text-sm font-semibold text-gray-900">
                            Order Dates
                        </h3>

                        <div className="grid grid-cols-2 gap-4">

                            <div className="rounded-lg border border-gray-200 p-3">
                                <div className="flex items-center gap-2">
                                    <Calendar
                                        size={16}
                                        style={{
                                            color: "var(--primary-color)",
                                        }}
                                    />

                                    <span className="text-xs text-gray-500">
                                        Order Date
                                    </span>
                                </div>

                                <p className="mt-2 text-sm font-medium text-gray-800">
                                    {order.orderDate}
                                </p>
                            </div>

                            <div className="rounded-lg border border-gray-200 p-3">
                                <div className="flex items-center gap-2">
                                    <Calendar
                                        size={16}
                                        style={{
                                            color: "var(--primary-color)",
                                        }}
                                    />

                                    <span className="text-xs text-gray-500">
                                        Due Date
                                    </span>
                                </div>

                                <p className="mt-2 text-sm font-medium text-gray-800">
                                    {order.dueDate}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Route */}
                    <div className="mt-5">

                        <h3 className="mb-3 text-sm font-semibold text-gray-900">
                            Shipment Route
                        </h3>

                        <div className="space-y-3">

                            <div className="rounded-lg border border-gray-200 p-3">

                                <div className="flex items-start gap-3">
                                    <MapPin
                                        size={18}
                                        className="mt-0.5 shrink-0"
                                        style={{
                                            color: "var(--primary-color)",
                                        }}
                                    />

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Origin Facility
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-gray-800">
                                            {order.originFacility}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            {order.originFacilityCode}
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div className="rounded-lg border border-gray-200 p-3">

                                <div className="flex items-start gap-3">
                                    <MapPin
                                        size={18}
                                        className="mt-0.5 shrink-0"
                                        style={{
                                            color: "var(--primary-color)",
                                        }}
                                    />

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Destination Facility
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-gray-800">
                                            {order.destinationFacility}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            {order.destinationFacilityCode}
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Pickup */}
                    <div className="mt-5">

                        <h3 className="mb-3 text-sm font-semibold text-gray-900">
                            Pickup Window
                        </h3>

                        <div className="grid grid-cols-2 gap-4">

                            <div className="rounded-lg border border-gray-200 p-3">
                                <p className="text-xs text-gray-500">
                                    Pickup Start
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-800">
                                    {order.pickupStart}
                                </p>
                            </div>

                            <div className="rounded-lg border border-gray-200 p-3">
                                <p className="text-xs text-gray-500">
                                    Pickup End
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-800">
                                    {order.pickupEnd}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Order Summary */}
                    <div className="mt-5">

                        <h3 className="mb-3 text-sm font-semibold text-gray-900">
                            Order Summary
                        </h3>

                        <div className="rounded-xl border border-gray-200">

                            <div className="grid grid-cols-2 divide-x divide-gray-200">

                                <div className="p-4">
                                    <p className="text-xs text-gray-500">
                                        Total Items
                                    </p>

                                    <p className="mt-1 text-lg font-semibold text-gray-900">
                                        {order.totalItems}
                                    </p>
                                </div>

                                <div className="p-4">
                                    <p className="text-xs text-gray-500">
                                        Total Quantity
                                    </p>

                                    <p className="mt-1 text-lg font-semibold text-gray-900">
                                        {order.totalQuantity}
                                    </p>
                                </div>

                            </div>

                            <div className="border-t border-gray-200 p-4 space-y-2">

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Subtotal
                                    </span>

                                    <span className="font-medium text-gray-800">
                                        ₹{order.subtotal.toLocaleString("en-IN")}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Tax
                                    </span>

                                    <span className="font-medium text-gray-800">
                                        ₹{order.tax.toLocaleString("en-IN")}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Shipping
                                    </span>

                                    <span className="font-medium text-gray-800">
                                        ₹{order.shippingCost.toLocaleString("en-IN")}
                                    </span>
                                </div>

                                <div className="flex justify-between border-t border-gray-200 pt-3">
                                    <span className="font-semibold text-gray-900">
                                        Total
                                    </span>

                                    <span
                                        className="font-semibold"
                                        style={{
                                            color: "var(--primary-color)",
                                        }}
                                    >
                                        ₹{order.totalAmount.toLocaleString("en-IN")}
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Created By */}
                    <div className="mt-5">

                        <h3 className="mb-3 text-sm font-semibold text-gray-900">
                            Created By
                        </h3>

                        <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">

                            <User
                                size={18}
                                style={{
                                    color: "var(--primary-color)",
                                }}
                            />

                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    {order.createdBy}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    {order.createdAt}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Notes */}
                    <div className="mt-5">

                        <h3 className="mb-3 text-sm font-semibold text-gray-900">
                            Notes
                        </h3>

                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                            <p className="text-sm leading-6 text-gray-600">
                                {order.notes || "No notes available."}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Footer */}
                <div className="flex shrink-0 items-center justify-end gap-2 border-t border-gray-200 bg-white px-5 py-4">

                    <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        Close
                    </button>

                    <button
                        onClick={() => {
                            onClose();
                            navigate(`/purchase-orders/${order.id}/edit`);
                        }}
                        style={{
                            backgroundColor: "var(--primary-color)",
                        }}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-white transition"
                    >
                        Edit Purchase Order
                    </button>

                </div>

            </div>
        </div>
    );
}

export default PurchaseOrderDetails;