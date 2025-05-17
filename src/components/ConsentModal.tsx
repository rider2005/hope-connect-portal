
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from '@/lib/auth-context';
import { sendHopeTokensConfirmation } from '@/lib/email';

interface ConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConsentModal = ({ open, onOpenChange }: ConsentModalProps) => {
  const { updateDonorConsent, donor } = useAuth();
  
  const handleConsent = () => {
    updateDonorConsent(true);
    
    // Simulate sending Hope Tokens email
    if (donor) {
      sendHopeTokensConfirmation(donor, 100);
    }
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Hope Tokens Consent</DialogTitle>
          <DialogDescription>
            Receive Hope Tokens as recognition for your organ donation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p>
            Dear Donor,
          </p>
          <p>
            Thank you for your selfless contribution to our organ donation program. 
            We are pleased to inform you that you are eligible for our Hope Tokens program.
          </p>
          <p>
            <strong>What are Hope Tokens?</strong>
          </p>
          <p>
            Hope Tokens are our way of recognizing and appreciating your life-saving donation.
            These tokens can be redeemed for various benefits including:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Health insurance discounts</li>
            <li>Tax benefits</li>
            <li>Priority access to healthcare services</li>
            <li>Recognition in our donor community</li>
          </ul>
          <p>
            By giving consent, you will receive 100 Hope Tokens which will be added to 
            your account immediately.
          </p>
          <p>
            Please confirm your consent to join the Hope Tokens program.
          </p>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Decline
          </Button>
          <Button 
            className="bg-[#9b87f5] hover:bg-[#7E69AB]"
            onClick={handleConsent}
          >
            Give Consent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsentModal;
