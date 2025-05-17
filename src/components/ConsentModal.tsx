
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

interface ConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConsentModal = ({ open, onOpenChange }: ConsentModalProps) => {
  const { updateDonorConsent } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleConsent = async () => {
    setIsSubmitting(true);
    updateDonorConsent(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
    }, 500);
  };
  
  const handleDecline = () => {
    updateDonorConsent(false);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Hope Tokens Consent</DialogTitle>
          <DialogDescription>
            Please read and consent to participate in our Hope Tokens program.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 max-h-[300px] overflow-y-auto text-sm text-gray-700">
          <p>
            <strong>HOPE TOKENS CONSENT AGREEMENT</strong>
          </p>
          
          <p>
            By accepting this agreement, you consent to participate in the HopeConnect 
            Hope Tokens program, which rewards organ donors for their generous contributions 
            to society.
          </p>
          
          <p>
            <strong>What are Hope Tokens?</strong><br />
            Hope Tokens are a reward system designed to recognize and appreciate the 
            selfless act of organ donation. These tokens can be redeemed for various 
            benefits and services within our network of partners.
          </p>
          
          <p>
            <strong>How Hope Tokens Work:</strong>
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Donors receive Hope Tokens when their organs are collected for donation.</li>
            <li>Tokens are issued based on the specific organ donated and other factors.</li>
            <li>Tokens are stored securely in your HopeConnect account.</li>
            <li>Tokens can be redeemed through our platform for various benefits.</li>
          </ul>
          
          <p>
            <strong>Data Collection and Use:</strong><br />
            By consenting, you allow HopeConnect to:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Track your organ donation status and issue tokens accordingly.</li>
            <li>Maintain records of your token balance and redemption history.</li>
            <li>Communicate with you about your tokens and redemption opportunities.</li>
          </ul>
          
          <p>
            <strong>Your Rights:</strong><br />
            You have the right to:
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Access your token balance and redemption history at any time.</li>
            <li>Request detailed information about how your tokens are calculated.</li>
            <li>Withdraw from the Hope Tokens program at any time.</li>
            <li>Request deletion of your token data if you withdraw from the program.</li>
          </ul>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
          <Button 
            variant="outline" 
            onClick={handleDecline}
            disabled={isSubmitting}
          >
            Decline
          </Button>
          <Button 
            onClick={handleConsent} 
            disabled={isSubmitting}
          >
            I Consent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsentModal;
