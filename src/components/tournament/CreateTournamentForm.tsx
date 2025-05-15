import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tournament name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  date: z.string().min(1, {
    message: "Please select a date.",
  }),
  time: z.string().min(1, {
    message: "Please select a time.",
  }),
  maxParticipants: z.string().refine((value) => {
    const num = parseInt(value, 10);
    return !isNaN(num) && num > 0;
  }, {
    message: "Max participants must be a number greater than 0.",
  }),
  entryFee: z.string().refine((value) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0;
  }, {
    message: "Entry fee must be a number greater than or equal to 0.",
  }),
});

const CreateTournamentForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      date: "",
      time: "",
      maxParticipants: "8",
      entryFee: "0",
    },
  });

  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    // Here you would handle the form submission, e.g., sending the data to an API
    console.log(formData);

    // Example data transformation to match your mock data structure
    const newTournament = {
      id: Date.now(), // Generate a unique ID
      name: formData.name,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      participants: 0,
      maxParticipants: parseInt(formData.maxParticipants, 10),
      format: "Single Elimination", // You might want to add this to the form
      entryFee: `€${formData.entryFee}`,
      status: "upcoming",
    };

    toast({
      title: "Success!",
      description: "Tournament created successfully.",
    });

    // Redirect to tournaments page after successful creation
    navigate("/tournaments");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tournament Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter tournament name" {...field} />
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
                  placeholder="Write a description about the tournament"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="maxParticipants"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Max Participants</FormLabel>
                <FormControl>
                  <Input placeholder="Enter max participants" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entryFee"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Entry Fee</FormLabel>
                <FormControl>
                  <Input placeholder="Enter entry fee" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Create Tournament</Button>
      </form>
    </Form>
  );
};

export default CreateTournamentForm;
