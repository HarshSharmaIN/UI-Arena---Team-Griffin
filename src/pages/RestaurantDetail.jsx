import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getRestaurantById, getReviewsByRestaurantId } from '../data/mockData'
import ReservationForm from '../components/reservation/ReservationForm'
import ReviewCard from '../components/restaurant/ReviewCard'
import { 
  HiStar, 
  HiCurrencyDollar, 
  HiClock, 
  HiPhone, 
  HiGlobe,
  HiLocationMarker, 
  HiChevronLeft, 
  HiChevronRight,
  HiArrowCircleRight,
  HiHeart
} from 'react-icons/hi'

const RestaurantDetail = () => {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [reviews, setReviews] = useState([])
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const restaurantData = getRestaurantById(id)
        setRestaurant(restaurantData)
        
        const reviewData = getReviewsByRestaurantId(id)
        setReviews(reviewData)
      } catch (error) {
        console.error('Error fetching restaurant data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [id])
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
      </div>
    )
  }
  
  if (!restaurant) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-medium text-neutral-900 mb-4">Restaurant not found</h1>
        <p className="text-neutral-600">The restaurant you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }
  
  const { 
    name, 
    cuisine, 
    priceRange, 
    rating, 
    reviewCount, 
    address, 
    phone, 
    website, 
    description, 
    hours, 
    images,
    amenities,
    popularDishes
  } = restaurant
  
  const nextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }
  
  const prevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  return (
    <motion.div 
      className="bg-neutral-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-neutral-200">
        {images && images.length > 0 && (
          <>
            <motion.img
              key={activeImageIndex}
              src={images[activeImageIndex]}
              alt={name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <div className="absolute bottom-6 right-6 flex space-x-2">
              <button
                onClick={prevImage}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
              >
                <HiChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
              >
                <HiChevronRight className="h-6 w-6" />
              </button>
            </div>
            
            <div className="absolute bottom-6 left-6 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === activeImageIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-elegant p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900">{name}</h1>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                    <span className="text-neutral-700">{cuisine}</span>
                    <span className="h-1 w-1 rounded-full bg-neutral-400"></span>
                    <div className="flex items-center">
                      <HiStar className="h-5 w-5 text-secondary-500 mr-1" />
                      <span className="font-medium">{rating}</span>
                      <span className="text-neutral-500 ml-1">({reviewCount} reviews)</span>
                    </div>
                    <span className="h-1 w-1 rounded-full bg-neutral-400"></span>
                    <div className="flex items-center text-neutral-700">
                      <HiCurrencyDollar className="h-5 w-5 mr-0.5" />
                      <span>{priceRange}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex mt-4 md:mt-0">
                  <button className="btn-ghost border border-neutral-200 p-2 rounded-full mr-2" aria-label="Save restaurant">
                    <HiHeart className="h-5 w-5" />
                  </button>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(address)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-outline py-2 px-4 flex items-center"
                  >
                    <HiLocationMarker className="mr-2 h-5 w-5" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
              
              <p className="text-neutral-700 mb-6">{description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">Contact Information</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start text-neutral-700">
                      <HiLocationMarker className="h-5 w-5 mr-3 mt-1 text-primary-700 flex-shrink-0" />
                      <span>{address}</span>
                    </li>
                    <li className="flex items-center text-neutral-700">
                      <HiPhone className="h-5 w-5 mr-3 text-primary-700 flex-shrink-0" />
                      <a href={`tel:${phone}`} className="hover:text-primary-700">{phone}</a>
                    </li>
                    <li className="flex items-center text-neutral-700">
                      <HiGlobe className="h-5 w-5 mr-3 text-primary-700 flex-shrink-0" />
                      <a 
                        href={website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-primary-700"
                      >
                        Visit website
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">Opening Hours</h3>
                  <div className="flex items-start text-neutral-700">
                    <HiClock className="h-5 w-5 mr-3 mt-1 text-primary-700 flex-shrink-0" />
                    <span className="whitespace-pre-line">{hours}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {amenities && amenities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {amenities.map((amenity, index) => (
                        <span 
                          key={index} 
                          className="badge-primary"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {popularDishes && popularDishes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900 mb-3">Popular Dishes</h3>
                    <div className="flex flex-wrap gap-2">
                      {popularDishes.map((dish, index) => (
                        <span 
                          key={index} 
                          className="badge-secondary"
                        >
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-elegant p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">Reviews</h2>
                <div className="flex items-center">
                  <HiStar className="h-6 w-6 text-secondary-500 mr-1" />
                  <span className="text-xl font-bold">{rating}</span>
                  <span className="text-neutral-500 ml-1">({reviewCount})</span>
                </div>
              </div>
              
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                  
                  {reviewCount > reviews.length && (
                    <button className="flex items-center text-primary-700 font-medium hover:text-primary-800">
                      View all {reviewCount} reviews
                      <HiArrowCircleRight className="ml-2 h-5 w-5" />
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-neutral-600">No reviews yet for this restaurant.</p>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ReservationForm restaurant={restaurant} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RestaurantDetail