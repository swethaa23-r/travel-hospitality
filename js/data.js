/**
 * Stackly - Travel & Hospitality Master Data & LocalStorage Management
 * Brand Colors: Deep Ocean Blue (#123B52), Sunset Gold (#E9A23B), Warm Ivory (#F8F6F0)
 */

const STACKLY_STORAGE_KEYS = {
  DESTINATIONS: 'stackly_destinations',
  PACKAGES: 'stackly_packages',
  HOTELS: 'stackly_hotels',
  BOOKINGS: 'stackly_bookings',
  WISHLIST: 'stackly_wishlist',
  USERS: 'stackly_users',
  REVIEWS: 'stackly_reviews',
  CURRENT_USER: 'stackly_current_user',
  ADMIN_USER: 'stackly_admin_user',
  BLOGS: 'stackly_blogs'
};
const WANDERNEST_STORAGE_KEYS = STACKLY_STORAGE_KEYS;

const DEFAULT_DESTINATIONS = [
  {
    id: 'dest-bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Southeast Asia',
    category: 'Beach Holidays',
    price: 899,
    rating: 4.9,
    reviewsCount: 342,
    experiencesCount: 48,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1920&q=80',
    description: 'An idyllic paradise of emerald terraced rice paddies, sacred sea temples, and pristine golden beaches along the azure Indian Ocean.',
    overview: 'Known as the Island of the Gods, Bali captivates with its dramatic volcanic peaks, spiritual water temples, world-class surf breaks, and restorative holistic sanctuaries. Whether exploring ancient Ubud arts or lounging in private Uluwatu cliff villas, Bali offers boundless magic.',
    bestTimeToVisit: 'April to October (Dry Season, ideal for beach activities and hiking)',
    weather: 'Tropical climate with average temperatures around 27°C - 31°C (81°F - 88°F) year-round.',
    popularAttractions: ['Uluwatu Clifftop Temple', 'Tegallalang Rice Terraces', 'Mount Batur Sunrise Trek', 'Seminyak Coastal Coastline', 'Sacred Monkey Forest Sanctuary'],
    localCulture: 'Balinese Hinduism deeply shapes daily life through floral Canang Sari offerings, captivating Kecak fire dances, and serene temple galas.',
    activities: ['Sunrise Volcanic Hiking', 'Traditional Balinese Cooking Masterclass', 'Reef Scuba Diving in Nusa Penida', 'Ayurvedic Wellness Spa Retreats'],
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'dest-swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    region: 'Europe',
    category: 'Adventure',
    price: 1850,
    rating: 4.95,
    reviewsCount: 289,
    experiencesCount: 36,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    description: 'Majestic snow-capped alpine summits, crystal-clear glacial lakes, and timeless wooden chalets nestled in verdant mountain valleys.',
    overview: 'The Swiss Alps represent the pinnacle of alpine majesty. From the iconic Matterhorn in Zermatt to the dramatic heights of the Jungfrau Region, travelers experience world-renowned panoramic train journeys, Michelin-starred alpine gastronomy, and legendary powder slopes.',
    bestTimeToVisit: 'December to March for winter sports; June to September for alpine hiking and wildflower blooms.',
    weather: 'Alpine alpine climate; winter ranges from -5°C to 2°C, while pleasant summers hover around 18°C to 24°C.',
    popularAttractions: ['The Matterhorn & Gornergrat', 'Jungfraujoch - Top of Europe', 'Lake Geneva Shoreline', 'Glacier Express Scenic Train', 'Chillon Castle'],
    localCulture: 'Renowned for Swiss precision, fondue evenings by hearth fires, alpine horn music, and artisanal cheesemaking traditions.',
    activities: ['Glacier Skiing & Snowboarding', 'Helicopter Alpine Flightseeing', 'First Cliff Walk in Grindelwald', 'Artisanal Chocolate & Wine Tasting'],
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'dest-santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    category: 'Honeymoon',
    price: 1450,
    rating: 4.92,
    reviewsCount: 412,
    experiencesCount: 42,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=80',
    description: 'Iconic whitewashed caldera villages, cobalt-blue domes, and mesmerizing golden sunsets sinking into the Aegean Sea.',
    overview: 'Carved from an ancient volcanic cataclysm, Santorini stands as the jewel of the Cyclades. Perched high on dramatic cliff edges, villages like Oia and Fira boast cave suites with plunge pools, ancient Minoan ruins, and sun-drenched volcanic vineyards.',
    bestTimeToVisit: 'Late April through early November; peak summer for vibrant beach clubs, shoulder months for romantic tranquility.',
    weather: 'Mediterranean climate: warm, sunny summers (28°C - 33°C) and gentle breezes across the Aegean cliffs.',
    popularAttractions: ['Oia Sunset Promenades', 'Ancient Akrotiri Archaeological Site', 'Red Sand Beach', 'Caldera Catamaran Cruises', 'Pyrgos Medieval Village'],
    localCulture: 'Warm Greek hospitality (Philoxenia), fresh grilled seafood tavernas, and rare Assyrtiko dry white wines harvested from volcanic soils.',
    activities: ['Private Sunset Catamaran Sailing', 'Wine Tasting in Cliffside Vineyards', 'Helicopter Tour over Caldera', 'Scuba Diving Volcanic Reefs'],
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'dest-maldives',
    name: 'Maldives',
    country: 'Republic of Maldives',
    region: 'Indian Ocean',
    category: 'Luxury Travel',
    price: 2400,
    rating: 4.98,
    reviewsCount: 520,
    experiencesCount: 29,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    description: 'Ultra-exclusive private island atolls with overwater stilt villas, turquoise lagoons, and kaleidoscopic coral reefs.',
    overview: 'The Maldives is the definitive archetype of barefoot luxury. Spread across 26 biological atolls, each private resort occupies its own secluded island. Indulge in submerged underwater dining, bespoke butler services, and encounters with gentle whale sharks in protected marine sanctuaries.',
    bestTimeToVisit: 'November to April, offering crisp blue skies, calm waters, and virtually zero rainfall.',
    weather: 'Year-round tropical warmth between 28°C and 31°C; balmy ocean waters average 28°C.',
    popularAttractions: ['Ari Atoll Marine Protected Reserve', 'Male Fish Market & Old Friday Mosque', 'Hanifaru Bay Manta Ray Haven', 'Underwater Coral Nurseries'],
    localCulture: 'Dhivehi heritage influenced by maritime seafarers, intricate lacquer craftsmanship, and rhythmic Boduberu drumming.',
    activities: ['Snorkeling with Manta Rays & Turtles', 'Submarine Lagoon Dining Experience', 'Sunset Dolphin Cruises', 'Deep-sea Big Game Fishing'],
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'dest-kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    category: 'Cultural Tours',
    price: 1350,
    rating: 4.88,
    reviewsCount: 310,
    experiencesCount: 54,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=80',
    description: 'Ancient imperial palaces, moss-carpeted Zen rock gardens, mystical bamboo groves, and traditional geisha districts.',
    overview: 'For over a millennium the imperial heart of Japan, Kyoto preserves thousands of classical Buddhist temples, Shinto shrines, and historic wooden machiya townhouses. Walk under thousands of vermilion torii gates at Fushimi Inari and experience meditative matcha tea rituals.',
    bestTimeToVisit: 'March to May for cherry blossoms (Sakura); October to November for brilliant autumn maple foliage (Koyo).',
    weather: 'Four distinct seasons; spring and autumn are wonderfully temperate around 15°C - 22°C.',
    popularAttractions: ['Fushimi Inari Shrine', 'Kinkaku-ji (The Golden Pavilion)', 'Arashiyama Bamboo Forest', 'Gion Historic Geisha Quarter', 'Kiyomizu-dera Cliffside Temple'],
    localCulture: 'Refined Kaiseki multi-course dining, silent Zen mindfulness meditation, intricate kimono textile weaving, and ceremonial tea ceremonies.',
    activities: ['Authentic Tea Ceremony with a Tea Master', 'Private Kimono Rental & Walking Tour', 'Zen Meditation at Daitoku-ji', 'Sake Brewery Tasting in Fushimi'],
    isFeatured: true,
    isTrending: false
  },
  {
    id: 'dest-kerala',
    name: 'Kerala',
    country: 'India',
    region: 'South Asia',
    category: 'Family Vacations',
    price: 750,
    rating: 4.85,
    reviewsCount: 265,
    experiencesCount: 38,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80',
    description: 'Tranquil palm-fringed backwater canals, traditional kettuvallam houseboats, mist-shrouded tea plantations, and Ayurveda.',
    overview: 'Lovingly called "Gods Own Country", Kerala lies on the tropical Malabar Coast of southern India. Glide effortlessly through emerald lagoons on handcrafted houseboats, trek the tea-carpeted slopes of Munnar, and rejuvenate with classical 5,000-year-old Ayurvedic healing traditions.',
    bestTimeToVisit: 'September to March, when humidity drops and weather is delightfully pleasant.',
    weather: 'Tropical coastal climate; pleasant winters (23°C - 30°C) with lush post-monsoon greenery.',
    popularAttractions: ['Alleppey Backwaters & Vembanad Lake', 'Munnar High-Altitude Tea Estates', 'Fort Kochi Heritage Quarter & Chinese Fishing Nets', 'Periyar Wildlife Sanctuary'],
    localCulture: 'Kathakali classical dance dramas, aromatic spice plantation heritage, martial art of Kalaripayattu, and communal Sadhya feasts on banana leaves.',
    activities: ['Overnight Private Houseboat Cruise', 'Ayurvedic Panchakarma Wellness', 'Wild Elephant Safari in Periyar', 'Cooking with Organic Spices in Thekkady'],
    isFeatured: true,
    isTrending: false
  },
  {
    id: 'dest-amalfi',
    name: 'Amalfi Coast',
    country: 'Italy',
    region: 'Europe',
    category: 'Luxury Travel',
    price: 1950,
    rating: 4.94,
    reviewsCount: 380,
    experiencesCount: 31,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1920&q=80',
    description: 'Dramatic vertical cliffs plunging into turquoise Mediterranean seas, pastel-colored coastal villages, and fragrant lemon groves.',
    overview: 'A UNESCO World Heritage coastline of sheer theatrical grandeur. Positano, Amalfi, and Ravello cascade down rocky headlands, connected by the famous coastal drive and dotted with five-star clifftop palazzos, Michelin dining, and private Riva boat charters.',
    bestTimeToVisit: 'May to October; June and September offer the ideal balance of warm swimming water and fewer crowds.',
    weather: 'Warm Mediterranean sun averaging 26°C - 30°C in summer with refreshing coastal sea breezes.',
    popularAttractions: ['Positano Cliff Village', 'Villa Rufolo Gardens in Ravello', 'Grotta dello Smeraldo (Emerald Grotto)', 'Path of the Gods Hiking Trail', 'Capri Island Faraglioni'],
    localCulture: 'La Dolce Vita lifestyle, Limoncello production from giant Sfusato lemons, handcrafted ceramic pottery, and fresh burrata with heirloom tomatoes.',
    activities: ['Private Vintage Riva Boat Charter', 'Hike the Legendary Path of the Gods', 'Limoncello & Olive Oil Masterclass', 'Clifftop Sunset Cocktail in Ravello'],
    isFeatured: false,
    isTrending: true
  },
  {
    id: 'dest-serengeti',
    name: 'Serengeti & Masai Mara',
    country: 'Tanzania & Kenya',
    region: 'Africa',
    category: 'Adventure',
    price: 2950,
    rating: 4.97,
    reviewsCount: 220,
    experiencesCount: 25,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=80',
    description: 'Endless savannah horizons, the thunderous Great Wildebeest Migration, and intimate luxury tented bush camps under starlit African skies.',
    overview: 'The Serengeti hosts one of natures greatest spectacles on Earth. Witness millions of wildebeest, zebras, and gazelles brave predator-infested rivers, spot the African Big Five in their pristine natural habitat, and enjoy champagne breakfasts after hot air balloon safaris.',
    bestTimeToVisit: 'July to October for the Mara River crossing; January to March for the calving season in Southern Serengeti.',
    weather: 'Pleasant savannah climate with warm dry days (25°C - 28°C) and crisp starlit evenings (14°C - 16°C).',
    popularAttractions: ['Serengeti National Park', 'Ngorongoro Volcanic Crater', 'Mara River Crossing Points', 'Olduvai Gorge Paleontological Site'],
    localCulture: 'Maasai warrior traditions, rhythmic jumping dances (Adumu), beaded jewelry artistry, and deep conservation respect for wild ecosystems.',
    activities: ['Sunrise Hot Air Balloon Bush Safari', 'Big Five 4x4 Guided Game Drives', 'Ngorongoro Crater Floor Expedition', 'Maasai Cultural Village Immersion'],
    isFeatured: false,
    isTrending: true
  }
];

