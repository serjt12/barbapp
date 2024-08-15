import React from "react";
import logo from "../assets/logo512.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import Advantages from "../components/Advantages";
import pic1 from "../assets/carousel-pic1.jpg";
import pic2 from "../assets/carousel-pic2.jpg";
import pic3 from "../assets/carousel-pic3.jpg";

const Home = () => {
    const userName = useSelector((state) => state.auth.user?.username);
    const firstName = useSelector((state) => state.auth.user?.first_name);
    const userPic = useSelector((state) => state.auth.user?.picture);
    const captions = [
        "Your beauty business network - Slide 1",
        "Your beauty business network - Slide 2",
        "Your beauty business network - Slide 3",
    ];

    const changeImageSize = (url, size = 512) => {
        if (!url) return;
        return url.replace(/s\d+-c/, `s${size}-c`);
    };
    return (
        <>
            {(firstName || userName) && (
                <div className="container m-3 mx-auto flex flex-col items-center justify-center bg-white shadow rounded">
                    <div className="p-10 w-xl">
                        <img
                            alt="User pic or BarbApp logo"
                            src={changeImageSize(userPic) || logo}
                            className="mt-4 w-full"
                            referrerPolicy="no-referrer"
                        />
                        <h1 className="text-4xl width-fixed p-5 font-bold mt-4 bg-gradient-to-r from-slate-900 to-yellow-300 bg-clip-text text-transparent">
                            Welcome to BARBAPP! {firstName || userName}{" "}
                        </h1>
                        <div className="flex flex-col items-center justify-center">
                            <Link
                                to="/feed"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-700"
                            >
                                Take a look!
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            <div className="container mx-auto p-4 ">
                <Carousel
                    autoSlide={true}
                    autoSlideInterval={5000}
                    captionTexts={captions}
                >
                    <img
                        src={pic1}
                        alt="Slide 1"
                        className="w-full h-full object-cover"
                    />
                    <img
                        src={pic2}
                        alt="Slide 2"
                        className="w-full h-full object-cover"
                    />
                    <img
                        src={pic3}
                        alt="Slide 3"
                        className="w-full h-full object-cover"
                    />
                </Carousel>

                <Advantages />
            </div>
        </>
    );
};

export default Home;
