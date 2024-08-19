import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../../features/appointments/appointmentsSlice";

const AppointmentForm = ({ services, selectedDate }) => {
    const [selectedService, setSelectedService] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.appointments);

    // Helper function to check if a date is valid
    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date);
    };

    // Format selectedDate to "YYYY-MM-DDTHH:MM" for the datetime-local input
    useEffect(() => {
        if (selectedDate) {
            const date = new Date(selectedDate);
            if (isValidDate(date)) {
                const formattedDate = date.toISOString().slice(0, 16); // Get the date and time in "YYYY-MM-DDTHH:MM" format
                setAppointmentDate(formattedDate);
            } else {
                console.error("Invalid date:", selectedDate);
                setAppointmentDate(""); // Reset the input if the date is invalid
            }
        }
    }, [selectedDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            createAppointment({
                service_id: selectedService,
                datetime: appointmentDate,
            })
        )
            .unwrap()
            .then(() => {
                alert("Appointment created successfully!");
            })
            .catch((err) => {
                console.error(
                    "There was an error creating the appointment!",
                    err
                );
                alert("Failed to create appointment.");
            });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
        >
            <div className="mb-4">
                <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-700"
                >
                    Service:
                </label>
                <select
                    id="service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-300 focus:border-yellow-300"
                >
                    <option value="">Select a service</option>
                    {services?.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.name} - ${service.price}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label
                    htmlFor="appointment-date"
                    className="block text-sm font-medium text-gray-700"
                >
                    Appointment Date and Time:
                </label>
                <input
                    id="appointment-date"
                    type="datetime-local"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-300 focus:border-yellow-300"
                />
            </div>
            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-yellow-300 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-yellow-400 transition duration-300"
            >
                {status === "loading" ? "Booking..." : "Book Appointment"}
            </button>
            {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
        </form>
    );
};

export default AppointmentForm;
