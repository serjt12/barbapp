import React from "react";
import Calendar from "react-awesome-calendar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AppointmentForm from "./AppointmentForm";

const BookingCalendar = ({
    onChange,
    selectedDate,
    events,
    services,
    appointments,
    onClickTimeLine,
}) => {
    console.log("events: ", events);
    let filteredAppointments = appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.datetime).toDateString();
        const selectedDateString = new Date(selectedDate).toDateString();
        return appointmentDate === selectedDateString;
    });
    const header = ({ prev, current, next }) => {
        return (
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-900 to-yellow-300 rounded-t-lg">
                <button
                    onClick={() =>
                        onChange({
                            year: current.year,
                            month: current.month - 1,
                            day: current.day,
                        })
                    }
                    className="text-white hover:text-yellow-300 transition duration-300"
                >
                    <FaChevronLeft />
                </button>
                <h2 className="text-xl font-bold text-white">
                    {new Date(
                        current.year,
                        current.month,
                        current.day
                    ).toDateString()}
                </h2>
                <button
                    onClick={() =>
                        onChange({
                            year: current.year,
                            month: current.month + 1,
                            day: current.day,
                        })
                    }
                    className="text-white hover:text-yellow-300 transition duration-300"
                >
                    <FaChevronRight />
                </button>
            </div>
        );
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="bg-white shadow rounded">
                <Calendar
                    header={header}
                    events={events} // Use highlightedEvents here
                    onChange={onChange}
                    onClickTimeLine={onClickTimeLine}
                />
                <AppointmentForm
                    services={services}
                    selectedDate={selectedDate}
                />
                {selectedDate && (
                    <div className="p-6 bg-gradient-to-r from-slate-900 to-yellow-300 text-white rounded-b-lg">
                        <h2 className="text-2xl font-bold">
                            Appointments for{" "}
                            {new Date(selectedDate).toDateString()}
                        </h2>
                        <ul className="mt-4">
                            {filteredAppointments.length > 0 ? (
                                filteredAppointments.map((appointment) => (
                                    <li key={appointment.id} className="mt-2">
                                        {appointment.service.name} -{" "}
                                        {new Date(
                                            appointment.datetime
                                        ).toLocaleTimeString()}
                                    </li>
                                ))
                            ) : (
                                <li>No appointments for this day.</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingCalendar;
