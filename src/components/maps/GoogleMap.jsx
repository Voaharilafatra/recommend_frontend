import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  GoogleMap as GoogleMapComponent,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Circle,
  DirectionsRenderer,
  MarkerClustererF,
} from '@react-google-maps/api'
import { FiMapPin, FiAlertCircle } from 'react-icons/fi'
import ServicePopup from './ServicePopup'
import { getCategoryColor } from './mapUtils'

const defaultCenter = { lat: -18.9137, lng: 47.5361 }

const mapContainerStyle = { width: '100%', height: '100%' }

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: false,
  fullscreenControl: true,
}

function createMarkerIcon(category) {
  const color = getCategoryColor(category)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40"><path fill="${color}" stroke="#000" stroke-width="1" d="M16 0C7.2 0 0 7.2 0 16c0 12 16 24 16 24s16-12 16-24C32 7.2 24.8 0 16 0z"/><circle fill="#fff" cx="16" cy="16" r="6"/></svg>`
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: { width: 32, height: 40 },
    anchor: { x: 16, y: 40 },
  }
}

function GoogleMap({
  services = [],
  center,
  zoom = 13,
  onMarkerClick,
  onBoundsChange,
  selectedService,
  userLocation,
  radius = 10,
  showDirections = false,
  className = '',
}) {
  const mapRef = useRef(null)
  const directionsServiceRef = useRef(null)
  const [activeService, setActiveService] = useState(null)
  const [directions, setDirections] = useState(null)
  const [mapCenter, setMapCenter] = useState(center || defaultCenter)
  const [mapZoom, setMapZoom] = useState(zoom)

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  })

  useEffect(() => {
    if (center) setMapCenter(center)
  }, [center])

  useEffect(() => {
    if (selectedService) setActiveService(selectedService)
  }, [selectedService])

  useEffect(() => {
    if (userLocation && !center) {
      setMapCenter({ lat: userLocation.lat, lng: userLocation.lng })
    }
  }, [userLocation, center])

  const onLoad = useCallback((map) => {
    mapRef.current = map
    directionsServiceRef.current = new window.google.maps.DirectionsService()
  }, [])

  const onUnmount = useCallback(() => {
    mapRef.current = null
    directionsServiceRef.current = null
  }, [])

  const handleBoundsChanged = useCallback(() => {
    if (!mapRef.current || !onBoundsChange) return
    const bounds = mapRef.current.getBounds()
    if (bounds) onBoundsChange(bounds)
  }, [onBoundsChange])

  const handleMarkerClick = useCallback(
    (service) => {
      setActiveService(service)
      setMapCenter({ lat: service.lat, lng: service.lng })
      setMapZoom(15)
      onMarkerClick && onMarkerClick(service)
    },
    [onMarkerClick]
  )

  const handleDirections = useCallback(
    (service) => {
      if (!directionsServiceRef.current || !userLocation || !window.google) return
      directionsServiceRef.current.route(
        {
          origin: { lat: userLocation.lat, lng: userLocation.lng },
          destination: { lat: service.lat, lng: service.lng },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') setDirections(result)
        }
      )
    },
    [userLocation]
  )

  const clusterStyles = useMemo(
    () => [
      {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><circle cx="24" cy="24" r="22" fill="#fbbf24" stroke="#000" stroke-width="2"/><text x="24" y="29" text-anchor="middle" fill="#000" font-size="14" font-weight="bold">CL</text></svg>'),
        height: 48,
        width: 48,
        textColor: '#000000',
        textSize: 14,
      },
    ],
    []
  )

  if (loadError) {
    return (
      <div className={`flex h-full items-center justify-center bg-zinc-50 ${className}`}>
        <div className="text-center p-8">
          <FiAlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <p className="mt-4 font-semibold text-black">Erreur de chargement Google Maps</p>
          <p className="mt-2 text-sm text-zinc-500">Verifiez votre cle API VITE_GOOGLE_MAPS_API_KEY</p>
        </div>
      </div>
    )
  }

  if (!apiKey) {
    return (
      <div className={`relative h-full overflow-hidden bg-zinc-100 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <FiMapPin className="mx-auto h-12 w-12 text-yellow-400" />
            <p className="mt-4 font-semibold text-black">Google Maps</p>
            <p className="mt-2 text-sm text-zinc-500">
              Ajoutez VITE_GOOGLE_MAPS_API_KEY dans un fichier .env pour activer la carte.
            </p>
            <p className="mt-4 text-xs text-zinc-400">{services.length} service(s) disponible(s)</p>
          </div>
        </div>
        {userLocation && radius > 0 && (
          <div className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs shadow-lg">
            Rayon : {radius} km
          </div>
        )}
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className={`flex h-full items-center justify-center bg-zinc-50 ${className}`}>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-400/20 border-t-yellow-400" />
      </div>
    )
  }

  return (
    <div className={`relative h-full ${className}`}>
      <GoogleMapComponent
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={mapZoom}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onBoundsChanged={handleBoundsChanged}
        onZoomChanged={() => mapRef.current && setMapZoom(mapRef.current.getZoom())}
      >
        {userLocation && (
          <Marker
            position={{ lat: userLocation.lat, lng: userLocation.lng }}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#fff',
              strokeWeight: 3,
            }}
            title="Ma position"
          />
        )}

        {userLocation && radius > 0 && (
          <Circle
            center={{ lat: userLocation.lat, lng: userLocation.lng }}
            radius={radius * 1000}
            options={{
              fillColor: '#fbbf24',
              fillOpacity: 0.1,
              strokeColor: '#fbbf24',
              strokeOpacity: 0.5,
              strokeWeight: 2,
            }}
          />
        )}

        <MarkerClustererF
          options={{
            styles: clusterStyles,
            minimumClusterSize: 2,
            gridSize: 60,
          }}
        >
          {(clusterer) =>
            services.map((service) => (
              <Marker
                key={service.id}
                position={{ lat: service.lat, lng: service.lng }}
                icon={createMarkerIcon(service.category)}
                clusterer={clusterer}
                onClick={() => handleMarkerClick(service)}
                title={service.title}
              />
            ))
          }
        </MarkerClustererF>

        {showDirections && directions && (
          <DirectionsRenderer
            directions={directions}
            options={{ suppressMarkers: false, polylineOptions: { strokeColor: '#fbbf24', strokeWeight: 5 } }}
          />
        )}

        {activeService && !showDirections && (
          <InfoWindow
            position={{ lat: activeService.lat, lng: activeService.lng }}
            onCloseClick={() => setActiveService(null)}
          >
            <div className="-m-2">
              <ServicePopup
                service={activeService}
                distance={activeService.distance}
                onClose={() => setActiveService(null)}
                onDirections={handleDirections}
              />
            </div>
          </InfoWindow>
        )}
      </GoogleMapComponent>
    </div>
  )
}

export default GoogleMap
