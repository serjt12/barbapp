import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = ({
    children: slides,
    autoSlide = false,
    autoSlideInterval = 3000,
    showIndicators = true,
    captionTexts = [], // Array of texts for each slide
}) => {
    const [curr, setCurr] = useState(0);
    const slideRef = useRef();
    const slideLength = slides.length;

    const prev = () =>
        setCurr((curr) => (curr === 0 ? slideLength - 1 : curr - 1));

    const nextSlide = () =>
        setCurr((curr) => (curr === slideLength - 1 ? 0 : curr + 1));

    // Auto slide functionality
    useEffect(() => {
        const nextSlide = () =>
            setCurr((curr) => (curr === slideLength - 1 ? 0 : curr + 1));
        if (!autoSlide) return;
        const slideInterval = setInterval(nextSlide, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [autoSlide, autoSlideInterval, slideLength]);

    // Touch/Swipe functionality
    const startTouch = useRef(null);

    const handleTouchStart = (e) => {
        startTouch.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const endTouch = e.changedTouches[0].clientX;
        if (startTouch.current - endTouch > 50) {
            nextSlide();
        } else if (startTouch.current - endTouch < -50) {
            prev();
        }
    };

    return (
        <div
            className="relative overflow-hidden w-full"
            style={{ height: `calc(100vh - 82px)` }}
            ref={slideRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="flex transition-transform ease-out duration-500 h-full"
                style={{ transform: `translateX(-${curr * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index + 1}
                        className="relative flex-shrink-0 w-full h-full"
                    >
                        {slide}
                        {captionTexts[index] && (
                            <div className="text-5xl text-overlay absolute bottom-10 left-0 w-full text-white p-4 text-center">
                                {captionTexts[index]}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation buttons */}
            <div className="absolute inset-0 flex items-center justify-between p-2">
                <button
                    onClick={prev}
                    className="p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <FaChevronLeft />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <FaChevronRight />
                </button>
            </div>

            {/* Indicators */}
            {showIndicators && (
                <div className="absolute bottom-4 right-0 left-0">
                    <div className="flex items-center justify-center gap-2">
                        {slides.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setCurr(i)}
                                className={`cursor-pointer transition-all w-3 h-3 bg-white rounded-full ${
                                    curr === i ? "p-1" : "bg-opacity-50"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carousel;
