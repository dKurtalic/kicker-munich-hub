
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateMatchForm from "@/components/match/CreateMatchForm";

const CreateMatchPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <Link to="/profile" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        <span>Back to Profile</span>
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <Card className="ios-card">
          <CardHeader>
            <CardTitle className="text-2xl">Create Match</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateMatchForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateMatchPage;
