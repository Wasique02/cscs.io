import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type React from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import PageTabs from "./PageTabs";
import AccessibilityPanel from "./AccessibilityPanel";

type LayoutProps = {
    children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [isSidebarCollapsed, setIsSidebarCollapsed] =
        useState(false);

    const [isAccessibilityOpen, setIsAccessibilityOpen] =
        useState(false);

    const [fontSize, setFontSize] = useState(() => {
        const savedFontSize = localStorage.getItem("fontSize");

        return savedFontSize
            ? Number(savedFontSize)
            : 16;
    });

    useEffect(() => {
        localStorage.setItem("fontSize", String(fontSize));
    }, [fontSize]);

    const [highContrast, setHighContrast] = useState(() => {
        return localStorage.getItem("highContrast") === "true";
    });
    useEffect(() => {
        localStorage.setItem(
            "highContrast",
            String(highContrast)
        );
    }, [highContrast]);

    const [reduceMotion, setReduceMotion] = useState(() => {
        return localStorage.getItem("reduceMotion") === "true";
    });

    useEffect(() => {
        localStorage.setItem(
            "reduceMotion",
            String(reduceMotion)
        );
    }, [reduceMotion]);

    const [highlightLinks, setHighlightLinks] = useState(() => {
        return localStorage.getItem("highlightLinks") === "true";
    });

    useEffect(() => {
        localStorage.setItem(
            "highlightLinks",
            String(highlightLinks)
        );
    }, [highlightLinks]);

    const [grayscale, setGrayscale] = useState(() => {
        return localStorage.getItem("grayscale") === "true";
    });

    useEffect(() => {
        localStorage.setItem(
            "grayscale",
            String(grayscale)
        );
    }, [grayscale]);

    const [focusIndicator, setFocusIndicator] = useState(() => {
        return localStorage.getItem("focusIndicator") === "true";
    });

    useEffect(() => {
        localStorage.setItem(
            "focusIndicator",
            String(focusIndicator)
        );
    }, [focusIndicator]);

    const [fontStyle, setFontStyle] = useState(() => {
        return localStorage.getItem("fontStyle") || "Inter";
    });

    useEffect(() => {
        localStorage.setItem("fontStyle", fontStyle);
    }, [fontStyle]);

    const resetAccessibility = () => {
        setFontSize(16);
        setFontStyle("Inter");
        setHighContrast(false);
        setReduceMotion(false);
        setHighlightLinks(false);
        setGrayscale(false);
        setFocusIndicator(false);
    };

    const [primaryColor, setPrimaryColor] = useState(
        localStorage.getItem("primaryColor") || "#111827"
    );

    useEffect(() => {
        localStorage.setItem(
            "primaryColor",
            primaryColor
        );
    }, [primaryColor]);

    const [openTabs, setOpenTabs] = useState([
        {
            path: "/dashboard",
            title: "Dashboard",
        },
    ]);

    const location = useLocation();

    useEffect(() => {
        let newTab = {
            path: location.pathname,
            title: "Dashboard",
        };

        if (location.pathname === "/drivers") {
            newTab = {
                path: "/drivers",
                title: "Drivers",
            };
        }

        if (location.pathname === "/drivers/add") {
            newTab = {
                path: "/drivers/add",
                title: "Add Driver",
            };
        }

        if (
            location.pathname.includes("/drivers/") &&
            location.pathname.includes("/edit")
        ) {
            newTab = {
                path: location.pathname,
                title: "Edit Driver",
            };
        }

        if (location.pathname === "/purchase-orders") {
            newTab = {
                path: "/purchase-orders",
                title: "Purchase Orders",
            };
        }

        if (location.pathname === "/purchase-orders/create") {
            newTab = {
                path: "/purchase-orders/create",
                title: "Create Purchase Order",
            };
        }

        if (
            location.pathname.includes("/purchase-orders/") &&
            location.pathname.includes("/edit")
        ) {
            newTab = {
                path: location.pathname,
                title: "Edit Purchase Order",
            };
        }

        const tabAlreadyOpen = openTabs.some(
            (tab) => tab.path === newTab.path
        );

        if (!tabAlreadyOpen) {
            setOpenTabs([...openTabs, newTab]);
        }
    }, [location.pathname]);

    const fontScale = fontSize / 16;

    return (
        <div
            className={`min-h-screen accessibility-font ${highContrast
                ? "bg-white text-black"
                : "bg-gray-100"
                } ${reduceMotion
                    ? "[&_*]:!transition-none [&_*]:!duration-0 [&_*]:!animate-none"
                    : ""
                } ${highlightLinks
                    ? "[&_a]:underline [&_a]:underline-offset-2"
                    : ""
                } ${grayscale
                    ? "grayscale"
                    : ""
                } ${focusIndicator
                    ? "accessibility-focus"
                    : ""
                }`}
            style={
                {
                    "--font-scale": fontScale,
                    "--font-style": fontStyle,
                    "--primary-color": primaryColor,
                    "--sidebar-color":
                        "color-mix(in srgb, var(--primary-color) 10%, #111827)",
                    "--sidebar-hover":
                        "color-mix(in srgb, var(--primary-color) 15%, #111827)",
                } as React.CSSProperties & {
                    "--font-scale": number;
                    "--font-style": string;
                    "--primary-color": string;
                    "--sidebar-color": string;
                    "--sidebar-hover": string;
                }
            }
        >

            {/* Navbar */}
            <Navbar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarCollapsed={isSidebarCollapsed}
                primaryColor={primaryColor}
                setPrimaryColor={setPrimaryColor}
            />

            {/* Sidebar */}
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarCollapsed={isSidebarCollapsed}
                setIsSidebarCollapsed={setIsSidebarCollapsed}
                primaryColor={primaryColor}
                onAccessibilityClick={() =>
                    setIsAccessibilityOpen(true)
                }
            />

            {/* Main Content */}
            <main
                className={`min-w-0 pt-20 px-4 pb-4 sm:px-5 sm:pb-5
                    lg:px-6 lg:pb-6 transition-all duration-300
                    ${isSidebarCollapsed
                        ? "lg:ml-20"
                        : "lg:ml-64"
                    }`}
            >
                <PageTabs
                    openTabs={openTabs}
                    setOpenTabs={setOpenTabs}
                />

                <div
                    key={location.pathname}
                    className="page-enter"
                >
                    {children}
                </div>
            </main>

            {/* Accessibility Panel */}
            {isAccessibilityOpen && (
                <AccessibilityPanel
                    onClose={() =>
                        setIsAccessibilityOpen(false)
                    }
                    onReset={resetAccessibility}
                    primaryColor={primaryColor}
                    setPrimaryColor={setPrimaryColor}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    fontStyle={fontStyle}
                    setFontStyle={setFontStyle}
                    highContrast={highContrast}
                    setHighContrast={setHighContrast}
                    reduceMotion={reduceMotion}
                    setReduceMotion={setReduceMotion}
                    highlightLinks={highlightLinks}
                    setHighlightLinks={setHighlightLinks}
                    grayscale={grayscale}
                    setGrayscale={setGrayscale}
                    focusIndicator={focusIndicator}
                    setFocusIndicator={setFocusIndicator}
                />
            )}

        </div>
    );
}

export default Layout;