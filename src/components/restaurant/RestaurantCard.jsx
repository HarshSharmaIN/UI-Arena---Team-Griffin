import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiStar, HiLocationMarker, HiCurrencyDollar } from 'react-icons/hi'

const RestaurantCard = ({ restaurant, index }) => {
  const {
    id,
    name,
    cuisine,
    priceRange,
    rating,
    reviewCount,
    address,
    images
  } = restaurant

  const delay = index * 0.1

  return (
    <motion.div
      className="card group h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/restaurants/${id}`} className="block h-full">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <div className="absolute top-3 right-3 flex items-center bg-white/90 backdrop-blur-sm text-primary-700 rounded-full px-2.5 py-1">
            <HiStar className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white bg-black/50 backdrop-blur-sm">
              <HiCurrencyDollar className="h-3.5 w-3.5 mr-0.5" />
              {priceRange}
            </span>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-lg font-medium text-neutral-900">{name}</h3>
          <div className="mt-1 flex items-center text-sm text-neutral-600">
            {cuisine}
            <span className="mx-1.5 h-1 w-1 rounded-full bg-neutral-400"></span>
            <span className="flex items-center">
              <HiStar className="h-4 w-4 text-secondary-500 mr-1" />
              {rating} ({reviewCount})
            </span>
          </div>
          <div className="mt-2 flex items-start text-sm text-neutral-500">
            <HiLocationMarker className="h-4 w-4 mt-0.5 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{address}</span>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {restaurant.amenities && restaurant.amenities.slice(0, 3).map((amenity, i) => (
              <span 
                key={i} 
                className="badge-primary text-xs py-1"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default RestaurantCard