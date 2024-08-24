export const getImageUrl = (path) => {
    if (!path) return;
    return `${process.env.REACT_APP_API_BASE_URL}${path}`;
};

export const formatOpeningHours = (hours) => {
    return Object.entries(hours)
        .map(([day, { open, close }]) => `${day}: ${open} - ${close}`)
        .join(", ");
};

export const formatUTCDateTime = (isoString) => {
    const date = new Date(isoString);

    // Extract date components
    // const day = date.getUTCDate();
    // const month = date.getUTCMonth(); // 0-based
    // const year = date.getUTCFullYear();

    // Extract time components
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert 24-hour time to 12-hour time
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Format date and time
    // const formattedDate = `${
    //     ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getUTCDay()]
    // }, ${day < 10 ? "0" + day : day} ${
    //     [
    //         "Jan",
    //         "Feb",
    //         "Mar",
    //         "Apr",
    //         "May",
    //         "Jun",
    //         "Jul",
    //         "Aug",
    //         "Sep",
    //         "Oct",
    //         "Nov",
    //         "Dec",
    //     ][month]
    // } ${year}`;
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${formattedTime}`;
};

const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const createServiceColorMapping = (appointments) => {
    const serviceColors = {};
    appointments.forEach((appointment) => {
        const serviceName = appointment.service.name;
        if (!serviceColors[serviceName]) {
            serviceColors[serviceName] = generateRandomColor();
        }
    });
    return serviceColors;
};
