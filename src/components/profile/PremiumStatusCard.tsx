
import { Crown, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SubscriptionData {
  isActive: boolean;
  plan: string;
  nextBillingDate: string;
  price: string;
  features: string[];
}

interface PremiumStatusCardProps {
  subscriptionData: SubscriptionData;
  onCancelSubscription: () => void;
  onUpgradeToPremium: () => void;
}

const PremiumStatusCard = ({ 
  subscriptionData, 
  onCancelSubscription, 
  onUpgradeToPremium 
}: PremiumStatusCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            <CardTitle>Premium Status</CardTitle>
          </div>
          <Badge variant={subscriptionData.isActive ? "secondary" : "outline"}>
            {subscriptionData.isActive ? "Active" : "Free"}
          </Badge>
        </div>
        <CardDescription>
          {subscriptionData.isActive 
            ? "You have access to all premium features"
            : "Upgrade to unlock premium features"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {subscriptionData.isActive ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Current Plan</p>
                <p className="text-2xl font-bold">{subscriptionData.plan}</p>
                <p className="text-sm text-muted-foreground">{subscriptionData.price}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Next Billing Date</p>
                <p className="text-lg font-semibold">{new Date(subscriptionData.nextBillingDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Premium Features</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {subscriptionData.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="sm">
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Billing
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onCancelSubscription}
              >
                Cancel Subscription
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Premium Features</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {subscriptionData.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Upgrade to Premium</p>
                  <p className="text-sm text-muted-foreground">€9.99/month</p>
                </div>
                <Button onClick={onUpgradeToPremium}>
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PremiumStatusCard;
