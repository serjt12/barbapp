export const getImageUrl = (path) => {
    return `${process.env.REACT_APP_API_BASE_URL}${path}`;
};

export const formatOpeningHours = (hours) => {
    return Object.entries(hours)
        .map(([day, { open, close }]) => `${day}: ${open} - ${close}`)
        .join(", ");
};