const DEFAULT_PACKAGES = [
  {
    id: 'pkg-bali-paradise',
    title: 'Bali Island Paradise & Cultural Awakening',
    destinationId: 'dest-bali',
    destinationName: 'Bali, Indonesia',
    category: 'Beach Holidays',
    duration: '7 Days / 6 Nights',
    durationDays: 7,
    groupSize: 'Max 12 Travelers',
    price: 1199,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 184,
    badge: 'Popular Choice',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
    overview: 'Immerse in seven days of tropical bliss, cultural enlightenment, and luxury seaside rejuvenation across Ubud cultural center and Uluwatu cliffs.',
    included: [
      'Luxury 5-star villa accommodations with private pool',
      'Daily artisan breakfast & 4 gourmet dinners',
      'Private air-conditioned chauffeur transport',
      'Licensed English-speaking professional cultural guide',
      'Mount Batur sunrise guided trek with breakfast',
      'All temple entrance fees and cultural ceremony passes',
      '2-Hour Balinese wellness massage therapy session'
    ],
    excluded: [
      'International flights to/from Denpasar (DPS)',
      'Personal travel insurance',
      'Alcoholic beverages outside curated dinners',
      'Discretionary tips for guides and drivers'
    ],
    hotelDetails: 'Stay at The Royal Azure Resort Ubud (3 nights) and cliffside Uluwatu Waves Sanctuary (3 nights).',
    itinerary: [
      { day: 1, title: 'Arrival in Denpasar & Ubud Villa Check-in', desc: 'VIP airport meet-and-greet, private transfer to lush Ubud valley villa, welcome cocktail and orientation dinner.' },
      { day: 2, title: 'Spiritual Temples & Sacred Monkey Forest', desc: 'Visit Tirta Empul holy spring temple for a purification ritual, explore the Monkey Forest, followed by an artisanal lunch.' },
      { day: 3, title: 'Mount Batur Sunrise Trek & Hot Springs', desc: 'Early morning guided ascent of active Mount Batur volcano, lake-view breakfast at summit, and soothing soak in Batur natural hot springs.' },
      { day: 4, title: 'Transfer to Southern Coast & Uluwatu Sunset', desc: 'Scenic journey to coastal Uluwatu, settle into ocean-view cliff suite, watch the dramatic sunset Kecak fire dance at Uluwatu Temple.' },
      { day: 5, title: 'Nusa Penida Marine Island Excursion', desc: 'Speedboat cruise to Nusa Penida, marvel at Kelingking T-Rex cliff, snorkel with gentle manta rays in Crystal Bay.' },
      { day: 6, title: 'Seminyak Beach Day & Farewell Beach Banquet', desc: 'Leisurely morning at leisure, sunset cocktails at luxury beach club, followed by a candlelit seafood barbecue right on Jimbaran beach.' },
      { day: 7, title: 'Artisanal Souvenir Hunting & Airport Departure', desc: 'Morning spa treatment, visit local artisan woodcarving studios, and private transfer to Denpasar airport.' }
    ]
  },
  {
    id: 'pkg-swiss-alpine',
    title: 'Swiss Alpine Grandeur & Glacier Express',
    destinationId: 'dest-swiss-alps',
    destinationName: 'Swiss Alps, Switzerland',
    category: 'Adventure',
    duration: '8 Days / 7 Nights',
    durationDays: 8,
    groupSize: 'Max 10 Travelers',
    price: 2490,
    originalPrice: 2850,
    rating: 4.96,
    reviewsCount: 156,
    badge: 'Luxury Signature',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80',
    overview: 'An extraordinary alpine voyage spanning Zurich, Zermatt, St. Moritz, and the legendary Glacier Express panoramic rail journey through Swiss mountain passes.',
    included: [
      '7 Nights in boutique 4-star and 5-star Swiss chalet hotels',
      'First Class 8-Day Swiss Travel Pass with panoramic rail reservations',
      'Daily buffet breakfast & 5 traditional Swiss dinners',
      'Gornergrat cogwheel train ticket facing the Matterhorn',
      'Jungfraujoch Top of Europe rail excursion',
      'Certified Swiss mountain guide for alpine day walks',
      'Luggage transfer service between rail destinations'
    ],
    excluded: [
      'International flights to Zurich/Geneva',
      'Ski gear rental and lift passes',
      'Personal expenses & unlisted meals'
    ],
    hotelDetails: 'Alpine Crest Palace St. Moritz (3 nights) and Mont Cervin Palace Zermatt (4 nights).',
    itinerary: [
      { day: 1, title: 'Welcome to Zurich & Lucerne Lakeside', desc: 'Arrive in Zurich, scenic train to fairytale Lucerne, walking tour across Chapel Bridge and lakeside welcome dinner.' },
      { day: 2, title: 'Ascend Mt. Pilatus Golden Roundtrip', desc: 'Steepest cogwheel railway in the world to Mount Pilatus summit, panoramic alpine vistas, descent via cable car.' },
      { day: 3, title: 'Glacier Express Scenic Journey to Zermatt', desc: 'Board the legendary Glacier Express panoramic glass car, crossing 291 bridges and 91 tunnels over the Oberalp Pass.' },
      { day: 4, title: 'Matterhorn & Gornergrat Summit', desc: 'Ride the Gornergrat Bahn to 3,089m elevation for breathtaking views of the majestic Matterhorn and Gorner Glacier.' },
      { day: 5, title: 'Zermatt Alpine Trails & Fondue Experience', desc: 'Guided hike past Five Lakes trail, reflecting peaks, and evening Swiss cheese fondue in an authentic mountain hut.' },
      { day: 6, title: 'Jungfrau Region & Grindelwald First', desc: 'Journey to the Bernese Oberland, walk the First Cliff Walk suspension bridge, and admire the Eiger North Face.' },
      { day: 7, title: 'Interlaken Lakes & Lake Thun Cruise', desc: 'Relaxing steamer cruise across turquoise Lake Thun, stroll the historic old town of Thun, and gala farewell dinner.' },
      { day: 8, title: 'Zurich Return & International Departure', desc: 'Scenic express train back to Zurich Airport for outbound departures.' }
    ]
  },
  {
    id: 'pkg-santorini-romance',
    title: 'Santorini Sunset Odyssey & Cycladic Charm',
    destinationId: 'dest-santorini',
    destinationName: 'Santorini, Greece',
    category: 'Honeymoon',
    duration: '5 Days / 4 Nights',
    durationDays: 5,
    groupSize: 'Couples / Max 8',
    price: 1680,
    originalPrice: 1950,
    rating: 4.94,
    reviewsCount: 215,
    badge: 'Romantic Getaway',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
    overview: 'Indulge in pure Aegean romance with cliffside cave suites, private sunset yacht sailing, volcanic wine pairings, and breathtaking caldera vistas.',
    included: [
      '4 Nights in clifftop cave suite with heated outdoor plunge pool',
      'Champagne breakfast served daily on private terrace',
      'Half-day private luxury catamaran cruise with BBQ lunch and open bar',
      'Guided volcanic vineyard tour with 8 wine pairings',
      'Private Mercedes transfer throughout the island',
      'Professional sunset couples photo shoot in Oia'
    ],
    excluded: [
      'Flights to Thira (JTR) airport',
      'Personal shopping and gratuities'
    ],
    hotelDetails: 'Caldera Bliss Cave Suites, Oia cliffside (4 nights).',
    itinerary: [
      { day: 1, title: 'Arrival in Oia & Sunset Champagne Welcome', desc: 'VIP transfer to cave suite, unwind in infinity plunge pool, evening champagne reception watching the Aegean sunset.' },
      { day: 2, title: 'Fira to Oia Caldera Trail & Wine Tasting', desc: 'Morning guided scenic clifftop trek along the caldera rim, followed by an afternoon sommelier masterclass at Venetsanos Winery.' },
      { day: 3, title: 'Private Catamaran Sailing to Hot Springs', desc: 'Sail past Red Beach and White Beach, swim in the therapeutic volcanic hot springs, enjoy freshly grilled sea bass on deck.' },
      { day: 4, title: 'Akrotiri Ruins & Candlelit Cliff Dinner', desc: 'Step back 3,500 years at the Minoan ruins of Akrotiri, free afternoon in Pyrgos village, and private candlelit cliff dinner in Imerovigli.' },
      { day: 5, title: 'Morning Spa Therapy & Departure', desc: 'Couples relaxing Mediterranean olive-oil massage, final breakfast overlooking the caldera, private transfer to airport.' }
    ]
  },
  {
    id: 'pkg-maldives-luxury',
    title: 'Maldives Overwater Luxury Sanctuary',
    destinationId: 'dest-maldives',
    destinationName: 'Maldives, Indian Ocean',
    category: 'Luxury Travel',
    duration: '6 Days / 5 Nights',
    durationDays: 6,
    groupSize: 'Private / Flexible',
    price: 3200,
    originalPrice: 3800,
    rating: 4.98,
    reviewsCount: 310,
    badge: 'All-Inclusive Ultra',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80',
    overview: 'The pinnacle of barefoot indulgence in a private overwater villa perched above a turquoise lagoon with round-the-clock dedicated butler service.',
    included: [
      '5 Nights in Luxury Sunrise Overwater Villa with private infinity pool',
      'Roundtrip scenic seaplane transfers from Male (MLE) International',
      'All-Inclusive gourmet dining at 4 signature resort restaurants',
      'Underwater restaurant fine dining dinner experience',
      'Daily complimentary snorkeling equipment and non-motorized water sports',
      'Complimentary 60-minute overwater glass-bottom spa treatment'
    ],
    excluded: [
      'International flights to Male (MLE)',
      'Motorized water sports and scuba certification courses'
    ],
    hotelDetails: 'Soneva Celestial Lagoon Resort & Spa, Noonu Atoll.',
    itinerary: [
      { day: 1, title: 'Seaplane Flight & Overwater Villa Welcome', desc: 'Scenic seaplane transfer over turquoise atolls, personal butler greeting, sunset champagne in your private overwater pool.' },
      { day: 2, title: 'Coral House Reef Discovery & Kayaking', desc: 'Guided snorkeling along the vibrant house reef with marine biologists, transparent glass-bottom kayak exploration.' },
      { day: 3, title: 'Sandbank Picnic & Sunset Dolphin Cruise', desc: 'Private speed boat drop-off on a secluded uninhabited sandbank with chef-prepared lunch; sunset cruise watching wild spinner dolphins.' },
      { day: 4, title: 'Underwater Dining & Stargazing Observatory', desc: 'Dine 6 meters below sea level surrounded by tropical marine life; night stargazing through the resorts powerful astronomical telescope.' },
      { day: 5, title: 'Overwater Spa & Private Beach Cinema', desc: 'Holistic couples massage with glass floor viewing ocean currents; private open-air movie screening under the stars on the beach.' },
      { day: 6, title: 'Floating Lagoon Breakfast & Departure', desc: 'Lavish floating breakfast served in your private pool; final scenic seaplane journey back to Male.' }
    ]
  },
  {
    id: 'pkg-kyoto-zen',
    title: 'Kyoto Zen Heritage & Imperial Splendors',
    destinationId: 'dest-kyoto',
    destinationName: 'Kyoto, Japan',
    category: 'Cultural Tours',
    duration: '6 Days / 5 Nights',
    durationDays: 6,
    groupSize: 'Max 10 Travelers',
    price: 1550,
    originalPrice: 1800,
    rating: 4.89,
    reviewsCount: 142,
    badge: 'Cultural Immersion',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    overview: 'Uncover centuries of Zen spirituality, centuries-old shrines, private tea ceremonies, and culinary Kaiseki artistry in Japans cultural capital.',
    included: [
      '5 Nights in a boutique luxury Ryokan with onsen mineral bath',
      'Traditional multi-course Kaiseki dinners and Japanese breakfasts',
      'Private master-led Urasenke Tea Ceremony',
      'Early morning crowd-free entry to Fushimi Inari and Arashiyama Bamboo Grove',
      'Full-time licensed Japanese cultural expert guide',
      '7-Day JR West rail pass and all regional transit cards'
    ],
    excluded: [
      'International flights to Osaka (KIX) or Tokyo',
      'Kimono rental upgrades'
    ],
    hotelDetails: 'Hoshinoya Kyoto & Machiya Heritage Ryokan.',
    itinerary: [
      { day: 1, title: 'Arrive in Kyoto & Historic Gion Evening Walk', desc: 'Bullet train transfer into Kyoto, check into tranquil riverside ryokan, twilight walk through lantern-lit preservation streets of Gion.' },
      { day: 2, title: 'Fushimi Inari & Golden Pavilion', desc: 'Early morning hike through ten thousand scarlet torii gates at Fushimi Inari; midday visit to glittering Kinkaku-ji reflection pond.' },
      { day: 3, title: 'Zen Meditation & Private Tea Ceremony', desc: 'Privileged morning meditation session with head monk at Kennin-ji; authentic traditional matcha ceremony.' },
      { day: 4, title: 'Arashiyama Bamboo Grove & Monkey Park', desc: 'Walk through towering Arashiyama bamboo stalks, historic Tenryu-ji Zen garden, and traditional wooden boat ride on Hozu River.' },
      { day: 5, title: 'Nara Deer Park Day Excursion', desc: 'Short scenic rail trip to ancient Nara, visit Todai-ji giant bronze Buddha, feed gentle sacred sika deer in Nara Park.' },
      { day: 6, title: 'Nishiki Food Market & Farewell', desc: 'Explore Kyoto Kitchen at Nishiki Market sampling artisanal delicacies; express Haruka train to airport.' }
    ]
  },
  {
    id: 'pkg-kerala-backwaters',
    title: 'Kerala Spice Trails & Backwater Serenades',
    destinationId: 'dest-kerala',
    destinationName: 'Kerala, India',
    category: 'Family Vacations',
    duration: '7 Days / 6 Nights',
    durationDays: 7,
    groupSize: 'Max 12 / Families',
    price: 890,
    originalPrice: 1100,
    rating: 4.86,
    reviewsCount: 128,
    badge: 'Nature & Wellness',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
    overview: 'A restorative journey across tranquil palm-fringed lagoons on luxury houseboats, misty Munnar tea hills, and ancient spice plantations.',
    included: [
      '4 Nights in luxury heritage heritage resorts + 2 nights on private luxury houseboat',
      'Full board on houseboat with private onboard chef and crew',
      'Daily breakfast & curated regional culinary dinners',
      'Private air-conditioned vehicle throughout the journey',
      'Guided spice plantation trek and tea factory tour in Munnar',
      'Traditional Kathakali classical dance and Kalaripayattu performance'
    ],
    excluded: [
      'Flights to/from Kochi (COK) International Airport',
      'Ayurvedic intensive treatments (optional packages available)'
    ],
    hotelDetails: 'Kumarakom Lake Resort & Luxury Handcrafted Kettuvallam Houseboat.',
    itinerary: [
      { day: 1, title: 'Kochi Arrival & Colonial Heritage Walk', desc: 'Meet our concierge at Kochi airport, transfer to Fort Kochi, explore Portuguese architecture, St. Francis Church, and Chinese fishing nets.' },
      { day: 2, title: 'Ascend to Misty Munnar Tea Hills', desc: 'Scenic mountain drive past Cheeyappara waterfalls to Munnar, visit tea museum, and enjoy freshly brewed high-grown tea.' },
      { day: 3, title: 'Eravikulam National Park & Spice Plantations', desc: 'Spot endangered Nilgiri Tahr mountain goats, afternoon guided walk through aromatic cardamom, cinnamon, and pepper gardens.' },
      { day: 4, title: 'Transfer to Alleppey & Board Houseboat', desc: 'Board your private handcrafted houseboat in Alleppey, glide through narrow canals, and enjoy fresh Karimeen fish prepared onboard.' },
      { day: 5, title: 'Canal Village Life & Backwater Sunset', desc: 'Observe village life along the banks, peaceful canoe ride into smaller waterways, starlit dinner moored on Vembanad Lake.' },
      { day: 6, title: 'Kumarakom Luxury Resort & Ayurvedic Massage', desc: 'Disembark at luxury lakeside resort, rejuvenating 90-minute Ayurvedic Abhyanga massage, sunset cultural Kathakali performance.' },
      { day: 7, title: 'Kumarakom Bird Sanctuary & Departure', desc: 'Morning bird watching by boat, final tropical breakfast, and transfer to Kochi Airport.' }
    ]
  }
];

