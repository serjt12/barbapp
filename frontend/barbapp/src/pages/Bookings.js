// Bookings.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchShopDetails,
    fetchShopServices,
} from "../features/shops/shopsSlice";
import { selectAppointments } from "../features/appointments/appointmentsSelector";
import OpeningHourEvents from "../components/appointment/OpeningHourEvents";
import useAppointmentEvents from "../features/appointments/useAppointmentEvents";
import BookingCalendar from "../components/appointment/BookingCalendar";

const Bookings = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [highlightedEvents, setHighlightedEvents] = useState([]);

    const shop = useSelector((state) => state.shop.selectedShop);
    const status = useSelector((state) => state.shop.status);
    const error = useSelector((state) => state.shop.error);
    const services = useSelector((state) => state.shop.services);
    const appointments = useSelector(selectAppointments);

    const openingHourEvents = shop
        ? OpeningHourEvents({ openingHours: shop.opening_hours })
        : [];
    const appointmentEvents = useAppointmentEvents(
        selectedDate,
        id,
        appointments
    );

    useEffect(() => {
        dispatch(fetchShopDetails(id));
        dispatch(fetchShopServices(id));
    }, [dispatch, id]);

    const handleDateChange = (date) => {
        const calendarDate = new Date(date.year, date.month, date.day);
        setSelectedDate(calendarDate);
    };

    const handleClickTimeLine = (date) => {
        // Create the full Date object, including time
        const localDate = new Date(
            Date.UTC(date.year, date.month, date.day, date.hour)
        );

        // Log to check the localDate and its conversion
        console.log("Local Date:", localDate.toISOString());

        if (isNaN(localDate.getTime())) {
            console.error("Invalid date:", localDate);
            return;
        }

        // Update the selectedDate
        setSelectedDate(localDate);

        // Highlight event
        const eventDuration = 60 * 60 * 1000; // 1 hour in milliseconds
        const newEvent = {
            id: `selected-time-${Date.now()}`,
            color: "#FF6347", // Highlight color
            from: localDate.toISOString(), // Start time
            to: new Date(localDate.getTime() + eventDuration).toISOString(), // End time (1 hour later)
            title: "Selected Time",
        };

        // Log new event for debugging
        console.log("New Event:", newEvent);

        // Replace the highlightedEvents array with the new event
        setHighlightedEvents([newEvent]);
    };

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loader"></div>
            </div>
        );
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    // Combine events inside the BookingCalendar component
    const events = [
        ...openingHourEvents,
        ...appointmentEvents,
        ...highlightedEvents,
    ];

    return (
        <div className="container p-12 bg-white">
            <h1 className="text-3xl font-bold">
                Bookings for Shop {shop?.name}
            </h1>
            <p className="mt-4 text-lg">Select a date to view appointments.</p>
            <BookingCalendar
                appointments={appointments}
                events={events} // Pass the combined events
                onChange={handleDateChange}
                selectedDate={selectedDate}
                services={services}
                onClickTimeLine={handleClickTimeLine}
                highlightedEvents={highlightedEvents} // Ensure highlightedEvents is passed
            />
        </div>
    );
};

export default Bookings;
