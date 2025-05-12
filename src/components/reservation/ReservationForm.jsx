import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { getReservationSlots, addReservation } from "../../data/mockData";
import {
  HiCalendar,
  HiClock,
  HiUsers,
  HiInformationCircle,
} from "react-icons/hi";

const ReservationForm = ({ restaurant }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [specialRequests, setSpecialRequests] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (restaurant && date) {
      const formattedDate = date.toISOString().split("T")[0];
      const slots = getReservationSlots(restaurant.id, formattedDate);

      setAvailableSlots(slots);

      if (availableSlots.length > 0) {
        if (!availableSlots.some((slot) => slot.time === time)) {
          setTime(availableSlots[0].time);
        }
      } else {
        setTime("");
      }
    }
  }, [restaurant, date, time]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please sign in to make a reservation");
      navigate("/login", { state: { from: `/restaurants/${restaurant.id}` } });
      return;
    }

    if (!date || !time || !partySize) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedDate = date.toISOString().split("T")[0];

      await new Promise((resolve) => setTimeout(resolve, 800));

      const newReservation = addReservation({
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        date: formattedDate,
        time,
        partySize,
        specialRequests,
      });

      toast.success("Reservation confirmed!");

      navigate("/reservations");
    } catch (error) {
      toast.error("Failed to make reservation");
      console.error("Reservation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const groupTimeSlotsByHour = () => {
    const groups = {};

    availableSlots.forEach((slot) => {
      const hour = slot.time.split(":")[0];
      if (!groups[hour]) {
        groups[hour] = [];
      }
      groups[hour].push(slot);
    });

    return Object.entries(groups).map(([hour, slots]) => ({
      hour,
      slots,
    }));
  };

  const groupedTimeSlots = groupTimeSlotsByHour();

  return (
    <div className="bg-white rounded-lg shadow-elegant p-6">
      <h3 className="text-xl font-medium text-neutral-900 mb-6">
        Make a Reservation
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="date" className="form-label flex items-center">
            <HiCalendar className="mr-2 h-5 w-5 text-primary-700" />
            Select Date
          </label>
          <DatePicker
            selected={date}
            onChange={setDate}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)}
            dateFormat="MMMM d, yyyy"
            className="form-input w-full"
            calendarClassName="shadow-elegant"
            wrapperClassName="w-full"
          />
        </div>

        <div>
          <label htmlFor="time" className="form-label flex items-center">
            <HiClock className="mr-2 h-5 w-5 text-primary-700" />
            Select Time
          </label>

          {availableSlots.length > 0 ? (
            <div className="space-y-4">
              <label
                htmlFor="time"
                className="text-sm font-medium text-neutral-700"
              >
                Select a Time Slot:
              </label>
              <select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="form-input w-full"
              >
                {groupedTimeSlots.map((group) => (
                    group.slots.map((slot) => (
                      <option key={slot.time} value={slot.time}>
                        {slot.time}
                      </option>
                    ))
                ))}
              </select>
            </div>
          ) : (
            <div className="py-4 px-6 bg-neutral-50 rounded-md border border-neutral-200 text-neutral-600 text-center">
              No available time slots for this date. Please try another date.
            </div>
          )}
        </div>

        <div>
          <label htmlFor="partySize" className="form-label flex items-center">
            <HiUsers className="mr-2 h-5 w-5 text-primary-700" />
            Party Size
          </label>
          <select
            id="partySize"
            value={partySize}
            onChange={(e) => setPartySize(Number(e.target.value))}
            className="form-input"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? "Person" : "People"}
              </option>
            ))}
            <option value="11">11+ (Large Party)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="specialRequests"
            className="form-label flex items-center"
          >
            <HiInformationCircle className="mr-2 h-5 w-5 text-primary-700" />
            Special Requests (Optional)
          </label>
          <textarea
            id="specialRequests"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            className="form-input"
            rows={3}
            placeholder="Any special requests? (e.g., high chair, window seat, allergies)"
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting || !time || availableSlots.length === 0}
          className="btn-primary w-full py-3 flex items-center justify-center disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : null}
          Book a Table
        </motion.button>

        <p className="text-sm text-neutral-500 mt-2">
          Free cancellation up to 24 hours before your reservation
        </p>
      </form>
    </div>
  );
};

export default ReservationForm;
