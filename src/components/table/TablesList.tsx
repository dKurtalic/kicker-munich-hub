
import { useState } from 'react';
import { Check, X, MapPin, Euro, Table as TableIcon, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EditTableForm } from './EditTableForm';

// Mock table data - in a real app, this would come from an API
export const mockTables = [
  {
    id: 1,
    name: "Spielbar",
    address: "Sonnenstraße 12, 80331 München",
    location: { lat: 48.1371, lng: 11.5754 },
    isPaid: true,
    fee: "€1 per game",
    hasBalls: true,
    condition: "Excellent",
    rating: 4.8,
    reviews: 24,
    verificationCount: 8,
    isVerified: true,
  },
  {
    id: 2,
    name: "TU München Student Union",
    address: "Arcisstraße 21, 80333 München",
    location: { lat: 48.1512, lng: 11.5693 },
    isPaid: false,
    hasBalls: true,
    condition: "Good",
    rating: 4.2,
    reviews: 18,
    verificationCount: 6,
    isVerified: true,
  },
  {
    id: 3,
    name: "Gans Woanders",
    address: "Siegesstraße 6, 80331 München",
    location: { lat: 48.1492, lng: 11.5819 },
    isPaid: true,
    fee: "€2 per game",
    hasBalls: true,
    condition: "Very Good",
    rating: 4.5,
    reviews: 32,
    verificationCount: 12,
    isVerified: true,
  },
  {
    id: 4,
    name: "Die Kicker Fabrik",
    address: "Landsberger Str. 185, 80687 München",
    location: { lat: 48.1384, lng: 11.5076 },
    isPaid: false,
    hasBalls: false,
    condition: "Average",
    rating: 3.7,
    reviews: 12,
    verificationCount: 3,
    isVerified: false,
  },
  {
    id: 5,
    name: "Zephyr Lounge",
    address: "Leopoldstraße 56, 80802 München",
    location: { lat: 48.1631, lng: 11.5859 },
    isPaid: true,
    fee: "€1.5 per game",
    hasBalls: true,
    condition: "Excellent",
    rating: 4.9,
    reviews: 41,
    verificationCount: 7,
    isVerified: true,
  },
];

const TablesList = () => {
  const [tables, setTables] = useState(mockTables);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const handleEditComplete = (updatedTable: any) => {
    setTables(tables.map(table => 
      table.id === updatedTable.id ? updatedTable : table
    ));
    setSelectedTable(null);
  };

  const handleVerifyTable = (tableId: number) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        const newVerificationCount = table.verificationCount + 1;
        return {
          ...table,
          verificationCount: newVerificationCount,
          isVerified: newVerificationCount >= 5
        };
      }
      return table;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground bg-muted/50">
          <div className="col-span-3">Name & Location</div>
          <div className="col-span-2">Condition</div>
          <div className="col-span-2">Features</div>
          <div className="col-span-2">Verification</div>
          <div className="col-span-1">Rating</div>
          <div className="col-span-2">Actions</div>
        </div>
        
        {tables.map((table) => (
          <div 
            key={table.id} 
            className="grid grid-cols-12 p-4 border-t items-center hover:bg-muted/10 transition-colors"
          >
            <div className="col-span-3 flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-primary/10">
                <AvatarFallback className="text-primary">
                  <TableIcon className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{table.name}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate">{table.address}</span>
                </div>
              </div>
            </div>
            
            <div className="col-span-2">
              <Badge 
                variant={table.condition === "Good" ? "default" : 
                        table.condition === "Excellent" ? "secondary" : 
                        "outline"}
                className="text-xs rounded-full px-2"
              >
                {table.condition}
              </Badge>
            </div>
            
            <div className="col-span-2 space-y-1">
              <div className="flex items-center text-sm">
                <div className="w-6">
                  {table.isPaid ? 
                    <Euro className="h-4 w-4 text-amber-500" /> : 
                    <Check className="h-4 w-4 text-green-500" />
                  }
                </div>
                <span className="truncate">{table.isPaid ? `Paid (${table.fee})` : "Free"}</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-6">
                  {table.hasBalls ? 
                    <Check className="h-4 w-4 text-green-500" /> : 
                    <X className="h-4 w-4 text-red-500" />
                  }
                </div>
                <span className="truncate">{table.hasBalls ? "Balls provided" : "Bring your own balls"}</span>
              </div>
            </div>

            <div className="col-span-2">
              <div className="space-y-1">
                <Badge 
                  variant={table.isVerified ? "default" : "secondary"}
                  className="text-xs rounded-full px-2"
                >
                  {table.isVerified ? "Verified" : "Unverified"}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {table.verificationCount}/5 verifications
                </p>
                {!table.isVerified && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-xs h-6 px-2"
                    onClick={() => handleVerifyTable(table.id)}
                  >
                    Verify
                  </Button>
                )}
              </div>
            </div>
            
            <div className="col-span-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                <div>
                  <span className="font-medium text-sm">{table.rating}</span>
                  <p className="text-xs text-muted-foreground">({table.reviews})</p>
                </div>
              </div>
            </div>
            
            <div className="col-span-2 flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setSelectedTable(table.id)}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <Dialog open={selectedTable !== null} onOpenChange={() => setSelectedTable(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Table</DialogTitle>
          </DialogHeader>
          {selectedTable && (
            <EditTableForm 
              table={tables.find(t => t.id === selectedTable)!} 
              onComplete={handleEditComplete} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TablesList;
