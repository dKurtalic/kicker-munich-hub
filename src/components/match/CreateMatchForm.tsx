
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon, Clock, MapPin, User, Users } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  date: z.date({
    required_error: "A match date is required.",
  }),
  time: z.string().min(1, {
    message: "A time is required.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  opponent: z.string({
    required_error: "Please select an opponent.",
  }),
  partner: z.string().optional(),
  opponentPartner: z.string().optional(),
  tableQuality: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Mock user data - in a real application this would come from an API
const mockUsers = [
  { id: "1", name: "Alex Müller", email: "alex@example.com", avatar: "/placeholder.svg", elo: 1850 },
  { id: "2", name: "Sarah Wagner", email: "sarah@example.com", avatar: "/placeholder.svg", elo: 1820 },
  { id: "3", name: "Tom Schmidt", email: "tom@example.com", avatar: "/placeholder.svg", elo: 1795 },
  { id: "4", name: "Maria Fischer", email: "maria@example.com", avatar: "/placeholder.svg", elo: 1780 },
  { id: "5", name: "Felix Bauer", email: "felix@example.com", avatar: "/placeholder.svg", elo: 1760 },
];

const CreateMatchForm = () => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [matchType, setMatchType] = useState<"singles" | "doubles">("singles");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: "18:00",
      location: "",
      opponent: "",
      tableQuality: "4",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a match.",
        variant: "destructive",
      });
      return;
    }

    if (!user?.isPremium) {
      toast({
        title: "Premium Feature",
        description: "Creating matches requires a premium subscription.",
        variant: "destructive",
      });
      navigate("/subscription");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call to create the match
      console.log("Creating match:", values);
      
      // Mock successful creation
      setTimeout(() => {
        toast({
          title: "Match created!",
          description: "Your match has been created successfully.",
        });
        navigate("/profile");
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error creating match:", error);
      toast({
        title: "Error",
        description: "There was an error creating your match.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Match Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full pl-3 text-left font-normal ${
                            !field.value ? "text-muted-foreground" : ""
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="time"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="TU München Main Campus" 
                      className="pl-10"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Players</h3>
            <div className="flex space-x-2">
              <Button
                type="button"
                size="sm"
                variant={matchType === "singles" ? "default" : "outline"}
                onClick={() => setMatchType("singles")}
              >
                Singles
              </Button>
              <Button
                type="button"
                size="sm"
                variant={matchType === "doubles" ? "default" : "outline"}
                onClick={() => setMatchType("doubles")}
              >
                Doubles
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Team 1</h4>
                
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "You"} />
                      <AvatarFallback>{user?.name?.substring(0, 2) || "You"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.name || "You"}</p>
                      <p className="text-xs text-muted-foreground">ELO: {user?.elo || 1500}</p>
                    </div>
                  </div>
                </div>
                
                {matchType === "doubles" && (
                  <FormField
                    control={form.control}
                    name="partner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Partner</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a partner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockUsers.map(user => (
                              <SelectItem key={user.id} value={user.id}>
                                <div className="flex items-center gap-2">
                                  <span>{user.name}</span>
                                  <span className="text-xs text-muted-foreground">({user.elo})</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Team 2</h4>
                
                <FormField
                  control={form.control}
                  name="opponent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opponent</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an opponent" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockUsers.map(user => (
                            <SelectItem key={user.id} value={user.id}>
                              <div className="flex items-center gap-2">
                                <span>{user.name}</span>
                                <span className="text-xs text-muted-foreground">({user.elo})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {matchType === "doubles" && (
                  <FormField
                    control={form.control}
                    name="opponentPartner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opponent's Partner</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select opponent's partner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockUsers
                              .filter(u => u.id !== form.watch("opponent"))
                              .map(user => (
                                <SelectItem key={user.id} value={user.id}>
                                  <div className="flex items-center gap-2">
                                    <span>{user.name}</span>
                                    <span className="text-xs text-muted-foreground">({user.elo})</span>
                                  </div>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-semibold mb-4">Table Information</h3>
          
          <FormField
            control={form.control}
            name="tableQuality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Table Quality</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Rate the table quality" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">⭐ Poor</SelectItem>
                    <SelectItem value="2">⭐⭐ Fair</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ Good</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ Very Good</SelectItem>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Rate the quality of the kicker table you'll be playing on.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Match"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateMatchForm;
