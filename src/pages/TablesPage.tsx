
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, MapPin, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TablesList from '@/components/table/TablesList';
import TableMap from '@/components/table/TableMap';
import AddTableForm from '@/components/table/AddTableForm';

const TablesPage = () => {
  const [showAddTableDialog, setShowAddTableDialog] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tables</h1>
          <p className="text-muted-foreground mt-1">Find and manage kicker tables across the city</p>
        </div>
        <Button onClick={() => setShowAddTableDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Table
        </Button>
      </div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px] rounded-full">
          <TabsTrigger value="list" className="rounded-full">
            <Settings className="mr-2 h-4 w-4" />
            List View
          </TabsTrigger>
          <TabsTrigger value="map" className="rounded-full">
            <MapPin className="mr-2 h-4 w-4" />
            Map View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All Tables</CardTitle>
            </CardHeader>
            <CardContent>
              <TablesList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Tables Map</CardTitle>
            </CardHeader>
            <CardContent>
              <TableMap />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showAddTableDialog} onOpenChange={setShowAddTableDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Table</DialogTitle>
          </DialogHeader>
          <AddTableForm onComplete={() => setShowAddTableDialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TablesPage;
