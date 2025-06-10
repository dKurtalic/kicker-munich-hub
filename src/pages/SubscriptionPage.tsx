
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SubscriptionPage = () => {
  const { isAuthenticated, isLoading, user, subscribeUser } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // If not authenticated and not loading, redirect to login
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Return loading state while checking authentication
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-medium">Loading subscription details...</h2>
        </div>
      </div>
    );
  }
  
  const handleSubscribe = async () => {
    setIsProcessing(true);
    try {
      await subscribeUser();
      toast({
        title: "Success!",
        description: "You are now a premium member.",
      });
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Premium Membership</h1>
        <p className="text-lg text-muted-foreground">
          Get access to all premium features and support the KickerTUM community.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <Card className={`ios-card relative ${!user?.isPremium ? 'border-2 border-primary' : ''}`}>
          {!user?.isPremium && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
              Your Plan
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-2xl">Free</CardTitle>
            <CardDescription>Basic access to KickerTUM</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-bold">€0<span className="text-muted-foreground text-lg font-normal">/month</span></p>
            
            <ul className="space-y-3 mt-6">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <span>View matches and tournaments</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <span>Join existing tournaments</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <span>View the Munich Table Map</span>
              </li>
              <li className="flex items-start text-muted-foreground">
                <AlertCircle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <span>Cannot create new matches</span>
              </li>
              <li className="flex items-start text-muted-foreground">
                <AlertCircle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <span>Cannot invite other players</span>
              </li>
              <li className="flex items-start text-muted-foreground">
                <AlertCircle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <span>Cannot create tournaments</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button disabled className="w-full rounded-full" variant="outline">
              Current Plan
            </Button>
          </CardFooter>
        </Card>
        
        {/* Premium Plan */}
        <Card className={`ios-card relative ${user?.isPremium ? 'border-2 border-primary' : ''}`}>
          {user?.isPremium && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
              Your Plan
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-2xl">Premium</CardTitle>
            <CardDescription>Full access to all features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-bold">€20<span className="text-muted-foreground text-lg font-normal">/month</span></p>
            
            <ul className="space-y-3 mt-6">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <span>All Free features</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <span>Create unlimited matches</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <span>Invite other players to matches</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <span>Create and manage tournaments</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <span>Advanced statistics and insights</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <span>Priority customer support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {user?.isPremium ? (
              <Button disabled className="w-full rounded-full" variant="outline">
                Current Plan
              </Button>
            ) : (
              <Button 
                onClick={handleSubscribe}
                disabled={isProcessing}
                className="w-full rounded-full"
              >
                {isProcessing ? 'Processing...' : 'Subscribe Now'}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      
      <div className="max-w-3xl mx-auto mt-12 p-6 bg-muted/50 rounded-xl ios-card">
        <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">Can I cancel my subscription at any time?</h4>
            <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. Your premium access will continue until the end of your billing period.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">How does the payment work?</h4>
            <p className="text-muted-foreground">We use Stripe for secure payments. You can pay with all major credit cards.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">What happens if I downgrade from Premium?</h4>
            <p className="text-muted-foreground">You'll retain access to premium features until the end of your billing period, after which you'll revert to the free plan.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
