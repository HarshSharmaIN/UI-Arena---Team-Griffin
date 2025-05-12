import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiAdjustments, HiChevronDown, HiX } from 'react-icons/hi'

const RestaurantFilters = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [cuisines, setCuisines] = useState([])
  const [priceRanges, setPriceRanges] = useState([])
  const [amenities, setAmenities] = useState([])
  
  const cuisineOptions = [
    'Italian', 
    'Japanese', 
    'French', 
    'Mexican', 
    'Chinese', 
    'American', 
    'Indian',
    'Thai',
    'Mediterranean'
  ]
  
  const priceRangeOptions = [
    { value: '$', label: 'Inexpensive' },
    { value: '$$', label: 'Moderate' },
    { value: '$$$', label: 'Expensive' },
    { value: '$$$$', label: 'Very Expensive' }
  ]
  
  const amenityOptions = [
    'Outdoor Seating',
    'Full Bar',
    'Private Dining',
    'Wheelchair Accessible',
    'Vegetarian Options',
    'Vegan Options',
    'Happy Hour',
    'Romantic',
    'Kid-Friendly'
  ]
  
  const handleCuisineChange = (cuisine) => {
    setCuisines(prev => {
      const updated = prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
      
      applyFilters(updated, priceRanges, amenities)
      return updated
    })
  }
  
  const handlePriceRangeChange = (priceRange) => {
    setPriceRanges(prev => {
      const updated = prev.includes(priceRange)
        ? prev.filter(p => p !== priceRange)
        : [...prev, priceRange]
      
      applyFilters(cuisines, updated, amenities)
      return updated
    })
  }
  
  const handleAmenityChange = (amenity) => {
    setAmenities(prev => {
      const updated = prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
      
      applyFilters(cuisines, priceRanges, updated)
      return updated
    })
  }
  
  const applyFilters = (cuisineFilters, priceFilters, amenityFilters) => {
    onFilterChange({
      cuisines: cuisineFilters,
      priceRanges: priceFilters,
      amenities: amenityFilters
    })
  }
  
  const clearAllFilters = () => {
    setCuisines([])
    setPriceRanges([])
    setAmenities([])
    onFilterChange({
      cuisines: [],
      priceRanges: [],
      amenities: []
    })
  }
  
  const totalActiveFilters = cuisines.length + priceRanges.length + amenities.length

  return (
    <div className="mb-8">
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm border border-neutral-200"
        >
          <div className="flex items-center">
            <HiAdjustments className="h-5 w-5 text-primary-700 mr-2" />
            <span className="font-medium text-neutral-900">
              Filters
              {totalActiveFilters > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-primary-100 text-primary-700 rounded-full">
                  {totalActiveFilters}
                </span>
              )}
            </span>
          </div>
          <HiChevronDown className={`h-5 w-5 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <motion.div 
        className={`bg-white rounded-lg shadow-sm border border-neutral-200 mt-3 md:mt-0 overflow-hidden ${
          isOpen ? 'block' : 'hidden md:block'
        }`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 'auto',
          opacity: isOpen ? 1 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg text-neutral-900">Filters</h3>
            {totalActiveFilters > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-primary-700 hover:text-primary-800 flex items-center"
              >
                <HiX className="h-4 w-4 mr-1" />
                Clear all
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-neutral-900 mb-3">Cuisine</h4>
              <div className="space-y-2">
                {cuisineOptions.map(cuisine => (
                  <label key={cuisine} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={cuisines.includes(cuisine)}
                      onChange={() => handleCuisineChange(cuisine)}
                      className="h-4 w-4 rounded border-neutral-300 text-primary-700 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-neutral-700 text-sm">{cuisine}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-neutral-900 mb-3">Price Range</h4>
              <div className="space-y-2">
                {priceRangeOptions.map(({ value, label }) => (
                  <label key={value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={priceRanges.includes(value)}
                      onChange={() => handlePriceRangeChange(value)}
                      className="h-4 w-4 rounded border-neutral-300 text-primary-700 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-neutral-700 text-sm">
                      {value} - {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-neutral-900 mb-3">Amenities</h4>
              <div className="space-y-2">
                {amenityOptions.map(amenity => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="h-4 w-4 rounded border-neutral-300 text-primary-700 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-neutral-700 text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {totalActiveFilters > 0 && (
          <div className="px-5 pb-5">
            <div className="pt-4 border-t border-neutral-200">
              <h4 className="font-medium text-neutral-900 mb-3">Active Filters</h4>
              <div className="flex flex-wrap gap-2">
                {cuisines.map(cuisine => (
                  <button
                    key={cuisine}
                    onClick={() => handleCuisineChange(cuisine)}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700"
                  >
                    {cuisine}
                    <HiX className="ml-1.5 h-4 w-4" />
                  </button>
                ))}
                
                {priceRanges.map(price => (
                  <button
                    key={price}
                    onClick={() => handlePriceRangeChange(price)}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary-100 text-secondary-700"
                  >
                    {price}
                    <HiX className="ml-1.5 h-4 w-4" />
                  </button>
                ))}
                
                {amenities.map(amenity => (
                  <button
                    key={amenity}
                    onClick={() => handleAmenityChange(amenity)}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-neutral-100 text-neutral-700"
                  >
                    {amenity}
                    <HiX className="ml-1.5 h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default RestaurantFilters