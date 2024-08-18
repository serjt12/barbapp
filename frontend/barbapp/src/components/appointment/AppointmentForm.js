import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../../features/appointments/appointmentsSlice";

const AppointmentForm = ({ services }) => {
    const [selectedService, setSelectedService] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.appointments);

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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Service:</label>
                <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                >
                    <option value="">Select a service</option>
                    {services?.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.name} - ${service.price}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Appointment Date and Time:</label>
                <input
                    type="datetime-local"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Booking..." : "Book Appointment"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

export default AppointmentForm;
