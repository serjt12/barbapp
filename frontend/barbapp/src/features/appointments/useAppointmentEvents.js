import { useEffect, useState } from "react";
import { fetchAppointments } from "./appointmentsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    selectAppointmentsStatus,
    selectAppointmentsError,
    selectAppointments, // Assuming this selector exists
} from "./appointmentsSelector";

const useAppointmentEvents = (selectedDate, shopId) => {
    const dispatch = useDispatch();
    const [appointmentEvents, setAppointmentEvents] = useState([]);
    const status = useSelector(selectAppointmentsStatus); // Fetch status of appointments
    const error = useSelector(selectAppointmentsError); // Fetch error status if any
    const appointments = useSelector(selectAppointments); // Fetch appointments from the store

    useEffect(() => {
        if (selectedDate && shopId) {
            // Calculate the first day of the month
            const startDate = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                1
            )
                .toISOString()
                .split("T")[0];

            // Calculate the last day of the month
            const endDate = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
            )
                .toISOString()
                .split("T")[0];

            // Dispatch the action to fetch appointments for the entire month
            dispatch(fetchAppointments({ startDate, endDate, shopId }));
        }
    }, [selectedDate, shopId, dispatch]);

    useEffect(() => {
        if (status === "succeeded" && appointments?.length > 0) {
            const events = appointments.map((appointment) => {
                const start = new Date(appointment.datetime);
                const end = appointment.end
                    ? new Date(appointment.end)
                    : new Date(
                          start.getTime() + (appointment.duration || 0) * 60000
                      ); // Default end if not provided

                return {
                    id: appointment.id,
                    title: appointment.service.name,
                    from: start.toISOString(),
                    to: end.toISOString(),
                    color: "#1ccb9e",
                };
            });
            setAppointmentEvents(events);
        } else if (status === "failed") {
            console.error("Failed to fetch appointments:", error);
        }
    }, [appointments, status, error]);

    return appointmentEvents;
};

export default useAppointmentEvents;
