import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { MapPin, X, Check } from 'lucide-react';

// Fix leaflet default markers
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onLocationSelect: (lat: number, lng: number) => void;
    initialLat?: number;
    initialLng?: number;
}

// Component untuk handle click events di map
function LocationMarker({ 
    position, 
    setPosition 
}: { 
    position: LatLng | null; 
    setPosition: (pos: LatLng) => void; 
}) {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    return position === null ? null : (
        <Marker position={position} />
    );
}

export default function MapPicker({ 
    isOpen, 
    onClose, 
    onLocationSelect, 
    initialLat, 
    initialLng 
}: MapPickerProps) {
    const [position, setPosition] = useState<LatLng | null>(
        initialLat && initialLng ? new LatLng(initialLat, initialLng) : null
    );
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // Indonesia's center coordinates
    const indonesiaCenter: [number, number] = [-2.548926, 118.0148634];

    const handleConfirm = () => {
        if (position) {
            onLocationSelect(position.lat, position.lng);
            onClose();
        }
    };

    // Simple geocoding search (you can replace with more advanced service)
    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        
        setIsSearching(true);
        try {
            // Using OpenStreetMap Nominatim API
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    searchQuery + ', Indonesia'
                )}&limit=1`
            );
            const results = await response.json();
            
            if (results.length > 0) {
                const { lat, lon } = results[0];
                const newPosition = new LatLng(parseFloat(lat), parseFloat(lon));
                setPosition(newPosition);
            } else {
                alert('Location not found. Please try a different search term.');
            }
        } catch (error) {
            console.error('Search error:', error);
            alert('Failed to search location. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newPos = new LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    setPosition(newPos);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    alert('Failed to get current location. Please enable location access.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[600px] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Pick Location on Map
                        </h3>
                        <p className="text-sm text-gray-600">
                            Click on the map to select coordinates
                        </p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Search & Controls */}
                <div className="p-4 border-b bg-gray-50">
                    <div className="flex gap-2 mb-2">
                        <div className="flex-1 flex gap-2">
                            <input
                                type="text"
                                placeholder="Search for a place in Indonesia..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Button 
                                onClick={handleSearch} 
                                disabled={isSearching}
                                variant="outline"
                            >
                                {isSearching ? 'Searching...' : 'Search'}
                            </Button>
                        </div>
                        <Button 
                            onClick={getCurrentLocation}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <MapPin className="w-4 h-4" />
                            Current Location
                        </Button>
                    </div>

                    {/* Coordinates Display */}
                    {position && (
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>
                                <strong>Selected:</strong> {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Map */}
                <div className="flex-1 relative">
                    <MapContainer
                        center={position ? [position.lat, position.lng] : indonesiaCenter}
                        zoom={position ? 15 : 5}
                        style={{ height: '100%', width: '100%' }}
                        key={position ? `${position.lat}-${position.lng}` : 'default'}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker position={position} setPosition={setPosition} />
                    </MapContainer>

                    {/* Instructions Overlay */}
                    {!position && (
                        <div className="absolute top-4 left-4 bg-white p-3 rounded shadow-lg border max-w-xs">
                            <p className="text-sm text-gray-700">
                                <strong>Instructions:</strong><br />
                                • Click anywhere on the map to place a marker<br />
                                • Use search to find specific locations<br />
                                • Use "Current Location" to get your GPS position
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                        {position ? (
                            <span className="text-green-600 font-medium">
                                ✓ Location selected: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
                            </span>
                        ) : (
                            <span>Please click on the map to select a location</span>
                        )}
                    </div>
                    
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleConfirm} 
                            disabled={!position}
                            className="flex items-center gap-2"
                        >
                            <Check className="w-4 h-4" />
                            Confirm Location
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}