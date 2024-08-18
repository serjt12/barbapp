import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosConfig";

const useAppointmentEvents = (selectedDate, shopId) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!selectedDate) return;

            try {
                const formattedDate = `${selectedDate.getFullYear()}-${(
                    selectedDate.getMonth() + 1
                )
                    .toString()
                    .padStart(2, "0")}-${selectedDate
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`;

                const response = await axiosInstance.get(
                    `/appointments/daily/?date=${formattedDate}&shop_id=${shopId}`
                );

                const validAppointments = response.data.map((appointment) => {
                    const dateTime = new Date(appointment.datetime);
                    const formattedDateTime = dateTime
                        .toISOString()
                        .replace(/\.\d+Z$/, "+00:00");

                    return {
                        id: appointment.id,
                        color: "#1ccb9e",
                        from: formattedDateTime,
                        to: new Date(dateTime.getTime() + 30 * 60000)
                            .toISOString()
                            .replace(/\.\d+Z$/, "+00:00"),
                        title: `${appointment.user.full_name} - ${appointment.service.name}`,
                    };
                });

                setEvents(validAppointments);
            } catch (error) {
                console.error("Error fetching appointments", error);
            }
        };

        fetchAppointments();
    }, [selectedDate, shopId]);

    return events;
};

export default useAppointmentEvents;
