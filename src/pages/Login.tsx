import { useNavigate } from "react-router-dom";
import LoginPageBg from "../assets/LoginPageBg.jpg";
import type React from "react";
import { useState } from "react";
import cscslogo from "../assets/cscslogo.png";

const stats = [
    { value: "24/7", label: "Live tracking" },
    { value: "100%", label: "Paperless POs" },
    { value: "1 hub", label: "Carriers & brokers" },
];

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function handleLogin(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (email === "admin@gmail.com" && password === "Admin@123") {
            localStorage.setItem("isLoggedIn", "true");
            navigate("/dashboard");
        } else {
            setError("Invalid email or password");
        }
    }

    const inputClass =
        "peer w-full h-11 px-4 pt-4 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-transparent outline-none transition focus:border-emerald-400/70 focus:bg-white/10 focus:ring-4 focus:ring-emerald-400/15";

    const floatingLabelClass =
        "pointer-events-none absolute left-4 top-1.5 text-[11px] font-medium text-white/60 transition-all " +
        "peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal " +
        "peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-emerald-300";

    return (
        <div
            className="relative h-dvh w-full overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${LoginPageBg})` }}
        >
            {/* Colour wash over the photo */}
            <div className="absolute inset-0 bg-linear-to-br from-slate-950/90 via-slate-950/70 to-emerald-950/50" />
            {/* Soft glow accents */}
            <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -right-24 h-md w-md rounded-full bg-cyan-500/20 blur-3xl" />

            <div className="relative mx-auto grid h-dvh w-full max-w-7xl items-center gap-10 px-4 py-3 sm:px-6 md:px-10 lg:grid-cols-2 lg:gap-16">
                {/* Brand panel (desktop only) */}
                <section className="hidden lg:block">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Supply chain, simplified
                    </span>

                    <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight text-white xl:text-6xl">
                        Every shipment.
                        <br />
                        <span className="bg-linear-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                            One clear view.
                        </span>
                    </h1>

                    <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
                        Manage drivers, purchase orders and deliveries from a single
                        workspace built for carriers, brokers and the teams behind them.
                    </p>

                    <div className="mt-10 grid max-w-md grid-cols-3 gap-3">
                        {stats.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                            >
                                <p className="text-xl font-semibold text-white">{item.value}</p>
                                <p className="mt-1 text-xs text-white/60">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Login card */}
                <form
                    onSubmit={handleLogin}
                    className="mx-auto w-full max-w-md rounded-3xl border border-white/15 bg-slate-950/55 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6 lg:ml-auto lg:mr-0"
                >
                    {/* Gradient top edge */}
                    <div className="-mt-5 mb-4 h-1 rounded-full bg-linear-to-r from-emerald-400 via-cyan-400 to-emerald-400 sm:-mt-6 sm:mb-5" />

                    <div className="text-center">
                        <img
                            className="mx-auto h-auto w-28 sm:w-32 invert"
                            src={cscslogo}
                            alt="CSCS Logo"
                        />
                        <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">
                            Welcome back
                        </h2>
                        <p className="mt-0.5 text-sm text-white/60 [@media(max-height:680px)]:hidden">
                            Sign in to continue to your dashboard
                        </p>
                    </div>

                    {/* Email */}
                    <div className="relative mt-4">
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setError("");
                            }}
                            className={inputClass}
                        />
                        <label htmlFor="email" className={floatingLabelClass}>
                            Email
                        </label>
                    </div>

                    {/* Password */}
                    <div className="relative mt-3">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setError("");
                            }}
                            className={`${inputClass} pr-12`}
                        />
                        <label htmlFor="password" className={floatingLabelClass}>
                            Password
                        </label>

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-white/60 transition hover:text-white"
                        >
                            {showPassword ? (
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 3l18 18" />
                                    <path d="M10.6 6.1A10.9 10.9 0 0 1 12 6c5 0 9 4.5 10 6-.5.8-1.6 2.2-3.2 3.5M6.5 7.6C4.3 9 2.8 11 2 12c1 1.5 5 6 10 6 1.6 0 3-.4 4.3-1" />
                                    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 12c1-1.5 5-6 10-6s9 4.5 10 6c-1 1.5-5 6-10 6S3 13.5 2 12z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Error */}
                    <div aria-live="polite" className="min-h-4">
                        {error && (
                            <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 8v4M12 16h.01" />
                                </svg>
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Forgot Password */}
                    <div className="mt-1 text-right">
                        <button
                            type="button"
                            className="text-xs text-emerald-300/90 transition hover:text-emerald-200 sm:text-sm"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="mt-3 h-11 w-full rounded-xl bg-linear-to-r from-emerald-400 to-cyan-400 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:brightness-110 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
                    >
                        Sign in
                    </button>

                    {/* Divider */}
                    <div className="my-3 flex items-center gap-3">
                        <span className="h-px flex-1 bg-white/15" />
                        <span className="text-xs uppercase tracking-wider text-white/40">or</span>
                        <span className="h-px flex-1 bg-white/15" />
                    </div>

                    {/* Google Login */}
                    <button
                        type="button"
                        className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 text-sm font-medium text-white transition hover:bg-white/10"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                            <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.8-5.5 3.8-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.3 14.6 2.3 12 2.3 6.6 2.3 2.3 6.6 2.3 12S6.6 21.7 12 21.7c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z" />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Signup Links */}
                    <div className="mt-4">
                        <p className="mb-1.5 text-center text-xs text-white/50 [@media(max-height:620px)]:hidden">New to CSCS?</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="h-10 rounded-xl border border-white/20 text-xs font-medium text-white/90 transition hover:border-emerald-400/60 hover:bg-emerald-400/10 hover:text-white sm:text-sm"
                            >
                                Sign up as Carrier
                            </button>
                            <button
                                type="button"
                                className="h-10 rounded-xl border border-white/20 text-xs font-medium text-white/90 transition hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:text-white sm:text-sm"
                            >
                                Sign up as Broker
                            </button>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-4 border-t border-white/10 pt-3 text-center [@media(max-height:640px)]:hidden">
                        <p className="text-[10px] text-white/50 sm:text-xs">
                            Copyright 2020-2025 C5CSLC | All Rights Reserved.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;