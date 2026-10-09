import { Menu, X, Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

type NavbarProps = {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
    isSidebarCollapsed: boolean;
    primaryColor: string;
    setPrimaryColor: (value: string) => void;
};

function Navbar({
    isSidebarOpen,
    setIsSidebarOpen,
    isSidebarCollapsed,
    primaryColor,
    setPrimaryColor,
}: NavbarProps) {

    const location = useLocation();

    let pageTitle = "Dashboard";

    if (location.pathname === "/drivers") {
        pageTitle = "Drivers";
    }

    if (location.pathname === "/drivers/add") {
        pageTitle = "Add Driver";
    }

    if (
        location.pathname.includes("/drivers/") &&
        location.pathname.includes("/edit")
    ) {
        pageTitle = "Edit Driver";
    }

    return (
        <header
            className={`
        fixed inset-x-0 top-0 z-50
        flex h-16 items-center justify-between
        border-b border-slate-200
        bg-slate-50 px-4 shadow-sm
        transition-all duration-300
        sm:px-6
        ${isSidebarCollapsed ? "lg:left-20" : "lg:left-64"}
    `}
        >

            {/* Left Side */}
            <div className="flex min-w-0 items-center gap-3">

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="shrink-0 rounded-lg p-2
                    text-slate-600 transition
                    hover:bg-slate-200
                    hover:text-slate-900
                    lg:hidden"
                >
                    {isSidebarOpen ? (
                        <X size={24} />
                    ) : (
                        <Menu size={24} />
                    )}
                </button>

                {/* Page Title */}
                <h1 className="truncate text-lg font-bold text-slate-800">
                    {pageTitle}
                </h1>

            </div>

            {/* Right Side */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">

                {/* Notification */}
                <button
                    style={{ color: primaryColor }}
                    className="relative rounded-lg p-2"
                >
                    <Bell size={20} />
                </button>

                {/* User */}
                <div className="flex items-center gap-2">

                    <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center
    rounded-full font-medium text-white"
                        style={{
                            backgroundColor: "var(--primary-color)",
                        }}
                    >
                        K
                    </div>

                    {/* Hide Admin text on very small screens */}
                    <span
                        className="hidden text-sm
                        font-medium text-slate-700 sm:block"
                    >
                        Admin
                    </span>

                </div>

            </div>

        </header>
    );
}

export default Navbar;