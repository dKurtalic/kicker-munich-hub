
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Trophy, Users, Clock, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock tournament data
const mockTournament = {
  id: 1,
  name: "Munich Spring Championship",
  date: "2023-06-15",
  time: "18:00",
  location: "Spielbar, Sonnenstraße 12",
  participants: [
    { id: 1, name: "Max Schmidt", elo: 1850 },
    { id: 2, name: "Julia Becker", elo: 1820 },
    { id: 3, name: "Thomas Müller", elo: 1795 },
    { id: 4, name: "Anna Weber", elo: 1780 },
    { id: 5, name: "Michael Fischer", elo: 1760 },
    { id: 6, name: "Sophie Wagner", elo: 1740 },
    { id: 7, name: "David Schneider", elo: 1730 },
    { id: 8, name: "Laura Meyer", elo: 1710 },
    { id: 9, name: "Christian Schulz", elo: 1690 },
    { id: 10, name: "Elena Hoffmann", elo: 1680 },
    { id: 11, name: "Markus Wolf", elo: 1670 },
    { id: 12, name: "Nina Koch", elo: 1660 },
    { id: 13, name: "Felix Bauer", elo: 1650 },
    { id: 14, name: "Lisa Richter", elo: 1640 },
    { id: 15, name: "Jonas Krause", elo: 1630 },
    { id: 16, name: "Sarah Neumann", elo: 1620 }
  ],
  maxParticipants: 16,
  format: "Single Elimination",
  entryFee: "€5",
  status: "upcoming",
  description: "Join the Munich Spring Championship and compete against the best kicker players in the city! This single elimination tournament will feature 16 participants battling for the title and prizes.",
  prizes: ["1st Place: €100", "2nd Place: €50", "3rd Place: €25"],
  organizer: "Munich Kicker Association"
};

// Mock brackets data (simplified for this example)
const mockBrackets = [
  {
    round: "Quarter-Finals",
    matches: [
      { id: 1, team1: "Max & Julia", team2: "Thomas & Anna", score: "5-3" },
      { id: 2, team1: "Michael & Sophie", team2: "David & Laura", score: "5-4" },
      { id: 3, team1: "Christian & Elena", team2: "Markus & Nina", score: "5-2" },
      { id: 4, team1: "Felix & Lisa", team2: "Jonas & Sarah", score: "5-1" }
    ]
  },
  {
    round: "Semi-Finals",
    matches: [
      { id: 5, team1: "Max & Julia", team2: "Michael & Sophie", score: "-" },
      { id: 6, team1: "Christian & Elena", team2: "Felix & Lisa", score: "-" }
    ]
  },
  {
    round: "Final",
    matches: [
      { id: 7, team1: "TBD", team2: "TBD", score: "-" }
    ]
  }
];

const TournamentDetailsPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [isJoined, setIsJoined] = useState(false);
  
  // In a real app, you would fetch the tournament data based on the ID
  // Here we're using the mock data for demonstration
  
  const handleJoinTournament = () => {
    setIsJoined(true);
  };
  
  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <Link to="/tournaments" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        <span>Back to Tournaments</span>
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tournament Info */}
        <div className="lg:w-2/3">
          <Card className="ios-card">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl">{mockTournament.name}</CardTitle>
                  <p className="text-muted-foreground">Tournament #{mockTournament.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  {isAuthenticated ? (
                    <Button 
                      onClick={handleJoinTournament} 
                      disabled={isJoined || mockTournament.participants.length >= mockTournament.maxParticipants}
                      className="rounded-full"
                    >
                      {isJoined ? 'Already Joined' : 'Join Tournament'}
                    </Button>
                  ) : (
                    <Button asChild className="rounded-full">
                      <Link to="/login">Sign In to Join</Link>
                    </Button>
                  )}
                  <Button variant="outline" className="rounded-full">Share</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:divide-x divide-border">
                <div className="md:w-2/3 md:pr-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">About This Tournament</h3>
                    <p className="text-muted-foreground">{mockTournament.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date & Time</p>
                        <p className="font-medium">{new Date(mockTournament.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}, {mockTournament.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{mockTournament.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Format</p>
                        <p className="font-medium">{mockTournament.format}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Participants</p>
                        <p className="font-medium">{mockTournament.participants.length}/{mockTournament.maxParticipants}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Prizes</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      {mockTournament.prizes.map((prize, index) => (
                        <li key={index} className="flex items-center">
                          <Trophy className={`h-4 w-4 mr-2 ${
                            index === 0 ? 'text-yellow-500' : 
                            index === 1 ? 'text-gray-400' : 
                            'text-amber-700'
                          }`} />
                          <span>{prize}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Organizer</h3>
                    <p className="text-muted-foreground">{mockTournament.organizer}</p>
                  </div>
                </div>
                
                <div className="md:w-1/3 md:pl-6 pt-6 md:pt-0">
                  <h3 className="font-semibold mb-4">Tournament Status</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-muted-foreground">Registration</p>
                        <p className={`text-sm font-medium px-2 py-1 rounded-full ${
                          mockTournament.participants.length >= mockTournament.maxParticipants 
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                            : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        }`}>
                          {mockTournament.participants.length >= mockTournament.maxParticipants 
                            ? 'Full'
                            : 'Open'
                          }
                        </p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2"
                          style={{ width: `${(mockTournament.participants.length / mockTournament.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {mockTournament.participants.length}/{mockTournament.maxParticipants} participants
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Entry Fee</p>
                      <p className="font-medium">{mockTournament.entryFee}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        Upcoming
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Starts in</p>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <p className="font-medium">
                          {Math.ceil((new Date(mockTournament.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Participants Sidebar */}
        <div className="lg:w-1/3">
          <Card className="ios-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Participants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[400px] overflow-y-auto pr-2">
                {mockTournament.participants.map((participant, index) => (
                  <div 
                    key={participant.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                        <span className="text-muted-foreground font-medium text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">ELO: {participant.elo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Tournament Brackets */}
      <div className="mt-8">
        <Tabs defaultValue="brackets" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-full mb-6">
            <TabsTrigger value="brackets" className="rounded-full">Brackets</TabsTrigger>
            <TabsTrigger value="matches" className="rounded-full">Matches</TabsTrigger>
          </TabsList>
          
          <TabsContent value="brackets">
            <Card className="ios-card">
              <CardHeader>
                <CardTitle className="text-lg">Tournament Brackets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="min-w-[800px] flex justify-between space-x-6">
                    {mockBrackets.map((round, roundIndex) => (
                      <div key={roundIndex} className="flex-1">
                        <h3 className="text-center font-semibold mb-4 px-2 py-1 bg-muted/50 rounded-lg">
                          {round.round}
                        </h3>
                        <div className="space-y-6">
                          {round.matches.map((match, matchIndex) => (
                            <div 
                              key={match.id} 
                              className="bg-background border border-border rounded-lg p-4 relative"
                            >
                              <div className="mb-3 pb-3 border-b border-border">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{match.team1}</span>
                                  <span className={`font-bold ${
                                    match.score !== '-' && match.score.split('-')[0] > match.score.split('-')[1]
                                      ? 'text-green-600 dark:text-green-400'
                                      : ''
                                  }`}>
                                    {match.score !== '-' ? match.score.split('-')[0] : ''}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{match.team2}</span>
                                  <span className={`font-bold ${
                                    match.score !== '-' && match.score.split('-')[1] > match.score.split('-')[0]
                                      ? 'text-green-600 dark:text-green-400'
                                      : ''
                                  }`}>
                                    {match.score !== '-' ? match.score.split('-')[1] : ''}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Match connector lines would go here in a real implementation */}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 text-center text-muted-foreground">
                  <p>This is a simplified visualization of the tournament brackets.</p>
                  <p>In a complete implementation, this would include proper bracket visualizations with connecting lines.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="matches">
            <Card className="ios-card">
              <CardHeader>
                <CardTitle className="text-lg">Match Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Group matches by round */}
                  {mockBrackets.map((round, roundIndex) => (
                    <div key={roundIndex}>
                      <h3 className="font-semibold mb-3">{round.round}</h3>
                      <div className="space-y-3">
                        {round.matches.map((match, matchIndex) => (
                          <div 
                            key={match.id}
                            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                          >
                            <div>
                              <p className="font-medium">
                                {match.team1} vs {match.team2}
                              </p>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>
                                  {new Date(mockTournament.date).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric'
                                  })}
                                  , {
                                    new Date(`2023-01-01T${mockTournament.time}`).toLocaleTimeString('en-US', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })
                                  }
                                </span>
                              </div>
                            </div>
                            
                            {match.score !== '-' ? (
                              <div className="text-lg font-bold">
                                {match.score}
                              </div>
                            ) : (
                              <div className="text-sm text-muted-foreground">
                                Not played yet
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TournamentDetailsPage;
