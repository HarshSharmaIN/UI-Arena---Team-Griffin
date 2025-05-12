export const restaurants = [
  {
    id: 1,
    name: "Bella Cucina",
    cuisine: "Italian",
    priceRange: "$$",
    rating: 4.7,
    reviewCount: 342,
    address: "123 Main St, New York, NY 10001",
    phone: "(212) 555-1234",
    website: "https://bellacucina.com",
    description: "Authentic Italian cuisine in an elegant setting, featuring handmade pasta and wood-fired pizzas.",
    hours: "Mon-Thu: 11:30am-10pm, Fri-Sat: 11:30am-11pm, Sun: 12pm-9pm",
    images: [
      "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    featured: true,
    capacity: 80,
    reservationSlotDuration: 90,
    openingTime: "11:30",
    closingTime: "22:00",
    amenities: ["Outdoor Seating", "Full Bar", "Wheelchair Accessible", "Vegetarian Options"],
    popularDishes: ["Truffle Pasta", "Margherita Pizza", "Tiramisu"]
  },
  {
    id: 2,
    name: "Sakura Sushi",
    cuisine: "Japanese",
    priceRange: "$$$",
    rating: 4.9,
    reviewCount: 521,
    address: "456 Park Ave, New York, NY 10022",
    phone: "(212) 555-5678",
    website: "https://sakurasushi.com",
    description: "Premium sushi and Japanese specialties using the freshest ingredients flown in daily from Tokyo's fish market.",
    hours: "Mon-Sun: 12pm-11pm",
    images: [
      "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2098134/pexels-photo-2098134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/8448323/pexels-photo-8448323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    featured: true,
    capacity: 60,
    reservationSlotDuration: 120,
    openingTime: "12:00",
    closingTime: "23:00",
    amenities: ["Sushi Bar", "Private Dining", "Sake Selection", "Vegan Options"],
    popularDishes: ["Omakase", "Dragon Roll", "Wagyu Tataki"]
  },
  {
    id: 3,
    name: "Le Petit Bistro",
    cuisine: "French",
    priceRange: "$$$",
    rating: 4.6,
    reviewCount: 289,
    address: "789 Broadway, New York, NY 10003",
    phone: "(212) 555-9012",
    website: "https://lepetitbistro.com",
    description: "Classic French bistro fare in a charming, romantic atmosphere reminiscent of Paris.",
    hours: "Tue-Sun: 5pm-10:30pm, Closed Mondays",
    images: [
      "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3201922/pexels-photo-3201922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    featured: false,
    capacity: 45,
    reservationSlotDuration: 120,
    openingTime: "17:00",
    closingTime: "22:30",
    amenities: ["Wine List", "Romantic", "Dessert Menu", "Gluten-Free Options"],
    popularDishes: ["Coq au Vin", "Beef Bourguignon", "Crème Brûlée"]
  },
  {
    id: 4,
    name: "Taco Loco",
    cuisine: "Mexican",
    priceRange: "$",
    rating: 4.5,
    reviewCount: 612,
    address: "101 5th Ave, New York, NY 10003",
    phone: "(212) 555-3456",
    website: "https://tacoloco.com",
    description: "Vibrant taqueria serving authentic Mexican street food and craft margaritas in a festive environment.",
    hours: "Mon-Sun: 11am-12am",
    images: [
      "https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4958641/pexels-photo-4958641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3656498/pexels-photo-3656498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    featured: false,
    capacity: 70,
    reservationSlotDuration: 60,
    openingTime: "11:00",
    closingTime: "00:00",
    amenities: ["Happy Hour", "Takeout", "Tequila Selection", "Kid-Friendly"],
    popularDishes: ["Street Tacos", "Guacamole", "Churros"]
  },
  {
    id: 5,
    name: "Golden Dragon",
    cuisine: "Chinese",
    priceRange: "$$",
    rating: 4.4,
    reviewCount: 378,
    address: "202 Canal St, New York, NY 10013",
    phone: "(212) 555-7890",
    website: "https://goldendragonny.com",
    description: "Traditional Chinese cuisine with a modern twist, specializing in dim sum and Cantonese specialties.",
    hours: "Mon-Sun: 11:30am-10:30pm",
    images: [
      "https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3054690/pexels-photo-3054690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    featured: false,
    capacity: 100,
    reservationSlotDuration: 90,
    openingTime: "11:30",
    closingTime: "22:30",
    amenities: ["Dim Sum", "Large Parties", "Banquet Room", "Vegetarian Friendly"],
    popularDishes: ["Peking Duck", "Dim Sum Platter", "Kung Pao Chicken"]
  },
  {
    id: 6,
    name: "The Steakhouse",
    cuisine: "American",
    priceRange: "$$$$",
    rating: 4.8,
    reviewCount: 426,
    address: "303 West 51st St, New York, NY 10019",
    phone: "(212) 555-2345",
    website: "https://thesteakhouse.com",
    description: "Premium steakhouse offering dry-aged USDA prime beef and an extensive wine list in an upscale environment.",
    hours: "Mon-Fri: 5pm-11pm, Sat-Sun: 4pm-11:30pm",
    images: [
      "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1251196/pexels-photo-1251196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    featured: true,
    capacity: 75,
    reservationSlotDuration: 120,
    openingTime: "17:00",
    closingTime: "23:00",
    amenities: ["Wine Cellar", "Private Dining", "Valet Parking", "Business Casual"],
    popularDishes: ["Tomahawk Ribeye", "Lobster Mac & Cheese", "New York Cheesecake"]
  },
];

const generateTimeSlots = (restaurant) => {
  const today = new Date();
  const slots = [];
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dateStr = date.toISOString().split('T')[0];
    
    const [openHour, openMinute] = restaurant.openingTime.split(':').map(Number);
    const [closeHour, closeMinute] = restaurant.closingTime.split(':').map(Number);
    
    const openMinutes = openHour * 60 + openMinute;
    const closeMinutes = closeHour * 60 + closeMinute;
    
    for (
      let timeMinutes = openMinutes; 
      timeMinutes <= closeMinutes - restaurant.reservationSlotDuration; 
      timeMinutes += 30
    ) {
      const hour = Math.floor(timeMinutes / 60);
      const minute = timeMinutes % 60;
      
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      slots.push({
        restaurantId: restaurant.id,
        date: dateStr,
        time: timeStr,
      });
    }
  }
  
  return slots;
};

export const generateAllReservationSlots = () => {
  let allSlots = [];
  
  restaurants.forEach(restaurant => {
    const restaurantSlots = generateTimeSlots(restaurant);
    allSlots = [...allSlots, ...restaurantSlots];
  });
  return allSlots;
};

export const userReservations = [
  {
    id: 101,
    restaurantId: 2,
    restaurantName: "Sakura Sushi",
    date: (() => {
      const date = new Date();
      date.setDate(date.getDate() + 2);
      return date.toISOString().split('T')[0];
    })(),
    time: "19:00",
    partySize: 2,
    specialRequests: "Window seat preferred",
    status: "confirmed"
  },
  {
    id: 102,
    restaurantId: 1,
    restaurantName: "Bella Cucina",
    date: (() => {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      return date.toISOString().split('T')[0];
    })(),
    time: "20:00",
    partySize: 4,
    specialRequests: "Celebrating a birthday",
    status: "confirmed"
  },
  {
    id: 103,
    restaurantId: 6,
    restaurantName: "The Steakhouse",
    date: (() => {
      const date = new Date();
      date.setDate(date.getDate() - 5);
      return date.toISOString().split('T')[0];
    })(),
    time: "18:30",
    partySize: 2,
    specialRequests: "",
    status: "completed"
  }
];

export const reviews = [
  {
    id: 1,
    restaurantId: 1,
    userName: "John D.",
    rating: 5,
    date: "2023-10-15",
    content: "The pasta was to die for! Authentic Italian flavors that transported me straight to Rome. Service was impeccable."
  },
  {
    id: 2,
    restaurantId: 1,
    userName: "Sarah M.",
    rating: 4,
    date: "2023-09-22",
    content: "Great food and atmosphere. The wood-fired pizza had perfect char. Only complaint is that it got a bit noisy."
  },
  {
    id: 3,
    restaurantId: 2,
    userName: "David L.",
    rating: 5,
    date: "2023-10-05",
    content: "The omakase experience was exceptional. Chef Tanaka's attention to detail and quality of fish is unmatched in the city."
  },
  {
    id: 4,
    restaurantId: 2,
    userName: "Michelle T.",
    rating: 5,
    date: "2023-09-30",
    content: "Worth every penny! The freshest sushi I've had outside of Japan. Make sure to try the daily specials."
  },
  {
    id: 5,
    restaurantId: 3,
    userName: "Robert B.",
    rating: 4,
    date: "2023-10-10",
    content: "Cozy atmosphere with excellent French cuisine. The coq au vin was rich and flavorful. Wine selection is impressive."
  }
];

export const getRestaurantById = (id) => {
  return restaurants.find(restaurant => restaurant.id === Number(id));
};

export const getReviewsByRestaurantId = (restaurantId) => {
  return reviews.filter(review => review.restaurantId === Number(restaurantId));
};

export const getReservationSlots = (restaurantId, date) => {
  const allSlots = generateAllReservationSlots();
  return allSlots.filter(
    slot => slot.restaurantId === Number(restaurantId) && slot.date === date
  );
};

export const getUserReservations = () => {
  return userReservations;
};

export const addReservation = (reservation) => {
  const newReservation = {
    id: Date.now(),
    ...reservation,
    status: "confirmed"
  };
  
  userReservations.push(newReservation);
  return newReservation;
};

export const updateReservation = (id, updates) => {
  const index = userReservations.findIndex(res => res.id === Number(id));
  
  if (index !== -1) {
    userReservations[index] = { ...userReservations[index], ...updates };
    return userReservations[index];
  }
  
  return null;
};

export const cancelReservation = (id) => {
  const index = userReservations.findIndex(res => res.id === Number(id));
  
  if (index !== -1) {
    userReservations[index].status = "cancelled";
    return true;
  }
  
  return false;
};