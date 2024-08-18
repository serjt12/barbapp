import React from "react";
import PropTypes from "prop-types";
import { format, addMonths, addYears, subMonths, subYears } from "date-fns";

const CalendarHeader = ({
    current,
    mode,
    prev,
    next,
    onClickPrev,
    onClickNext,
}) => {
    const handlePrev = () => onClickPrev();
    const handleNext = () => onClickNext();

    const formatDate = (year, month, day) => {
        switch (mode) {
            case "dailyMode":
                return format(new Date(year, month - 1, day), "dd MMM yyyy");
            case "monthlyMode":
                return format(new Date(year, month - 1), "MMMM yyyy");
            case "yearlyMode":
                return format(new Date(year), "yyyy");
            default:
                return "";
        }
    };

    return (
        <div className="calendar-header flex items-center justify-between p-4 bg-gray-100 shadow-md">
            <button
                className="prev-button p-2 bg-blue-500 text-white rounded"
                onClick={handlePrev}
            >
                Previous
            </button>
            <div className="header-title text-center flex-grow">
                <h2 className="text-lg font-bold">
                    {formatDate(current.year, current.month, current.day)}
                </h2>
            </div>
            <button
                className="next-button p-2 bg-blue-500 text-white rounded"
                onClick={handleNext}
            >
                Next
            </button>
        </div>
    );
};

CalendarHeader.propTypes = {
    current: PropTypes.shape({
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        day: PropTypes.number.isRequired,
    }).isRequired,
    mode: PropTypes.oneOf(["dailyMode", "monthlyMode", "yearlyMode"])
        .isRequired,
    prev: PropTypes.shape({
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        day: PropTypes.number.isRequired,
    }).isRequired,
    next: PropTypes.shape({
        year: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        day: PropTypes.number.isRequired,
    }).isRequired,
    onClickPrev: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
};

export default CalendarHeader;
