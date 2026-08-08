import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'
import { FiMapPin } from 'react-icons/fi'

// Correction des icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

function LocationMarker({ onLocationFound }) {
  const map = useMap()

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 16 })
    map.on('locationfound', (e) => {
      if (onLocationFound) {
        onLocationFound(e.latlng)
      }
    })
  }, [map, onLocationFound])

  return null
}

function LeafletMap({ services, onSelectService }) {
  const center = [-18.8792, 47.5079]

  // Créer une icône personnalisée
  const customIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="18" fill="#FFB800" />
        <circle cx="18" cy="18" r="14" fill="white" />
        <circle cx="18" cy="18" r="8" fill="#FFB800" />
      </svg>
    `),
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  })

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '100%', width: '100%', borderRadius: '1.8rem' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <LocationMarker onLocationFound={(location) => {
        console.log('Position trouvée:', location)
      }} />

      {services && services.map((service) => (
        <Marker
          key={service.id}
          position={[
            service.lat || center[0] + (Math.random() - 0.5) * 0.1, 
            service.lng || center[1] + (Math.random() - 0.5) * 0.1
          ]}
          icon={customIcon}
          eventHandlers={{
            click: () => {
              if (onSelectService) {
                onSelectService(service)
              }
            }
          }}
        >
          <Popup>
            <div className="p-2">
              <h4 className="font-semibold text-black">{service.title}</h4>
              <p className="text-sm text-zinc-600">{service.category}</p>
              <p className="text-sm text-zinc-500">{service.location}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-bold text-yellow-400">{service.rating || '4.5'}⭐</span>
                <span className="text-xs text-zinc-500">({service.reviews || 12} avis)</span>
              </div>
              <a
                href={`/service/${service.id}`}
                className="mt-2 block w-full rounded-full bg-yellow-400 px-4 py-1 text-center text-sm font-semibold text-white transition hover:bg-yellow-500"
              >
                Voir
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default LeafletMap