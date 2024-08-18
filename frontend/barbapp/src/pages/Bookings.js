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
    const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with current date

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

    const events = [...openingHourEvents, ...appointmentEvents];

    return (
        <div className="container p-12 bg-white">
            <h1 className="text-3xl font-bold">
                Bookings for Shop {shop?.name}
            </h1>
            <p className="mt-4 text-lg">Select a date to view appointments.</p>
            <BookingCalendar
                appointments={appointments}
                events={events}
                onChange={handleDateChange}
                selectedDate={selectedDate}
                services={services}
            />
        </div>
    );
};

export default Bookings;
