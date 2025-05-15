
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateTournamentForm from "@/components/tournament/CreateTournamentForm";

const CreateTournamentPage = () => {
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
            <CreateTournamentForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateTournamentPage;
