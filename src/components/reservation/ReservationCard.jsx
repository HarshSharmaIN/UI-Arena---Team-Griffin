import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, isPast } from 'date-fns'
import toast from 'react-hot-toast'
import { cancelReservation } from '../../data/mockData'
import ReservationEditModal from './ReservationEditModal'
import { HiCalendar, HiClock, HiUsers, HiLocationMarker, HiPencil, HiX } from 'react-icons/hi'

const ReservationCard = ({ reservation, onUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const { id, restaurantName, date, time, partySize, status } = reservation
  
  const formattedDate = (() => {
    try {
      return format(new Date(date), 'MMMM d, yyyy')
    } catch (error) {
      return date
    }
  })()
  
  const isUpcoming = !isPast(new Date(`${date}T${time}`))
  const isCompletedOrCancelled = status === 'completed' || status === 'cancelled'
  
  const handleCancelReservation = async () => {
    if (confirm('Are you sure you want to cancel this reservation?')) {
      setIsDeleting(true)
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        const success = cancelReservation(id)
        
        if (success) {
          toast.success('Reservation cancelled successfully')
          onUpdate()
        } else {
          toast.error('Failed to cancel reservation')
        }
      } catch (error) {
        console.error('Cancel error:', error)
        toast.error('An error occurred')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <>
      <motion.div 
        className="bg-white rounded-lg shadow-card overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {status && (
          <div 
            className={`px-4 py-2 text-sm font-medium text-white ${
              status === 'confirmed' ? 'bg-success-500' : 
              status === 'cancelled' ? 'bg-error-500' : 
              'bg-neutral-500'
            }`}
          >
            {status === 'confirmed' ? 'Confirmed' : 
             status === 'cancelled' ? 'Cancelled' : 
             status === 'completed' ? 'Completed' : status}
          </div>
        )}
        
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-medium text-neutral-900">{restaurantName}</h3>
            
            {isUpcoming && status !== 'cancelled' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="p-1.5 text-neutral-500 hover:text-primary-700 rounded-full hover:bg-neutral-100 transition-colors"
                  aria-label="Edit reservation"
                >
                  <HiPencil className="h-5 w-5" />
                </button>
                <button
                  onClick={handleCancelReservation}
                  className="p-1.5 text-neutral-500 hover:text-error-600 rounded-full hover:bg-neutral-100 transition-colors"
                  aria-label="Cancel reservation"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <HiX className="h-5 w-5" />
                  )}
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center text-neutral-700">
              <HiCalendar className="h-5 w-5 mr-3 text-primary-700" />
              <span>{formattedDate}</span>
            </div>
            
            <div className="flex items-center text-neutral-700">
              <HiClock className="h-5 w-5 mr-3 text-primary-700" />
              <span>{time}</span>
            </div>
            
            <div className="flex items-center text-neutral-700">
              <HiUsers className="h-5 w-5 mr-3 text-primary-700" />
              <span>{partySize} {partySize === 1 ? 'Person' : 'People'}</span>
            </div>
            
            <div className="flex items-center text-neutral-700">
              <HiLocationMarker className="h-5 w-5 mr-3 text-primary-700" />
              <span>Table will be held for 15 minutes</span>
            </div>
          </div>
          
          {reservation.specialRequests && (
            <div className="mt-4 p-3 bg-neutral-50 rounded-md border border-neutral-200">
              <p className="text-sm text-neutral-700">
                <span className="font-medium">Special Requests:</span> {reservation.specialRequests}
              </p>
            </div>
          )}
          
          {isUpcoming && status === 'confirmed' && (
            <div className="mt-6 flex space-x-3">
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="btn-outline flex-1 py-2"
              >
                Modify
              </button>
              <button 
                onClick={handleCancelReservation}
                className="btn-ghost border border-neutral-200 flex-1 py-2"
                disabled={isDeleting}
              >
                Cancel
              </button>
            </div>
          )}
          
          {isCompletedOrCancelled && (
            <div className="mt-4">
              <p className="text-sm text-neutral-500">
                {status === 'completed' ? 
                  'We hope you enjoyed your meal! You can make another reservation anytime.' : 
                  'This reservation has been cancelled. You can make a new reservation anytime.'}
              </p>
            </div>
          )}
        </div>
      </motion.div>
      
      <ReservationEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        reservation={reservation}
        onUpdate={onUpdate}
      />
    </>
  )
}

export default ReservationCard