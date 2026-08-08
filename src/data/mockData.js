// Données simulées pour le frontend sans backend (TADIAVO-EO)

// ---------------------------------------------------------------------------
// UTILISATEURS
// ---------------------------------------------------------------------------
export const mockUsers = [
  {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean@email.com',
    password: 'test123',
    role: 'client',
    avatar: 'JD',
    phone: '+261 34 12 345 67',
    location: 'Antananarivo, Analakely',
    lat: -18.9137,
    lng: 47.5361,
    favorites: [1, 3, 6],
    services: [],
    createdAt: '2026-01-12',
  },
  {
    id: 2,
    name: 'Marie Randria',
    email: 'marie@email.com',
    password: 'test123',
    role: 'prestataire',
    avatar: 'MR',
    phone: '+261 34 23 456 78',
    location: 'Antananarivo, Ivandry',
    lat: -18.8792,
    lng: 47.5316,
    favorites: [],
    services: [1, 2],
    createdAt: '2025-11-03',
  },
  {
    id: 3,
    name: 'Admin System',
    email: 'admin@email.com',
    password: 'test123',
    role: 'admin',
    avatar: 'AS',
    phone: '+261 34 34 567 89',
    location: 'Antananarivo, Antaninarenina',
    lat: -18.9100,
    lng: 47.5255,
    favorites: [],
    services: [],
    createdAt: '2025-06-20',
  },
]

