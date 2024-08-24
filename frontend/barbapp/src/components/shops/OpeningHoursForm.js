import React, { useState, useEffect } from "react";
import { FaPlus, FaCheck } from "react-icons/fa";

const OpeningHoursForm = ({ openingHours, setOpeningHours }) => {
    const [dayTime, setDayTime] = useState({
        day: "",
        open: "",
        close: "",
    });

    useEffect(() => {
        const getCurrentDayAndTime = () => {
            const daysOfWeek = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];
            const now = new Date();
            const day = daysOfWeek[now.getDay()];
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const time = `${hours}:${minutes}`;
            return { day, time };
        };

        const { day, time } = getCurrentDayAndTime();

        setDayTime({
            day,
            open: time,
            close: time,
        });
    }, []);

    const handleAddDayTime = () => {
        if (dayTime.day && dayTime.open && dayTime.close) {
            setOpeningHours({
                ...openingHours,
                [dayTime.day]: { open: dayTime.open, close: dayTime.close },
            });
            setDayTime({ day: "", open: "", close: "" });
        }
    };

    const handleApplyToAll = () => {
        if (dayTime.open && dayTime.close) {
            const newHours = {};
            [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ].forEach((day) => {
                newHours[day] = { open: dayTime.open, close: dayTime.close };
            });
            setOpeningHours(newHours);
        }
    };

    return (
        <div className="mb-6 p-4 sm:p-6 md:p-8 lg:p-10 bg-white shadow-md rounded-md">
            <label className="block text-gray-700 text-lg font-semibold mb-4">
                Opening Hours
            </label>
            <div className="mb-4">
                {Object.keys(openingHours).length > 0 ? (
                    Object.keys(openingHours).map((day) => (
                        <div
                            key={day}
                            className="flex justify-between items-center mb-2 p-2 border-b border-gray-300"
                        >
                            <span className="font-medium text-sm sm:text-base">
                                {day}
                            </span>
                            <span className="text-sm sm:text-base">
                                {openingHours[day].open} -{" "}
                                {openingHours[day].close}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm sm:text-base">
                        No opening hours set.
                    </p>
                )}
            </div>
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <select
                        name="day"
                        value={dayTime.day}
                        onChange={(e) =>
                            setDayTime({ ...dayTime, day: e.target.value })
                        }
                        className="w-full sm:w-auto p-2 border border-gray-300 rounded mb-2 sm:mb-0"
                    >
                        <option value="">Select Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                    <input
                        type="time"
                        name="open"
                        value={dayTime.open}
                        onChange={(e) =>
                            setDayTime({ ...dayTime, open: e.target.value })
                        }
                        className="w-full sm:w-1/3 p-2 border border-gray-300 rounded mb-2 sm:mb-0"
                    />
                    <input
                        type="time"
                        name="close"
                        value={dayTime.close}
                        onChange={(e) =>
                            setDayTime({ ...dayTime, close: e.target.value })
                        }
                        className="w-full sm:w-1/3 p-2 border border-gray-300 rounded mb-2 sm:mb-0"
                    />
                    <button
                        type="button"
                        onClick={handleAddDayTime}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
                    >
                        <FaPlus className="mr-2" />
                        Add
                    </button>
                </div>
                <button
                    type="button"
                    onClick={handleApplyToAll}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center"
                >
                    <FaCheck className="mr-2" />
                    Apply to All
                </button>
            </div>
        </div>
    );
};

export default OpeningHoursForm;
