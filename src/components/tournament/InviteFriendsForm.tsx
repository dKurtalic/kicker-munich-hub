
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy, Plus, User, Users, X } from "lucide-react";

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
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock friend data - in a real application this would come from an API
const mockFriends = [
  { id: 1, name: "Alex Müller", email: "alex@example.com", avatar: "/placeholder.svg" },
  { id: 2, name: "Sarah Wagner", email: "sarah@example.com", avatar: "/placeholder.svg" },
  { id: 3, name: "Tom Schmidt", email: "tom@example.com", avatar: "/placeholder.svg" },
  { id: 4, name: "Maria Fischer", email: "maria@example.com", avatar: "/placeholder.svg" },
];

interface InviteFriendsFormProps {
  tournamentId?: number;
  tournamentName?: string;
  onClose?: () => void;
  onBack?: () => void;
  onSubmit?: (invitees: string[]) => void;
}

const InviteFriendsForm = ({ 
  tournamentId, 
  tournamentName, 
  onClose,
  onBack,
  onSubmit
}: InviteFriendsFormProps) => {
  const { toast } = useToast();
  const [invitedFriends, setInvitedFriends] = useState<typeof mockFriends>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const inviteLink = `https://kickertum.com/tournaments/${tournamentId}/join`;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    // Check if email is already in invited list
    if (invitedFriends.some(friend => friend.email === values.email)) {
      toast({
        title: "Already invited",
        description: "This person has already been invited.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would validate the email against your user database
    // For now, we'll just check if it's one of our mock friends
    const friend = mockFriends.find(f => f.email === values.email);

    if (friend) {
      setInvitedFriends([...invitedFriends, friend]);
      toast({
        title: "Friend added",
        description: `${friend.name} has been added to the invite list.`,
      });
    } else {
      // Create a new "friend" from the email
      const newFriend = {
        id: Date.now(),
        name: values.email.split('@')[0],
        email: values.email,
        avatar: "/placeholder.svg",
      };
      setInvitedFriends([...invitedFriends, newFriend]);
      toast({
        title: "Email added",
        description: `${values.email} has been added to the invite list.`,
      });
    }

    form.reset();
  };

  const handleRemoveFriend = (friendId: number) => {
    setInvitedFriends(invitedFriends.filter(friend => friend.id !== friendId));
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Link copied",
      description: "Tournament invite link copied to clipboard.",
    });
  };

  const sendInvites = async () => {
    if (invitedFriends.length === 0) {
      toast({
        title: "No invitees",
        description: "Please add at least one person to invite.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call to send invites
      console.log("Sending invites to:", invitedFriends);
      
      // Get emails for onSubmit callback
      const emails = invitedFriends.map(friend => friend.email);
      
      // Mock successful invitation
      setTimeout(() => {
        toast({
          title: "Invites sent!",
          description: `Invitations sent to ${invitedFriends.length} people.`,
        });
        
        // Call the onSubmit callback if provided
        if (onSubmit) {
          onSubmit(emails);
        }
        
        setInvitedFriends([]);
        setIsSubmitting(false);
        if (onClose) onClose();
      }, 1000);
    } catch (error) {
      console.error("Error sending invites:", error);
      toast({
        title: "Error",
        description: "There was an error sending invitations.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Invite Friends to Tournament</h3>
        {tournamentName && (
          <p className="text-sm text-muted-foreground mt-1">
            {tournamentName}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="flex space-x-2">
                      <div className="relative flex-grow">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="friend@example.com" className="pl-10" {...field} />
                      </div>
                      <Button type="submit" size="sm">
                        <Plus className="mr-2 h-4 w-4" /> Add
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter your friend's email to send them an invitation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <div className="pt-2">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Invite List</h4>
            <div className="text-xs text-muted-foreground">
              {invitedFriends.length} {invitedFriends.length === 1 ? "person" : "people"}
            </div>
          </div>
          
          {invitedFriends.length > 0 ? (
            <div className="space-y-2 max-h-40 overflow-y-auto p-1">
              {invitedFriends.map(friend => (
                <div 
                  key={friend.id} 
                  className="flex justify-between items-center p-2 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>{friend.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{friend.name}</p>
                      <p className="text-xs text-muted-foreground">{friend.email}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveFriend(friend.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-lg">
              <Users className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No friends added yet</p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm mb-2">Or share the invite link</p>
          <div className="flex space-x-2">
            <Input 
              readOnly 
              value={inviteLink} 
              className="bg-muted/30 font-mono text-sm"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={copyInviteLink}
              className="shrink-0"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t border-border">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        )}
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button onClick={sendInvites} disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Invites"}
        </Button>
      </div>
    </div>
  );
};

export default InviteFriendsForm;
