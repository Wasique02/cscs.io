import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import purchaseOrders from "../data/purchaseOrdersData";

type OrderItem = {
    id: number;
    itemName: string;
    quantity: number;
    unitPrice: number;
};

const AddPurchaseOrder = () => {
    const navigate = useNavigate();

    // Basic Information
    const [externalId, setExternalId] = useState("");
    const [supplier, setSupplier] = useState("");
    const [supplierCode, setSupplierCode] = useState("");
    const [type, setType] = useState("Standard");
    const [status, setStatus] = useState("Pending");
    const [businessUnit, setBusinessUnit] = useState("");

    // Dates
    const [orderDate, setOrderDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [cancelDate, setCancelDate] = useState("");

    // Shipment
    const [originFacility, setOriginFacility] = useState("");
    const [originFacilityCode, setOriginFacilityCode] = useState("");
    const [destinationFacility, setDestinationFacility] = useState("");
    const [destinationFacilityCode, setDestinationFacilityCode] =
        useState("");
    const [pickupStart, setPickupStart] = useState("");
    const [pickupEnd, setPickupEnd] = useState("");

    // Financial
    const [currency, setCurrency] = useState("INR");
    const [tax, setTax] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);

    // Additional Information
    const [createdBy, setCreatedBy] = useState("");
    const [notes, setNotes] = useState("");

    // Order Items
    const [items, setItems] = useState<OrderItem[]>([
        {
            id: 1,
            itemName: "",
            quantity: 1,
            unitPrice: 0,
        },
    ]);

    // Add new item
    const addItem = () => {
        setItems([
            ...items,
            {
                id: Date.now(),
                itemName: "",
                quantity: 1,
                unitPrice: 0,
            },
        ]);
    };

    // Remove item
    const removeItem = (id: number) => {
        if (items.length === 1) {
            return;
        }

        setItems(items.filter((item) => item.id !== id));
    };

    // Update item
    const updateItem = (
        id: number,
        field: keyof OrderItem,
        value: string | number
    ) => {
        setItems(
            items.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        [field]: value,
                    }
                    : item
            )
        );
    };

    // Calculate subtotal
    const subtotal = items.reduce(
        (total, item) =>
            total + Number(item.quantity) * Number(item.unitPrice),
        0
    );

    // Calculate total quantity
    const totalQuantity = items.reduce(
        (total, item) => total + Number(item.quantity),
        0
    );

    // Number of different items
    const totalItems = items.length;

    // Calculate total amount
    const totalAmount =
        subtotal + Number(tax) + Number(shippingCost);

    // Create Purchase Order
    const handleCreatePurchaseOrder = () => {

        console.log("CREATE BUTTON CLICKED");

        const newPurchaseOrder = {
            id: `PO-${Date.now()}`,
            externalId,
            supplier,
            supplierCode,
            type,
            status,
            businessUnit,
            orderDate,
            dueDate,
            cancelDate,
            originFacility,
            originFacilityCode,
            destinationFacility,
            destinationFacilityCode,
            pickupStart,
            pickupEnd,
            currency,
            subtotal,
            tax: Number(tax),
            shippingCost: Number(shippingCost),
            totalAmount,
            totalItems,
            totalQuantity,
            createdBy,
            createdAt: new Date().toISOString(),
            notes,
            items,
        };

        // Get existing orders from localStorage
        const storedOrders = localStorage.getItem("purchaseOrders");

        const existingOrders = storedOrders
            ? JSON.parse(storedOrders)
            : purchaseOrders;

        // Add the new order
        const updatedOrders = [...existingOrders, newPurchaseOrder];

        localStorage.setItem(
            "purchaseOrders",
            JSON.stringify(updatedOrders)
        );

        console.log(
            "Saved Orders:",
            JSON.parse(localStorage.getItem("purchaseOrders") || "[]")
        );

        navigate("/purchase-orders");
    };

    return (
        <div className="space-y-6">

            {/* Page Header */}
            <div className="border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                    Create Purchase Order
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Create a new purchase order
                </p>
            </div>

            {/* Basic Information */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Basic Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Enter the basic details of the purchase order.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* External ID */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            External ID
                        </label>

                        <input
                            type="text"
                            value={externalId}
                            onChange={(e) =>
                                setExternalId(e.target.value)
                            }
                            placeholder="Enter external ID"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Supplier */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Supplier
                        </label>

                        <input
                            type="text"
                            value={supplier}
                            onChange={(e) =>
                                setSupplier(e.target.value)
                            }
                            placeholder="Enter supplier name"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Supplier Code */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Supplier Code
                        </label>

                        <input
                            type="text"
                            value={supplierCode}
                            onChange={(e) =>
                                setSupplierCode(e.target.value)
                            }
                            placeholder="Enter supplier code"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Order Type */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Order Type
                        </label>

                        <select
                            value={type}
                            onChange={(e) =>
                                setType(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        >
                            <option value="Standard">
                                Standard
                            </option>

                            <option value="Emergency">
                                Emergency
                            </option>
                        </select>
                    </div>

                    {/* Business Unit */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Business Unit
                        </label>

                        <input
                            type="text"
                            value={businessUnit}
                            onChange={(e) =>
                                setBusinessUnit(e.target.value)
                            }
                            placeholder="Enter business unit"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        >
                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Approved">
                                Approved
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Completed">
                                Completed
                            </option>

                            <option value="Cancelled">
                                Cancelled
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Dates */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Dates
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Set the important dates for this purchase order.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                    {/* Order Date */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Order Date
                        </label>

                        <input
                            type="date"
                            value={orderDate}
                            onChange={(e) =>
                                setOrderDate(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Due Date
                        </label>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) =>
                                setDueDate(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Cancel Date */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Cancel Date
                        </label>

                        <input
                            type="date"
                            value={cancelDate}
                            onChange={(e) =>
                                setCancelDate(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>
                </div>
            </div>

            {/* Shipment */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Shipment
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Enter the origin, destination and pickup window.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* Origin Facility */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Origin Facility
                        </label>

                        <input
                            type="text"
                            value={originFacility}
                            onChange={(e) =>
                                setOriginFacility(e.target.value)
                            }
                            placeholder="Enter origin facility"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Origin Facility Code */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Origin Facility Code
                        </label>

                        <input
                            type="text"
                            value={originFacilityCode}
                            onChange={(e) =>
                                setOriginFacilityCode(e.target.value)
                            }
                            placeholder="Enter origin facility code"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Destination Facility */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Destination Facility
                        </label>

                        <input
                            type="text"
                            value={destinationFacility}
                            onChange={(e) =>
                                setDestinationFacility(e.target.value)
                            }
                            placeholder="Enter destination facility"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Destination Facility Code */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Destination Facility Code
                        </label>

                        <input
                            type="text"
                            value={destinationFacilityCode}
                            onChange={(e) =>
                                setDestinationFacilityCode(e.target.value)
                            }
                            placeholder="Enter destination facility code"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Pickup Start */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Pickup Start
                        </label>

                        <input
                            type="datetime-local"
                            value={pickupStart}
                            onChange={(e) =>
                                setPickupStart(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Pickup End */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Pickup End
                        </label>

                        <input
                            type="datetime-local"
                            value={pickupEnd}
                            onChange={(e) =>
                                setPickupEnd(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Order Items
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Add the products included in this purchase order.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={addItem}
                        className="flex w-fit items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <Plus size={16} />
                        Add Item
                    </button>
                </div>

                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="rounded-lg border border-gray-200 p-4"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-800">
                                    Item {index + 1}
                                </h3>

                                {items.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeItem(item.id)
                                        }
                                        className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Trash2 size={17} />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                                {/* Item Name */}
                                <div className="md:col-span-1">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Item
                                    </label>

                                    <input
                                        type="text"
                                        value={item.itemName}
                                        onChange={(e) =>
                                            updateItem(
                                                item.id,
                                                "itemName",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter item name"
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                                    />
                                </div>

                                {/* Quantity */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Quantity
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            updateItem(
                                                item.id,
                                                "quantity",
                                                Number(e.target.value)
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                                    />
                                </div>

                                {/* Unit Price */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Unit Price
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        value={item.unitPrice}
                                        onChange={(e) =>
                                            updateItem(
                                                item.id,
                                                "unitPrice",
                                                Number(e.target.value)
                                            )
                                        }
                                        placeholder="0.00"
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <p className="text-sm text-gray-500">
                                    Item Total:{" "}
                                    <span className="font-semibold text-gray-900">
                                        {currency}{" "}
                                        {(
                                            Number(item.quantity) *
                                            Number(item.unitPrice)
                                        ).toFixed(2)}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Financial Summary */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Financial Summary
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Review the purchase order amounts.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                    {/* Currency */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Currency
                        </label>

                        <select
                            value={currency}
                            onChange={(e) =>
                                setCurrency(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        >
                            <option value="INR">INR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>

                    {/* Tax */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Tax
                        </label>

                        <input
                            type="number"
                            min="0"
                            value={tax}
                            onChange={(e) =>
                                setTax(Number(e.target.value))
                            }
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Shipping */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Shipping Cost
                        </label>

                        <input
                            type="number"
                            min="0"
                            value={shippingCost}
                            onChange={(e) =>
                                setShippingCost(Number(e.target.value))
                            }
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>
                </div>

                {/* Summary */}
                <div className="mt-6 border-t border-gray-200 pt-5">
                    <div className="ml-auto max-w-sm space-y-3">

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">
                                Total Items
                            </span>

                            <span className="font-medium text-gray-900">
                                {totalItems}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">
                                Total Quantity
                            </span>

                            <span className="font-medium text-gray-900">
                                {totalQuantity}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">
                                Subtotal
                            </span>

                            <span className="font-medium text-gray-900">
                                {currency} {subtotal.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">
                                Tax
                            </span>

                            <span className="font-medium text-gray-900">
                                {currency} {Number(tax).toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">
                                Shipping
                            </span>

                            <span className="font-medium text-gray-900">
                                {currency}{" "}
                                {Number(shippingCost).toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between border-t border-gray-200 pt-3">
                            <span className="font-semibold text-gray-900">
                                Total Amount
                            </span>

                            <span className="font-semibold text-gray-900">
                                {currency} {totalAmount.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Information */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Additional Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Add creation details and notes for this order.
                    </p>
                </div>

                <div className="space-y-5">

                    {/* Created By */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Created By
                        </label>

                        <input
                            type="text"
                            value={createdBy}
                            onChange={(e) =>
                                setCreatedBy(e.target.value)
                            }
                            placeholder="Enter creator name"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Notes
                        </label>

                        <textarea
                            value={notes}
                            onChange={(e) =>
                                setNotes(e.target.value)
                            }
                            placeholder="Enter notes"
                            rows={4}
                            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                        />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                    type="button"
                    onClick={() =>
                        navigate("/purchase-orders")
                    }
                    className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={handleCreatePurchaseOrder}
                    style={{
                        backgroundColor: "var(--primary-color)",
                    }}
                    className="rounded-lg px-5 py-2.5 text-sm font-medium text-white transition"
                >
                    Create Purchase Order
                </button>
            </div>
        </div>
    );
};

export default AddPurchaseOrder;