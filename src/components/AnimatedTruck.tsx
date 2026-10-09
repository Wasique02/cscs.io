
export default function AnimatedTruck() {
    return (
        <div className="truck-scene">
            {/* Background glow */}
            <div className="truck-glow" />

            {/* Road perspective */}
            <svg
                className="truck-road"
                viewBox="0 0 600 700"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
            >
                <path
                    d="M285 300 L80 700"
                    stroke="#164e63"
                    strokeWidth="3"
                    fill="none"
                />
                <path
                    d="M315 300 L520 700"
                    stroke="#164e63"
                    strokeWidth="3"
                    fill="none"
                />
                <path
                    d="M300 330 L300 390 M300 430 L300 490 M300 535 L300 610"
                    stroke="#67e8f9"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                />
                <path
                    d="M285 300 L80 700 L520 700 L315 300 Z"
                    fill="url(#roadGradient)"
                    opacity=".6"
                />
                <defs>
                    <linearGradient
                        id="roadGradient"
                        x1="300"
                        y1="300"
                        x2="300"
                        y2="700"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#164e63" stopOpacity=".05" />
                        <stop offset="1" stopColor="#164e63" stopOpacity=".35" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Truck */}
            <div className="truck-arrival">
                <svg
                    viewBox="0 0 520 300"
                    className="w-full drop-shadow-2xl"
                    role="img"
                    aria-label="Blue logistics truck approaching on a road"
                >
                    {/* Trailer */}
                    <path
                        d="M110 65 L350 65 L350 193 L110 193 Z"
                        fill="#dbeafe"
                        stroke="#93c5fd"
                        strokeWidth="3"
                    />
                    <path
                        d="M120 78 H340 M120 88 H340"
                        stroke="#bfdbfe"
                        strokeWidth="2"
                    />
                    <rect
                        x="110"
                        y="65"
                        width="240"
                        height="128"
                        rx="4"
                        fill="#f1f5f9"
                    />
                    <path
                        d="M120 80 H340"
                        stroke="#cbd5e1"
                        strokeWidth="3"
                    />
                    <path
                        d="M110 180 H350"
                        stroke="#2563eb"
                        strokeWidth="7"
                    />

                    {/* Chassis */}
                    <path
                        d="M85 193 H395 L410 212 H75 Z"
                        fill="#334155"
                    />

                    {/* Cabin */}
                    <path
                        d="M350 112 L405 112 L455 157 L455 195 L350 195 Z"
                        fill="#2563eb"
                        stroke="#60a5fa"
                        strokeWidth="3"
                    />

                    {/* Windshield */}
                    <path
                        d="M365 122 H400 L438 157 H365 Z"
                        fill="#082f49"
                        stroke="#7dd3fc"
                        strokeWidth="3"
                    />
                    <path
                        d="M405 122 L439 157"
                        stroke="#38bdf8"
                        strokeWidth="2"
                    />

                    {/* Front bumper */}
                    <path
                        d="M430 178 H455 V199 H420 Z"
                        fill="#cbd5e1"
                    />

                    {/* Headlights */}
                    <path
                        d="M437 164 L453 169 V181 L435 177 Z"
                        fill="#fef3c7"
                    />
                    <path
                        d="M435 164 L453 169"
                        stroke="#fff7ed"
                        strokeWidth="3"
                    />

                    {/* Front grille */}
                    <path
                        d="M438 183 H454 V195 H430 Z"
                        fill="#0f172a"
                    />
                    <path
                        d="M437 187 H451 M435 191 H451"
                        stroke="#64748b"
                        strokeWidth="2"
                    />

                    {/* Wheels */}
                    {[
                        [150, 202],
                        [320, 202],
                        [405, 207],
                    ].map(([cx, cy], index) => (
                        <g key={index}>
                            <ellipse
                                cx={cx}
                                cy={cy}
                                rx="23"
                                ry="31"
                                fill="#020617"
                                stroke="#475569"
                                strokeWidth="5"
                            />
                            <ellipse
                                cx={cx}
                                cy={cy}
                                rx="10"
                                ry="16"
                                fill="#94a3b8"
                            />
                            <circle
                                cx={cx}
                                cy={cy}
                                r="4"
                                fill="#e2e8f0"
                            />
                        </g>
                    ))}

                    {/* Door details */}
                    <path
                        d="M385 162 V190"
                        stroke="#93c5fd"
                        strokeWidth="2"
                    />
                    <rect
                        x="392"
                        y="165"
                        width="12"
                        height="3"
                        rx="1"
                        fill="#bfdbfe"
                    />
                </svg>
            </div>

            {/* Scene label */}
            <div className="truck-caption">
                <span className="truck-status-dot" />
                <span>CONNECTED. IN MOTION.</span>
            </div>
        </div>
    );
}