import { X, Accessibility } from "lucide-react";

type AccessibilityPanelProps = {
    onClose: () => void;
    onReset: () => void;

    primaryColor: string;
    setPrimaryColor: (value: string) => void;

    fontSize: number;
    setFontSize: (value: number | ((prev: number) => number)) => void;

    fontStyle: string;
    setFontStyle: (value: string) => void;

    highContrast: boolean;
    setHighContrast: (value: boolean) => void;

    reduceMotion: boolean;
    setReduceMotion: (value: boolean) => void;

    highlightLinks: boolean;
    setHighlightLinks: (value: boolean) => void;

    grayscale: boolean;
    setGrayscale: (value: boolean) => void;

    focusIndicator: boolean;
    setFocusIndicator: (value: boolean) => void;
};

const AccessibilityPanel = ({
    onClose,
    onReset,
    primaryColor,
    setPrimaryColor,
    fontSize,
    setFontSize,
    fontStyle,
    setFontStyle,
    highContrast,
    setHighContrast,
    reduceMotion,
    setReduceMotion,
    highlightLinks,
    setHighlightLinks,
    grayscale,
    setGrayscale,
    focusIndicator,
    setFocusIndicator,
}: AccessibilityPanelProps) => {
    return (
        <div className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-sm flex-col bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{
                            backgroundColor:
                                "color-mix(in srgb, var(--primary-color) 10%, white)",
                            color: "var(--primary-color)",
                        }}
                    >
                        <Accessibility size={20} />
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-gray-800">
                            Accessibility
                        </h2>

                        <p className="text-xs text-gray-500">
                            Customize your experience
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Close accessibility panel"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-6 overflow-y-auto p-5">


                {/* Theme Color */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                        Theme Color
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                        Customize your website's primary color.
                    </p>

                    <div className="mt-3 flex items-center justify-between rounded-lg border border-gray-200 p-3">
                        <div className="flex items-center gap-3">
                            <div
                                className="h-9 w-9 rounded-full border border-gray-200"
                                style={{ backgroundColor: primaryColor }}
                            />

                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    Primary color
                                </p>
                                <p className="text-xs uppercase text-gray-500">
                                    {primaryColor}
                                </p>
                            </div>
                        </div>

                        <div className="relative h-9 w-9 shrink-0">
                            <input
                                type="color"
                                value={primaryColor}
                                onChange={(e) => setPrimaryColor(e.target.value)}
                                aria-label="Choose theme color"
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            />

                            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-200 bg-white shadow-sm">
                                <div
                                    className="h-5 w-5 rounded-full"
                                    style={{ backgroundColor: primaryColor }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Size */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                        Text Size
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                        Adjust the text size across the website.
                    </p>

                    <div className="mt-3 flex gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                setFontSize((prev) => Math.max(12, prev - 1))
                            }
                            disabled={fontSize === 12}
                            className={`flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${fontSize === 12
                                ? "cursor-not-allowed border-gray-100 bg-gray-100 text-gray-400"
                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            A-
                        </button>

                        <button
                            type="button"
                            onClick={() => setFontSize(16)}
                            className={`flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${fontSize === 16
                                ? "border-gray-800 bg-gray-800 text-white"
                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            Default
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setFontSize((prev) => Math.min(24, prev + 1))
                            }
                            disabled={fontSize === 24}
                            className={`flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${fontSize === 24
                                ? "cursor-not-allowed border-gray-100 bg-gray-100 text-gray-400"
                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            A+
                        </button>
                    </div>
                </div>

                {/* Font Style */}
                <div>
                    <p className="text-sm font-medium text-gray-800">
                        Font Style
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        Choose a font that feels comfortable to read.
                    </p>

                    <select
                        value={fontStyle}
                        onChange={(e) => setFontStyle(e.target.value)}
                        className="mt-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400"
                    >
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Atkinson Hyperlegible">
                            Atkinson Hyperlegible
                        </option>
                    </select>
                </div>

                {/* High Contrast */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-800">
                            High Contrast
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Increase color contrast.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setHighContrast(!highContrast)}
                        className={`relative h-6 w-11 rounded-full transition ${highContrast
                            ? "bg-gray-800"
                            : "bg-gray-300"
                            }`}
                        aria-label="Toggle high contrast"
                    >
                        <span
                            className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow-sm transition ${highContrast
                                ? "translate-x-5"
                                : "translate-x-0.5"
                                }`}
                        />
                    </button>
                </div>

                {/* Reduce Motion */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-800">
                            Reduce Motion
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Reduce animations and transitions.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setReduceMotion(!reduceMotion)}
                        className={`relative h-6 w-11 rounded-full transition ${reduceMotion
                            ? "bg-gray-800"
                            : "bg-gray-300"
                            }`}
                        aria-label="Toggle reduce motion"
                    >
                        <span
                            className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow-sm transition ${reduceMotion
                                ? "translate-x-5"
                                : "translate-x-0.5"
                                }`}
                        />
                    </button>
                </div>

                {/* Highlight Links */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-800">
                            Highlight Links
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Make links easier to identify.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setHighlightLinks(!highlightLinks)
                        }
                        className={`relative h-6 w-11 rounded-full transition ${highlightLinks
                            ? "bg-gray-800"
                            : "bg-gray-300"
                            }`}
                        aria-label="Toggle highlight links"
                    >
                        <span
                            className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow-sm transition ${highlightLinks
                                ? "translate-x-5"
                                : "translate-x-0.5"
                                }`}
                        />
                    </button>
                </div>

                {/* Grayscale */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-800">
                            Grayscale
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Remove colors from the interface.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setGrayscale(!grayscale)}
                        className={`relative h-6 w-11 rounded-full transition ${grayscale
                            ? "bg-gray-800"
                            : "bg-gray-300"
                            }`}
                        aria-label="Toggle grayscale"
                    >
                        <span
                            className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow-sm transition ${grayscale
                                ? "translate-x-5"
                                : "translate-x-0.5"
                                }`}
                        />
                    </button>
                </div>

                {/* Focus Indicator */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-800">
                            Focus Indicator
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Make focused elements easier to see.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setFocusIndicator(!focusIndicator)
                        }
                        className={`relative h-6 w-11 rounded-full transition ${focusIndicator
                            ? "bg-gray-800"
                            : "bg-gray-300"
                            }`}
                        aria-label="Toggle focus indicator"
                    >
                        <span
                            className={`absolute top-0.5 block h-5 w-5 rounded-full bg-white shadow-sm transition ${focusIndicator
                                ? "translate-x-5"
                                : "translate-x-0.5"
                                }`}
                        />
                    </button>
                </div>

                <button
                    type="button"
                    onClick={onReset}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    Reset Accessibility
                </button>

            </div>
        </div>
    );
};

export default AccessibilityPanel;