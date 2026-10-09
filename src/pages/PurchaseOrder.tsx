import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
    ClipboardList,
    Plus,
    Table2,
    LayoutGrid,
    List,
    Settings2,
} from "lucide-react";

import purchaseOrders from "../data/purchaseOrdersData";
import PurchaseOrderTable from "../components/purchase-orders/PurchaseOrderTable";
import PurchaseOrderStats from "../components/purchase-orders/PurchaseOrderStats";
import PurchaseOrderDetails from "../components/purchase-orders/PurchaseOrderDetails";
import PurchaseOrderGrid from "../components/purchase-orders/PurchaseOrderGrid";
import PurchaseOrderList from "../components/purchase-orders/PurchaseOrderList";

type PurchaseOrderType = (typeof purchaseOrders)[number];

const purchaseOrderColumns = {
    poNumber: "PO Number",
    externalId: "External ID",
    supplier: "Supplier",
    supplierCode: "Supplier Code",
    type: "Type",
    status: "Status",
    businessUnit: "Business Unit",
    orderDate: "Order Date",
    dueDate: "Due Date",
    cancelDate: "Cancel Date",
    originFacility: "Origin Facility",
    originFacilityCode: "Origin Code",
    destinationFacility: "Destination Facility",
    destinationFacilityCode: "Destination Code",
    pickupStart: "Pickup Start",
    pickupEnd: "Pickup End",
    currency: "Currency",
    subtotal: "Subtotal",
    tax: "Tax",
    shippingCost: "Shipping Cost",
    totalAmount: "Total Amount",
    totalItems: "Total Items",
    totalQuantity: "Total Quantity",
    createdBy: "Created By",
    createdAt: "Created At",
};

type VisibleColumns = Record<keyof typeof purchaseOrderColumns, boolean>;

const getDefaultVisibleColumns = (): VisibleColumns =>
    Object.fromEntries(
        Object.keys(purchaseOrderColumns).map((key) => [key, true])
    ) as VisibleColumns;

