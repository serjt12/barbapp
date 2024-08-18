import React from "react";
import Calendar from "react-awesome-calendar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BookingCalendar = ({
    onChange,
    selectedDate,
    dailyAppointments = [],
    events = [],
    onClickEvent,
}) => {
    console.log("selectedDate: ", selectedDate);

    const header = ({ prev, current, next, mode }) => {
        console.log(
            "prev: ",
            prev,
            "current: ",
            current,
            "next: ",
            next,
            "mode: ",
            mode
        );

        return (
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-900 to-yellow-300 rounded-t-lg">
                <button
                    onClick={() => console.log("Prev day:", prev)}
                    className="text-white hover:text-yellow-300 transition duration-300"
                >
                    <FaChevronLeft />
                </button>
                <h2 className="text-xl font-bold text-white">
                    {new Date(
                        current.year,
                        current.month - 1,
                        current.day
                    ).toDateString()}
                </h2>
                <button
                    onClick={() => console.log("Next day:", next)}
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
                    events={events}
                    onChange={onChange}
                    onClickEvent={onClickEvent}
                />
                {selectedDate && (
                    <div className="p-6 bg-gradient-to-r from-slate-900 to-yellow-300 text-white rounded-b-lg">
                        <h2 className="text-2xl font-bold">
                            Appointments for{" "}
                            {new Date(selectedDate).toDateString()}
                        </h2>
                        <ul className="mt-4">
                            {dailyAppointments.length > 0 ? (
                                dailyAppointments.map((appointment) => (
                                    <li key={appointment.id} className="mt-2">
                                        {appointment.user.full_name} -{" "}
                                        {appointment.service.name} at{" "}
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
