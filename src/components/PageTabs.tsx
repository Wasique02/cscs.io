import type React from "react";
import { X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

type Tab = {
    path: string;
    title: string;
};

type PageTabsProps = {
    openTabs: Tab[];
    setOpenTabs: (tabs: Tab[]) => void;
};

function PageTabs({
    openTabs,
    setOpenTabs,
}: PageTabsProps) {

    const location = useLocation();
    const navigate = useNavigate();

    function handleCloseTab(
        event: React.MouseEvent,
        tabPath: string
    ) {
        event.stopPropagation();

        const updatedTabs = openTabs.filter(
            (tab) => tab.path !== tabPath
        );

        setOpenTabs(updatedTabs);

        if (location.pathname === tabPath) {
            const lastTab = updatedTabs[updatedTabs.length - 1];

            if (lastTab) {
                navigate(lastTab.path);
            }
        }
    }

    return (
        <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">

            <div className="scrollbar-hide flex items-center gap-1 overflow-x-auto px-1">

                {openTabs.map((tab) => {

                    const isActive =
                        location.pathname === tab.path;

                    return (
                        <button
                            key={tab.path}
                            onClick={() => navigate(tab.path)}
                            style={
                                isActive
                                    ? {
                                        borderBottomColor: "var(--primary-color)",
                                    }
                                    : undefined
                            }
                            className={`
        group flex min-w-fit shrink-0 items-center gap-2
        border-b-2 px-3 py-2.5
        text-sm font-medium
        transition-all duration-200
        sm:px-4
        ${isActive
                                    ? "bg-gray-50 text-gray-900"
                                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                }
    `}
                        >
                            <span className="whitespace-nowrap">
                                {tab.title}
                            </span>

                            {tab.path !== "/dashboard" && (
                                <span
                                    onClick={(event) =>
                                        handleCloseTab(
                                            event,
                                            tab.path
                                        )
                                    }
                                    className="
                                        flex h-5 w-5 shrink-0
                                        items-center justify-center
                                        rounded-md
                                        text-gray-400
                                        transition
                                        hover:bg-gray-200
                                        hover:text-gray-700
                                    "
                                >
                                    <X size={14} />
                                </span>
                            )}
                        </button>
                    );
                })}

            </div>

        </div>
    );
}

export default PageTabs;