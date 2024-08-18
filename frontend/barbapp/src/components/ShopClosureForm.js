import React, { useState } from "react";

const ShopClosureForm = ({ closures, setClosures }) => {
    const [newClosure, setNewClosure] = useState({ date: "", reason: "" });

    const handleAddClosure = () => {
        setClosures([...closures, newClosure]);
        setNewClosure({ date: "", reason: "" });
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700">Shop Closures</label>
            <div>
                {closures.map((closure, index) => (
                    <div key={index} className="mt-2">
                        <span>
                            {closure.date} - {closure.reason}
                        </span>
                    </div>
                ))}
            </div>
            <input
                type="date"
                name="date"
                value={newClosure.date}
                onChange={(e) =>
                    setNewClosure({ ...newClosure, date: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="text"
                name="reason"
                placeholder="Reason"
                value={newClosure.reason}
                onChange={(e) =>
                    setNewClosure({ ...newClosure, reason: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded mt-2"
            />
            <button
                type="button"
                onClick={handleAddClosure}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-2"
            >
                Add Closure
            </button>
        </div>
    );
};

export default ShopClosureForm;
