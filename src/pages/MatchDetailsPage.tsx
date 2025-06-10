
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, MapPin, Trophy, Users, Clock, Check, Edit, Save} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import RecordResultForm from '@/components/match/RecordResultForm';
import ConfirmResultForm from '@/components/match/ConfirmResultForm';
import { useToast } from '@/hooks/use-toast';

// Mock match data - in a real application this would come from an API
const mockMatch = {
  id: 1,
  type: "Friendly Match",
  date: "2023-05-10",
  time: "19:30",
  location: "TU München Main Campus",
  locationDetails: "Near the cafeteria, Table #3",
  status: "completed", // scheduled, active, completed, cancelled
  resultStatus: "pending_confirmation", // null, pending_confirmation, confirmed, disputed
  isDoubles: true,
  team1: {
    players: [
      { id: "1", name: "Max Schmidt", avatar: "/placeholder.svg", elo: 1850 },
      { id: "2", name: "Sarah Wagner", avatar: "/placeholder.svg", elo: 1820 },
    ],
    score: 0
  },
  team2: {
    players: [
      { id: "3", name: "Tom Schmidt", avatar: "/placeholder.svg", elo: 1795 },
      { id: "4", name: "Maria Fischer", avatar: "/placeholder.svg", elo: 1780 },
    ],
    score: 1
  },
  submittedBy: "Max Schmidt",
  submittedAt: "2023-05-10T19:45:00Z",
  createdBy: "Max Schmidt",
  tournament: null,
};

const MatchDetailsPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [match, setMatch] = useState(mockMatch);
  const [activeTab, setActiveTab] = useState("details");
  const [isEditingScore, setIsEditingScore] = useState(false);
  
  const [editableScores, setEditableScores] = useState({
    team1Score: match.team1.score.toString() || "0",
    team2Score: match.team2.score.toString() || "0"
  });
  // In a real app, you would fetch the match data based on the ID
  
  const isCreator = isAuthenticated && user?.name === match.createdBy;
  const isParticipant = isAuthenticated && match.team1.players.concat(match.team2.players)
    .some(player => player.name === user?.name);
  const canEditScore = isParticipant && match.resultStatus === "pending_confirmation";

  // Changed: Allow any authenticated user to record results
  const canRecordResult = isAuthenticated && 
    match.status === "completed" && 
    !match.resultStatus;
  
  // Changed: Allow any authenticated user to confirm results, but not if they submitted it
  const canConfirmResult = isAuthenticated && 
    match.status === "completed" && 
    match.resultStatus === "pending_confirmation" && 
    match.submittedBy !== user?.name;
  
  const handleResultRecorded = () => {
    setMatch({
      ...match,
      resultStatus: "pending_confirmation"
    });
    setActiveTab("details");
  };
  
  const handleResultConfirmed = () => {
    setMatch({
      ...match,
      resultStatus: "confirmed"
    });
    setActiveTab("details");
  };

  const handleScoreEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handling scoring edit ")
    setIsEditingScore(true);
    const { name, value } = e.target;
    setEditableScores(prev => ({
    ...prev,
    [name]: value,  // update the score being edited
  }));
};
  

  const handleScoreSave = () => {
    const team1Score = parseInt(editableScores.team1Score);
    const team2Score = parseInt(editableScores.team2Score);

    if (isNaN(team1Score) || isNaN(team2Score) || team1Score < 0 || team2Score < 0) {
      toast({
        title: "Invalid Score",
        description: "Please enter valid positive numbers for both scores.",
        variant: "destructive",
      });
      return;
    }

    if (team1Score === team2Score) {
      toast({
        title: "Invalid Score", 
        description: "Matches cannot end in a tie.",
        variant: "destructive",
      });
      return;
    }

    setMatch({
      ...match,
      team1: { ...match.team1, score: team1Score },
      team2: { ...match.team2, score: team2Score }
    });
    
    setIsEditingScore(false);
    
    toast({
      title: "Score Updated",
      description: "The match score has been updated successfully.",
    });
  };

  
  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <Link to="/profile" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        <span>Back to Matches</span>
      </Link>
      
      <Card className="ios-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">Match #{match.id}</CardTitle>
              <CardDescription>{match.type}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={
                  match.status === "scheduled" ? "default" : 
                  match.status === "active" ? "default" : 
                  match.status === "completed" ? 
                    match.resultStatus === "confirmed" ? "secondary" : "outline" : 
                  "destructive"
                }
                className="rounded-full px-3"
              >
                {match.status === "completed" && match.resultStatus === "confirmed" 
                  ? "Completed" 
                  : match.status === "completed" && match.resultStatus === "pending_confirmation" 
                  ? "Waiting for Confirmation" 
                  : match.status.charAt(0).toUpperCase() + match.status.slice(1)}
              </Badge>
              {canRecordResult && (
                <Button 
                  onClick={() => setActiveTab("record_result")} 
                  className="rounded-full"
                >
                  Record Result
                </Button>
              )}
              {canConfirmResult && (
                <Button 
                  onClick={() => setActiveTab("confirm_result")} 
                  className="rounded-full"
                >
                  Confirm Result
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-full mb-6">
              <TabsTrigger value="details" className="rounded-full">Match Details</TabsTrigger>
              {canRecordResult && 
                <TabsTrigger value="record_result" className="rounded-full">Record Result</TabsTrigger>
              }
              {canConfirmResult && 
                <TabsTrigger value="confirm_result" className="rounded-full">Confirm Result</TabsTrigger>
              }
            </TabsList>
            
            <TabsContent value="details">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date & Time</p>
                        <p className="font-medium">{new Date(match.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}, {match.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{match.location}</p>
                        {match.locationDetails && (
                          <p className="text-xs text-muted-foreground">{match.locationDetails}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Match Type</p>
                        <p className="font-medium">{match.isDoubles ? "Doubles" : "Singles"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-primary mr-3" />
                      <div>
                        <p className="text-sm text-muted-foreground">Created By</p>
                        <p className="font-medium">{match.createdBy}</p>
                      </div>
                    </div>
                  </div>
                  
                  {match.resultStatus && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <h3 className="font-semibold mb-4">Match Result</h3>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-3 p-4 rounded-lg bg-muted/50">
                          <h4 className="font-medium text-center">Team 1</h4>
                          <div className="space-y-2">
                            {match.team1.players.map(player => (
                              <div key={player.id} className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={player.avatar} alt={player.name} />
                                  <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                  <p className="font-medium">{player.name}</p>
                                  <p className="text-xs text-muted-foreground">ELO: {player.elo}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center">
                          <div className="text-3xl font-bold">
                            {match.team1.score} : {match.team2.score}
                          </div>
                          
                          <div className="text-3xl font-bold flex items-center space-x-4">
                            <input
                              type="number"
                              name="team1Score"
                              value={editableScores.team1Score}
                              onChange={handleScoreEdit}
                              className="w-16 text-center text-3xl font-bold border-b-2 border-gray-400 focus:outline-none"
                              min={0}
                              style={{ color: 'black' }} 
                            />
                            <span>:</span>
                            <input
                              type="number"
                              name="team2Score"
                              value={editableScores.team2Score}
                              onChange={handleScoreEdit}
                              className="w-16 text-center text-3xl font-bold border-b-2 border-gray-400 focus:outline-none"
                              min={0}
                              style={{ color: 'black' }} 
                            />
                          </div>
                          <Button className='rounded-full' onClick={handleScoreSave}> Submit result </Button>
                          <div className="mt-2 text-sm text-muted-foreground">
                            <Badge variant={
                              match.resultStatus === "confirmed" ? "secondary" :
                              match.resultStatus === "disputed" ? "destructive" :
                              "outline"
                            }>
                              {match.resultStatus === "confirmed" 
                                ? "Confirmed" 
                                : match.resultStatus === "disputed"
                                ? "Disputed"
                                : "Pending Confirmation"}
                            </Badge>
                          </div>
                          
                          {match.submittedBy && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              Reported by {match.submittedBy}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-3 p-4 rounded-lg bg-muted/50">
                          <h4 className="font-medium text-center">Team 2</h4>
                          <div className="space-y-2">
                            {match.team2.players.map(player => (
                              <div key={player.id} className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={player.avatar} alt={player.name} />
                                  <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                  <p className="font-medium">{player.name}</p>
                                  <p className="text-xs text-muted-foreground">ELO: {player.elo}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-1">
                  <Card className="bg-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Match Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex">
                          <div className="mr-4 flex flex-col items-center">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <Calendar className="h-4 w-4" />
                            </div>
                            <div className="h-full w-[2px] bg-border"></div>
                          </div>
                          <div>
                            <p className="font-medium">Match Created</p>
                            <p className="text-sm text-muted-foreground">May 5, 2023</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="mr-4 flex flex-col items-center">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                              <Clock className="h-4 w-4" />
                            </div>
                            <div className="h-full w-[2px] bg-border"></div>
                          </div>
                          <div>
                            <p className="font-medium">Match Scheduled</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(match.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })} at {match.time}
                            </p>
                          </div>
                        </div>
                        
                        {match.resultStatus && (
                          <div className="flex">
                            <div className="mr-4 flex flex-col items-center">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                <Trophy className="h-4 w-4" />
                              </div>
                              <div className="h-full w-[2px] bg-border"></div>
                            </div>
                            <div>
                              <p className="font-medium">Result Submitted</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(match.submittedAt).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric',
                                  year: 'numeric'
                                })} by {match.submittedBy}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {match.resultStatus === "confirmed" && (
                          <div className="flex">
                            <div className="mr-4 flex flex-col items-center">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100">
                                <Check className="h-4 w-4" />
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">Result Confirmed</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date().toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {canRecordResult && (
              <TabsContent value="record_result">
                <RecordResultForm 
                  matchId={match.id} 
                  onCompleted={handleResultRecorded} 
                />
              </TabsContent>
            )}
            
            {canConfirmResult && (
              <TabsContent value="confirm_result">
                <ConfirmResultForm 
                  matchId={match.id} 
                  onConfirmed={handleResultConfirmed} 
                />
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchDetailsPage;
