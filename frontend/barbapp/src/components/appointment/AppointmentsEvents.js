import axiosInstance from "../../services/axiosConfig";

const AppointmentEvents = ({ selectedDate, shopId }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (selectedDate) {
            const fetchAppointments = async () => {
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

                    const validAppointments = response.data.map(
                        (appointment) => ({
                            id: appointment.id,
                            color: "#1ccb9e",
                            from: new Date(appointment.datetime).toISOString(),
                            to: new Date(
                                new Date(appointment.datetime).getTime() +
                                    30 * 60000
                            ).toISOString(),
                            title: `${appointment.user.full_name} - ${appointment.service.name}`,
                        })
                    );
                    setEvents(validAppointments);
                } catch (error) {
                    console.error("Error fetching appointments", error);
                }
            };

            fetchAppointments();
        }
    }, [selectedDate, shopId]);

    return events;
};

export default AppointmentEvents;
