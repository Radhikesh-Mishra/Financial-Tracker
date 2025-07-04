import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register } from '../action/AuthAction';

const Auth = () => {
    const [isLogIn, setIsLogIn] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        email: "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogIn) {
            dispatch(login(formData));
        } else {
            dispatch(register(formData));
        }
    };

    const toggleForm = () => {
        setIsLogIn(!isLogIn);
        setFormData({ username: "", phone: "", email: "", password: "" });
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md transition-all duration-300">
            <div className="relative w-full max-w-md mx-auto p-6 bg-gradient-to-b from-blue-500 via-[#F9F6EE] to-red-400 rounded-2xl shadow-2xl text-black animate-fadeIn backdrop-blur-sm backdrop-saturate-150 transition-transform duration-500 scale-95 hover:scale-100">

                <h2 className="text-3xl font-bold mb-6 text-center">
                    {isLogIn ? "Welcome Back!" : "Create Account"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogIn && (
                        <>
                            <div>
                                <label className="block text-sm font-semibold">Name</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-2 rounded-lg bg-white/90 text-gray-900 border border-white focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-4 py-2 rounded-lg bg-white/90 text-gray-900 border border-white focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 rounded-lg bg-white/90 text-gray-900 border border-white focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 rounded-lg bg-white/90 text-gray-900 border border-white focus:outline-none focus:ring-2 focus:ring-orange-300"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 text-white font-bold rounded-lg bg-blue-500 hover:bg-white hover:text-orange-600 transition duration-300 shadow-md cursor-pointer"
                    >
                        {isLogIn ? "Login" : "Register"}
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    {isLogIn ? "Don't have an account?" : "Already have an account?"}
                    <button
                        onClick={toggleForm}
                        className="ml-2 text-blue-700 hover:underline font-bold cursor-pointer"
                    >
                        {isLogIn ? "Sign Up" : "Log In"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
