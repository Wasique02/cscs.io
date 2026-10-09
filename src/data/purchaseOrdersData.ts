const purchaseOrders = [
    {
        id: "PO-10001",
        externalId: "EXT-45821",

        supplier: "ABC Supplies",
        supplierCode: "SUP-001",

        type: "Standard",
        status: "Pending",

        businessUnit: "ATGL",

        orderDate: "10/04/2026",
        dueDate: "10/10/2026",
        cancelDate: "",

        originFacility: "Chennai Central Warehouse",
        originFacilityCode: "CHN-01",

        destinationFacility: "Bangalore Distribution Center",
        destinationFacilityCode: "BLR-01",

        pickupStart: "10/06/2026",
        pickupEnd: "10/07/2026",

        currency: "INR",

        subtotal: 45000,
        tax: 8100,
        shippingCost: 1500,
        totalAmount: 54600,

        totalItems: 12,
        totalQuantity: 48,

        createdBy: "Admin",
        createdAt: "10/04/2026 10:30 AM",

        notes: "Regular monthly stock replenishment.",
    },

    {
        id: "PO-10002",
        externalId: "EXT-45822",

        supplier: "Global Logistics",
        supplierCode: "SUP-002",

        type: "Standard",
        status: "Approved",

        businessUnit: "VD20",

        orderDate: "09/28/2026",
        dueDate: "10/05/2026",
        cancelDate: "",

        originFacility: "Chennai Central Warehouse",
        originFacilityCode: "CHN-01",

        destinationFacility: "Hyderabad Distribution Center",
        destinationFacilityCode: "HYD-01",

        pickupStart: "10/01/2026",
        pickupEnd: "10/02/2026",

        currency: "INR",

        subtotal: 72000,
        tax: 12960,
        shippingCost: 2000,
        totalAmount: 86960,

        totalItems: 8,
        totalQuantity: 32,

        createdBy: "Admin",
        createdAt: "09/28/2026 09:15 AM",

        notes: "Approved for scheduled delivery.",
    },

    {
        id: "PO-10003",
        externalId: "EXT-45823",

        supplier: "Prime Industrial",
        supplierCode: "SUP-003",

        type: "Emergency",
        status: "In Progress",

        businessUnit: "ATGL",

        orderDate: "09/26/2026",
        dueDate: "10/02/2026",
        cancelDate: "",

        originFacility: "Bangalore Distribution Center",
        originFacilityCode: "BLR-01",

        destinationFacility: "Chennai Central Warehouse",
        destinationFacilityCode: "CHN-01",

        pickupStart: "09/28/2026",
        pickupEnd: "09/29/2026",

        currency: "INR",

        subtotal: 38000,
        tax: 6840,
        shippingCost: 1200,
        totalAmount: 46040,

        totalItems: 15,
        totalQuantity: 65,

        createdBy: "Operations",
        createdAt: "09/26/2026 02:45 PM",

        notes: "Urgent requirement for warehouse stock.",
    },

    {
        id: "PO-10004",
        externalId: "EXT-45824",

        supplier: "Metro Components",
        supplierCode: "SUP-004",

        type: "Standard",
        status: "Completed",

        businessUnit: "SPRT",

        orderDate: "09/24/2026",
        dueDate: "10/08/2026",
        cancelDate: "",

        originFacility: "Chennai Central Warehouse",
        originFacilityCode: "CHN-01",

        destinationFacility: "Coimbatore Warehouse",
        destinationFacilityCode: "CBE-01",

        pickupStart: "09/27/2026",
        pickupEnd: "09/28/2026",

        currency: "INR",

        subtotal: 95000,
        tax: 17100,
        shippingCost: 2500,
        totalAmount: 114600,

        totalItems: 20,
        totalQuantity: 110,

        createdBy: "Admin",
        createdAt: "09/24/2026 11:20 AM",

        notes: "Order completed successfully.",
    },

    {
        id: "PO-10005",
        externalId: "EXT-45825",

        supplier: "Eastern Traders",
        supplierCode: "SUP-005",

        type: "Standard",
        status: "Cancelled",

        businessUnit: "ATGL",

        orderDate: "09/21/2026",
        dueDate: "10/06/2026",
        cancelDate: "09/25/2026",

        originFacility: "Chennai Central Warehouse",
        originFacilityCode: "CHN-01",

        destinationFacility: "Madurai Warehouse",
        destinationFacilityCode: "MDU-01",

        pickupStart: "09/29/2026",
        pickupEnd: "09/30/2026",

        currency: "INR",

        subtotal: 25000,
        tax: 4500,
        shippingCost: 1000,
        totalAmount: 30500,

        totalItems: 5,
        totalQuantity: 20,

        createdBy: "Admin",
        createdAt: "09/21/2026 04:10 PM",

        notes: "Order cancelled by administrator.",
    },
];

export default purchaseOrders;