// ---------------------------------------------------------------------------
// SERVICES (10 services répartis dans 10 catégories, coordonnées GPS réelles
// autour d'Antananarivo)
// ---------------------------------------------------------------------------
export const mockServices = [
  {
    id: 1,
    title: 'Plomberie Express',
    description: "Service de plomberie rapide et fiable. Intervention dans l'heure pour tous vos problèmes de fuite, canalisation et sanitaires.",
    category: 'Plomberie',
    location: 'Antananarivo, Analakely',
    lat: -18.9137,
    lng: 47.5361,
    price: 45000,
    rating: 4.8,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1607472829760-9a3226aeb84e?w=600',
    prestataire: 'Marie Randria',
    prestataireId: 2,
    disponibility: '24/7',
    phone: '+261 34 12 345 67',
    email: 'marie@email.com',
    tags: ['Urgence', 'Qualifié', 'Rapide'],
    status: 'active',
    views: 342,
    isNew: true,
    isPromo: false,
    createdAt: '2026-06-01',
    updatedAt: '2026-07-10',
  },
  {
    id: 2,
    title: 'Électricité Pro',
    description: 'Installation et réparation électrique. Certification garantie et matériel de qualité pour votre sécurité domestique.',
    category: 'Électricité',
    location: 'Antananarivo, Ivandry',
    lat: -18.8792,
    lng: 47.5316,
    price: 35000,
    rating: 4.6,
    reviews: 38,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600',
    prestataire: 'Marie Randria',
    prestataireId: 2,
    disponibility: 'Lun-Sam 8h-18h',
    phone: '+261 34 23 456 78',
    email: 'marie@email.com',
    tags: ['Certifié', 'Garantie', 'Professionnel'],
    status: 'active',
    views: 256,
    isNew: false,
    isPromo: true,
    createdAt: '2026-05-15',
    updatedAt: '2026-07-02',
  },
  {
    id: 3,
    title: 'Cuisine Gourmande',
    description: 'Cuisine traditionnelle malgache et fusion. Plats préparés sur commande avec des produits frais et locaux de saison.',
    category: 'Restaurant',
    location: 'Antananarivo, Isotry',
    lat: -18.9166,
    lng: 47.5216,
    price: 15000,
    rating: 4.9,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
    prestataire: 'Chef Rivo',
    prestataireId: 4,
    disponibility: 'Mar-Dim 11h-22h',
    phone: '+261 34 34 567 89',
    email: 'rivo@email.com',
    tags: ['Cuisine locale', 'Fusion', 'Qualité'],
    status: 'active',
    views: 489,
    isNew: false,
    isPromo: false,
    createdAt: '2026-03-20',
    updatedAt: '2026-06-28',
  },
  {
    id: 4,
    title: 'Jardinier Pro',
    description: "Entretien de jardins, espaces verts et paysagisme. Création et aménagement paysager sur mesure pour particuliers et entreprises.",
    category: 'Jardinage',
    location: 'Antananarivo, Ambohimena',
    lat: -18.8975,
    lng: 47.5476,
    price: 25000,
    rating: 4.7,
    reviews: 29,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600',
    prestataire: 'Jean Vert',
    prestataireId: 5,
    disponibility: 'Lun-Ven 7h-17h',
    phone: '+261 34 45 678 90',
    email: 'jeanvert@email.com',
    tags: ['Paysagiste', 'Écologique', 'Professionnel'],
    status: 'active',
    views: 178,
    isNew: true,
    isPromo: false,
    createdAt: '2026-06-22',
    updatedAt: '2026-07-05',
  },
  {
    id: 5,
    title: 'Coiffure Style',
    description: 'Salon de coiffure moderne. Coupe, coloration, coiffage et soins capillaires avec des produits professionnels de qualité.',
    category: 'Beauté',
    location: 'Antananarivo, Analakely',
    lat: -18.9056,
    lng: 47.5289,
    price: 12000,
    rating: 4.5,
    reviews: 34,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600',
    prestataire: 'Style Coiffure',
    prestataireId: 6,
    disponibility: 'Lun-Sam 9h-19h',
    phone: '+261 34 56 789 01',
    email: 'style@email.com',
    tags: ['Moderne', 'Qualité', 'Bien-être'],
    status: 'active',
    views: 210,
    isNew: false,
    isPromo: true,
    createdAt: '2026-04-11',
    updatedAt: '2026-06-30',
  },
  {
    id: 6,
    title: 'Nettoyage Express',
    description: 'Service de nettoyage résidentiel et commercial. Nettoyage en profondeur et entretien régulier avec produits écologiques.',
    category: 'Nettoyage',
    location: 'Antananarivo, Ivandry',
    lat: -18.8846,
    lng: 47.5395,
    price: 18000,
    rating: 4.3,
    reviews: 21,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600',
    prestataire: 'Clean Services',
    prestataireId: 7,
    disponibility: 'Lun-Sam 8h-18h',
    phone: '+261 34 67 890 12',
    email: 'clean@email.com',
    tags: ['Professionnel', 'Écologique', 'Rapide'],
    status: 'active',
    views: 132,
    isNew: false,
    isPromo: false,
    createdAt: '2026-02-18',
    updatedAt: '2026-06-15',
  },
  {
    id: 7,
    title: 'BTP Solutions',
    description: 'Construction et rénovation de bâtiments. Devis gratuit, équipe qualifiée et respect des délais pour tous vos travaux.',
    category: 'Construction',
    location: 'Antananarivo, Andoharanofotsy',
    lat: -18.9203,
    lng: 47.5122,
    price: 150000,
    rating: 4.4,
    reviews: 17,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600',
    prestataire: 'BTP Solutions SARL',
    prestataireId: 8,
    disponibility: 'Lun-Ven 7h-16h',
    phone: '+261 34 78 901 23',
    email: 'btp@email.com',
    tags: ['Devis gratuit', 'Qualifié', 'Fiable'],
    status: 'active',
    views: 98,
    isNew: false,
    isPromo: false,
    createdAt: '2026-01-30',
    updatedAt: '2026-05-20',
  },
  {
    id: 8,
    title: 'InfoTech Services',
    description: 'Réparation informatique, dépannage réseau et installation de logiciels. Support technique rapide pour particuliers et PME.',
    category: 'Informatique',
    location: 'Antananarivo, Antaninarenina',
    lat: -18.9089,
    lng: 47.5342,
    price: 20000,
    rating: 4.6,
    reviews: 25,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
    prestataire: 'InfoTech Madagascar',
    prestataireId: 9,
    disponibility: 'Lun-Sam 8h-20h',
    phone: '+261 34 89 012 34',
    email: 'infotech@email.com',
    tags: ['Rapide', 'Support', 'Fiable'],
    status: 'active',
    views: 267,
    isNew: true,
    isPromo: false,
    createdAt: '2026-06-10',
    updatedAt: '2026-07-08',
  },
  {
    id: 9,
    title: 'Transport Rapide',
    description: "Service de transport et livraison express dans toute la ville. Véhicules récents et chauffeurs expérimentés à votre disposition.",
    category: 'Transport',
    location: 'Antananarivo, Anosy',
    lat: -18.8951,
    lng: 47.5203,
    price: 10000,
    rating: 4.2,
    reviews: 19,
    image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=600',
    prestataire: 'Rapido Transport',
    prestataireId: 10,
    disponibility: '24/7',
    phone: '+261 34 90 123 45',
    email: 'rapido@email.com',
    tags: ['Express', '24/7', 'Fiable'],
    status: 'active',
    views: 145,
    isNew: false,
    isPromo: true,
    createdAt: '2026-03-05',
    updatedAt: '2026-06-25',
  },
  {
    id: 10,
    title: 'Clinique Santé Plus',
    description: 'Consultation médicale générale et spécialisée. Personnel qualifié, équipements modernes et accueil chaleureux.',
    category: 'Santé',
    location: 'Antananarivo, Behoririka',
    lat: -18.9012,
    lng: 47.5378,
    price: 30000,
    rating: 4.9,
    reviews: 61,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600',
    prestataire: 'Clinique Santé Plus',
    prestataireId: 11,
    disponibility: 'Lun-Dim 7h-21h',
    phone: '+261 34 01 234 56',
    email: 'sante@email.com',
    tags: ['Qualifié', 'Moderne', 'Accueil'],
    status: 'active',
    views: 512,
    isNew: false,
    isPromo: false,
    createdAt: '2025-12-01',
    updatedAt: '2026-07-01',
  },
]

