
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Trophy, Users, Clock, Search, MapPin, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock matches data
const mockMatches = [
  {
    id: 1,
    type: "Friendly Match",
    date: "2023-05-10",
    time: "19:30",
    location: "TU München Main Campus",
    status: "completed",
    resultStatus: "pending_confirmation",
    isDoubles: true,
    team1: {
      players: [
        { id: "1", name: "Max Schmidt", avatar: "/placeholder.svg", elo: 1850 },
        { id: "2", name: "Sarah Wagner", avatar: "/placeholder.svg", elo: 1820 },
      ],
      score: 5
    },
    team2: {
      players: [
        { id: "3", name: "Tom Schmidt", avatar: "/placeholder.svg", elo: 1795 },
        { id: "4", name: "Maria Fischer", avatar: "/placeholder.svg", elo: 1780 },
      ],
      score: 3
    },
    submittedBy: "Max Schmidt",
  },
  {
    id: 2,
    type: "Tournament Match",
    date: "2023-05-15",
    time: "18:00",
    location: "Spielbar München",
    status: "scheduled",
    resultStatus: null,
    isDoubles: false,
    team1: {
      players: [
        { id: "1", name: "Alex Johnson", avatar: "/placeholder.svg", elo: 1750 },
      ],
      score: null
    },
    team2: {
      players: [
        { id: "5", name: "Lisa Chen", avatar: "/placeholder.svg", elo: 1720 },
      ],
      score: null
    },
  },
  {
    id: 3,
    type: "Friendly Match",
    date: "2023-05-08",
    time: "20:00",
    location: "Campus Pub",
    status: "completed",
    resultStatus: "confirmed",
    isDoubles: true,
    team1: {
      players: [
        { id: "6", name: "Mike Wilson", avatar: "/placeholder.svg", elo: 1680 },
        { id: "7", name: "Emma Davis", avatar: "/placeholder.svg", elo: 1650 },
      ],
      score: 2
    },
    team2: {
      players: [
        { id: "8", name: "Chris Brown", avatar: "/placeholder.svg", elo: 1700 },
        { id: "9", name: "Anna Smith", avatar: "/placeholder.svg", elo: 1670 },
      ],
      score: 5
    },
  }
];

const MatchesPage = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  
  const filteredMatches = mockMatches.filter(match => {
    const matchesSearch = match.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'scheduled') return matchesSearch && match.status === 'scheduled';
    if (activeTab === 'completed') return matchesSearch && match.status === 'completed';
    
    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'type') {
      return a.type.localeCompare(b.type);
    }
    return 0;
  });

  const getStatusBadge = (match: typeof mockMatches[0]) => {
    if (match.status === 'scheduled') {
      return <Badge variant="default">Scheduled</Badge>;
    } else if (match.status === 'completed') {
      if (match.resultStatus === 'confirmed') {
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Completed</Badge>;
      } else if (match.resultStatus === 'pending_confirmation') {
        return <Badge variant="secondary">Pending Confirmation</Badge>;
      } else {
        return <Badge variant="outline">Needs Result</Badge>;
      }
    }
    return <Badge variant="outline">{match.status}</Badge>;
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Matches</h1>
          <p className="text-muted-foreground">View and manage your foosball matches</p>
        </div>
        <Button asChild className="rounded-full">
          <Link to="/matches/create">
            <Plus className="mr-2 h-4 w-4" /> Create Match
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                  placeholder="Search matches..."
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
                    <SelectItem value="type">Type</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h3 className="text-sm font-semibold mb-3">Quick Stats</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold">{mockMatches.filter(m => m.status === 'scheduled').length}</p>
                    <p className="text-xs text-muted-foreground">Scheduled</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold">{mockMatches.filter(m => m.status === 'completed').length}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold">{mockMatches.filter(m => m.resultStatus === 'pending_confirmation').length}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Match Listings */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-full mb-6">
              <TabsTrigger value="all" className="rounded-full">All Matches</TabsTrigger>
              <TabsTrigger value="scheduled" className="rounded-full">Scheduled</TabsTrigger>
              <TabsTrigger value="completed" className="rounded-full">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-6">
              {filteredMatches.length === 0 ? (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">No matches found</h3>
                  <p className="text-muted-foreground mt-2">
                    {searchTerm ? 'Try adjusting your search criteria.' : 'Create your first match to get started!'}
                  </p>
                  {!searchTerm && (
                    <Button asChild className="mt-4 rounded-full">
                      <Link to="/matches/create">Create Match</Link>
                    </Button>
                  )}
                </div>
              ) : (
                filteredMatches.map(match => (
                  <Card key={match.id} className="ios-card overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-3/4 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <Link to={`/matches/${match.id}`} className="text-xl font-bold hover:text-primary transition-colors">
                              {match.type} #{match.id}
                            </Link>
                            <div className="flex flex-wrap gap-4 mt-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{new Date(match.date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}, {match.time}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>{match.location}</span>
                              </div>
                            </div>
                          </div>
                          {getStatusBadge(match)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Team 1 */}
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm text-muted-foreground">Team 1</h4>
                            <div className="space-y-1">
                              {match.team1.players.map(player => (
                                <div key={player.id} className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={player.avatar} alt={player.name} />
                                    <AvatarFallback className="text-xs">{player.name.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{player.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Score */}
                          <div className="text-center">
                            <h4 className="font-medium text-sm text-muted-foreground mb-2">Score</h4>
                            {match.team1.score !== null && match.team2.score !== null ? (
                              <div className="text-2xl font-bold">
                                {match.team1.score} : {match.team2.score}
                              </div>
                            ) : (
                              <div className="text-muted-foreground text-sm">
                                Not played yet
                              </div>
                            )}
                          </div>
                          
                          {/* Team 2 */}
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm text-muted-foreground">Team 2</h4>
                            <div className="space-y-1">
                              {match.team2.players.map(player => (
                                <div key={player.id} className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={player.avatar} alt={player.name} />
                                    <AvatarFallback className="text-xs">{player.name.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{player.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-1/4 bg-muted/30 flex flex-col items-center justify-center p-6 border-t md:border-t-0 md:border-l border-border">
                        <div className="space-y-3 w-full">
                          <Button asChild variant="outline" className="w-full rounded-full">
                            <Link to={`/matches/${match.id}`}>
                              View Details
                            </Link>
                          </Button>
                          
                          {match.status === 'completed' && !match.resultStatus && isAuthenticated && (
                            <Button asChild className="w-full rounded-full">
                              <Link to={`/matches/${match.id}`}>
                                Record Result
                              </Link>
                            </Button>
                          )}
                        </div>
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

export default MatchesPage;
