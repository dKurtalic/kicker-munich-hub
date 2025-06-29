
import { AlertTriangle, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface CancelSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmCancel: () => void;
  subscriptionData: {
    plan: string;
    nextBillingDate: string;
    price: string;
  };
}

const CancelSubscriptionDialog = ({ 
  open, 
  onOpenChange, 
  onConfirmCancel,
  subscriptionData 
}: CancelSubscriptionDialogProps) => {
  const handleConfirm = () => {
    onConfirmCancel();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <AlertDialogTitle className="text-left">Cancel Subscription</AlertDialogTitle>
              <AlertDialogDescription className="text-left">
                Are you sure you want to cancel your {subscriptionData.plan} subscription?
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-destructive/5 border border-destructive/20 p-4 rounded-lg">
            <h4 className="font-medium text-destructive mb-2">What happens when you cancel:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0" />
                Your subscription will remain active until {new Date(subscriptionData.nextBillingDate).toLocaleDateString()}
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0" />
                You'll lose access to all premium features after this date
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0" />
                No more charges of {subscriptionData.price} will be made
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0" />
                Your account will revert to the free plan
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Good news!</strong> You can reactivate your subscription anytime to regain access to premium features.
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-destructive hover:bg-destructive/90"
          >
            Yes, Cancel Subscription
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelSubscriptionDialog;
