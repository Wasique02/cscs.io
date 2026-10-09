import {
    NavLink,
    Link,
    useNavigate,
    useLocation,
} from "react-router-dom";

import {
    LayoutDashboard,
    Truck,
    Boxes,
    Layers,
    ClipboardList,
    LogOut,
    X,
    Menu,
    Accessibility,
} from "lucide-react";

import cscslogo from "../assets/cscslogo.png";

type SidebarProps = {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;

    isSidebarCollapsed: boolean;
    setIsSidebarCollapsed: (value: boolean) => void;

    primaryColor: string;

    onAccessibilityClick: () => void;
};

function Sidebar({
    isSidebarOpen,
    setIsSidebarOpen,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    onAccessibilityClick,
}: SidebarProps) {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 z-20 bg-black/40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-30 flex h-screen
                    ${isSidebarCollapsed ? "w-20" : "w-64"}
                    flex-col text-white
                    transform transition-all duration-300
                    ${
                        isSidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full lg:translate-x-0"
                    }`}
                style={{
                    backgroundColor: "var(--sidebar-color)",
                }}
            >

                {/* Logo */}
                <div className="relative flex h-16 shrink-0 items-center border-b border-gray-700">

                    {!isSidebarCollapsed && (
                        <Link
                            to="/dashboard"
                            className="px-6"
                        >
                            <img
                                className="h-auto w-24 brightness-0 invert"
                                src={cscslogo}
                                alt="CSCS Logo"
                            />
                        </Link>
                    )}

                    {/* Desktop Hamburger */}
                    <button
                        type="button"
                        onClick={() =>
                            setIsSidebarCollapsed(
                                !isSidebarCollapsed
                            )
                        }
                        className="absolute right-4 hidden rounded-lg
                            p-2 text-gray-400
                            hover:bg-gray-800 hover:text-white
                            lg:flex"
                    >
                        <Menu size={20} />
                    </button>

                    {/* Mobile Close */}
                    <button
                        type="button"
                        onClick={() => setIsSidebarOpen(false)}
                        className="absolute right-4 rounded-lg
                            p-2 text-gray-400
                            hover:bg-gray-800 hover:text-white
                            lg:hidden"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Navigation */}
                <nav className="custom-scrollbar flex-1 overflow-y-auto p-4">

                    {/* Main */}
                    <div className="mb-6">

                        {!isSidebarCollapsed && (
                            <p
                                className="mb-3 px-3 text-xs font-semibold
                                    uppercase tracking-wider text-gray-500"
                            >
                                Main
                            </p>
                        )}

                        <div className="space-y-1">

                            {/* Dashboard */}
                            <NavLink
                                to="/dashboard"
                                style={
                                    location.pathname === "/dashboard"
                                        ? {
                                            backgroundColor:
                                                "var(--primary-color)",
                                        }
                                        : undefined
                                }
                                onClick={() =>
                                    setIsSidebarOpen(false)
                                }
                                className={({ isActive }) =>
                                    `flex items-center rounded-lg px-3 py-3
                                    text-sm font-medium transition
                                    ${
                                        isSidebarCollapsed
                                            ? "justify-center"
                                            : "gap-3"
                                    }
                                    ${
                                        isActive
                                            ? "text-white"
                                            : "text-gray-300 hover:text-white"
                                    }`
                                }
                            >
                                <LayoutDashboard size={19} />

                                {!isSidebarCollapsed && (
                                    <span>Dashboard</span>
                                )}
                            </NavLink>

                            {/* Drivers */}
                            <NavLink
                                to="/drivers"
                                style={
                                    location.pathname === "/drivers"
                                        ? {
                                            backgroundColor:
                                                "var(--primary-color)",
                                        }
                                        : undefined
                                }
                                onClick={() =>
                                    setIsSidebarOpen(false)
                                }
                                className={({ isActive }) =>
                                    `sidebar-link flex items-center rounded-lg px-3 py-3
                                    text-sm font-medium transition
                                    ${
                                        isSidebarCollapsed
                                            ? "justify-center"
                                            : "gap-3"
                                    }
                                    ${
                                        isActive
                                            ? "text-white"
                                            : "text-gray-300 hover:text-white"
                                    }`
                                }
                            >
                                <Truck size={19} />

                                {!isSidebarCollapsed && (
                                    <span>Drivers</span>
                                )}
                            </NavLink>

                            {/* Purchase Orders */}
                            <NavLink
                                to="/purchase-orders"
                                style={
                                    location.pathname ===
                                    "/purchase-orders"
                                        ? {
                                            backgroundColor:
                                                "var(--primary-color)",
                                        }
                                        : undefined
                                }
                                onClick={() =>
                                    setIsSidebarOpen(false)
                                }
                                className={({ isActive }) =>
                                    `sidebar-link flex items-center rounded-lg px-3 py-3
                                    text-sm font-medium transition
                                    ${
                                        isSidebarCollapsed
                                            ? "justify-center"
                                            : "gap-3"
                                    }
                                    ${
                                        isActive
                                            ? "text-white"
                                            : "text-gray-300 hover:text-white"
                                    }`
                                }
                            >
                                <ClipboardList size={19} />

                                {!isSidebarCollapsed && (
                                    <span>Purchase Orders</span>
                                )}
                            </NavLink>

                            {/* Orders */}
                            {/* <NavLink
                                to="/orders"
                                style={
                                    location.pathname === "/orders"
                                        ? {
                                            backgroundColor:
                                                "var(--primary-color)",
                                        }
                                        : undefined
                                }
                                onClick={() =>
                                    setIsSidebarOpen(false)
                                }
                                className={({ isActive }) =>
                                    `sidebar-link flex items-center rounded-lg px-3 py-3
                                    text-sm font-medium transition
                                    ${
                                        isSidebarCollapsed
                                            ? "justify-center"
                                            : "gap-3"
                                    }
                                    ${
                                        isActive
                                            ? "text-white"
                                            : "text-gray-300 hover:text-white"
                                    }`
                                }
                            >
                                <Package size={19} />

                                {!isSidebarCollapsed && (
                                    <span>Orders</span>
                                )}
                            </NavLink> */}

                            {/* Inventory */}
                            <NavLink
                                to="/inventory"
                                style={
                                    location.pathname === "/inventory"
                                        ? {
                                            backgroundColor:
                                                "var(--primary-color)",
                                        }
                                        : undefined
                                }
                                onClick={() =>
                                    setIsSidebarOpen(false)
                                }
                                className={({ isActive }) =>
                                    `sidebar-link flex items-center rounded-lg px-3 py-3
                                    text-sm font-medium transition
                                    ${
                                        isSidebarCollapsed
                                            ? "justify-center"
                                            : "gap-3"
                                    }
                                    ${
                                        isActive
                                            ? "text-white"
                                            : "text-gray-300 hover:text-white"
                                    }`
                                }
                            >
                                <Boxes size={19} />

                                {!isSidebarCollapsed && (
                                    <span>Inventory</span>
                                )}
                            </NavLink>

                        </div>
                    </div>

                    {/* Management */}
                    <div>

                        {!isSidebarCollapsed && (
                            <p
                                className="mb-3 px-3 text-xs font-semibold
                                    uppercase tracking-wider text-gray-500"
                            >
                                Management
                            </p>
                        )}

                        <div className="space-y-1">

                            {/* Carriers */}
                            <NavLink
                                to="/carriers"
                                style={
                                    location.pathname === "/carriers"
                                        ? {
                                            backgroundColor:
                                                "var(--primary-color)",
                                        }
                                        : undefined
                                }
                                onClick={() =>
                                    setIsSidebarOpen(false)
                                }
                                className={({ isActive }) =>
                                    `sidebar-link flex items-center rounded-lg px-3 py-3
                                    text-sm font-medium transition
                                    ${
                                        isSidebarCollapsed
                                            ? "justify-center"
                                            : "gap-3"
                                    }
                                    ${
                                        isActive
                                            ? "text-white"
                                            : "text-gray-300 hover:text-white"
                                    }`
                                }
                            >
                                <Layers size={19} />

                                {!isSidebarCollapsed && (
                                    <span>Carriers</span>
                                )}
                            </NavLink>

                        </div>
                    </div>

                </nav>

                {/* Bottom Section */}
                <div className="shrink-0 border-t border-gray-700 p-4">

                    {/* Accessibility */}
                    <button
                        type="button"
                        onClick={() => {
                            setIsSidebarOpen(false);
                            onAccessibilityClick();
                        }}
                        className={`mb-1 flex w-full items-center
                            rounded-lg px-3 py-3 text-sm font-medium
                            text-gray-300 transition
                            hover:bg-gray-800 hover:text-white
                            ${
                                isSidebarCollapsed
                                    ? "justify-center"
                                    : "gap-3"
                            }`}
                    >
                        <Accessibility size={19} />

                        {!isSidebarCollapsed && (
                            <span>Accessibility</span>
                        )}
                    </button>

                    {/* Logout */}
                    <button
                        type="button"
                        onClick={() => {
                            localStorage.removeItem(
                                "isLoggedIn"
                            );

                            navigate("/");
                        }}
                        className={`flex w-full items-center
                            rounded-lg px-3 py-3 text-sm font-medium
                            text-gray-300 transition
                            hover:bg-gray-800 hover:text-white
                            ${
                                isSidebarCollapsed
                                    ? "justify-center"
                                    : "gap-3"
                            }`}
                    >
                        <LogOut size={19} />

                        {!isSidebarCollapsed && (
                            <span>Logout</span>
                        )}
                    </button>

                </div>

            </aside>
        </>
    );
}

export default Sidebar;