
import { CreditCard, Calendar, Download, Eye, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface BillingInfo {
  plan: string;
  price: string;
  nextBillingDate: string;
  billingInterval: string;
  paymentMethod: {
    type: string;
    last4: string;
    expiryMonth: number;
    expiryYear: number;
  };
  billingHistory: Array<{
    id: string;
    date: string;
    amount: string;
    status: 'paid' | 'pending' | 'failed';
    invoiceUrl?: string;
  }>;
}

interface ManageBillingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  billingInfo: BillingInfo;
  onUpdatePaymentMethod: () => void;
  onDownloadInvoice: (invoiceId: string) => void;
  onViewInvoice: (invoiceId: string) => void;
}

const ManageBillingDialog = ({ 
  open, 
  onOpenChange, 
  billingInfo,
  onUpdatePaymentMethod,
  onDownloadInvoice,
  onViewInvoice
}: ManageBillingDialogProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Manage Billing
          </DialogTitle>
          <DialogDescription>
            View and manage your subscription billing details
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Subscription */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Plan</p>
                  <p className="text-lg font-semibold">{billingInfo.plan}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Price</p>
                  <p className="text-lg font-semibold">{billingInfo.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Next billing date: <strong>{new Date(billingInfo.nextBillingDate).toLocaleDateString()}</strong>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Payment Method</CardTitle>
                <Button variant="outline" size="sm" onClick={onUpdatePaymentMethod}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Update
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {billingInfo.paymentMethod.type.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• {billingInfo.paymentMethod.last4}</p>
                  <p className="text-sm text-muted-foreground">
                    Expires {billingInfo.paymentMethod.expiryMonth.toString().padStart(2, '0')}/{billingInfo.paymentMethod.expiryYear}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Billing History</CardTitle>
              <CardDescription>
                Your recent billing transactions and invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {billingInfo.billingHistory.map((transaction, index) => (
                  <div key={transaction.id}>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium">{new Date(transaction.date).toLocaleDateString()}</p>
                            <p className="text-sm text-muted-foreground">{transaction.amount}</p>
                          </div>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onViewInvoice(transaction.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onDownloadInvoice(transaction.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {index < billingInfo.billingHistory.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={onUpdatePaymentMethod}>
              <CreditCard className="h-4 w-4 mr-2" />
              Update Payment Method
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageBillingDialog;
