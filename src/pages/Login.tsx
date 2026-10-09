import { useNavigate } from "react-router-dom";
import LoginPageBg from "../assets/LoginPageBg.jpg"
import type React from "react";
import { useState } from "react";
import cscslogo from "../assets/cscslogo.png"


function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleLogin(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (
            email === "admin@gmail.com" &&
            password === "Admin@123"
        ) {
            localStorage.setItem("isLoggedIn", "true");
            navigate("/dashboard");
        } else {
            setError("Invalid email or password");
        }
    }


    return (
        <div
            className="h-dvh w-full overflow-hidden bg-cover bg-center bg-no-repeat flex items-center justify-center lg:justify-start px-4 sm:px-6 md:px-10 lg:px-30"
            style={{ backgroundImage: `url(${LoginPageBg})` }}
        >
            {/* Login Form */}
            <form onSubmit={handleLogin}
                className="w-full max-w-90 sm:max-w-95 md:max-w-95 lg:max-w-90 px-5 py-3 sm:px-6 sm:py-4 md:px-7 md:py-4 lg:px-5 lg:py-3 rounded-2xl bg-black/45 backdrop-blur-lg border border-white/20 shadow-2xl"
            >
                {/* Application Name */}
                <div className="text-center mb-3">
                    <img className="w-40 h-auto mx-auto p-2" src={cscslogo} alt="CSCS Logo" />
                </div>

                {/* Email */}
                <div className="mb-2.5">
                    <label className="block text-xs sm:text-sm font-medium text-white mb-1">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="username@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-white/10 border border-white/30 text-sm text-white placeholder:text-white/60 outline-none focus:border-white focus:ring-1 focus:ring-white/30"
                    />
                </div>

                {/* Password */}
                <div className="mb-1">
                    <label className="block text-xs sm:text-sm font-medium text-white mb-1">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-white/10 border border-white/30 text-sm text-white placeholder:text-white/60 outline-none focus:border-white focus:ring-1 focus:ring-white/30"
                    />
                </div>

                {error && (
                    <p className="text-red-400 text-xs mb-2">
                        {error}
                    </p>
                )}

                {/* Forgot Password */}
                <div className="text-right mb-3">
                    <button
                        type="button"
                        className="text-xs sm:text-sm text-white/80 hover:text-white transition"
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full h-9 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
                >
                    Login
                </button>

                {/* Google Login */}
                <button
                    type="button"
                    className="w-full h-9 mt-2 rounded-lg bg-white/10 border border-white/30 text-white text-sm font-medium hover:bg-white/20 transition flex items-center justify-center gap-2"
                >
                    <span className="font-bold">G</span>
                    Login with Google
                </button>

                {/* Signup Links */}
                <div className="mt-3 space-y-1.5 text-center flex">
                    <button
                        type="button"
                        className="block w-full text-xs sm:text-sm text-white/80 hover:text-white transition mt-1.5"
                    >
                        Sign up as Carrier
                    </button>

                    <button
                        type="button"
                        className="block w-full text-xs sm:text-sm text-white/80 hover:text-white transition"
                    >
                        Sign up as Broker
                    </button>
                </div>

                {/* Copyright */}
                <div className="mt-3 pt-2 border-t border-white/20 text-center">
                    <p className="text-[10px] sm:text-xs text-white/60">
                        Copyright 2020-2025 C5CSLC | All Rights Reserved.
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;