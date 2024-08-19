const OpeningHourEvents = ({ openingHours }) => {
    const events = [];

    // Get today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based in JavaScript

    // Map days of the week to their numeric representation
    const dayOfWeekMap = {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
        Sunday: 0,
    };

    Object.keys(openingHours).forEach((day) => {
        if (openingHours[day].open && openingHours[day].close) {
            const dayOfWeek = dayOfWeekMap[day];
            const date = new Date(year, month - 1, 1); // Start with the first day of the month
            const dayOffset = (dayOfWeek - date.getDay() + 7) % 7; // Calculate day offset

            date.setDate(date.getDate() + dayOffset); // Set to the correct day of the week

            const fromDateTime = new Date(
                `${year}-${month.toString().padStart(2, "0")}-${date
                    .getDate()
                    .toString()
                    .padStart(2, "0")}T${openingHours[day].open}:00+00:00`
            );
            const toDateTime = new Date(
                `${year}-${month.toString().padStart(2, "0")}-${date
                    .getDate()
                    .toString()
                    .padStart(2, "0")}T${openingHours[day].close}:00+00:00`
            );

            const formatDate = (date) => date.toISOString();

            events.push({
                id: `${day}-open`,
                color: "#4caf50",
                from: formatDate(fromDateTime),
                to: formatDate(toDateTime),
                title: `Open hours: ${openingHours[day].open} - ${openingHours[day].close}`,
            });
        }
    });

    return events;
};

export default OpeningHourEvents;
