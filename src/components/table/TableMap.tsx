
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { mockTables } from './TablesList';

const TableMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a real application, you would use a library like Google Maps, Mapbox, or Leaflet
    if (mapRef.current) {
      setTimeout(() => {
        setMapLoaded(true);
      }, 1000);
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="h-[500px] rounded-lg border bg-muted/30 relative" ref={mapRef}>
        {!mapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6 bg-background/80 rounded-lg max-w-md">
              <h3 className="text-lg font-medium mb-2">Map Visualization</h3>
              <p className="text-sm text-muted-foreground mb-4">
                In a real application, this would display an interactive map showing all table locations. 
                You would be able to click on markers to see details about each table.
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {mockTables.map(table => (
                  <Card key={table.id} className="overflow-hidden">
                    <CardContent className="p-3">
                      <p className="font-medium truncate">{table.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{table.address}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p>
          Note: In a production application, this would be replaced with a real map implementation 
          using a service like Google Maps, Mapbox, or OpenStreetMap.
        </p>
      </div>
    </div>
  );
};

export default TableMap;
