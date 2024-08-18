import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopDetails } from "../features/shops/shopsSlice";
import OpeningHourEvents from "../components/appointment/OpeningHourEvents";
import useAppointmentEvents from "../features/useAppointmentEvents";
import CalendarDisplay from "../components/appointment/BookingCalendar";

const Bookings = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(null);

    const shop = useSelector((state) => state.shop.selectedShop);
    const status = useSelector((state) => state.shop.status);
    const error = useSelector((state) => state.shop.error);

    const openingHourEvents = shop
        ? OpeningHourEvents({ openingHours: shop.opening_hours })
        : [];
    const appointmentEvents = useAppointmentEvents(selectedDate, id);

    useEffect(() => {
        dispatch(fetchShopDetails(id));
    }, [dispatch, id]);

    const handleDateChange = (date) => {
        console.log("date: ", date);
        const calendarDate = new Date(date.year, date.month, date.day);
        console.log("calendarDate: ", calendarDate);
        setSelectedDate(calendarDate);
    };

    const handleCLickEvent = () => {
        console.log("HIIIII");
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
            <CalendarDisplay
                events={events}
                onChange={handleDateChange}
                shopId={id}
                onClickEvent={handleCLickEvent}
                selectedDate={selectedDate}
            />
        </div>
    );
};

export default Bookings;
