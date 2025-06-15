
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Calendar, Trophy, Users, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import DeleteAccountDialog from '@/components/profile/DeleteAccountDialog';
import { Link } from 'react-router-dom';

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
  const { user } = useAuth();
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);

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
                        <CardTitle className="text-2xl">{mockUserProfile.name}</CardTitle>
                        <CardDescription>{mockUserProfile.email}</CardDescription>
                        <p className="text-sm text-muted-foreground mt-2">{mockUserProfile.bio}</p>
                      </div>
                      <Button variant="outline">Edit Profile</Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Target className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl font-bold">{mockUserProfile.elo}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">ELO Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Trophy className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl font-bold">#{mockUserProfile.rank}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Rank</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl font-bold">{mockUserProfile.totalMatches}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Total Matches</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl font-bold">{mockUserProfile.winRate}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Win Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="matches">
          <div className="grid gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Recent Matches</h3>
                <p className="text-sm text-muted-foreground">Your latest table tennis matches</p>
              </div>
              <Link to="/matches/create">
                <Button>Create Match</Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {mockRecentMatches.map((match) => (
                <Card key={match.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <Badge variant={match.result === "Won" ? "secondary" : "outline"}>
                            {match.type}
                          </Badge>
                          <div>
                            <p className="font-medium">vs {match.opponent}</p>
                            <p className="text-sm text-muted-foreground">{new Date(match.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Score: {match.score}</p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={match.result === "Won" ? "secondary" : "destructive"}
                          className="mb-2"
                        >
                          {match.result}
                        </Badge>
                        <p className={`text-sm font-medium ${
                          match.eloChange > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {match.eloChange > 0 ? '+' : ''}{match.eloChange} ELO
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button variant="outline">View All Matches</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tournaments">
          <div className="grid gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Tournament History</h3>
                <p className="text-sm text-muted-foreground">Your tournament participation and results</p>
              </div>
              <Link to="/tournaments">
                <Button>Browse Tournaments</Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {mockTournaments.map((tournament) => (
                <Card key={tournament.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <Trophy className="h-8 w-8 text-yellow-500" />
                          <div>
                            <p className="font-medium">{tournament.name}</p>
                            <p className="text-sm text-muted-foreground">{new Date(tournament.date).toLocaleDateString()}</p>
                            <p className="text-sm text-muted-foreground">{tournament.participants} participants</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-2">
                          {tournament.placement}
                        </Badge>
                        <p className="text-sm font-medium text-green-600">
                          {tournament.prize}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button variant="outline">View All Tournaments</Button>
            </div>
          </div>
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
    </div>
  );
};

export default ProfilePage;
