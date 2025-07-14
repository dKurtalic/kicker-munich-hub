import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import NotLoggedInProfilePage from './NotLoggedInProfilePage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import DeleteAccountDialog from '@/components/profile/DeleteAccountDialog';
import ProfileStats from '@/components/profile/ProfileStats';
import PremiumStatusCard from '@/components/profile/PremiumStatusCard';
import RecentMatches from '@/components/profile/RecentMatches';
import TournamentHistory from '@/components/profile/TournamentHistory';
import CancelSubscriptionDialog from '@/components/profile/CancelSubscriptionDialog';
import ManageBillingDialog from '@/components/profile/ManageBillingDialog';
import { useToast } from '@/hooks/use-toast';

// Mock user data - in a real app this would come from an API
const mockUserProfile = {
  id: "1",
  name: "Max Schmidt",
  email: "max.schmidt@example.com",
  avatar: "/placeholder.svg",
  elo: 1850,
  rank: 5,
  totalMatches: 42,
  wins: 28,
  losses: 14,
  winRate: 67,
  memberSince: "2023-01-15",
  bio: "Passionate table tennis player from Munich. Love playing doubles and participating in tournaments!",
  favoriteLocation: "TU München Main Campus"
};

// Mock recent matches data
const mockRecentMatches = [
  {
    id: 1,
    date: "2023-05-10",
    opponent: "Sarah Wagner",
    result: "Won",
    score: "11-8, 11-6, 9-11, 11-7",
    eloChange: +15,
    type: "Singles"
  },
  {
    id: 2,
    date: "2023-05-08",
    opponent: "Tom Schmidt & Maria Fischer",
    result: "Lost",
    score: "8-11, 11-9, 6-11, 9-11",
    eloChange: -12,
    type: "Doubles"
  },
  {
    id: 3,
    date: "2023-05-05",
    opponent: "Alex Mueller",
    result: "Won",
    score: "11-5, 11-8, 11-6",
    eloChange: +18,
    type: "Singles"
  }
];

