import React, { useMemo } from "react";
import Calendar from "react-awesome-calendar";

const SingleDay = ({
    selectedDate,
    shopId,
    dailyAppointments = [],
    openingHours = [],
}) => {
    // Convert selectedDate to a Date object or default to the current date
    const date = useMemo(() => {
        return selectedDate ? new Date(selectedDate) : new Date();
    }, [selectedDate]);

    // Calculate available slots based on opening hours and existing appointments
    const availableSlots = useMemo(() => {
        const [openHour = 0, closeHour = 0] = openingHours[date.getDay()] || [];
        const startTime = new Date(date).setHours(openHour, 0, 0);
        const endTime = new Date(date).setHours(closeHour, 0, 0);

        let slots = [];
        for (let time = startTime; time < endTime; time += 30 * 60000) {
            // 30-minute intervals
            const isBooked = dailyAppointments.some(
                (appointment) =>
                    new Date(appointment.datetime).getTime() === time
            );
            if (!isBooked) {
                slots.push(new Date(time));
            }
        }
        return slots;
    }, [date, dailyAppointments, openingHours]);

    // Format date for display
    const formattedDate = useMemo(() => {
        return date.toLocaleDateString(); // Convert to a human-readable format
    }, [date]);

    return (
        <div>
            <h2 className="text-xl font-bold">
                Available Slots for {formattedDate}
            </h2>

            <Calendar
                mode="dailyMode"
                events={[]}
                // Render only the selected day with available slots
                // You may need to adjust or remove this depending on your exact requirements
            />

            {availableSlots.length > 0 ? (
                <ul>
                    {availableSlots.map((slot, index) => (
                        <li key={index}>
                            {slot.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No available slots for this day.</p>
            )}
        </div>
    );
};

export default SingleDay;
