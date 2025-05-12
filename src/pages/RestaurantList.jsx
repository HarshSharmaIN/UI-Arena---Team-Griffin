import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { restaurants } from '../data/mockData'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import RestaurantFilters from '../components/restaurant/RestaurantFilters'
import { HiSearch, HiAdjustments, HiSortDescending } from 'react-icons/hi'

const RestaurantList = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('rating')
  const [filters, setFilters] = useState({
    cuisines: [],
    priceRanges: [],
    amenities: []
  })
  const location = useLocation()
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const searchQuery = searchParams.get('search') || ''
    const cuisine = searchParams.get('cuisine')
    
    setSearchQuery(searchQuery)
    
    if (cuisine) {
      setFilters(prev => ({
        ...prev,
        cuisines: [cuisine]
      }))
    }
  }, [location.search])
  
  useEffect(() => {
    let results = [...restaurants]
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        restaurant => 
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.cuisine.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query)
      )
    }
    
    if (filters.cuisines.length > 0) {
      results = results.filter(restaurant => 
        filters.cuisines.includes(restaurant.cuisine)
      )
    }
    
    if (filters.priceRanges.length > 0) {
      results = results.filter(restaurant => 
        filters.priceRanges.includes(restaurant.priceRange)
      )
    }
    
    if (filters.amenities.length > 0) {
      results = results.filter(restaurant => 
        filters.amenities.every(amenity => 
          restaurant.amenities.includes(amenity)
        )
      )
    }
    
    results.sort((a, b) => {
      switch (sortOption) {
        case 'rating':
          return b.rating - a.rating
        case 'reviews':
          return b.reviewCount - a.reviewCount
        case 'priceAsc':
          return a.priceRange.length - b.priceRange.length
        case 'priceDesc':
          return b.priceRange.length - a.priceRange.length
        default:
          return 0
      }
    })
    
    setFilteredRestaurants(results)
  }, [searchQuery, filters, sortOption])
  
  const handleSearchSubmit = (e) => {
    e.preventDefault()
  }
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Restaurants</h1>
        <p className="text-neutral-600 mb-8">
          Discover and book tables at the best restaurants in your area
        </p>
        
        <div className="mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <HiSearch className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search restaurants by name, cuisine, or location..."
                className="form-input pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative min-w-[180px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <HiSortDescending className="h-5 w-5 text-neutral-400" />
              </div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="form-input pl-10 appearance-none"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
          </form>
        </div>
        
        <RestaurantFilters onFilterChange={handleFilterChange} />
        
        <div className="mb-6">
          <p className="text-neutral-600">
            Showing {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'}
          </p>
        </div>
        
        <AnimatePresence mode="wait">
          {filteredRestaurants.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredRestaurants.map((restaurant, index) => (
                <RestaurantCard 
                  key={restaurant.id}
                  restaurant={restaurant}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="mx-auto w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                <HiSearch className="h-12 w-12 text-neutral-400" />
              </div>
              <h3 className="text-xl font-medium text-neutral-900 mb-2">No restaurants found</h3>
              <p className="text-neutral-600 max-w-md mx-auto">
                We couldn't find any restaurants matching your criteria. Try adjusting your filters or search query.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default RestaurantList