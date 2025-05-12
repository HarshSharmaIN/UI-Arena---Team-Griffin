import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getUserReservations } from '../data/mockData'
import ReservationCard from '../components/reservation/ReservationCard'
import { HiCalendar, HiChevronRight } from 'react-icons/hi'

const Reservations = () => {
  const [reservations, setReservations] = useState([])
  const [upcomingReservations, setUpcomingReservations] = useState([])
  const [pastReservations, setPastReservations] = useState([])
  const [loading, setLoading] = useState(true)
  
  const fetchReservations = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const data = getUserReservations()
      setReservations(data)
      
      const now = new Date()
      
      const upcoming = data.filter(res => {
        if (res.status === 'cancelled') return false
        const reservationTime = new Date(`${res.date}T${res.time}`)
        return reservationTime > now
      })
      
      const past = data.filter(res => {
        const reservationTime = new Date(`${res.date}T${res.time}`)
        return reservationTime <= now || res.status === 'cancelled'
      })
      
      setUpcomingReservations(upcoming)
      setPastReservations(past)
    } catch (error) {
      console.error('Error fetching reservations:', error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchReservations()
  }, [])

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-neutral-900">My Reservations</h1>
          <Link 
            to="/restaurants" 
            className="btn-primary flex items-center"
          >
            Make a Reservation
            <HiChevronRight className="ml-1 h-5 w-5" />
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
          </div>
        ) : (
          <div>
            {reservations.length === 0 ? (
              <div className="bg-white rounded-lg shadow-card p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                  <HiCalendar className="h-8 w-8 text-neutral-400" />
                </div>
                <h2 className="text-xl font-medium text-neutral-900 mb-2">No reservations yet</h2>
                <p className="text-neutral-600 max-w-md mx-auto mb-6">
                  You haven't made any reservations yet. Browse our restaurants and book your first table!
                </p>
                <Link to="/restaurants" className="btn-primary py-2.5 px-5">
                  Browse Restaurants
                </Link>
              </div>
            ) : (
              <div className="space-y-10">
                <section>
                  <h2 className="text-xl font-medium text-neutral-900 mb-4">
                    Upcoming Reservations
                  </h2>
                  
                  {upcomingReservations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {upcomingReservations.map((reservation) => (
                        <ReservationCard
                          key={reservation.id}
                          reservation={reservation}
                          onUpdate={fetchReservations}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                      <p className="text-neutral-600">You don't have any upcoming reservations.</p>
                      <Link to="/restaurants" className="mt-4 inline-block text-primary-700 font-medium">
                        Find a restaurant to make a reservation
                      </Link>
                    </div>
                  )}
                </section>
                
                {pastReservations.length > 0 && (
                  <section>
                    <h2 className="text-xl font-medium text-neutral-900 mb-4">
                      Past Reservations
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {pastReservations.map((reservation) => (
                        <ReservationCard
                          key={reservation.id}
                          reservation={reservation}
                          onUpdate={fetchReservations}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Reservations