import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DeleteAccountDialog from '@/components/profile/DeleteAccountDialog';

const ProfilePage = () => {
  const { user } = useAuth();
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);

  // Add this content to your existing ProfilePage component
  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] rounded-full">
          <TabsTrigger value="profile" className="rounded-full">Profile</TabsTrigger>
          <TabsTrigger value="matches" className="rounded-full">Matches</TabsTrigger>
          <TabsTrigger value="tournaments" className="rounded-full">Tournaments</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-full">Settings</TabsTrigger>
        </TabsList>
        
        {/* Other tabs content as in your existing code */}
        
        <TabsContent value="settings">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>
                  Permanent actions that affect your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-md mb-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-destructive mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-destructive">Delete your account</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Once you delete your account, there is no going back. All of your data will be permanently removed.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="destructive" 
                  onClick={() => setShowDeleteAccountDialog(true)}
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <DeleteAccountDialog 
        open={showDeleteAccountDialog} 
        onOpenChange={setShowDeleteAccountDialog} 
      />
    </div>
  );
};

export default ProfilePage;
