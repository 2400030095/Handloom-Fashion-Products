import { useState, useMemo, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { mockProducts } from '../data';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
    width: '100%',
    height: '600px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
};

const INDIA_CENTER = { lat: 22.5937, lng: 78.9629 };

const LIBRARIES = ['marker'];

const stateCenters = {
    'Rajasthan': { lat: 27.0238, lng: 74.2179 },
    'Gujarat': { lat: 22.2587, lng: 71.1924 },
    'Uttar Pradesh': { lat: 26.8467, lng: 80.9462 },
    'West Bengal': { lat: 22.9868, lng: 87.8550 },
    'Odisha': { lat: 20.9517, lng: 85.0985 },
    'Andhra Pradesh': { lat: 15.9129, lng: 79.7400 },
    'Tamil Nadu': { lat: 11.1271, lng: 78.6569 },
    'Jammu & Kashmir': { lat: 33.7782, lng: 76.5762 },
    'Madhya Pradesh': { lat: 22.9734, lng: 78.6569 },
    'Assam': { lat: 26.2006, lng: 92.9376 },
    'Telangana': { lat: 18.1124, lng: 79.0193 }
};

// Generate deterministic random offsets to scatter artisan pins around the state center
const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return hash;
};

const getArtisanCoordinates = (state, artisanName) => {
    const center = stateCenters[state] || INDIA_CENTER;
    const rng1 = (hashString(artisanName + "lat") % 100) / 100; // 0.0 to 1.0
    const rng2 = (hashString(artisanName + "lng") % 100) / 100;

    // offset by up to +/- 1.5 degrees
    return {
        lat: center.lat + (rng1 * 3 - 1.5),
        lng: center.lng + (rng2 * 3 - 1.5)
    };
};

export default function InteractiveMap() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        // Loaded securely from environment variables (e.g., .env or .env.local)
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
        libraries: LIBRARIES
    });

    const [map, setMap] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [hoveredStateMarker, setHoveredStateMarker] = useState(null);
    const [selectedArtisan, setSelectedArtisan] = useState(null);
    const navigate = useNavigate();

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    const handleStateClick = (stateName) => {
        setSelectedState(stateName);
        setHoveredStateMarker(null);
        if (map && stateCenters[stateName]) {
            map.panTo(stateCenters[stateName]);
            map.setZoom(6);
        }
    };

    const handleBackClick = () => {
        setSelectedState(null);
        setSelectedArtisan(null);
        if (map) {
            map.panTo(INDIA_CENTER);
            map.setZoom(4.5);
        }
    };

    const artisanPins = useMemo(() => {
        if (!selectedState) return [];
        const stateProducts = mockProducts.filter(p => p.state === selectedState);
        // Group by artisan
        const artisanMap = {};
        stateProducts.forEach(p => {
            if (!artisanMap[p.artisan]) {
                const coords = getArtisanCoordinates(selectedState, p.artisan);
                artisanMap[p.artisan] = {
                    name: p.artisan,
                    coords,
                    products: []
                };
            }
            artisanMap[p.artisan].products.push(p);
        });
        return Object.values(artisanMap);
    }, [selectedState]);

    const statesWithArtisans = useMemo(() => {
        const uniqueStates = [...new Set(mockProducts.map(p => p.state))];
        return uniqueStates.filter(state => stateCenters[state]);
    }, []);

    // State markers
    useEffect(() => {
        if (!map || selectedState) return;
        const markers = statesWithArtisans.map(state => {
            const markerElement = document.createElement('div');
            markerElement.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#9B704E" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
            `;
            const marker = new google.maps.marker.AdvancedMarkerElement({
                map,
                position: stateCenters[state],
                content: markerElement,
                title: state,
            });
            marker.addListener('gmp-click', () => handleStateClick(state));
            marker.addListener('mouseover', () => setHoveredStateMarker(state));
            marker.addListener('mouseout', () => setHoveredStateMarker(null));
            return marker;
        });
        return () => {
            markers.forEach(marker => marker.map = null);
        };
    }, [map, selectedState, statesWithArtisans]);

    // Artisan markers
    useEffect(() => {
        if (!map || !selectedState) return;
        const markers = artisanPins.map(artisan => {
            const markerElement = document.createElement('div');
            markerElement.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#1A1A1A" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v8"></path>
                    <path d="M8 12h8"></path>
                </svg>
            `;
            const marker = new google.maps.marker.AdvancedMarkerElement({
                map,
                position: artisan.coords,
                content: markerElement,
            });
            marker.addListener('gmp-click', () => setSelectedArtisan(artisan));
            return marker;
        });
        return () => {
            markers.forEach(marker => marker.map = null);
        };
    }, [map, selectedState, artisanPins]);

    if (!isLoaded) return <div style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0', borderRadius: '12px' }}>Loading Map...</div>;

    return (
        <div style={{ position: 'relative' }}>
            {selectedState && (
                <button
                    onClick={handleBackClick}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        zIndex: 10,
                        background: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-full)',
                        boxShadow: 'var(--shadow-md)',
                        fontWeight: 600,
                        color: 'var(--color-primary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    ← Back to India Map
                </button>
            )}

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={INDIA_CENTER}
                zoom={4.5}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true
                }}
            >
                {/* InfoWindow for hovered state */}
                {hoveredStateMarker && (
                    <InfoWindow position={stateCenters[hoveredStateMarker]} onCloseClick={() => setHoveredStateMarker(null)}>
                        <div style={{ padding: '0.2rem', color: 'var(--color-primary)' }}>
                            <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{hoveredStateMarker}</h4>
                            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Click to view artisans</p>
                        </div>
                    </InfoWindow>
                )}

                {/* InfoWindow for selected Artisan */}
                {selectedArtisan && (
                    <InfoWindow
                        position={selectedArtisan.coords}
                        onCloseClick={() => setSelectedArtisan(null)}
                    >
                        <div style={{ padding: '0.5rem', maxWidth: '200px', color: 'var(--color-primary)' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 600 }}>{selectedArtisan.name}</h4>
                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem' }}>{selectedArtisan.products.length} products available</p>
                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                E.g., {selectedArtisan.products[0].name}
                            </p>
                            <button
                                onClick={() => navigate(`/collections?state=${encodeURIComponent(selectedState)}`)}
                                style={{
                                    display: 'block', width: '100%', padding: '0.6rem', background: 'var(--color-secondary)',
                                    color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer',
                                    marginTop: '0.5rem'
                                }}
                            >
                                Shop Artisan
                            </button>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div >
    );
}
