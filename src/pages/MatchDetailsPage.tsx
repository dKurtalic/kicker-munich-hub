
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, MapPin, Trophy, User, ChevronUp, ChevronDown } from 'lucide-react';

// Mock match data
const mockMatch = {
  id: 1,
  date: "2023-05-10",
  time: "19:30",
  location: "TU München Main Campus",
  team1: {
    players: [
      { id: 1, name: "Max Schmidt", elo: 1850, eloChange: 15 },
      { id: 2, name: "Julia Becker", elo: 1820, eloChange: 15 }
    ],
    score: 5
  },
  team2: {
    players: [
      { id: 3, name: "Thomas Müller", elo: 1795, eloChange: -8 },
      { id: 4, name: "Anna Weber", elo: 1780, eloChange: -8 }
    ],
    score: 3
  }
};

const MatchDetailsPage = () => {
  const { id } = useParams();
  
  // In a real app, you would fetch match data based on the ID
  // Here we're using mock data for demonstration
  
  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <Link to="/profile" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        <span>Back to Profile</span>
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Match Info */}
        <div className="lg:w-2/3">
          <Card className="ios-card">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl">Match Details</CardTitle>
                  <p className="text-muted-foreground">Match #{mockMatch.id}</p>
                </div>
                <Button variant="outline" className="rounded-full">Share Result</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{new Date(mockMatch.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{mockMatch.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{mockMatch.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-border">
                <div className="bg-muted/30 p-4 text-center">
                  <h3 className="font-semibold">Match Result</h3>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  {/* Team 1 */}
                  <div className="md:w-5/12 p-6 flex flex-col items-center justify-center">
                    <h3 className="font-semibold text-lg mb-4">Team 1</h3>
                    <div className="space-y-3 w-full">
                      {mockMatch.team1.players.map(player => (
                        <div 
                          key={player.id}
                          className="flex items-center justify-between p-3 bg-background rounded-lg"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                              <User className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <Link to={`/profile/${player.id}`} className="font-medium hover:text-primary">
                                {player.name}
                              </Link>
                              <p className="text-xs text-muted-foreground">
                                ELO: {player.elo}
                              </p>
                            </div>
                          </div>
                          <div className={`flex items-center ${
                            player.eloChange > 0 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {player.eloChange > 0 ? (
                              <>
                                <ChevronUp className="h-4 w-4" />
                                <span>{player.eloChange}</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4" />
                                <span>{Math.abs(player.eloChange)}</span>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Score */}
                  <div className="md:w-2/12 flex items-center justify-center p-6 bg-muted/20">
                    <div className="text-center">
                      <div className="text-4xl font-bold">
                        {mockMatch.team1.score} - {mockMatch.team2.score}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Final Score</p>
                    </div>
                  </div>
                  
                  {/* Team 2 */}
                  <div className="md:w-5/12 p-6 flex flex-col items-center justify-center">
                    <h3 className="font-semibold text-lg mb-4">Team 2</h3>
                    <div className="space-y-3 w-full">
                      {mockMatch.team2.players.map(player => (
                        <div 
                          key={player.id}
                          className="flex items-center justify-between p-3 bg-background rounded-lg"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                              <User className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <Link to={`/profile/${player.id}`} className="font-medium hover:text-primary">
                                {player.name}
                              </Link>
                              <p className="text-xs text-muted-foreground">
                                ELO: {player.elo}
                              </p>
                            </div>
                          </div>
                          <div className={`flex items-center ${
                            player.eloChange > 0 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {player.eloChange > 0 ? (
                              <>
                                <ChevronUp className="h-4 w-4" />
                                <span>{player.eloChange}</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4" />
                                <span>{Math.abs(player.eloChange)}</span>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/30 p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Winner</h3>
                    <p className="text-sm text-muted-foreground">
                      {mockMatch.team1.score > mockMatch.team2.score 
                        ? `${mockMatch.team1.players[0].name} & ${mockMatch.team1.players[1].name}`
                        : `${mockMatch.team2.players[0].name} & ${mockMatch.team2.players[1].name}`
                      }
                    </p>
                  </div>
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Match Stats */}
        <div className="lg:w-1/3">
          <Card className="ios-card">
            <CardHeader>
              <CardTitle className="text-lg">Match Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* ELO Impact */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">ELO Impact</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Team 1</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        +{mockMatch.team1.players[0].eloChange}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Team 2</span>
                      <span className="font-medium text-red-600 dark:text-red-400">
                        {mockMatch.team2.players[0].eloChange}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Match Type */}
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold mb-3">Match Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Type</span>
                      <span className="font-medium">Friendly Match</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="font-medium">25 minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Table Quality</span>
                      <div className="flex">
                        {Array(4).fill(0).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                        <Star className="h-4 w-4 text-yellow-500" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Related Matches */}
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold mb-3">Previous Matches</h3>
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="p-3 bg-muted/30 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Team 1 vs Team 2</span>
                          <span>5-3</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    ))}
                    
                    <Button asChild variant="outline" size="sm" className="w-full rounded-full">
                      <Link to="/profile">View All Matches</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsPage;

function Star(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
