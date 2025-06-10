import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Euro, Table as TableIcon, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { mockTables } from "./TablesList";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  isPaid: z.boolean().default(false),
  fee: z.string().optional().nullable(),
  hasBalls: z.boolean().default(true),
  condition: z.enum(["Poor", "Average", "Good", "Very Good", "Excellent"]),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddTableFormProps {
  onComplete: () => void;
}

const AddTableForm = ({ onComplete }: AddTableFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      isPaid: false,
      fee: "",
      hasBalls: true,
      condition: "Good",
      notes: "",
    },
  });

  const isPaid = form.watch("isPaid");

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call to add the table
      console.log("Adding new table:", values);
      
      // Mock successful submission
      setTimeout(() => {
        toast({
          title: "Table added!",
          description: `${values.name} has been added to the tables list. It will need 5 verifications before appearing on the map.`,
        });
        onComplete();
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error adding table:", error);
      toast({
        title: "Error",
        description: "There was an error adding the table.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertDescription>
          <strong>Important:</strong> New tables require verification from at least 5 different users before they appear on the map. 
          This helps ensure that only real, existing tables are added to our database.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Table Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Spielbar" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Full address including street, city, and postal code"
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      <div className="flex items-center mt-1 text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>This will be used to place the table on the map after verification</span>
                      </div>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Table Condition</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Poor">Poor</SelectItem>
                        <SelectItem value="Average">Average</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Very Good">Very Good</SelectItem>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="isPaid"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Paid Table
                      </FormLabel>
                      <FormDescription>
                        Do players need to pay to use this table?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {isPaid && (
                <FormField
                  control={form.control}
                  name="fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fee Details</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. €1 per game, €5 per hour" 
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="hasBalls"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Balls Provided
                      </FormLabel>
                      <FormDescription>
                        Are balls provided or do players need to bring their own?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional information about the table..."
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onComplete}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Add Table"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddTableForm;
