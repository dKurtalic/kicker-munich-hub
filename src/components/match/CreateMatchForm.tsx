
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Check, CalendarIcon, Clock, MapPin, User, Users, X, Trophy, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Schema for form validation
const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  time: z.string({
    required_error: "A time is required.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  opponent: z.string().min(3, {
    message: "Opponent must be at least 3 characters.",
  }),
  gameType: z.enum(["1v1", "2v2"], {
    required_error: "Game type is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

// Demo users for inviting to a match
const demoUsers = [
  { id: "1", name: "Alex Johnson", email: "alex@example.com", avatar: "https://i.pravatar.cc/150?img=1", elo: 1750 },
  { id: "2", name: "Sam Smith", email: "sam@example.com", avatar: "https://i.pravatar.cc/150?img=2", elo: 1650 },
  { id: "3", name: "Jordan Lee", email: "jordan@example.com", avatar: "https://i.pravatar.cc/150?img=3", elo: 1820 },
  { id: "4", name: "Casey Taylor", email: "casey@example.com", avatar: "https://i.pravatar.cc/150?img=4", elo: 1580 },
  { id: "5", name: "Morgan Wilson", email: "morgan@example.com", avatar: "https://i.pravatar.cc/150?img=5", elo: 1700 },
];

const CreateMatchForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [invitedUsers, setInvitedUsers] = useState<typeof demoUsers>([]);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      time: "18:00",
      location: "",
      opponent: "",
      gameType: "1v1",
    },
  });

  const gameType = form.watch("gameType");
  const maxInvites = gameType === "1v1" ? 1 : 3;

  const filteredUsers = demoUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInviteUser = (user: typeof demoUsers[0]) => {
    if (invitedUsers.find(u => u.id === user.id)) {
      // Remove user if already invited
      setInvitedUsers(invitedUsers.filter(u => u.id !== user.id));
    } else {
      // Add user to invited list
      if (invitedUsers.length < maxInvites) {
        setInvitedUsers([...invitedUsers, user]);
      } else {
        toast({
          title: "Team is full",
          description: `You can only invite ${maxInvites} player${maxInvites > 1 ? "s" : ""} for ${gameType} mode.`,
          variant: "destructive",
        });
      }
    }
  };

  const isUserInvited = (userId: string) => {
    return invitedUsers.some(user => user.id === userId);
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Match created with data:", data);
      console.log("Invited users:", invitedUsers);
      
      toast({
        title: "Match created!",
        description: "Your match has been successfully created.",
      });
      
      // Navigate to the matches page or view the new match
      navigate("/matches/1");
    } catch (error) {
      console.error("Error creating match:", error);
      toast({
        title: "Error creating match",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Match</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Match Title</FormLabel>
                <FormControl>
                  <Input placeholder="Friendly Match" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
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
                  <FormLabel>Match Time</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="time" className="pl-10" {...field} />
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
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Student Union, Table #3" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gameType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game Type</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    // Clear invited users if switching game types and exceeding new limit
                    if (value === "1v1" && invitedUsers.length > 1) {
                      setInvitedUsers(invitedUsers.slice(0, 1));
                    }
                  }} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a game type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1v1">1v1 Single Player</SelectItem>
                    <SelectItem value="2v2">2v2 Team Match</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Invite Players Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Invite Players ({invitedUsers.length}/{maxInvites})</h3>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={() => setIsInviteDialogOpen(true)}
                className="rounded-full"
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Find Players
              </Button>
            </div>
            
            {invitedUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {invitedUsers.map(user => (
                  <Card key={user.id} className="overflow-hidden">
                    <CardContent className="p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <img src={user.avatar} alt={user.name} />
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleInviteUser(user)}
                      >
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-muted/30 rounded-lg p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <h4 className="text-lg font-medium">No Players Invited Yet</h4>
                <p className="text-sm text-muted-foreground mb-4">Invite players to join your match</p>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setIsInviteDialogOpen(true)}
                  className="rounded-full"
                >
                  Find Players
                </Button>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" className="rounded-full">
              <Trophy className="mr-2 h-4 w-4" />
              Create Match
            </Button>
          </div>
        </form>
      </Form>

      {/* Invite Players Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Players</DialogTitle>
            <DialogDescription>
              Find and invite players to join your match.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="relative mb-4">
              <Input
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <div 
                    key={user.id}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted transition ${isUserInvited(user.id) ? 'bg-primary/10' : ''}`}
                    onClick={() => handleInviteUser(user)}
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <Avatar className="h-10 w-10 mr-3">
                          <img src={user.avatar} alt={user.name} />
                        </Avatar>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-muted px-2 py-1 rounded text-xs mr-2">
                        ELO {user.elo}
                      </div>
                      {isUserInvited(user.id) ? (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 border border-input rounded-full flex items-center justify-center">
                          <PlusCircle className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No users found</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateMatchForm;
