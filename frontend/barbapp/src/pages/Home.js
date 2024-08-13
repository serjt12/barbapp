import React from "react";
import logo from "../assets/logo512.png";
import { useSelector } from "react-redux";

const Home = () => {
    const userName = useSelector((state) => state.auth.user?.name);
    const userPic = useSelector((state) => state.auth.user?.picture);

    const changeImageSize = (url, size = 512) => {
        if (!url) return;
        return url.replace(/s\d+-c/, `s${size}-c`);
    };
    return (
        <div className="container mx-auto p-4">
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <img
                    alt="User pic or BarbApp logo"
                    src={changeImageSize(userPic) || logo}
                    referrerPolicy="no-referrer"
                />
                <h1 className="text-4xl font-bold text-blue-500">
                    Welcome to BARBAPP! {userName || "Guest"}
                </h1>
            </div>
        </div>
    );
};

export default Home;
