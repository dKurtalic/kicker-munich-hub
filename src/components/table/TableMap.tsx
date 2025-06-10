
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { mockTables } from './TablesList';

const TableMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        setMapLoaded(true);
      }, 1000);
    }
  }, []);

  // Filter only verified tables for the map
  const verifiedTables = mockTables.filter(table => table.isVerified);

  return (
    <div className="space-y-4">
      <div className="h-[500px] rounded-lg border bg-muted/30 relative overflow-hidden" ref={mapRef}>
        {!mapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {/* Map background image */}
            <img 
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Munich city map"
              className="w-full h-full object-cover rounded-lg"
            />
            
            {/* Dark overlay for better visibility of pins */}
            <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
            
            {/* Table pinpoints */}
            {verifiedTables.map((table, index) => (
              <div
                key={table.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + (index * 8)}%`,
                }}
              >
                <div className="relative">
                  <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg group-hover:scale-110 transition-transform" />
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {table.name}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <h3 className="text-sm font-medium mb-2">Available Tables</h3>
              <div className="space-y-1">
                {verifiedTables.map(table => (
                  <div key={table.id} className="flex items-center text-xs">
                    <MapPin className="h-3 w-3 text-red-500 mr-2" />
                    <span className="truncate max-w-[200px]">{table.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>
          Map showing verified kicker tables in Munich. Only tables with 5+ verifications are displayed.
          Hover over pins to see table names.
        </p>
      </div>
    </div>
  );
};

export default TableMap;