// ---------------------------------------------------------------------------
// AVIS
// ---------------------------------------------------------------------------
export const mockReviews = [
  { id: 1, serviceId: 1, userId: 1, user: 'Jean Dupont', rating: 5, comment: "Excellent service ! Intervention rapide et professionnelle. Je recommande vivement.", date: '2026-07-10', reply: 'Merci beaucoup pour votre confiance !', reported: false },
  { id: 2, serviceId: 1, userId: 12, user: 'Sophie Randria', rating: 4, comment: 'Très bon travail, prix correct et ponctualité respectée.', date: '2026-07-08', reply: null, reported: false },
  { id: 3, serviceId: 3, userId: 13, user: 'David Rajaonarivelo', rating: 5, comment: 'Une cuisine délicieuse ! Les plats sont savoureux et bien présentés.', date: '2026-07-05', reply: null, reported: false },
  { id: 4, serviceId: 2, userId: 14, user: 'Tiana Rakoto', rating: 4.5, comment: 'Installation électrique parfaite. Je suis très satisfait du travail.', date: '2026-07-03', reply: 'Merci Tiana, à bientôt !', reported: false },
  { id: 5, serviceId: 4, userId: 15, user: 'Rivo Andrian', rating: 5, comment: "Mon jardin est magnifique ! Un vrai travail d'artiste.", date: '2026-07-01', reply: null, reported: false },
  { id: 6, serviceId: 5, userId: 1, user: 'Jean Dupont', rating: 4, comment: 'Bonne coupe, accueil sympathique. Je reviendrai.', date: '2026-06-28', reply: null, reported: false },
  { id: 7, serviceId: 6, userId: 16, user: 'Hanta Rasoa', rating: 3.5, comment: 'Nettoyage correct mais un peu lent. Peut mieux faire.', date: '2026-06-20', reply: 'Merci pour votre retour, nous allons améliorer notre temps de réponse.', reported: true },
  { id: 8, serviceId: 8, userId: 17, user: 'Nomena Rakotomalala', rating: 5, comment: 'Réparation rapide de mon ordinateur, service impeccable !', date: '2026-06-15', reply: null, reported: false },
  { id: 9, serviceId: 9, userId: 18, user: 'Fara Andriamampianina', rating: 4, comment: 'Livraison rapide et chauffeur courtois.', date: '2026-06-10', reply: null, reported: false },
  { id: 10, serviceId: 10, userId: 1, user: 'Jean Dupont', rating: 5, comment: 'Personnel très professionnel et attentionné. Merci beaucoup.', date: '2026-06-05', reply: 'Merci pour votre confiance, prenez soin de vous.', reported: false },
]

// ---------------------------------------------------------------------------
// CATEGORIES
// ---------------------------------------------------------------------------
export const mockCategories = [
  'Toutes catégories',
  'Plomberie',
  'Électricité',
  'Restaurant',
  'Jardinage',
  'Beauté',
  'Nettoyage',
  'Construction',
  'Informatique',
  'Transport',
  'Santé',
]

