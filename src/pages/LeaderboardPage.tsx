
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, TrendingUp, TrendingDown, Minus, Trophy, Medal, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for leaderboard
const mockPlayers = [
  { id: 1, name: "Max Schmidt", elo: 1850, wins: 42, losses: 12, trend: "up", rankChange: 2 },
  { id: 2, name: "Julia Becker", elo: 1820, wins: 38, losses: 15, trend: "up", rankChange: 1 },
  { id: 3, name: "Thomas Müller", elo: 1795, wins: 36, losses: 18, trend: "down", rankChange: 1 },
  { id: 4, name: "Anna Weber", elo: 1780, wins: 32, losses: 16, trend: "same", rankChange: 0 },
  { id: 5, name: "Michael Fischer", elo: 1760, wins: 30, losses: 20, trend: "up", rankChange: 3 },
  { id: 6, name: "Sophie Wagner", elo: 1740, wins: 28, losses: 18, trend: "down", rankChange: 2 },
  { id: 7, name: "David Schneider", elo: 1730, wins: 26, losses: 19, trend: "up", rankChange: 1 },
  { id: 8, name: "Laura Meyer", elo: 1710, wins: 24, losses: 21, trend: "same", rankChange: 0 },
  { id: 9, name: "Christian Schulz", elo: 1690, wins: 22, losses: 20, trend: "down", rankChange: 3 },
  { id: 10, name: "Elena Hoffmann", elo: 1680, wins: 20, losses: 22, trend: "up", rankChange: 4 },
  { id: 11, name: "Markus Wolf", elo: 1670, wins: 19, losses: 21, trend: "down", rankChange: 1 },
  { id: 12, name: "Nina Koch", elo: 1660, wins: 18, losses: 23, trend: "same", rankChange: 0 },
  { id: 13, name: "Felix Bauer", elo: 1650, wins: 17, losses: 22, trend: "up", rankChange: 2 },
  { id: 14, name: "Lisa Richter", elo: 1640, wins: 16, losses: 24, trend: "down", rankChange: 2 },
  { id: 15, name: "Jonas Krause", elo: 1630, wins: 15, losses: 25, trend: "up", rankChange: 1 },
];

// Mock data for teams
const mockTeams = [
  { id: 1, name: "Kicker Titans", elo: 1920, wins: 32, losses: 8, trend: "up", rankChange: 0 },
  { id: 2, name: "Munich Masters", elo: 1890, wins: 30, losses: 10, trend: "same", rankChange: 0 },
  { id: 3, name: "Table Wizards", elo: 1860, wins: 28, losses: 12, trend: "up", rankChange: 2 },
  { id: 4, name: "Foosball Fury", elo: 1830, wins: 26, losses: 14, trend: "down", rankChange: 1 },
  { id: 5, name: "Rod Rotators", elo: 1810, wins: 24, losses: 16, trend: "up", rankChange: 3 },
  { id: 6, name: "Spin Doctors", elo: 1790, wins: 22, losses: 18, trend: "down", rankChange: 2 },
  { id: 7, name: "Table Turners", elo: 1770, wins: 21, losses: 19, trend: "same", rankChange: 0 },
  { id: 8, name: "Ball Busters", elo: 1750, wins: 20, losses: 20, trend: "up", rankChange: 1 },
  { id: 9, name: "Rodmeisters", elo: 1730, wins: 19, losses: 21, trend: "down", rankChange: 3 },
  { id: 10, name: "Goal Getters", elo: 1710, wins: 18, losses: 22, trend: "up", rankChange: 2 }
];

const LeaderboardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('all-time');
  const [category, setCategory] = useState('players');
  
  // Filter players based on search term
  const filteredPlayers = mockPlayers.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter teams based on search term
  const filteredTeams = mockTeams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render the rank trend icon
  const renderTrend = (trend: string, change: number) => {
    if (trend === 'up') {
      return (
        <div className="flex items-center text-green-600 dark:text-green-400">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>{change}</span>
        </div>
      );
    } else if (trend === 'down') {
      return (
        <div className="flex items-center text-red-600 dark:text-red-400">
          <TrendingDown className="h-4 w-4 mr-1" />
          <span>{change}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-muted-foreground">
          <Minus className="h-4 w-4 mr-1" />
          <span>0</span>
        </div>
      );
    }
  };
  
  // Render medal for top 3
  const renderRankIcon = (rank: number) => {
    if (rank === 1) {
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    } else if (rank === 2) {
      return <Medal className="h-5 w-5 text-gray-400" />;
    } else if (rank === 3) {
      return <Medal className="h-5 w-5 text-amber-700" />;
    } else {
      return <span className="text-muted-foreground font-medium">{rank}</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Munich Leaderboard</h1>
      <p className="text-muted-foreground mb-8">See the top ranked kicker players and teams in Munich</p>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters and Stats */}
        <div className="md:w-1/3 space-y-6">
          <Card className="ios-card">
            <CardHeader>
              <CardTitle className="text-lg">Filters & Search</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search players or teams..."
                  className="pl-10 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time-range">Time Range</Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger id="time-range" className="rounded-full">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-time">All Time</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card className="ios-card">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm text-muted-foreground mb-2">Top Player ELO</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{mockPlayers[0].name}</p>
                        <p className="text-sm text-muted-foreground">Highest ranked player</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{mockPlayers[0].elo}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm text-muted-foreground mb-2">Top Team ELO</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{mockTeams[0].name}</p>
                        <p className="text-sm text-muted-foreground">Highest ranked team</p>
                      </div>
                    </div>
                    <div className="text-2xl font-bold">{mockTeams[0].elo}</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border flex justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Players</p>
                    <p className="text-xl font-bold">{mockPlayers.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Teams</p>
                    <p className="text-xl font-bold">{mockTeams.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Leaderboard */}
        <div className="md:w-2/3">
          <Tabs value={category} onValueChange={setCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full mb-6">
              <TabsTrigger value="players" className="rounded-full">Players</TabsTrigger>
              <TabsTrigger value="teams" className="rounded-full">Teams</TabsTrigger>
            </TabsList>
            
            <TabsContent value="players">
              <Card className="ios-card overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5">Player</div>
                    <div className="col-span-2 text-right">ELO</div>
                    <div className="col-span-2 text-right">W/L</div>
                    <div className="col-span-2 text-right">Trend</div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  {filteredPlayers.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No players found matching your search</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {filteredPlayers.map((player, index) => (
                        <div key={player.id} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-muted/50 transition-colors">
                          <div className="col-span-1 flex justify-center">
                            {renderRankIcon(index + 1)}
                          </div>
                          <div className="col-span-5 flex items-center">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                              <User className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <Link to={`/profile/${player.id}`} className="font-medium hover:text-primary">
                                {player.name}
                              </Link>
                              <p className="text-xs text-muted-foreground">
                                {player.wins + player.losses} matches played
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2 text-right font-semibold">
                            {player.elo}
                          </div>
                          <div className="col-span-2 text-right">
                            <span className="text-green-600 dark:text-green-400">{player.wins}</span>
                            <span className="text-muted-foreground mx-1">/</span>
                            <span className="text-red-600 dark:text-red-400">{player.losses}</span>
                          </div>
                          <div className="col-span-2 text-right">
                            {renderTrend(player.trend, player.rankChange)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="teams">
              <Card className="ios-card overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5">Team</div>
                    <div className="col-span-2 text-right">ELO</div>
                    <div className="col-span-2 text-right">W/L</div>
                    <div className="col-span-2 text-right">Trend</div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  {filteredTeams.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No teams found matching your search</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {filteredTeams.map((team, index) => (
                        <div key={team.id} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-muted/50 transition-colors">
                          <div className="col-span-1 flex justify-center">
                            {renderRankIcon(index + 1)}
                          </div>
                          <div className="col-span-5 flex items-center">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                              <Users className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{team.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {team.wins + team.losses} matches played
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2 text-right font-semibold">
                            {team.elo}
                          </div>
                          <div className="col-span-2 text-right">
                            <span className="text-green-600 dark:text-green-400">{team.wins}</span>
                            <span className="text-muted-foreground mx-1">/</span>
                            <span className="text-red-600 dark:text-red-400">{team.losses}</span>
                          </div>
                          <div className="col-span-2 text-right">
                            {renderTrend(team.trend, team.rankChange)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;

function Users(props: any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function MapPin(props: any) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
