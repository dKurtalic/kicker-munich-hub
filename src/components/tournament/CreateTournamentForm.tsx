import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, CalendarCheck, Users, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import InviteFriendsForm from './InviteFriendsForm';

// Schema for form validation
const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().optional(),
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  endDate: z.date({
    required_error: "End date is required.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  maxParticipants: z.coerce.number().int().min(4, {
    message: "Tournament needs at least 4 participants.",
  }).max(64, {
    message: "Maximum 64 participants allowed."
  })
});

type FormValues = z.infer<typeof formSchema>;

interface CreateTournamentFormProps {
  onTournamentCreated?: (data: {id: number; name: string}) => void;
}

const CreateTournamentForm = ({ onTournamentCreated }: CreateTournamentFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [tournamentData, setTournamentData] = useState<FormValues | null>(null);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      location: "",
      maxParticipants: 8
    },
  });

  // Handle form submission for the first step
  const onSubmitFirstStep = (data: FormValues) => {
    setTournamentData(data);
    
    // If we're in the context of a wizard (onTournamentCreated exists), use that
    if (onTournamentCreated) {
      // In a real app, this would make an API call first
      // Mock creating a tournament with a random ID
      const mockTournamentId = Math.floor(Math.random() * 1000);
      onTournamentCreated({
        id: mockTournamentId,
        name: data.title
      });
    } else {
      // Otherwise, continue to the next step in this component
      setStep(2);
    }
  };

  // Handle invitees submission and final form submission
  const handleInviteesSubmit = (invitees: string[]) => {
    if (!tournamentData) return;
    
    try {
      // In a real app, this would send data to your backend
      console.log("Tournament created with data:", tournamentData);
      console.log("Invited users:", invitees);
      
      toast({
        title: "Tournament created!",
        description: "Your tournament has been successfully created.",
      });
      
      // Navigate to the tournaments page or view the new tournament
      navigate("/tournaments");
    } catch (error) {
      console.error("Error creating tournament:", error);
      toast({
        title: "Error creating tournament",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Render the first step form
  const renderFirstStepForm = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Trophy className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Create Tournament</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitFirstStep)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tournament Title</FormLabel>
                <FormControl>
                  <Input placeholder="Summer Championship" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your tournament..." 
                    className="resize-none min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Add details, rules, or any other information about your tournament.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
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
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
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
                          <CalendarCheck className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const startDate = form.getValues("startDate");
                          return date < startDate;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                  <Input placeholder="Student Union, Main Hall" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="maxParticipants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Participants</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="number" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Choose between 4 and 64 participants.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

       
            
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" className="rounded-full">
              Continue to Invite Friends
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );

  // Render based on current step
  return (
    <div className="max-w-3xl mx-auto">
      {step === 1 ? (
        renderFirstStepForm()
      ) : (
        <InviteFriendsForm 
          onBack={() => setStep(1)} 
          onSubmit={handleInviteesSubmit}
          tournamentId={0} // This will be replaced with real ID in production
          tournamentName={tournamentData?.title}
        />
      )}
    </div>
  );
};

export default CreateTournamentForm;
