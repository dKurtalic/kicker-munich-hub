import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Trophy, Users, Clock, Search, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import {DeleteTournamentDialog} from '@/components/tournament/DeleteTorunamentDialog'


// Mock tournament data
const mockTournaments = [
  {
    id: 1,
    name: "Munich Spring Championship",
    date: "2023-06-15",
    time: "18:00",
    location: "Spielbar, Sonnenstraße 12",
    participants: 16,
    maxParticipants: 16,
    format: "Single Elimination",
    entryFee: "€5",
    status: "upcoming"
  },
  {
    id: 2,
    name: "Weekly Kicker Tournament",
    date: "2023-06-10",
    time: "19:30",
    location: "TU München Main Campus",
    participants: 8,
    maxParticipants: 12,
    format: "Round Robin",
    entryFee: "Free",
    status: "upcoming"
  },
  {
    id: 3,
    name: "Bavarian Kicker Cup",
    date: "2023-07-05",
    time: "14:00",
    location: "Augustiner Keller",
    participants: 24,
    maxParticipants: 32,
    format: "Double Elimination",
    entryFee: "€10",
    status: "upcoming"
  },
  {
    id: 4,
    name: "TU München Showdown",
    date: "2023-05-20",
    time: "16:00",
    location: "TU München Main Campus",
    participants: 16,
    maxParticipants: 16,
    format: "Single Elimination",
    entryFee: "Free",
    status: "completed"
  },
  {
    id: 5,
    name: "Munich Winter Cup",
    date: "2023-01-15",
    time: "17:00",
    location: "Munich Indoor Sports Center",
    participants: 12,
    maxParticipants: 12,
    format: "Round Robin",
    entryFee: "€8",
    status: "completed"
  }
];

const TournamentsPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const [tournaments, setTournaments] = useState(mockTournaments);
  const navigate = useNavigate();
  
  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = tournament.status === activeTab;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'participants') {
      return b.participants - a.participants;
    }
    return 0;
  });
  
  const handleCreateTournament = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a tournament.",
        action: <Button asChild size="sm" variant="outline" className="rounded-full"><Link to="/login">Log In</Link></Button>
      });
      return;
    }
    
    if (!user?.isPremium) {
      toast({
        title: "Premium Feature",
        description: "Creating tournaments requires a premium subscription.",
        action: <Button asChild size="sm" variant="outline" className="rounded-full"><Link to="/subscription">Subscribe</Link></Button>
      });
      return;
    }
    
    // Here you would open the tournament creation form or redirect to a creation page
    navigate("/tournaments/create");
  };
  
  const handleJoinTournament = (tournamentId: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to join a tournament.",
        action: <Button asChild size="sm" variant="outline" className="rounded-full"><Link to="/login">Log In</Link></Button>
      });
      return;
    }
    
    toast({
      title: "Tournament joined!",
      description: "You have successfully joined the tournament.",
    });
  };
  const handleDeleteTournament = (tournamentId: number) => {
    setTournaments(tournaments.filter(t => t.id !== tournamentId));
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tournaments</h1>
          <p className="text-muted-foreground">Join or create kicker tournaments in Munich</p>
        </div>
        <Button onClick={handleCreateTournament} className="rounded-full">
          <Trophy className="mr-2 h-4 w-4" /> Create Tournament
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Filters and Search */}
        <div className="lg:col-span-1">
          <Card className="ios-card">
            <CardHeader>
              <CardTitle className="text-lg">Search & Filter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tournaments..."
                  className="pl-10 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sort-by">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort-by" className="rounded-full">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="participants">Popularity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h3 className="text-sm font-semibold mb-3">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold">{tournaments.filter(t => t.status === 'upcoming').length}</p>
                    <p className="text-xs text-muted-foreground">Upcoming</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold">{tournaments.filter(t => t.status === 'completed').length}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tournament Listings */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full mb-6">
              <TabsTrigger value="upcoming" className="rounded-full">Upcoming</TabsTrigger>
              <TabsTrigger value="completed" className="rounded-full">Completed</TabsTrigger>
            </TabsList>
            
            {/* Upcoming Tournaments */}
            <TabsContent value="upcoming" className="space-y-6">
              {filteredTournaments.length === 0 ? (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">No tournaments found</h3>
                  <p className="text-muted-foreground mt-2">
                    {searchTerm ? 'Try adjusting your search criteria.' : 'There are no upcoming tournaments at the moment.'}
                  </p>
                </div>
              ) : (
                filteredTournaments.map(tournament => (
                  <Card key={tournament.id} className="ios-card overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-3/4 p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link to={`/tournaments/${tournament.id}`} className="text-xl font-bold hover:text-primary transition-colors">
                              {tournament.name}
                            </Link>
                            <div className="flex flex-wrap gap-4 mt-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{new Date(tournament.date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}, {tournament.time}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>{tournament.location}</span>
                              </div>
                            </div>
                          </div>
                          {user?.isPremium && (
                            <DeleteTournamentDialog 
                              tournamentId={tournament.id}
                              tournamentName={tournament.name}
                              onDelete={handleDeleteTournament}
                            />
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div>
                            <p className="text-sm text-muted-foreground">Format</p>
                            <p className="font-medium">{tournament.format}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Entry Fee</p>
                            <p className="font-medium">{tournament.entryFee}</p>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-muted-foreground mr-2" />
                            <div>
                              <p className="font-medium">{tournament.participants}/{tournament.maxParticipants}</p>
                              <p className="text-xs text-muted-foreground">Participants</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                            <div>
                              <p className="font-medium">
                                {Math.ceil((new Date(tournament.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                              </p>
                              <p className="text-xs text-muted-foreground">Until start</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-1/4 bg-muted/30 flex flex-col items-center justify-center p-6 border-t md:border-t-0 md:border-l border-border">
                        <div className="text-center mb-4">
                          {tournament.participants >= tournament.maxParticipants ? (
                            <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-medium">
                              Full
                            </div>
                          ) : (
                            <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                              {tournament.maxParticipants - tournament.participants} spots left
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-3 w-full">
                          <Button 
                            onClick={() => handleJoinTournament(tournament.id)} 
                            disabled={tournament.participants >= tournament.maxParticipants}
                            className="w-full rounded-full"
                          >
                            Join
                          </Button>
                          
                          <Button asChild variant="outline" className="w-full rounded-full">
                            <Link to={`/tournaments/${tournament.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>
            
            {/* Completed Tournaments */}
            <TabsContent value="completed" className="space-y-6">
              {filteredTournaments.length === 0 ? (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">No tournaments found</h3>
                  <p className="text-muted-foreground mt-2">
                    {searchTerm ? 'Try adjusting your search criteria.' : 'There are no completed tournaments available.'}
                  </p>
                </div>
              ) : (
                filteredTournaments.map(tournament => (
                  <Card key={tournament.id} className="ios-card overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-3/4 p-6">
                        <div>
                          <Link to={`/tournaments/${tournament.id}`} className="text-xl font-bold hover:text-primary transition-colors">
                            {tournament.name}
                          </Link>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>{new Date(tournament.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{tournament.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div>
                            <p className="text-sm text-muted-foreground">Format</p>
                            <p className="font-medium">{tournament.format}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Entry Fee</p>
                            <p className="font-medium">{tournament.entryFee}</p>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-muted-foreground mr-2" />
                            <div>
                              <p className="font-medium">{tournament.participants}/{tournament.maxParticipants}</p>
                              <p className="text-xs text-muted-foreground">Participants</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Winner</p>
                            <p className="font-medium">Team Alpha</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-1/4 bg-muted/30 flex flex-col items-center justify-center p-6 border-t md:border-t-0 md:border-l border-border">
                        <div className="text-center mb-4">
                          <div className="bg-muted px-3 py-1 rounded-full text-xs font-medium">
                            Completed
                          </div>
                        </div>
                        
                        <Button asChild variant="outline" className="w-full rounded-full">
                          <Link to={`/tournaments/${tournament.id}`}>
                            View Results
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TournamentsPage;
