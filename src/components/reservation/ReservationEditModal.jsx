import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import toast from 'react-hot-toast'
import { updateReservation, getReservationSlots, getRestaurantById } from '../../data/mockData'
import { HiX, HiCalendar, HiClock, HiUsers, HiInformationCircle } from 'react-icons/hi'

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring",
      duration: 0.3,
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { 
      duration: 0.2,
    }
  }
}

const ReservationEditModal = ({ isOpen, onClose, reservation, onUpdate }) => {
  const [date, setDate] = useState(new Date(reservation.date))
  const [time, setTime] = useState(reservation.time)
  const [partySize, setPartySize] = useState(reservation.partySize)
  const [specialRequests, setSpecialRequests] = useState(reservation.specialRequests || '')
  const [availableSlots, setAvailableSlots] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [restaurant, setRestaurant] = useState(null)

  useEffect(() => {
    if (reservation.restaurantId) {
      const restaurantData = getRestaurantById(reservation.restaurantId)
      setRestaurant(restaurantData)
    }
  }, [reservation.restaurantId])

  useEffect(() => {
    if (reservation.restaurantId && date) {
      const formattedDate = date.toISOString().split('T')[0]
      const slots = getReservationSlots(reservation.restaurantId, formattedDate)
      
      const currentTimeSlot = {
        restaurantId: reservation.restaurantId,
        date: formattedDate,
        time: reservation.time,
        availableTables: 1
      }
      
      const isCurrentTimeIncluded = slots.some(slot => slot.time === reservation.time)
      
      let allSlots = slots
      if (formattedDate === reservation.date && !isCurrentTimeIncluded) {
        allSlots = [...slots, currentTimeSlot]
      }
      
      allSlots.sort((a, b) => a.time.localeCompare(b.time))
      
      const availableSlots = allSlots.filter(slot => slot.availableTables > 0)
      setAvailableSlots(availableSlots)
      
      if (!time && availableSlots.length > 0) {
        setTime(availableSlots[0].time)
      }
    }
  }, [reservation.restaurantId, date, reservation.date, reservation.time])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!date || !time || !partySize) {
      toast.error('Please fill in all required fields')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const formattedDate = date.toISOString().split('T')[0]
      
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const updatedReservation = updateReservation(reservation.id, {
        date: formattedDate,
        time,
        partySize,
        specialRequests
      })
      
      if (updatedReservation) {
        toast.success('Reservation updated successfully')
        onUpdate()
        onClose()
      } else {
        toast.error('Failed to update reservation')
      }
    } catch (error) {
      toast.error('An error occurred')
      console.error('Update error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const groupTimeSlotsByHour = () => {
    const groups = {}
    
    availableSlots.forEach(slot => {
      const hour = slot.time.split(':')[0]
      if (!groups[hour]) {
        groups[hour] = []
      }
      groups[hour].push(slot)
    })
    
    return Object.entries(groups).map(([hour, slots]) => ({
      hour,
      slots
    }))
  }

  const groupedTimeSlots = groupTimeSlotsByHour()

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={onClose}
          open={isOpen}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            
            <motion.div
              className="relative z-50 inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white rounded-lg shadow-xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-between items-center mb-6">
                <Dialog.Title as="h3" className="text-xl font-medium text-neutral-900">
                  Modify Reservation
                </Dialog.Title>
                <button
                  type="button"
                  className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                  onClick={onClose}
                >
                  <HiX className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h4 className="font-medium text-neutral-900">
                    {reservation.restaurantName}
                  </h4>
                  {restaurant && (
                    <p className="text-sm text-neutral-500">
                      {restaurant.cuisine} • {restaurant.address}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="date" className="form-label flex items-center">
                    <HiCalendar className="mr-2 h-5 w-5 text-primary-700" />
                    Date
                  </label>
                  <DatePicker
                    selected={date}
                    onChange={setDate}
                    minDate={new Date()}
                    maxDate={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)}
                    dateFormat="MMMM d, yyyy"
                    className="form-input w-full"
                    wrapperClassName="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="form-label flex items-center">
                    <HiClock className="mr-2 h-5 w-5 text-primary-700" />
                    Time
                  </label>
                  
                  {availableSlots.length > 0 ? (
                    <div className="max-h-48 overflow-y-auto space-y-4">
                      {groupedTimeSlots.map(group => (
                        <div key={group.hour} className="space-y-2">
                          <h4 className="text-sm font-medium text-neutral-700">
                            {parseInt(group.hour) < 12 
                              ? `${group.hour} AM` 
                              : parseInt(group.hour) === 12 
                                ? '12 PM' 
                                : `${parseInt(group.hour) - 12} PM`}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {group.slots.map(slot => (
                              <button
                                key={slot.time}
                                type="button"
                                onClick={() => setTime(slot.time)}
                                className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                                  time === slot.time
                                    ? 'bg-primary-700 text-white'
                                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-3 px-4 bg-neutral-50 rounded-md text-neutral-700 text-sm">
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
                        {i + 1} {i === 0 ? 'Person' : 'People'}
                      </option>
                    ))}
                    <option value="11">11+ (Large Party)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="specialRequests" className="form-label flex items-center">
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
                
                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-ghost border border-neutral-300 flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !time || availableSlots.length === 0}
                    className="btn-primary flex-1 flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

export default ReservationEditModal