
import { useState } from "react";
import { Check, Trophy, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Mock match result data - in a real application this would come from an API
const mockMatchResult = {
  id: 1,
  date: "2023-05-10",
  time: "19:30",
  location: "TU München Main Campus",
  isDoubles: true,
  team1: {
    players: [
      { id: "1", name: "Max Schmidt", avatar: "/placeholder.svg", elo: 1850, eloChange: 15 },
      { id: "2", name: "Sarah Wagner", avatar: "/placeholder.svg", elo: 1820, eloChange: 15 },
    ],
    score: 5
  },
  team2: {
    players: [
      { id: "current-user", name: "You", avatar: "/placeholder.svg", elo: 1795, eloChange: -8 },
      { id: "4", name: "Maria Fischer", avatar: "/placeholder.svg", elo: 1780, eloChange: -8 },
    ],
    score: 3
  },
  submittedBy: "Max Schmidt",
  submittedAt: "2023-05-10T19:45:00Z",
  comments: "Great match, close until the end!",
};

interface ConfirmResultFormProps {
  matchId?: number;
  onConfirmed?: () => void;
}

const ConfirmResultForm = ({ matchId = 1, onConfirmed }: ConfirmResultFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [showDisputeDialog, setShowDisputeDialog] = useState(false);

  const confirmResult = async () => {
    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call to confirm the match result
      console.log("Confirming match result:", matchId);
      
      // Mock successful confirmation
      setTimeout(() => {
        toast({
          title: "Result confirmed!",
          description: "The match result has been confirmed and ELO ratings have been updated.",
        });
        if (onConfirmed) {
          onConfirmed();
        } else {
          navigate(`/matches/${matchId}`);
        }
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error confirming match result:", error);
      toast({
        title: "Error",
        description: "There was an error confirming the match result.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const disputeResult = async () => {
    if (!disputeReason.trim()) {
      toast({
        title: "Reason required",
        description: "Please provide a reason for disputing the result.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call to dispute the match result
      console.log("Disputing match result:", { matchId, reason: disputeReason });
      
      // Mock successful dispute
      setTimeout(() => {
        toast({
          title: "Result disputed",
          description: "The match result has been disputed. The submitter will be notified.",
        });
        setShowDisputeDialog(false);
        if (onConfirmed) {
          onConfirmed();
        } else {
          navigate(`/matches/${matchId}`);
        }
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error disputing match result:", error);
      toast({
        title: "Error",
        description: "There was an error disputing the match result.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Confirm Match Result</h3>
          <div className="text-sm text-muted-foreground">
            Submitted by {mockMatchResult.submittedBy}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6">
          {/* Team 1 */}
          <div className={`space-y-3 p-4 rounded-lg ${
            mockMatchResult.team1.score > mockMatchResult.team2.score 
              ? "bg-green-100/30 dark:bg-green-900/20" 
              : "bg-muted/30"
          }`}>
            <h4 className="font-medium text-center">Team 1</h4>
            <div className="space-y-2">
              {mockMatchResult.team1.players.map(player => (
                <div key={player.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={player.avatar} alt={player.name} />
                      <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium">{player.name}</p>
                      <p className="text-xs text-muted-foreground">ELO: {player.elo}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    player.eloChange > 0 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {player.eloChange > 0 ? "+" : ""}{player.eloChange}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="text-3xl font-bold">
              {mockMatchResult.team1.score} : {mockMatchResult.team2.score}
            </div>
            
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <Trophy className="h-4 w-4 mr-1" />
              <span>
                Winner: Team {mockMatchResult.team1.score > mockMatchResult.team2.score ? "1" : "2"}
              </span>
            </div>
            
            {mockMatchResult.comments && (
              <div className="mt-4 text-sm text-center border-t pt-4 border-border w-full">
                <p className="text-muted-foreground italic">"{mockMatchResult.comments}"</p>
              </div>
            )}
          </div>

          {/* Team 2 */}
          <div className={`space-y-3 p-4 rounded-lg ${
            mockMatchResult.team2.score > mockMatchResult.team1.score 
              ? "bg-green-100/30 dark:bg-green-900/20" 
              : "bg-muted/30"
          }`}>
            <h4 className="font-medium text-center">Team 2</h4>
            <div className="space-y-2">
              {mockMatchResult.team2.players.map(player => (
                <div key={player.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={player.avatar} alt={player.name} />
                      <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium">{player.name}</p>
                      <p className="text-xs text-muted-foreground">ELO: {player.elo}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    player.eloChange > 0 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {player.eloChange > 0 ? "+" : ""}{player.eloChange}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-start gap-4 rounded-lg p-4 bg-muted/30">
          <div className="bg-primary/10 p-2 rounded-full">
            <Check className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-medium">Please Review and Confirm</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Confirm if the match result is correct. Once confirmed, ELO ratings will be updated accordingly.
              If you believe the result is incorrect, please dispute it.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowDisputeDialog(true)}
          disabled={isSubmitting}
        >
          <X className="mr-2 h-4 w-4" />
          Dispute
        </Button>
        <Button 
          onClick={confirmResult} 
          disabled={isSubmitting}
        >
          <Check className="mr-2 h-4 w-4" />
          {isSubmitting ? "Confirming..." : "Confirm Result"}
        </Button>
      </div>

      <Dialog open={showDisputeDialog} onOpenChange={setShowDisputeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dispute Match Result</DialogTitle>
            <DialogDescription>
              Please provide a reason for disputing this match result. The result submitter will be notified.
            </DialogDescription>
          </DialogHeader>
          
          <Textarea
            placeholder="Explain why you are disputing this result..."
            value={disputeReason}
            onChange={(e) => setDisputeReason(e.target.value)}
            className="min-h-[100px]"
          />
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDisputeDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={disputeResult}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Dispute"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmResultForm;