// ---------------------------------------------------------------------------
// FONCTIONS UTILITAIRES
// ---------------------------------------------------------------------------

// Distance haversine (en kilomètres) entre deux coordonnées GPS
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  if ([lat1, lng1, lat2, lng2].some((v) => v === undefined || v === null)) return null
  const toRad = (v) => (v * Math.PI) / 180
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c * 10) / 10
}

// Signalements et notifications (admin)
export const mockReports = [
  { id: 1, type: 'review', targetId: 7, user: 'Hanta Rasoa', reason: 'Contenu inapproprie', status: 'pending', date: '2026-07-12' },
  { id: 2, type: 'service', targetId: 7, user: 'Jean Dupont', reason: 'Description trompeuse', status: 'pending', date: '2026-07-11' },
  { id: 3, type: 'user', targetId: 12, user: 'Admin', reason: 'Comportement suspect', status: 'resolved', date: '2026-07-08' },
]

export const mockNotifications = [
  { id: 1, message: 'Nouvel avis sur Plomberie Express', read: false, date: '2026-07-12' },
  { id: 2, message: 'Service valide par admin', read: false, date: '2026-07-11' },
  { id: 3, message: 'Bienvenue sur TADIAVO-EO', read: true, date: '2026-07-10' },
]

// Recherche de services (texte, categorie, localisation, geolocalisation)
export const searchServices = (query, category, location, lat, lng, radiusKm = 50) => {
  let results = [...mockServices]

  if (query) {
    const q = query.toLowerCase()
    results = results.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.tags?.some((t) => t.toLowerCase().includes(q))
    )
  }

  if (category && category !== 'Toutes categories' && category !== 'Toutes catégories') {
    results = results.filter((s) => s.category === category)
  }

  if (location) {
    results = results.filter((s) => s.location.toLowerCase().includes(location.toLowerCase()))
  }

  if (lat !== undefined && lng !== undefined) {
    results = filterByDistance(results, lat, lng, radiusKm)
  }

  return results
}

export const getFavoriteServices = (favoriteIds = []) =>
  mockServices.filter((s) => favoriteIds.includes(s.id))

export const getServicesByPrestataire = (prestataireId) =>
  mockServices.filter((s) => s.prestataireId === prestataireId)

export const getReviewsByUser = (userName) =>
  mockReviews.filter((r) => r.user === userName)

export const getReviewsForPrestataire = (prestataireId) => {
  const serviceIds = mockServices.filter((s) => s.prestataireId === prestataireId).map((s) => s.id)
  return mockReviews.filter((r) => serviceIds.includes(r.serviceId))
}

export const getSimilarServices = (serviceId, limit = 3) => {
  const service = getServiceById(serviceId)
  if (!service) return []
  return mockServices
    .filter((s) => s.id !== service.id && s.category === service.category)
    .slice(0, limit)
}

export const getServiceById = (id) => {
  return mockServices.find((s) => s.id === parseInt(id))
}

export const getReviewsByServiceId = (serviceId) => {
  return mockReviews.filter((r) => r.serviceId === parseInt(serviceId))
}

// Services proches d'une position, triés par distance, avec la distance ajoutée
export const getServicesNearby = (lat, lng, radiusKm = 10) => {
  if (lat === undefined || lng === undefined) return mockServices.map((s) => ({ ...s, distance: null }))
  return mockServices
    .map((s) => ({ ...s, distance: calculateDistance(lat, lng, s.lat, s.lng) }))
    .filter((s) => s.distance !== null && s.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
}

// Filtre une liste de services par rayon autour d'une position
export const filterByDistance = (services, lat, lng, radiusKm = 10) => {
  if (lat === undefined || lng === undefined) return services
  return services
    .map((s) => ({ ...s, distance: calculateDistance(lat, lng, s.lat, s.lng) }))
    .filter((s) => s.distance === null || s.distance <= radiusKm)
}

export const mockLogin = (email, password) => {
  const user = mockUsers.find((u) => u.email === email)
  if (user && user.password === password) {
    const { password: _pwd, ...userWithoutPassword } = user
    return {
      user: userWithoutPassword,
      token: 'mock_jwt_token_' + Date.now(),
    }
  }
  throw new Error('Email ou mot de passe incorrect')
}
