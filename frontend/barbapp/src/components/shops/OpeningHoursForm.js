import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const OpeningHoursForm = ({ openingHours, setOpeningHours }) => {
    const [dayTime, setDayTime] = useState({ day: "", open: "", close: "" });

    const handleAddDayTime = () => {
        setOpeningHours({
            ...openingHours,
            [dayTime.day]: { open: dayTime.open, close: dayTime.close },
        });
        setDayTime({ day: "", open: "", close: "" });
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700">Opening Hours</label>
            <div>
                {Object.keys(openingHours).map((day) => (
                    <div key={day} className="mt-2">
                        <span>
                            {day}: {openingHours[day].open} -{" "}
                            {openingHours[day].close}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex items-center mt-4">
                <select
                    name="day"
                    value={dayTime.day}
                    onChange={(e) =>
                        setDayTime({ ...dayTime, day: e.target.value })
                    }
                    className="w-1/3 p-2 border border-gray-300 rounded mr-2"
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
                    className="w-1/3 p-2 border border-gray-300 rounded mr-2"
                />
                <button
                    type="button"
                    onClick={handleAddDayTime}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    );
};

export default OpeningHoursForm;
