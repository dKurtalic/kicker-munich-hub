
import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trophy, ArrowDown, ArrowUp, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockMatches = [
  { id: 1, opponent: 'Alex & Max', result: 'Won', score: '5-3', eloChange: '+15', date: '2023-05-10' },
  { id: 2, opponent: 'Julia & Thomas', result: 'Lost', score: '2-5', eloChange: '-8', date: '2023-05-08' },
  { id: 3, opponent: 'Sarah & David', result: 'Won', score: '5-4', eloChange: '+12', date: '2023-05-05' },
  { id: 4, opponent: 'Elena & Marco', result: 'Won', score: '5-1', eloChange: '+18', date: '2023-05-03' },
  { id: 5, opponent: 'Christian & Laura', result: 'Lost', score: '3-5', eloChange: '-10', date: '2023-05-01' },
];

const mockTournaments = [
  { id: 1, name: 'Munich Spring Cup', placement: '2nd Place', date: '2023-04-15' },
  { id: 2, name: 'Bavarian Kicker Masters', placement: 'Quarter-finals', date: '2023-03-20' },
];

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { toast } = useToast();
  const [showCreateMatch, setShowCreateMatch] = useState(false);
  
  // If not authenticated and not loading, redirect to login
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Return loading state while checking authentication
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-medium">Loading profile...</h2>
        </div>
      </div>
    );
  }
  
  const handleCreateMatch = () => {
    if (!user?.isPremium) {
      toast({
        title: "Premium Feature",
        description: "Creating matches requires a premium subscription.",
        action: <Button asChild size="sm" variant="outline" className="rounded-full"><Link to="/subscription">Subscribe</Link></Button>
      });
      return;
    }
    
    setShowCreateMatch(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        {/* User Profile Card */}
        <div className="md:w-1/3">
          <Card className="ios-card">
            <CardHeader className="text-center">
              <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-2">
                <User size={40} className="text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center">
                <span className="text-sm text-muted-foreground">ELO Rating</span>
                <span className="text-3xl font-bold">{user?.elo}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">Matches</span>
                  <p className="font-semibold text-xl">24</p>
                </div>
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">Win Rate</span>
                  <p className="font-semibold text-xl">68%</p>
                </div>
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">Tournaments</span>
                  <p className="font-semibold text-xl">5</p>
                </div>
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">Best Rank</span>
                  <p className="font-semibold text-xl">12th</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Membership</span>
                <div className={`mt-2 p-2 rounded-lg ${user?.isPremium ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-muted text-muted-foreground'}`}>
                  <p className="font-medium">{user?.isPremium ? 'Premium Member' : 'Free Member'}</p>
                  {!user?.isPremium && (
                    <Button asChild variant="link" size="sm" className="p-0 h-auto mt-1">
                      <Link to="/subscription">Upgrade to Premium</Link>
                    </Button>
                  )}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full rounded-full" 
                onClick={() => logout()}
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for Match History and Tournaments */}
        <div className="md:w-2/3">
          <Tabs defaultValue="matches" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full mb-6">
              <TabsTrigger value="matches" className="rounded-full">Match History</TabsTrigger>
              <TabsTrigger value="tournaments" className="rounded-full">Tournaments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="matches">
              <Card className="ios-card">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Your Matches</CardTitle>
                    <Button onClick={handleCreateMatch} size="sm" className="rounded-full">
                      <Plus className="mr-2 h-4 w-4" /> New Match
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockMatches.map((match) => (
                      <div 
                        key={match.id} 
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            match.result === 'Won' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                          }`}>
                            {match.result === 'Won' ? (
                              <ArrowUp className="h-5 w-5" />
                            ) : (
                              <ArrowDown className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">vs. {match.opponent}</div>
                            <div className="text-sm text-muted-foreground">{match.date}</div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold">{match.score}</div>
                          <div className={`text-sm ${
                            match.eloChange.startsWith('+') 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {match.eloChange}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4 rounded-full">
                    View All Matches
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tournaments">
              <Card className="ios-card">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Your Tournaments</CardTitle>
                    <Button asChild size="sm" className="rounded-full">
                      <Link to="/tournaments">
                        <Plus className="mr-2 h-4 w-4" /> Join Tournament
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTournaments.map((tournament) => (
                      <div 
                        key={tournament.id} 
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Trophy className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{tournament.name}</div>
                            <div className="text-sm text-muted-foreground">{tournament.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{tournament.placement}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button asChild variant="outline" className="w-full mt-4 rounded-full">
                    <Link to="/tournaments">View All Tournaments</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
