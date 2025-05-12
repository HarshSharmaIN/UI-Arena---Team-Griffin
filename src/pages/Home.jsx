import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { restaurants } from '../data/mockData'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import { HiSearch, HiArrowRight } from 'react-icons/hi'

const Home = () => {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  
  useEffect(() => {
    const featured = restaurants.filter(restaurant => restaurant.featured)
    setFeaturedRestaurants(featured)
  }, [])
  
  const handleSearch = (e) => {
    e.preventDefault()
    
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Restaurant ambiance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-neutral-900/50"></div>
        </div>
        
        <div className="relative z-10 container-custom py-24 md:py-32 lg:py-40">
          <motion.div 
            className="max-w-2xl"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              variants={childVariants}
            >
              Reserve your table at the best restaurants
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-white/90 mb-8"
              variants={childVariants}
            >
              Discover and book the finest dining experiences in your city with our easy reservation system.
            </motion.p>
            
            <motion.form 
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={handleSearch}
              variants={childVariants}
            >
              <div className="relative flex-grow">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <HiSearch className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search restaurants by name, cuisine, or location..."
                  className="py-3 px-4 pl-10 block w-full rounded-lg bg-white/95 backdrop-blur-sm border-0 focus:ring-2 focus:ring-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="btn-primary bg-primary-700 hover:bg-primary-800 py-3 px-6 sm:px-8"
              >
                Search
              </button>
            </motion.form>
            
            <motion.div 
              className="mt-8 flex flex-wrap gap-3"
              variants={childVariants}
            >
              <span className="text-white/70 mr-2">Popular:</span>
              {['Italian', 'Japanese', 'French', 'Mexican'].map((cuisine) => (
                <Link
                  key={cuisine}
                  to={`/restaurants?cuisine=${cuisine}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                >
                  {cuisine}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">Featured Restaurants</h2>
              <p className="mt-2 text-neutral-600 max-w-2xl">
                Discover our selection of the finest restaurants, perfect for your next dining experience.
              </p>
            </div>
            <Link 
              to="/restaurants"
              className="mt-4 md:mt-0 inline-flex items-center text-primary-700 font-medium hover:text-primary-800"
            >
              View all restaurants
              <HiArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRestaurants.map((restaurant, index) => (
              <RestaurantCard 
                key={restaurant.id} 
                restaurant={restaurant}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900">How It Works</h2>
            <p className="mt-2 text-neutral-600 max-w-2xl mx-auto">
              Book your favorite restaurant in just a few simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Find a Restaurant",
                description: "Search for restaurants by name, cuisine, or location to find the perfect place for your occasion.",
                icon: "https://images.pexels.com/photos/6941045/pexels-photo-6941045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                title: "Choose a Time",
                description: "Select from available times and dates that work with your schedule, instantly see availability.",
                icon: "https://images.pexels.com/photos/4255483/pexels-photo-4255483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                title: "Confirm Reservation",
                description: "Complete your booking with your details and special requests, receive instant confirmation.",
                icon: "https://images.pexels.com/photos/5695705/pexels-photo-5695705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            ].map((step, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg overflow-hidden shadow-elegant"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={step.icon} 
                    alt={step.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-700 text-white font-medium text-sm mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-neutral-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary-700">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to find your next dining experience?</h2>
            <p className="text-primary-100 max-w-2xl mx-auto mb-8">
              Join thousands of food lovers who have found their perfect restaurant through TableTaste.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/restaurants" className="btn-secondary py-3 px-8">
                Browse Restaurants
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home