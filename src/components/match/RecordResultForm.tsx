
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Trophy, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  team1Score: z.string()
    .refine(val => !isNaN(parseInt(val)), {
      message: "Score must be a valid number",
    })
    .refine(val => parseInt(val) >= 0, {
      message: "Score cannot be negative",
    }),
  team2Score: z.string()
    .refine(val => !isNaN(parseInt(val)), {
      message: "Score must be a valid number",
    })
    .refine(val => parseInt(val) >= 0, {
      message: "Score cannot be negative",
    }),
  comments: z.string().optional(),
}).refine(
  (data) => parseInt(data.team1Score) !== parseInt(data.team2Score), 
  { message: "Matches cannot end in a tie", path: ["team1Score"] }
);

type FormValues = z.infer<typeof formSchema>;

// Mock match data - in a real application this would come from an API
const mockMatch = {
  id: 1,
  date: "2023-05-10",
  time: "19:30",
  location: "TU München Main Campus",
  isDoubles: true,
  team1: {
    players: [
      { id: "current-user", name: "You", avatar: "/placeholder.svg", elo: 1500 },
      { id: "2", name: "Sarah Wagner", avatar: "/placeholder.svg", elo: 1820 },
    ]
  },
  team2: {
    players: [
      { id: "3", name: "Tom Schmidt", avatar: "/placeholder.svg", elo: 1795 },
      { id: "4", name: "Maria Fischer", avatar: "/placeholder.svg", elo: 1780 },
    ]
  }
};

interface RecordResultFormProps {
  matchId?: number;
  onCompleted?: () => void;
}

const RecordResultForm = ({ matchId = 1, onCompleted }: RecordResultFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      team1Score: "",
      team2Score: "",
      comments: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call to record the match result
      console.log("Recording match result:", values);
      
      // Mock successful submission
      setTimeout(() => {
        toast({
          title: "Result submitted!",
          description: "The opponent will be notified to confirm the result.",
        });
        if (onCompleted) {
          onCompleted();
        } else {
          navigate(`/matches/${matchId}`);
        }
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error recording match result:", error);
      toast({
        title: "Error",
        description: "There was an error recording the match result.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const getWinner = () => {
    const team1Score = parseInt(form.watch("team1Score") || "0");
    const team2Score = parseInt(form.watch("team2Score") || "0");
    
    if (team1Score > team2Score) return "team1";
    if (team2Score > team1Score) return "team2";
    return null;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Record Match Result</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6">
            {/* Team 1 */}
            <div className={`space-y-3 p-4 rounded-lg ${
              getWinner() === "team1" ? "bg-green-100/30 dark:bg-green-900/20" : "bg-muted/30"
            }`}>
              <h4 className="font-medium text-center">Team 1</h4>
              <div className="space-y-2">
                {mockMatch.team1.players.map(player => (
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

            {/* Score */}
            <div className="flex flex-col items-center justify-center p-4">
              <div className="grid grid-cols-3 items-center gap-2 w-full">
                <FormField
                  control={form.control}
                  name="team1Score"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          className="text-center text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-center">:</div>

                <FormField
                  control={form.control}
                  name="team2Score"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          className="text-center text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {getWinner() && (
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <Trophy className="h-4 w-4 mr-1" />
                  <span>
                    Winner: Team {getWinner() === "team1" ? "1" : "2"}
                  </span>
                </div>
              )}
            </div>

            {/* Team 2 */}
            <div className={`space-y-3 p-4 rounded-lg ${
              getWinner() === "team2" ? "bg-green-100/30 dark:bg-green-900/20" : "bg-muted/30"
            }`}>
              <h4 className="font-medium text-center">Team 2</h4>
              <div className="space-y-2">
                {mockMatch.team2.players.map(player => (
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

          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comments (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any comments about the match..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-start gap-4 rounded-lg p-4 bg-muted/30">
            <div className="bg-primary/10 p-2 rounded-full">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Confirmation Required</h4>
              <p className="text-sm text-muted-foreground mt-1">
                After submitting, your opponent will be notified to confirm the result. 
                ELO ratings will be updated after confirmation.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/matches/${matchId}`)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Result"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RecordResultForm;
