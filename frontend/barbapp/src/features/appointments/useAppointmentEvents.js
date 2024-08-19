import { useEffect, useState } from "react";
import { fetchAppointments } from "./appointmentsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    selectAppointmentsStatus,
    selectAppointmentsError,
    selectAppointments, // Assuming this selector exists
} from "./appointmentsSelector";
import { createServiceColorMapping } from "../../services/utils";

const useAppointmentEvents = (selectedDate, shopId) => {
    const dispatch = useDispatch();
    const [appointmentEvents, setAppointmentEvents] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [serviceColorMapping, setServiceColorMapping] = useState({});
    const status = useSelector(selectAppointmentsStatus);
    const error = useSelector(selectAppointmentsError);
    const appointments = useSelector(selectAppointments);

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

            const endDate = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                0
            )
                .toISOString()
                .split("T")[0];

            dispatch(fetchAppointments({ startDate, endDate, shopId }));
        }
    }, [selectedDate, shopId, dispatch]);

    useEffect(() => {
        if (status === "succeeded" && appointments?.length > 0) {
            // Create color mapping for services
            const colors = createServiceColorMapping(appointments);
            setServiceColorMapping(colors);

            const events = appointments.map((appointment) => {
                const start = new Date(appointment.datetime);
                const end = appointment.end
                    ? new Date(appointment.end)
                    : new Date(
                          start.getTime() + (appointment.duration || 0) * 60000
                      );

                return {
                    id: appointment.id,
                    title: appointment.service.name,
                    from: start.toISOString(),
                    to: end.toISOString(),
                    color: colors[appointment.service.name] || "#1ccb9e",
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