// Mock tournaments data
const mockTournaments = [
  {
    id: 1,
    name: "Spring Championship 2023",
    date: "2023-04-20",
    placement: "2nd Place",
    participants: 16,
    prize: "€50"
  },
  {
    id: 2,
    name: "Monthly Doubles Tournament",
    date: "2023-03-15",
    placement: "1st Place",
    participants: 12,
    prize: "€75"
  }
];

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();

  // Show not logged in page if user is not authenticated
  if (!isAuthenticated) {
    return <NotLoggedInProfilePage />;
  }
  const { toast } = useToast();
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);
  const [showCancelSubscriptionDialog, setShowCancelSubscriptionDialog] = useState(false);
  const [showManageBillingDialog, setShowManageBillingDialog] = useState(false);

  // Mock subscription data - in a real app this would come from your backend
  const mockSubscriptionData = {
    isActive: user?.isPremium || false,
    plan: 'Premium',
    nextBillingDate: '2024-07-29',
    price: '€9.99/month',
    features: [
      'Unlimited tournament entries',
      'Advanced statistics',
      'Priority table booking',
      'Custom profile themes',
      'Monthly progress reports'
    ]
  };

  // Mock billing info for the manage billing dialog
  const mockBillingInfo = {
    plan: 'Premium',
    price: '€9.99/month',
    nextBillingDate: '2024-07-29',
    billingInterval: 'monthly',
    paymentMethod: {
      type: 'visa',
      last4: '4242',
      expiryMonth: 8,
      expiryYear: 2027
    },
    billingHistory: [
      {
        id: 'inv_001',
        date: '2024-06-29',
        amount: '€9.99',
        status: 'paid' as const,
        invoiceUrl: '#'
      },
      {
        id: 'inv_002',
        date: '2024-05-29',
        amount: '€9.99',
        status: 'paid' as const,
        invoiceUrl: '#'
      },
      {
        id: 'inv_003',
        date: '2024-04-29',
        amount: '€9.99',
        status: 'paid' as const,
        invoiceUrl: '#'
      }
    ]
  };

  const handleCancelSubscription = () => {
    setShowCancelSubscriptionDialog(true);
  };

  const handleConfirmCancelSubscription = () => {
    // In a real app, this would call your backend to cancel the subscription
    console.log('Canceling subscription...');
    toast({
      title: "Subscription Canceled",
      description: "Your subscription has been canceled. You'll retain access until your next billing date.",
    });
  };

  const handleManageBilling = () => {
    setShowManageBillingDialog(true);
  };

  const handleUpgradeToPremium = () => {
    // In a real app, this would redirect to your payment flow
    console.log('Upgrading to premium...');
    toast({
      title: "Redirecting to checkout...",
      description: "Please complete your payment to upgrade to Premium.",
    });
  };

  const handleUpdatePaymentMethod = () => {
    // In a real app, this would redirect to Stripe's payment method update flow
    console.log('Updating payment method...');
    toast({
      title: "Redirecting...",
      description: "Opening payment method update form.",
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log('Downloading invoice:', invoiceId);
    toast({
      title: "Download Started",
      description: "Your invoice is being downloaded.",
    });
  };

  const handleViewInvoice = (invoiceId: string) => {
    console.log('Viewing invoice:', invoiceId);
    toast({
      title: "Opening Invoice",
      description: "Invoice will open in a new tab.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account and track your progress</p>
        </div>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] rounded-full">
          <TabsTrigger value="profile" className="rounded-full">Profile</TabsTrigger>
          <TabsTrigger value="matches" className="rounded-full">Matches</TabsTrigger>
          <TabsTrigger value="tournaments" className="rounded-full">Tournaments</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-full">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={mockUserProfile.avatar} alt={mockUserProfile.name} />
                    <AvatarFallback className="text-2xl">{mockUserProfile.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-2xl">{mockUserProfile.name}</CardTitle>
                          {user?.isPremium && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Crown className="h-3 w-3" />
                              Premium
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{mockUserProfile.email}</CardDescription>
                        <p className="text-sm text-muted-foreground mt-2">{mockUserProfile.bio}</p>
                      </div>
                      <Button variant="outline">Edit Profile</Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ProfileStats 
                  elo={mockUserProfile.elo}
                  rank={mockUserProfile.rank}
                  totalMatches={mockUserProfile.totalMatches}
                  winRate={mockUserProfile.winRate}
                />
              </CardContent>
            </Card>

            <PremiumStatusCard 
              subscriptionData={mockSubscriptionData}
              onCancelSubscription={handleCancelSubscription}
              onUpgradeToPremium={handleUpgradeToPremium}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="matches">
          <RecentMatches matches={mockRecentMatches} />
        </TabsContent>
        
        <TabsContent value="tournaments">
          <TournamentHistory tournaments={mockTournaments} />
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Notifications</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Match invitations</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Tournament announcements</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Weekly summaries</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Privacy</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Show profile to other players</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Allow match invitations</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
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
      
      <CancelSubscriptionDialog
        open={showCancelSubscriptionDialog}
        onOpenChange={setShowCancelSubscriptionDialog}
        onConfirmCancel={handleConfirmCancelSubscription}
        subscriptionData={{
          plan: mockSubscriptionData.plan,
          nextBillingDate: mockSubscriptionData.nextBillingDate,
          price: mockSubscriptionData.price
        }}
      />
      
      <ManageBillingDialog
        open={showManageBillingDialog}
        onOpenChange={setShowManageBillingDialog}
        billingInfo={mockBillingInfo}
        onUpdatePaymentMethod={handleUpdatePaymentMethod}
        onDownloadInvoice={handleDownloadInvoice}
        onViewInvoice={handleViewInvoice}
      />
    </div>
  );
};

export default ProfilePage;
