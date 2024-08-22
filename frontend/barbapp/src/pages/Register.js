import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";

const Register = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isEmpty, setIsEmpty] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const { username, email, password } = formData;

    useEffect(() => {
        setIsEmpty(!(username && password && email));
    }, [username, password, email]);

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username,
            email,
            password,
        };

        try {
            const response = await dispatch(register(newUser));
            if (response.payload.user) {
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            setErrors(err.response?.data);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Register</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.username && (
                        <p className="text-red-500">{errors.username[0]}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email[0]}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.password && (
                        <p className="text-red-500">{errors.password[0]}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-700"
                    disabled={isEmpty}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
