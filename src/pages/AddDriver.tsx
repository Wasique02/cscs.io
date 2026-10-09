import { ArrowLeft, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type React from "react";

function AddDriver() {
    const navigate = useNavigate();

    const savedDraft = localStorage.getItem("addDriverDraft");

    const draft = savedDraft
        ? JSON.parse(savedDraft)
        : null;

    const [firstName, setFirstName] = useState(draft?.firstName || "");
    const [lastName, setLastName] = useState(draft?.lastName || "");
    const [email, setEmail] = useState(draft?.email || "");
    const [phone, setPhone] = useState(draft?.phone || "");

    const [driverGroup, setDriverGroup] = useState(draft?.driverGroup || "");
    const [carrier, setCarrier] = useState(draft?.carrier || "");
    const [status, setStatus] = useState(draft?.status || "Active");
    const [assignedVehicle, setAssignedVehicle] = useState(
        draft?.assignedVehicle || ""
    );

    const [currentLocation, setCurrentLocation] = useState(
        draft?.currentLocation || ""
    );
    const [licenseNumber, setLicenseNumber] = useState(
        draft?.licenseNumber || ""
    );
    const [licenseExpiry, setLicenseExpiry] = useState(
        draft?.licenseExpiry || ""
    );
    const [notes, setNotes] = useState(draft?.notes || "");

    useEffect(() => {
        const draft = {
            firstName,
            lastName,
            email,
            phone,
            driverGroup,
            carrier,
            status,
            assignedVehicle,
            currentLocation,
            licenseNumber,
            licenseExpiry,
            notes,
        };

        localStorage.setItem(
            "addDriverDraft",
            JSON.stringify(draft)
        );
    }, [
        firstName,
        lastName,
        email,
        phone,
        driverGroup,
        carrier,
        status,
        assignedVehicle,
        currentLocation,
        licenseNumber,
        licenseExpiry,
        notes,
    ]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newDriver = {
            id: `DRV-${Date.now()}`,
            firstName,
            lastName,
            createdAt: new Date().toISOString(),
            email,
            phone,
            driverGroup,
            carrier,
            status,
            currentLocation,
            assignedVehicle,
            licenseNumber,
            licenseExpiry,
            notes,
        };

        // Get existing saved drivers
        const existingDrivers = JSON.parse(
            localStorage.getItem("drivers") || "[]"
        );

        // Add new driver
        existingDrivers.push(newDriver);

        // Save updated drivers
        localStorage.setItem(
            "drivers",
            JSON.stringify(existingDrivers)
        );

        localStorage.removeItem("addDriverDraft");

        console.log("Driver saved:", newDriver);
    };

    return (
        <div className="w-full min-w-0">

            {/* Page Header */}
            <div className="mb-6">

                <div className="flex items-start gap-3">

                    <div
                        className="flex h-11 w-11 items-center justify-center rounded-lg"
                        style={{
                            backgroundColor: "color-mix(in srgb, var(--primary-color) 10%, white)",
                        }}
                    >
                        <UserPlus
                            size={22}
                            style={{
                                color: "var(--primary-color)",
                            }}
                        />
                    </div>

                    <div>

                        <h1 className="text-2xl font-semibold text-gray-900">
                            Add Driver
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Add a new driver to your system
                        </p>

                    </div>

                </div>

            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-gray-200 bg-white"
            >
                {/* ================= BASIC INFORMATION ================= */}

                <div className="border-b border-gray-200 p-5 sm:p-6">

                    <h2 className="text-base font-semibold text-gray-900">
                        Basic Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Enter the driver's personal information.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

                        {/* First Name */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                First Name
                            </label>

                            <input
                                type="text"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                placeholder="Enter first name"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
    text-sm text-gray-900 outline-none
    placeholder:text-gray-400
    focus:border-(--primary-color) focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Last Name */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Last Name
                            </label>

                            <input
                                type="text"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                                placeholder="Enter last name"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
    text-sm text-gray-900 outline-none
    placeholder:text-gray-400
    focus:border-(--primary-color) focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                        {/* Email */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="Enter email address"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
    text-sm text-gray-900 outline-none
    placeholder:text-gray-400
    focus:border-(--primary-color) focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                        {/* Phone */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Phone
                            </label>

                            <input
                                type="tel"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                placeholder="Enter phone number"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
    text-sm text-gray-900 outline-none
    placeholder:text-gray-400
    focus:border-(--primary-color) focus:ring-2 focus:ring-blue-100"
                            />

                        </div>
                    </div>

                </div>
                            
                {/* ================= DRIVER ASSIGNMENT ================= */}

                <div className="border-b border-gray-200 p-5 sm:p-6">

                    <h2 className="text-base font-semibold text-gray-900">
                        Driver Assignment
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Assign the driver to a group, carrier and vehicle.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

                        {/* Driver Group */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Driver Group
                            </label>

                            <select
                                value={driverGroup}
                                onChange={(event) => setDriverGroup(event.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5
                                text-sm text-gray-700 outline-none
                                focus:border-(--primary-color) focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="">
                                    Select driver group
                                </option>

                                <option value="West Coast Haulers">
                                    West Coast Haulers
                                </option>

                                <option value="East Coast Haulers">
                                    East Coast Haulers
                                </option>

                                <option value="Central Haulers">
                                    Central Haulers
                                </option>

                            </select>

                        </div>

                        {/* Carrier */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Carrier
                            </label>

                            <select value={carrier}
                                onChange={(event) => setCarrier(event.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5
                                text-sm text-gray-700 outline-none
                                focus:border-(--primary-color) focus:ring-2 focus:ring-blue-100"
                            >

                                <option value="">
                                    Select carrier
                                </option>

                                <option value="Prime Logistics">
                                    Prime Logistics
                                </option>

                                <option value="Global Transport">
                                    Global Transport
                                </option>

                            </select>

                        </div>

                        {/* Status */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Status
                            </label>

                            <select
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5
                                text-sm text-gray-700 outline-none
                                focus:border-(--primary-color) focus:ring-2 focus:ring-blue-100"
                            >

                                <option value="Active">
                                    Active
                                </option>

                                <option value="On Route">
                                    On Route
                                </option>

                                <option value="Inactive">
                                    Inactive
                                </option>

                                <option value="Suspended">
                                    Suspended
                                </option>

                            </select>

                        </div>

                        {/* Assigned Vehicle */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Assigned Vehicle
                            </label>

                            <input
                                type="text"
                                value={assignedVehicle}
                                onChange={(event) => setAssignedVehicle(event.target.value)}
                                placeholder="Example: Truck T-987"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                                text-sm text-gray-900 outline-none
                                placeholder:text-gray-400
                                focus:border-(--primary-color) focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                    </div>

                </div>

                {/* ================= LOCATION & ADDITIONAL ================= */}

                <div className="border-b border-gray-200 p-5 sm:p-6">

                    <h2 className="text-base font-semibold text-gray-900">
                        Location & Additional Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Add location, license and other driver details.
                    </p>


                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

                        {/* Current Location */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Current Location
                            </label>

                            <input
                                type="text"
                                value={currentLocation}
                                onChange={(event) => setCurrentLocation(event.target.value)}
                                placeholder="Example: Los Angeles, CA"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                                text-sm text-gray-900 outline-none
                                placeholder:text-gray-400
                                focus:border-(--primary-color) focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                        {/* License Number */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                License Number
                            </label>

                            <input
                                type="text"
                                value={licenseNumber}
                                onChange={(event) => setLicenseNumber(event.target.value)}
                                placeholder="Enter license number"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                                text-sm text-gray-900 outline-none
                                placeholder:text-gray-400
                                focus:border-(--primary-color) focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                        {/* License Expiry */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                License Expiry
                            </label>

                            <input
                                type="date"
                                value={licenseExpiry}
                                onChange={(event) => setLicenseExpiry(event.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                                text-sm text-gray-700 outline-none
                                focus:border-(--primary-color) focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                        {/* Notes */}
                        <div className="sm:col-span-2">

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Notes
                            </label>

                            <textarea
                                value={notes}
                                onChange={(event) => setNotes(event.target.value)}
                                rows={4}
                                placeholder="Add any additional information..."
                                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5
                                text-sm text-gray-900 outline-none
                                placeholder:text-gray-400
                                focus:border-(--primary-color) focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                    </div>

                </div>

                {/* ================= BUTTONS ================= */}

                <div className="flex flex-col-reverse gap-3 p-5 sm:flex-row sm:justify-end sm:p-6">

                    <button
                        type="button"
                        onClick={() => navigate("/drivers")}
                        className="flex w-full items-center justify-center gap-2 rounded-lg
    border border-gray-300 bg-white px-4 py-2.5
    text-sm font-medium text-gray-700
    transition hover:bg-gray-50
    sm:w-auto"
                    >
                        <ArrowLeft size={16} />
                        Cancel
                    </button>


                    <button
                        type="submit"
                        style={{
                            backgroundColor: "var(--primary-color)",
                        }}
                        className="w-full rounded-lg px-5 py-2.5
    text-sm font-medium text-white
    transition
    sm:w-auto"
                    >
                        Save Driver
                    </button>

                </div>

            </form>

        </div>
    );
}

export default AddDriver;