const DEFAULT_HOTELS = [
  {
    id: 'hotel-royal-azure-bali',
    name: 'The Royal Azure Resort & Spa',
    destinationId: 'dest-bali',
    destinationName: 'Bali, Indonesia',
    starRating: 5,
    guestRating: 4.95,
    reviewsCount: 420,
    pricePerNight: 280,
    originalPrice: 350,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    ],
    address: 'Jl. Raya Nusa Dua Selatan, Sawangan, Nusa Dua, Bali 80363, Indonesia',
    description: 'Set dramatically upon the limestone cliffs of Nusa Dua overlooking the Indian Ocean, The Royal Azure combines traditional Balinese architecture with ultra-modern luxury.',
    amenities: ['Cliffside Infinity Pool', 'Holistic Ayurvedic Spa', 'Private Beach Access', '3 Signature Restaurants', 'Butler Service', 'High-speed WiFi', 'Fitness Center & Yoga Pavilion', 'Kids Club'],
    policies: {
      checkIn: '15:00',
      checkOut: '12:00',
      cancellation: 'Free cancellation up to 48 hours prior to arrival.',
      children: 'Children of all ages welcome. Cribs available upon request.'
    },
    rooms: [
      { id: 'rm-1', name: 'Oceanfront Luxury Suite', size: '75 sqm', bed: '1 King Bed', price: 280, guests: 2, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' },
      { id: 'rm-2', name: 'Private Pool Cliff Villa', size: '140 sqm', bed: '1 King Bed', price: 450, guests: 2, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80' },
      { id: 'rm-3', name: 'Two-Bedroom Royal Sanctuary', size: '220 sqm', bed: '2 King Beds', price: 780, guests: 4, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: 'hotel-alpine-crest-swiss',
    name: 'Alpine Crest Palace & Grand Spa',
    destinationId: 'dest-swiss-alps',
    destinationName: 'St. Moritz, Switzerland',
    starRating: 5,
    guestRating: 4.97,
    reviewsCount: 380,
    pricePerNight: 520,
    originalPrice: 620,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
    ],
    address: 'Via Serlas 27, 7500 St. Moritz, Switzerland',
    description: 'An iconic alpine sanctuary offering panoramic vistas of Lake St. Moritz and the Engadin Alps, featuring heated outdoor thermal pools surrounded by snow.',
    amenities: ['Ski-in/Ski-out Access', 'Heated Indoor & Outdoor Pools', 'Alpine Thermal Wellness Spa', 'Michelin-starred Dining', 'Ski Concierge & Equipment Rental', 'Luxury Chauffeur Shuttle'],
    policies: {
      checkIn: '15:00',
      checkOut: '11:00',
      cancellation: 'Free cancellation up to 7 days before check-in during winter high season.',
      children: 'All ages welcome; junior ski academy and ski camp available.'
    },
    rooms: [
      { id: 'rm-4', name: 'Deluxe Alpine Pine Room', size: '50 sqm', bed: '1 King Bed', price: 520, guests: 2, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' },
      { id: 'rm-5', name: 'Matterhorn Panorama Suite', size: '95 sqm', bed: '1 King Bed', price: 890, guests: 2, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: 'hotel-caldera-bliss-santorini',
    name: 'Caldera Bliss Cave Suites',
    destinationId: 'dest-santorini',
    destinationName: 'Santorini, Greece',
    starRating: 5,
    guestRating: 4.93,
    reviewsCount: 512,
    pricePerNight: 420,
    originalPrice: 500,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
    ],
    address: 'Cliff Edge Promenade, Oia 847 02, Santorini, Greece',
    description: 'Sculpted directly into the caldera rocks, each cave suite features whitewashed arches, heated private plunge pools, and unobstructed sunset views of the Aegean.',
    amenities: ['Private Caldera Plunge Pools', 'Sunset Champagne Lounge', 'Terrace Breakfast Service', 'Yacht Charter Concierge', 'Complimentary Port & Airport Transfers'],
    policies: {
      checkIn: '14:00',
      checkOut: '11:00',
      cancellation: 'Free cancellation up to 5 days prior to arrival.',
      children: 'Adults-focused property (guests 14+ years).'
    },
    rooms: [
      { id: 'rm-6', name: 'Sunset Cave Suite with Plunge Pool', size: '55 sqm', bed: '1 Queen Bed', price: 420, guests: 2, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' },
      { id: 'rm-7', name: 'Grand Honeymoon Infinity Villa', size: '85 sqm', bed: '1 King Bed', price: 680, guests: 2, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80' }
    ]
  },
  {
    id: 'hotel-soneva-maldives',
    name: 'Soneva Celestial Lagoon Resort',
    destinationId: 'dest-maldives',
    destinationName: 'Maldives, Indian Ocean',
    starRating: 5,
    guestRating: 4.99,
    reviewsCount: 460,
    pricePerNight: 850,
    originalPrice: 1050,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
    ],
    address: 'Kunfunadhoo Island, Baa Atoll, Republic of Maldives',
    description: 'An idyllic barefoot luxury retreat featuring expansive overwater villas with retractable roofs for stargazing, water slides directly into the lagoon, and private coral reserves.',
    amenities: ['Overwater Villas with Waterslide', 'Retractable Stargazing Roofs', 'Underwater Restaurant', 'Private House Reef Marine Reserve', '24/7 Dedicated Barefoot Butler', 'Organic Island Gardens'],
    policies: {
      checkIn: '14:00',
      checkOut: '12:00',
      cancellation: 'Free cancellation up to 14 days prior to arrival.',
      children: 'Family-friendly with complimentary children discovery den.'
    },
    rooms: [
      { id: 'rm-8', name: '1-Bedroom Water Retreat with Slide', size: '300 sqm', bed: '1 King Bed', price: 850, guests: 2, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80' },
      { id: 'rm-9', name: '2-Bedroom Ocean Family Residence', size: '550 sqm', bed: '2 King Beds', price: 1600, guests: 4, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' }
    ]
  }
];

const DEFAULT_EXPERIENCES = [
  {
    id: 'exp-mountain',
    title: 'Mountain Adventures & Alpine Summits',
    category: 'Adventure',
    icon: 'fa-mountain-sun',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    description: 'Conquer scenic alpine heights, trek glacial paths, and wake to pristine sunrise panoramas with experienced mountaineers.'
  },
  {
    id: 'exp-beach',
    title: 'Secluded Beach Escapes & Coastal Bays',
    category: 'Beach Holidays',
    icon: 'fa-umbrella-beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'Sink your toes into powdery white sands, lounge in private seaside cabanas, and sail through turquoise lagoons.'
  },
  {
    id: 'exp-wildlife',
    title: 'Wildlife Safaris & Untamed Habitats',
    category: 'Adventure',
    icon: 'fa-paw',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    description: 'Experience close encounters with majestic wildlife, the Great Migration, and nocturnal game walks under starlit canopies.'
  },
  {
    id: 'exp-cultural',
    title: 'Cultural Immersions & Living Heritage',
    category: 'Cultural Tours',
    icon: 'fa-landmark',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    description: 'Step into centuries of tradition through sacred temples, artisan craft studios, ancient palaces, and historic folklore.'
  },
  {
    id: 'exp-cruise',
    title: 'Luxury Yacht Cruises & Island Hopping',
    category: 'Luxury Travel',
    icon: 'fa-ship',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    description: 'Chart uncharted waters, anchor in tranquil crystalline coves, and enjoy open-deck champagne dining at sunset.'
  },
  {
    id: 'exp-culinary',
    title: 'Epicurean Culinary Trails & Vineyards',
    category: 'Culinary Tours',
    icon: 'fa-utensils',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    description: 'Savor regional flavors, take private cooking masterclasses with Michelin chefs, and cellar-taste heritage vintages.'
  }
];

const DEFAULT_BLOGS = [
  {
    id: 'blog-1',
    title: '10 Hidden Sanctuaries in Bali You Have Never Heard Of',
    category: 'Destination Guide',
    date: 'October 12, 2026',
    author: 'Elena Rostova',
    authorRole: 'Senior Travel Editor',
    authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Beyond the crowded alleys of Seminyak lie untouched waterfalls, sacred sea caverns, and mist-laden bamboo valleys waiting to be explored.',
    content: `
      <p>While millions of travelers flock to southern Bali every year, the real soul of the Island of the Gods thrives in its secluded sanctuaries. Away from the bustling beach clubs, tranquil villages nestled amid cascading rainforests offer glimpses into an ancient, contemplative rhythm of life.</p>
      <h3>1. The Sacred Waterfalls of Munduk</h3>
      <p>High in the northern highlands, Munduk remains shrouded in cool mountain mist. Here, trails wind past cloves, vanilla vines, and wild Arabica coffee trees, leading to roaring waterfalls where travelers can swim in crystalline glacial pools undisturbed by large tourist coaches.</p>
      <h3>2. Sidemen Valley: The Untamed Ubud of 40 Years Ago</h3>
      <p>With Mount Agung towering majestically in the backdrop, Sidemen Valley presents terraced emerald rice fields tended by gentle farmers wearing conical straw hats. Staying in an open-air bamboo pavilion here guarantees meditative peace accompanied only by river currents.</p>
      <blockquote>"True travel does not merely find new landscapes; it gives us new eyes to experience timeless wonders."</blockquote>
      <h3>3. The Clifftops of Amed & Coral Snorkeling</h3>
      <p>Along the quiet northeastern coast, black volcanic sand beaches slope down into vibrant coral gardens where endangered sea turtles glide through tranquil morning currents.</p>
    `
  },
  {
    id: 'blog-2',
    title: 'The Ultimate Guide to Traversing the Swiss Alps by Scenic Train',
    category: 'Rail Journeys',
    date: 'September 28, 2026',
    author: 'Marcus Vance',
    authorRole: 'Alpine Explorer',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    excerpt: 'How to ride the Glacier Express and Bernina Express like a seasoned insider, from panoramic glass cars to gourmet dining car tips.',
    content: `
      <p>There is perhaps no more civilized method of witnessing European natural majesty than aboard Switzerland's immaculate rail network. Gliding over stone viaducts high above roaring glacial ravines turns transit into high art.</p>
      <h3>The Glacier Express: The World's Slowest Fast Train</h3>
      <p>Connecting the glamorous ski hamlets of Zermatt and St. Moritz, this eight-hour odyssey crosses 291 bridges. Opt for Excellence Class to enjoy a five-course seasonal lunch paired with regional Swiss wines as the Oberalp Pass unfolds outside your window.</p>
    `
  },
  {
    id: 'blog-3',
    title: 'Sustainable Luxury: How Modern Resorts Are Protecting Fragile Marine Atolls',
    category: 'Eco Travel',
    date: 'September 15, 2026',
    author: 'Aria Chen',
    authorRole: 'Marine Conservationist',
    authorImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Pioneering eco-resorts in the Maldives and Polynesia are proving that world-class hospitality can actively regenerate delicate coral ecosystems.',
    content: `
      <p>Modern luxury travelers increasingly seek purposeful voyages that leave destinations cleaner, more biodiverse, and culturally empowered. Across the Indian Ocean, top-tier resorts are leading solar energy revolutions, zero-plastic initiatives, and coral micro-fragmentation labs.</p>
    `
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Julianne & David Sterling',
    destination: 'Santorini Sunset Odyssey',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Stackly orchestrated our honeymoon to Santorini with absolute perfection. From the private cliffside cave villa in Oia to the surprise champagne catamaran cruise at sunset, every minute felt straight out of a dream.'
  },
  {
    id: 'test-2',
    name: 'Harrison Brooks',
    destination: 'Swiss Alpine Grandeur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'The Glacier Express and Gornergrat rail passes were seamless. Our private mountain guide in Zermatt took us on trails where we had views of the Matterhorn completely to ourselves. Truly a world-class travel agency.'
  },
  {
    id: 'test-3',
    name: 'Dr. Priya & Aarav Nair',
    destination: 'Bali Island Paradise',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Traveling with two young kids can be daunting, but Stackly curated our family itinerary in Bali with thoughtful transitions, kid-friendly cultural sessions, and incredible private pool villas. Flawless hospitality.'
  },
  {
    id: 'test-4',
    name: 'Sophia Laurent',
    destination: 'Maldives Overwater Sanctuary',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'The underwater dining reservation and sunset dolphin safari exceeded every expectation. Stacklys personal concierge stayed in touch via WhatsApp throughout our trip to ensure zero hiccups.'
  }
];

const DEFAULT_BOOKINGS = [
  {
    id: 'WN-2026-89412',
    packageId: 'pkg-bali-paradise',
    title: 'Bali Island Paradise & Cultural Awakening',
    destination: 'Bali, Indonesia',
    travelers: 2,
    checkInDate: '2026-11-15',
    checkOutDate: '2026-11-22',
    totalPrice: 2398,
    status: 'Confirmed',
    guestName: 'Swetha Ramesh',
    guestEmail: 'swetha.ramesh@gmail.com',
    guestPhone: '+1 (555) 382-9910',
    createdAt: '2026-10-18'
  },
  {
    id: 'WN-2026-78201',
    packageId: 'pkg-swiss-alpine',
    title: 'Swiss Alpine Grandeur & Glacier Express',
    destination: 'Swiss Alps, Switzerland',
    travelers: 1,
    checkInDate: '2026-12-04',
    checkOutDate: '2026-12-12',
    totalPrice: 2490,
    status: 'Confirmed',
    guestName: 'Eleanor Bennett',
    guestEmail: 'eleanor.b@example.com',
    guestPhone: '+44 20 7946 0912',
    createdAt: '2026-10-14'
  },
  {
    id: 'WN-2026-65190',
    packageId: 'pkg-santorini-romance',
    title: 'Santorini Sunset Odyssey & Cycladic Charm',
    destination: 'Santorini, Greece',
    travelers: 2,
    checkInDate: '2026-09-10',
    checkOutDate: '2026-09-15',
    totalPrice: 3360,
    status: 'Completed',
    guestName: 'Swetha Ramesh',
    guestEmail: 'swetha.ramesh@gmail.com',
    guestPhone: '+1 (555) 382-9910',
    createdAt: '2026-08-01'
  }
];

const DEFAULT_USERS = [
  {
    id: 'usr-1',
    name: 'Swetha Ramesh',
    email: 'swetha.ramesh@gmail.com',
    phone: '+1 (555) 382-9910',
    role: 'customer',
    joinDate: 'January 2025',
    preferredDestinations: 'Tropical Beaches, Mountain Trekking',
    tripsCompleted: 3
  },
  {
    id: 'usr-2',
    name: 'Eleanor Bennett',
    email: 'eleanor.b@example.com',
    phone: '+44 20 7946 0912',
    role: 'customer',
    joinDate: 'March 2025',
    preferredDestinations: 'European Alps, Cultural Cities',
    tripsCompleted: 2
  },
  {
    id: 'usr-admin',
    name: 'Victoria Vance (Admin)',
    email: 'admin@stackly.com',
    phone: '+1 (800) 892-6378',
    role: 'admin',
    joinDate: 'October 2024'
  }
];

const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Swetha Ramesh',
    destination: 'Santorini Sunset Odyssey',
    rating: 5,
    status: 'Approved',
    date: '2026-09-18',
    comment: 'The cave suite views in Oia were out of this world! Everything was meticulously organized.'
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    destination: 'Bali Island Paradise',
    rating: 5,
    status: 'Approved',
    date: '2026-10-02',
    comment: 'Unforgettable experience. The private chef dinner and Batur trek were highlights of our year.'
  },
  {
    id: 'rev-3',
    author: 'Marcus Vance',
    destination: 'Swiss Alpine Grandeur',
    rating: 4,
    status: 'Pending',
    date: '2026-10-21',
    comment: 'Spectacular scenery! The train journey was comfortable, though the weather in Zermatt was overcast on day two.'
  }
];

// Initialize and Retrieve LocalStorage Data
const StacklyData = {
  init() {
    if (!localStorage.getItem(STACKLY_STORAGE_KEYS.DESTINATIONS)) {
      localStorage.setItem(STACKLY_STORAGE_KEYS.DESTINATIONS, JSON.stringify(DEFAULT_DESTINATIONS));
    }
    if (!localStorage.getItem(STACKLY_STORAGE_KEYS.PACKAGES)) {
      localStorage.setItem(STACKLY_STORAGE_KEYS.PACKAGES, JSON.stringify(DEFAULT_PACKAGES));
    }
    if (!localStorage.getItem(STACKLY_STORAGE_KEYS.HOTELS)) {
      localStorage.setItem(STACKLY_STORAGE_KEYS.HOTELS, JSON.stringify(DEFAULT_HOTELS));
    }
    if (!localStorage.getItem(STACKLY_STORAGE_KEYS.BOOKINGS)) {
      localStorage.setItem(STACKLY_STORAGE_KEYS.BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
    }
    if (!localStorage.getItem(STACKLY_STORAGE_KEYS.WISHLIST)) {
      localStorage.setItem(STACKLY_STORAGE_KEYS.WISHLIST, JSON.stringify(['dest-bali', 'dest-santorini', 'pkg-maldives-luxury']));
    }
    if (!localStorage.getItem(STACKLY_STORAGE_KEYS.USERS)) {
      localStorage.setItem(STACKLY_STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem(STACKLY_STORAGE_KEYS.REVIEWS)) {
      localStorage.setItem(STACKLY_STORAGE_KEYS.REVIEWS, JSON.stringify(DEFAULT_REVIEWS));
    }
    if (!localStorage.getItem(STACKLY_STORAGE_KEYS.CURRENT_USER)) {
      localStorage.setItem(STACKLY_STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[0]));
    }
    if (!localStorage.getItem(STACKLY_STORAGE_KEYS.BLOGS)) {
      localStorage.setItem(STACKLY_STORAGE_KEYS.BLOGS, JSON.stringify(DEFAULT_BLOGS));
    }
  },

  getBlogs() {
    this.init();
    return JSON.parse(localStorage.getItem(STACKLY_STORAGE_KEYS.BLOGS)) || DEFAULT_BLOGS;
  },
  saveBlogs(data) {
    localStorage.setItem(STACKLY_STORAGE_KEYS.BLOGS, JSON.stringify(data));
  },

  getDestinations() {
    this.init();
    return JSON.parse(localStorage.getItem(STACKLY_STORAGE_KEYS.DESTINATIONS)) || DEFAULT_DESTINATIONS;
  },
  saveDestinations(data) {
    localStorage.setItem(STACKLY_STORAGE_KEYS.DESTINATIONS, JSON.stringify(data));
  },

  getPackages() {
    this.init();
    return JSON.parse(localStorage.getItem(STACKLY_STORAGE_KEYS.PACKAGES)) || DEFAULT_PACKAGES;
  },
  savePackages(data) {
    localStorage.setItem(STACKLY_STORAGE_KEYS.PACKAGES, JSON.stringify(data));
  },

  getHotels() {
    this.init();
    return JSON.parse(localStorage.getItem(STACKLY_STORAGE_KEYS.HOTELS)) || DEFAULT_HOTELS;
  },
  saveHotels(data) {
    localStorage.setItem(STACKLY_STORAGE_KEYS.HOTELS, JSON.stringify(data));
  },

  getBookings() {
    this.init();
    return JSON.parse(localStorage.getItem(STACKLY_STORAGE_KEYS.BOOKINGS)) || DEFAULT_BOOKINGS;
  },
  saveBookings(data) {
    localStorage.setItem(STACKLY_STORAGE_KEYS.BOOKINGS, JSON.stringify(data));
  },
  addBooking(booking) {
    const bookings = this.getBookings();
    bookings.unshift(booking);
    this.saveBookings(bookings);
    return booking;
  },

  getWishlist() {
    this.init();
    return JSON.parse(localStorage.getItem(STACKLY_STORAGE_KEYS.WISHLIST)) || [];
  },
  toggleWishlist(id) {
    const list = this.getWishlist();
    const idx = list.indexOf(id);
    let added = false;
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(id);
      added = true;
    }
    localStorage.setItem(STACKLY_STORAGE_KEYS.WISHLIST, JSON.stringify(list));
    return added;
  },
  isInWishlist(id) {
    return this.getWishlist().includes(id);
  },

  getUsers() {
    this.init();
    return JSON.parse(localStorage.getItem(STACKLY_STORAGE_KEYS.USERS)) || DEFAULT_USERS;
  },
  saveUsers(data) {
    localStorage.setItem(STACKLY_STORAGE_KEYS.USERS, JSON.stringify(data));
  },

  getReviews() {
    this.init();
    return JSON.parse(localStorage.getItem(STACKLY_STORAGE_KEYS.REVIEWS)) || DEFAULT_REVIEWS;
  },
  saveReviews(data) {
    localStorage.setItem(STACKLY_STORAGE_KEYS.REVIEWS, JSON.stringify(data));
  },

  getCurrentUser() {
    this.init();
    return JSON.parse(localStorage.getItem(STACKLY_STORAGE_KEYS.CURRENT_USER));
  },
  setCurrentUser(user) {
    localStorage.setItem(STACKLY_STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem(STACKLY_STORAGE_KEYS.CURRENT_USER);
  }
};

// Auto-run initialization
const WanderNestData = StacklyData;
window.StacklyData = StacklyData;
window.WanderNestData = StacklyData;
window.STACKLY_STORAGE_KEYS = STACKLY_STORAGE_KEYS;
window.WANDERNEST_STORAGE_KEYS = STACKLY_STORAGE_KEYS;

StacklyData.init();
