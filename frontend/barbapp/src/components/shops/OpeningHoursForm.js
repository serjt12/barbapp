import React, { useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa";

const OpeningHoursForm = ({ openingHours, setOpeningHours }) => {
    const [dayTime, setDayTime] = useState({ day: "", open: "", close: "" });

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
        <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-2">
                Opening Hours
            </label>
            <div className="mb-4">
                {Object.keys(openingHours).length > 0 ? (
                    Object.keys(openingHours).map((day) => (
                        <div
                            key={day}
                            className="flex justify-between mb-2 p-2 border-b border-gray-300"
                        >
                            <span className="font-medium">{day}</span>
                            <span>
                                {openingHours[day].open} -{" "}
                                {openingHours[day].close}
                            </span>
                        </div>
                    ))
                ) : (
                    <p>No opening hours set.</p>
                )}
            </div>
            <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                    <select
                        name="day"
                        value={dayTime.day}
                        onChange={(e) =>
                            setDayTime({ ...dayTime, day: e.target.value })
                        }
                        className="flex-grow p-2 border border-gray-300 rounded mr-2"
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
                        className="w-1/3 p-2 border border-gray-300 rounded mr-2"
                    />
                    <input
                        type="time"
                        name="close"
                        value={dayTime.close}
                        onChange={(e) =>
                            setDayTime({ ...dayTime, close: e.target.value })
                        }
                        className="w-1/3 p-2 border border-gray-300 rounded"
                    />
                    <button
                        type="button"
                        onClick={handleAddDayTime}
                        className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center"
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
