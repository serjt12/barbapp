const OpeningHourEvents = ({ openingHours }) => {
    const events = [];

    // Get today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based in JavaScript

    Object.keys(openingHours).forEach((day) => {
        if (openingHours[day].open && openingHours[day].close) {
            // Use today's date for formatting
            const fromDateTime = new Date(
                `${year}-${month.toString().padStart(2, "0")}-01T${
                    openingHours[day].open
                }:00+00:00`
            );
            const toDateTime = new Date(
                `${year}-${month.toString().padStart(2, "0")}-01T${
                    openingHours[day].close
                }:00+00:00`
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
