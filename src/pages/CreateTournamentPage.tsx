
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateTournamentForm from "@/components/tournament/CreateTournamentForm";
import InviteFriendsForm from "@/components/tournament/InviteFriendsForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CreateTournamentPage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [tournamentData, setTournamentData] = useState<{id?: number; name?: string}>({});

  // Handler for when tournament details are submitted
  const handleTournamentCreated = (data: {id: number; name: string}) => {
    setTournamentData(data);
    setActiveTab("invite");
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <Link to="/tournaments" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        <span>Back to Tournaments</span>
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <Card className="ios-card">
          <CardHeader>
            <CardTitle className="text-2xl">Create Tournament</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="details">Tournament Details</TabsTrigger>
                <TabsTrigger value="invite" disabled={!tournamentData.id}>Invite Friends</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details">
                <CreateTournamentForm onTournamentCreated={handleTournamentCreated} />
              </TabsContent>
              
              <TabsContent value="invite">
                {tournamentData.id && (
                  <InviteFriendsForm 
                    tournamentId={tournamentData.id} 
                    tournamentName={tournamentData.name} 
                  />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateTournamentPage;