const PurchaseOrders = () => {
    const navigate = useNavigate();

    const [selectedOrder, setSelectedOrder] =
        useState<
            typeof import("../data/purchaseOrdersData").default[number] | null
        >(null);

    const [statusFilter, setStatusFilter] = useState("All");

    const [viewMode, setViewMode] = useState(() => {
        return localStorage.getItem("purchaseOrderViewMode") || "table";
    });

    const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>(() => {
        const defaults = getDefaultVisibleColumns();
        const savedColumns = localStorage.getItem(
            "purchaseOrderVisibleColumns"
        );

        if (!savedColumns) {
            return defaults;
        }

        try {
            return {
                ...defaults,
                ...JSON.parse(savedColumns),
            };
        } catch {
            return defaults;
        }
    });

    const [showColumns, setShowColumns] = useState(false);

    const settingsButtonRef = useRef<HTMLButtonElement>(null);

    const [settingsPosition, setSettingsPosition] = useState({
        top: 0,
        left: 0,
    });

    useEffect(() => {
        localStorage.setItem("purchaseOrderViewMode", viewMode);
    }, [viewMode]);

    useEffect(() => {
        localStorage.setItem(
            "purchaseOrderVisibleColumns",
            JSON.stringify(visibleColumns)
        );
    }, [visibleColumns]);


    const updateSettingsPosition = () => {
        const button = settingsButtonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const popupWidth = 256;
        const gap = 8;
        const margin = 12;

        // Keep the popup aligned with the button's right edge.
        const left = Math.max(
            margin,
            Math.min(
                rect.right - popupWidth,
                window.innerWidth - popupWidth - margin
            )
        );

        // Open below the button, or above it if space is limited.
        const estimatedPopupHeight = Math.min(
            450,
            window.innerHeight - margin * 2
        );

        const spaceBelow = window.innerHeight - rect.bottom - gap - margin;

        const top =
            spaceBelow >= Math.min(estimatedPopupHeight, 250)
                ? rect.bottom + gap
                : Math.max(
                    margin,
                    rect.top - estimatedPopupHeight - gap
                );

        setSettingsPosition({ top, left });
    };

    useEffect(() => {
        if (!showColumns) return;

        updateSettingsPosition();

        const handlePositionUpdate = () => updateSettingsPosition();

        window.addEventListener("resize", handlePositionUpdate);
        window.addEventListener("scroll", handlePositionUpdate, true);

        return () => {
            window.removeEventListener("resize", handlePositionUpdate);
            window.removeEventListener("scroll", handlePositionUpdate, true);
        };
    }, [showColumns]);

    const [orders, setOrders] = useState<PurchaseOrderType[]>(() => {
        const storedOrders = localStorage.getItem("purchaseOrders");

        if (!storedOrders) {
            return purchaseOrders;
        }

        try {
            return JSON.parse(storedOrders) as PurchaseOrderType[];
        } catch {
            return purchaseOrders;
        }
    });

    const filteredOrders =
        statusFilter === "All"
            ? orders
            : orders.filter(
                (order) => order.status === statusFilter
            );

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        (order) => order.status === "Pending"
    ).length;

    const approvedOrders = orders.filter(
        (order) => order.status === "Approved"
    ).length;

    const inProgressOrders = orders.filter(
        (order) => order.status === "In Progress"
    ).length;

    const completedOrders = orders.filter(
        (order) => order.status === "Completed"
    ).length;

    const cancelledOrders = orders.filter(
        (order) => order.status === "Cancelled"
    ).length;

    const handleDelete = (orderId: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this purchase order?"
        );

        if (!confirmed) return;

        const updatedOrders = orders.filter(
            (order) => order.id !== orderId
        );

        setOrders(updatedOrders);

        localStorage.setItem(
            "purchaseOrders",
            JSON.stringify(updatedOrders)
        );
    };

    const toggleColumn = (key: keyof typeof purchaseOrderColumns) => {
        setVisibleColumns((current) => ({
            ...current,
            [key]: !current[key],
        }));
    };

    const resetColumns = () => {
        setVisibleColumns(getDefaultVisibleColumns());
    };

    return (
        <div className="min-w-0 space-y-5 sm:space-y-6">

            {/* Page Header */}
            <div
                className="
                    slide-up mb-4 flex flex-col gap-5
                    border-b border-gray-200 pb-5
                    sm:pb-6 lg:flex-row lg:items-end
                    lg:justify-between
                "
            >
                {/* Left Side */}
                <div className="min-w-0">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <ClipboardList
                            size={24}
                            className="shrink-0 text-gray-700 sm:h-7 sm:w-7"
                        />

                        <h1 className="truncate text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                            Purchase Orders
                        </h1>
                    </div>

                    <p className="mt-2 text-sm leading-5 text-gray-500">
                        Manage, create and track your purchase orders
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:gap-3">

                    {/* View Mode */}
                    <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1">
                        <button
                            type="button"
                            onClick={() => setViewMode("table")}
                            className={`rounded-md p-2 transition ${viewMode === "table"
                                ? "text-white"
                                : "text-gray-500 hover:bg-gray-100"
                                }`}
                            style={
                                viewMode === "table"
                                    ? { backgroundColor: "var(--primary-color)" }
                                    : undefined
                            }
                            title="Table View"
                            aria-label="Table view"
                        >
                            <Table2 size={17} />
                        </button>

                        <button
                            type="button"
                            onClick={() => setViewMode("grid")}
                            className={`rounded-md p-2 transition ${viewMode === "grid"
                                ? "text-white"
                                : "text-gray-500 hover:bg-gray-100"
                                }`}
                            style={
                                viewMode === "grid"
                                    ? { backgroundColor: "var(--primary-color)" }
                                    : undefined
                            }
                            title="Grid View"
                            aria-label="Grid view"
                        >
                            <LayoutGrid size={17} />
                        </button>

                        <button
                            type="button"
                            onClick={() => setViewMode("list")}
                            className={`rounded-md p-2 transition ${viewMode === "list"
                                ? "text-white"
                                : "text-gray-500 hover:bg-gray-100"
                                }`}
                            style={
                                viewMode === "list"
                                    ? { backgroundColor: "var(--primary-color)" }
                                    : undefined
                            }
                            title="List View"
                            aria-label="List view"
                        >
                            <List size={17} />
                        </button>
                    </div>

                    {/* Create Purchase Order */}
                    <button
                        type="button"
                        onClick={() => navigate("/purchase-orders/create")}
                        style={{ backgroundColor: "var(--primary-color)" }}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition sm:flex-none"
                    >
                        <Plus size={17} />
                        <span>Create Purchase Order</span>
                    </button>
                </div>
            </div>

            {/* Statistics / Status Filters */}
            <div
                className="slide-up flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center"
                style={{ animationDelay: "100ms" }}
            >
                <div className="mb-0 min-w-0 flex-1">
                    <PurchaseOrderStats
                        totalOrders={totalOrders}
                        pendingOrders={pendingOrders}
                        approvedOrders={approvedOrders}
                        inProgressOrders={inProgressOrders}
                        completedOrders={completedOrders}
                        cancelledOrders={cancelledOrders}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                    />
                </div>

                {/* Display Settings */}
                <div className="relative">
                    <button
                        ref={settingsButtonRef}
                        type="button"
                        onClick={() => {
                            if (!showColumns) {
                                updateSettingsPosition();
                            }

                            setShowColumns((current) => !current);
                        }}
                        className={`flex h-10 items-center justify-center rounded-lg border px-3 transition ${showColumns
                            ? "border-(--primary-color) text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                        style={
                            showColumns
                                ? { backgroundColor: "var(--primary-color)" }
                                : undefined
                        }
                        aria-label="Display settings"
                        aria-expanded={showColumns}
                    >
                        <Settings2 size={16} />
                    </button>

                    {showColumns &&
                        settingsButtonRef.current &&
                        createPortal(
                            <div
                                className="fixed z-[9999] w-64 max-w-[calc(100vw-24px)] overflow-y-auto rounded-xl border border-gray-200 bg-white p-4 shadow-xl"
                                style={{
                                    top: settingsPosition.top,
                                    left: settingsPosition.left,
                                    maxHeight: "70vh",
                                }}
                            >
                                <div className="mb-3">
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Display Settings
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Choose the columns you want to display.
                                    </p>
                                </div>

                                <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3">
                                    <span className="text-xs text-gray-500">
                                        {Object.values(visibleColumns).filter(Boolean).length} of {Object.keys(purchaseOrderColumns).length} columns visible
                                    </span>

                                    <button
                                        type="button"
                                        onClick={resetColumns}
                                        className="text-xs font-medium hover:underline"
                                        style={{ color: "var(--primary-color)" }}
                                    >
                                        Reset
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {(Object.entries(purchaseOrderColumns) as [
                                        keyof typeof purchaseOrderColumns,
                                        string
                                    ][]).map(([key, label]) => (
                                        <label
                                            key={key}
                                            className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={visibleColumns[key]}
                                                onChange={() => toggleColumn(key)}
                                                className="h-4 w-4 rounded"
                                                style={{ accentColor: "var(--primary-color)" }}
                                            />

                                            {label}
                                        </label>
                                    ))}
                                </div>

                                <div className="mt-4 border-t border-gray-100 pt-3">
                                    <p className="text-xs text-gray-500">
                                        Actions will always remain visible.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => setShowColumns(false)}
                                        className="mt-3 w-full rounded-lg px-3 py-2 text-sm font-medium text-white"
                                        style={{ backgroundColor: "var(--primary-color)" }}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>,
                            document.body
                        )}
                </div>
            </div>

            {/* Purchase Order Views */}
            <div className="min-w-0">
                {viewMode === "table" && (
                    <PurchaseOrderTable
                        orders={filteredOrders}
                        onRowClick={setSelectedOrder}
                        onDelete={handleDelete}
                        visibleColumns={visibleColumns}
                    />
                )}

                {viewMode === "grid" && (
                    <PurchaseOrderGrid
                        orders={filteredOrders}
                        onRowClick={setSelectedOrder}
                        onDelete={handleDelete}
                        visibleColumns={visibleColumns}
                    />
                )}

                {viewMode === "list" && (
                    <PurchaseOrderList
                        orders={filteredOrders}
                        onRowClick={setSelectedOrder}
                        onDelete={handleDelete}
                        visibleColumns={visibleColumns}
                    />
                )}
            </div>

            {/* Purchase Order Details */}
            {selectedOrder && (
                <PurchaseOrderDetails
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </div>
    );
};

export default PurchaseOrders;