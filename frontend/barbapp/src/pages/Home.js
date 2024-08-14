import React from "react";
import logo from "../assets/logo512.png";
import { useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import Advantages from "../components/Advantages";
import pic1 from "../assets/carousel-pic1.jpg";
import pic2 from "../assets/carousel-pic2.jpg";
import pic3 from "../assets/carousel-pic3.jpg";

const Home = () => {
    const userName = useSelector((state) => state.auth.user?.name);
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
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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

                <img
                    alt="User pic or BarbApp logo"
                    src={changeImageSize(userPic) || logo}
                    className="mt-4"
                    referrerPolicy="no-referrer"
                />
                <h1 className="text-4xl font-bold text-blue-500 mt-4">
                    Welcome to BARBAPP! {userName || "Guest"}
                </h1>

                <Advantages />
            </div>
        </div>
    );
};

export default Home;
