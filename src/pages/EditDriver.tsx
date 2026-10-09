import { useNavigate, useParams } from "react-router-dom";
import drivers from "../data/driversData";
import { useEffect, useState } from "react";

function EditDriver() {
    const navigate = useNavigate();

    const { id } = useParams();

    const savedDrivers = JSON.parse(
        localStorage.getItem("drivers") || "[]"
    );

    const allDrivers = [...drivers, ...savedDrivers];

    const driver = allDrivers.find(
        (driver) => driver.id === id
    );

    console.log("Driver:", driver);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [driverGroup, setDriverGroup] = useState("");
    const [carrier, setCarrier] = useState("");
    const [status, setStatus] = useState("Active");
    const [assignedVehicle, setAssignedVehicle] = useState("");

    const [currentLocation, setCurrentLocation] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [licenseExpiry, setLicenseExpiry] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        if (driver) {
            setFirstName(driver.firstName);
            setLastName(driver.lastName);
            setEmail(driver.email);
            setPhone(driver.phone);

            setDriverGroup(driver.driverGroup);
            setCarrier(driver.carrier);
            setStatus(driver.status);
            setAssignedVehicle(driver.assignedVehicle);

            setCurrentLocation(driver.currentLocation);
            setLicenseNumber(driver.licenseNumber || "");
            setLicenseExpiry(driver.licenseExpiry || "");
            setNotes(driver.notes || "");
        }
    }, [id]);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const savedDrivers = JSON.parse(
            localStorage.getItem("drivers") || "[]"
        );

        const updatedDrivers = savedDrivers.map((driver: any) => {
            if (driver.id === id) {
                return {
                    ...driver,
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
            }

            return driver;
        });

        localStorage.setItem(
            "drivers",
            JSON.stringify(updatedDrivers)
        );

        navigate("/drivers");
    };

    return (
        <div className="w-full min-w-0">

            {/* Page Header */}
            <div className="mb-8">
                {/* <button
                    onClick={() => navigate("/drivers")}
                    className="mb-4 text-sm text-gray-500 hover:text-gray-900"
                >
                    ← Back to Drivers
                </button> */}

                <h1 className="text-3xl font-semibold text-gray-900">
                    Edit Driver
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Update driver information
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-gray-200 bg-white p-6"
            >

                {/* Personal Information */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Personal Information
                    </h2>

                    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* First Name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                First Name
                            </label>

                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-(--primary-color)"
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
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-(--primary-color)"
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
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-(--primary-color)"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Phone
                            </label>

                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-(--primary-color)"
                            />
                        </div>

                    </div>
                </div>

                {/* Driver Information */}
                <div className="mb-8 border-t border-gray-100 pt-8">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Driver Information
                    </h2>

                    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* Driver Group */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Driver Group
                            </label>

                            <select
                                value={driverGroup}
                                onChange={(e) => setDriverGroup(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-(--primary-color)"
                            >
                                <option value="">Select group</option>
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

                            <select
                                value={carrier}
                                onChange={(e) => setCarrier(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-(--primary-color)"
                            >
                                <option value="">Select carrier</option>
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
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-(--primary-color)"
                            >
                                <option value="Active">Active</option>
                                <option value="On Route">On Route</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Suspended">Suspended</option>
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
                                onChange={(e) =>
                                    setAssignedVehicle(e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-(--primary-color)"
                            />
                        </div>

                        {/* Current Location */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Current Location
                            </label>

                            <input
                                type="text"
                                value={currentLocation}
                                onChange={(e) =>
                                    setCurrentLocation(e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-(--primary-color)"
                            />
                        </div>

                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
                    <button
                        type="button"
                        onClick={() => navigate("/drivers")}
                        className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        style={{
                            backgroundColor: "var(--primary-color)",
                        }}
                        className="rounded-lg px-5 py-2.5 text-sm font-medium text-white"
                    >
                        Save Changes
                    </button>
                </div>

            </form>
        </div>
    );
}

export default EditDriver;