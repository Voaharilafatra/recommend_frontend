// Utilitaires pour la carte visuelle personnalisée (sans dépendance à une clé API)
// Ces fonctions permettent de projeter des coordonnées GPS sur un plan 2D (%),
// de regrouper les marqueurs proches (clustering) et d'associer une couleur par catégorie.

export const categoryColors = {
  Plomberie: '#3b82f6',
  'Électricité': '#f59e0b',
  Restaurant: '#ef4444',
  Jardinage: '#22c55e',
  'Beauté': '#ec4899',
  Nettoyage: '#06b6d4',
  Construction: '#78716c',
  Informatique: '#6366f1',
  Transport: '#8b5cf6',
  'Santé': '#14b8a6',
}

export function getCategoryColor(category) {
  return categoryColors[category] || '#fbbf24'
}

// Calcule une zone (bounding box) autour d'un centre selon un niveau de zoom
export function getBoundsFromCenter(center, zoom = 13) {
  const span = 0.6 / Math.pow(1.5, zoom - 10)
  return {
    north: center.lat + span,
    south: center.lat - span,
    east: center.lng + span * 1.3,
    west: center.lng - span * 1.3,
  }
}

// Calcule une zone englobant une liste de services
export function getBoundsFromServices(services, padding = 0.02) {
  if (!services || services.length === 0) {
    return { north: -18.84, south: -18.95, east: 47.57, west: 47.49 }
  }
  const lats = services.map((s) => s.lat).filter((v) => v !== undefined)
  const lngs = services.map((s) => s.lng).filter((v) => v !== undefined)
  return {
    north: Math.max(...lats) + padding,
    south: Math.min(...lats) - padding,
    east: Math.max(...lngs) + padding,
    west: Math.min(...lngs) - padding,
  }
}

// Projette lat/lng en position (%) à l'intérieur des limites données
export function projectToPercent(lat, lng, bounds) {
  const { north, south, east, west } = bounds
  const x = ((lng - west) / (east - west)) * 100
  const y = ((north - lat) / (north - south)) * 100
  return {
    x: Math.min(98, Math.max(2, x)),
    y: Math.min(98, Math.max(2, y)),
  }
}

// Regroupe les marqueurs proches en clusters (basé sur la distance en pixels)
export function clusterMarkers(points, containerSize = { width: 600, height: 400 }, radiusPx = 42) {
  const clusters = []
  const used = new Array(points.length).fill(false)

  points.forEach((point, i) => {
    if (used[i]) return
    const cluster = { points: [point] }
    used[i] = true
    for (let j = i + 1; j < points.length; j++) {
      if (used[j]) continue
      const dx = ((points[j].x - point.x) / 100) * containerSize.width
      const dy = ((points[j].y - point.y) / 100) * containerSize.height
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < radiusPx) {
        cluster.points.push(points[j])
        used[j] = true
      }
    }
    cluster.x = cluster.points.reduce((sum, p) => sum + p.x, 0) / cluster.points.length
    cluster.y = cluster.points.reduce((sum, p) => sum + p.y, 0) / cluster.points.length
    clusters.push(cluster)
  })

  return clusters
}

// Convertit une position (%) sur la carte en coordonnées lat/lng approximatives
export function unprojectFromPercent(xPercent, yPercent, bounds) {
  const { north, south, east, west } = bounds
  const lng = west + (xPercent / 100) * (east - west)
  const lat = north - (yPercent / 100) * (north - south)
  return { lat, lng }
}

// Convertit un rayon en kilomètres en pourcentage approximatif de la largeur de la carte
export function radiusKmToPercent(radiusKm, bounds) {
  const widthKm = (bounds.east - bounds.west) * 111 * Math.cos((bounds.north * Math.PI) / 180)
  if (!widthKm) return 10
  return Math.min(90, (radiusKm / widthKm) * 100)
}
