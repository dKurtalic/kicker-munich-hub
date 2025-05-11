
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { MapPin, Star, Search, Plus, Filter } from 'lucide-react';

// Mock data for kicker tables
const mockKickerTables = [
  {
    id: 1,
    name: "Augustiner Biergarten",
    address: "Arnulfstraße 52, 80335 München",
    rating: 4.5,
    paid: true,
    ballsProvided: true,
    condition: "Good",
    lat: 48.143,
    lng: 11.546
  },
  {
    id: 2,
    name: "Café Kosmos",
    address: "Dachauer Str. 7, 80335 München",
    rating: 4.0,
    paid: false,
    ballsProvided: true,
    condition: "Good",
    lat: 48.1425,
    lng: 11.563
  },
  {
    id: 3,
    name: "Nachtgalerie",
    address: "Landsberger Str. 185, 80687 München",
    rating: 3.5,
    paid: true,
    ballsProvided: false,
    condition: "Average",
    lat: 48.136,
    lng: 11.523
  },
  {
    id: 4,
    name: "TU München - Stammgelände",
    address: "Arcisstraße 21, 80333 München",
    rating: 4.8,
    paid: false,
    ballsProvided: true,
    condition: "Excellent",
    lat: 48.150,
    lng: 11.576
  },
  {
    id: 5,
    name: "Backstage München",
    address: "Reitknechtstraße 6, 80639 München",
    rating: 3.0,
    paid: false,
    ballsProvided: false,
    condition: "Poor",
    lat: 48.159,
    lng: 11.526
  },
];

const TablesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTable, setSelectedTable] = useState<typeof mockKickerTables[0] | null>(null);

  // Filter tables based on search term and filter
  const filteredTables = mockKickerTables.filter(table => {
    const matchesSearch = table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         table.address.toLowerCase().includes(searchTerm.toLowerCase());
                          
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'free') return !table.paid && matchesSearch;
    if (activeFilter === 'paid') return table.paid && matchesSearch;
    if (activeFilter === 'balls') return table.ballsProvided && matchesSearch;
    if (activeFilter === 'good') return table.condition === 'Good' || table.condition === 'Excellent' && matchesSearch;
    
    return matchesSearch;
  });

  // Handle table selection
  const handleTableSelect = (table: typeof mockKickerTables[0]) => {
    setSelectedTable(table);
    // In a real app, you would center the map on this table
  };

  // Render stars for rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-yellow-500" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-500" />);
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Munich Table Finder</h1>
      <p className="text-muted-foreground mb-8">Find and rate kicker tables around Munich.</p>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Filters and Table List */}
        <div className="lg:w-1/3 space-y-6">
          {/* Search and Filters */}
          <Card className="ios-card">
            <CardHeader>
              <CardTitle className="text-lg">Find Tables</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tables..."
                  className="pl-10 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <Label className="text-sm mb-2 block">Filter</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={activeFilter === 'all' ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => setActiveFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    size="sm"
                    variant={activeFilter === 'free' ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => setActiveFilter('free')}
                  >
                    Free
                  </Button>
                  <Button
                    size="sm"
                    variant={activeFilter === 'paid' ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => setActiveFilter('paid')}
                  >
                    Paid
                  </Button>
                  <Button
                    size="sm"
                    variant={activeFilter === 'balls' ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => setActiveFilter('balls')}
                  >
                    Balls Provided
                  </Button>
                  <Button
                    size="sm"
                    variant={activeFilter === 'good' ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => setActiveFilter('good')}
                  >
                    Good Condition
                  </Button>
                </div>
              </div>
              
              <Button asChild className="w-full rounded-full">
                <div>
                  <Plus className="mr-2 h-4 w-4" /> Add New Table
                </div>
              </Button>
            </CardContent>
          </Card>
          
          {/* Table List */}
          <div className="space-y-4 overflow-y-auto max-h-[60vh]">
            {filteredTables.length === 0 ? (
              <div className="text-center py-8 bg-muted rounded-lg">
                <p className="text-muted-foreground">No tables found matching your criteria</p>
              </div>
            ) : (
              filteredTables.map(table => (
                <Card 
                  key={table.id} 
                  className={`ios-card hover:shadow-ios-md transition-all cursor-pointer ${selectedTable?.id === table.id ? 'border-primary' : ''}`}
                  onClick={() => handleTableSelect(table)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{table.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{table.address}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {renderStars(table.rating)}
                          <span className="text-sm font-medium">{table.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${table.paid ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
                        {table.paid ? 'Paid' : 'Free'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${table.ballsProvided ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                        {table.ballsProvided ? 'Balls Provided' : 'No Balls'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        table.condition === 'Excellent' || table.condition === 'Good' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : table.condition === 'Average'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {table.condition} Condition
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
        
        {/* Right Column - Map and Table Details */}
        <div className="lg:w-2/3">
          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full mb-6">
              <TabsTrigger value="map" className="rounded-full">Map View</TabsTrigger>
              <TabsTrigger value="details" className="rounded-full">Table Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="map">
              <Card className="ios-card overflow-hidden">
                <div className="h-[60vh] bg-muted/50 flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                    <p className="text-muted-foreground">
                      In the full version, this would be an interactive map showing all kicker table locations in Munich.
                    </p>
                    {selectedTable && (
                      <div className="mt-4 p-4 bg-background rounded-lg border border-border">
                        <p className="font-medium">Selected: {selectedTable.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedTable.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="details">
              <Card className="ios-card">
                {selectedTable ? (
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold">{selectedTable.name}</h2>
                        <div className="flex items-center text-muted-foreground mt-2">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span>{selectedTable.address}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <h3 className="font-semibold mb-2">Rating & Reviews</h3>
                        <div className="flex items-center gap-2">
                          {renderStars(selectedTable.rating)}
                          <span className="font-medium">{selectedTable.rating}/5</span>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Features</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${selectedTable.paid ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                              <span>{selectedTable.paid ? 'Paid table' : 'Free to use'}</span>
                            </li>
                            <li className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${selectedTable.ballsProvided ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <span>{selectedTable.ballsProvided ? 'Balls provided' : 'Bring your own balls'}</span>
                            </li>
                            <li className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 ${
                                selectedTable.condition === 'Excellent' ? 'bg-green-500' :
                                selectedTable.condition === 'Good' ? 'bg-green-400' :
                                selectedTable.condition === 'Average' ? 'bg-amber-500' :
                                'bg-red-500'
                              }`}></div>
                              <span>Condition: {selectedTable.condition}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <h3 className="font-semibold mb-2">User Reviews</h3>
                        <p className="text-muted-foreground">No reviews yet. Be the first to review this table!</p>
                        
                        <Button className="mt-4 rounded-full">
                          Add Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                ) : (
                  <CardContent className="p-6 flex items-center justify-center h-[60vh]">
                    <div className="text-center">
                      <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold">No Table Selected</h3>
                      <p className="text-muted-foreground mt-2">
                        Select a table from the list to view details
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TablesPage;
