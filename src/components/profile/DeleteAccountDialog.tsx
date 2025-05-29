
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteAccountDialog = ({ open, onOpenChange }: DeleteAccountDialogProps) => {
  const { toast } = useToast();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  
  const handleDeleteAccount = async () => {
    if (confirmText !== "DELETE") {
      toast({
        title: "Confirmation failed",
        description: "Please type DELETE to confirm account deletion.",
        variant: "destructive",
      });
      return;
    }
    
    setIsDeleting(true);
    
    try {
      // In a real app, this would be an API call to delete the account
      console.log("Deleting account...");
      
      // Mock successful deletion
      setTimeout(() => {
        toast({
          title: "Account deleted",
          description: "Your account has been permanently deleted. You will be logged out now.",
        });
        
        // Log out the user
        logout();
        
        // Redirect to home page
        navigate("/");
        
        setIsDeleting(false);
        onOpenChange(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Error",
        description: "There was an error deleting your account. Please try again.",
        variant: "destructive",
      });
      setIsDeleting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Delete Account
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-md text-sm">
            <p className="font-medium text-destructive mb-2">You will lose:</p>
            <ul className="space-y-1 list-disc list-inside text-muted-foreground">
              <li>All your match history and ELO rating</li>
              <li>Tournament participation records</li>
              <li>Friend connections and invitations</li>
              <li>Customized settings and preferences</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirm" className="text-sm font-medium">
              Type DELETE to confirm
            </label>
            <Input
              id="confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              className="w-full"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={isDeleting || confirmText !== "DELETE"}
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;
