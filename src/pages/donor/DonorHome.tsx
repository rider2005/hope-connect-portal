
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { useDatabase, Donation } from '@/lib/db';
import ConsentModal from '@/components/ConsentModal';
import { Badge } from '@/components/ui/badge';
import { sendHopeTokensConfirmation } from '@/lib/email';

const DonorHome = () => {
  const { currentUser, donor } = useAuth();
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  const [redeemMessage, setRedeemMessage] = useState('');
  const { getDonationsByDonorId } = useDatabase();
  const [donations, setDonations] = useState<Donation[]>([]);
  
  useEffect(() => {
    if (currentUser) {
      const donorDonations = getDonationsByDonorId(currentUser.id);
      setDonations(donorDonations);
      
      // Show consent modal if donor has organ_collected status but hasn't given consent
      const hasCollectedOrgan = donorDonations.some(
        donation => donation.status === 'organ_collected'
      );
      if (hasCollectedOrgan && donor && !donor.consentGiven) {
        setTimeout(() => {
          setConsentModalOpen(true);
        }, 1000);
      }
    }
  }, [currentUser, getDonationsByDonorId, donor]);
  
  const handleRedeem = () => {
    setRedeemMessage('Congratulations! You have successfully redeemed your Hope Tokens for community benefits.');
    
    // Simulate confirming the redemption via email
    if (donor) {
      sendHopeTokensConfirmation(donor, 100);
    }
    
    setTimeout(() => {
      setRedeemMessage('');
    }, 5000);
  };
  
  const showHopeTokens = donor && donor.consentGiven && 
    donations.some(donation => donation.status === 'organ_collected');
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to HopeConnect</h1>
        <p className="text-gray-600 mb-8">
          Your gateway to transparent and efficient organ donation
        </p>
        
        {redeemMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
            {redeemMessage}
          </div>
        )}
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>India's Organ Crisis</CardTitle>
              <CardDescription>
                Understanding the need for donors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                India faces a critical organ shortage with over 300,000 patients awaiting 
                transplants and at least 20 individuals dying daily due to unavailability.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Only 0.52 donations per million people</li>
                <li>Far behind countries like Spain (49.6 pmp)</li>
                <li>One organ donor can save up to eight lives</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/donate">
                <Button className="bg-[#9b87f5] hover:bg-[#7E69AB]">Become a Donor</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Donations</CardTitle>
              <CardDescription>
                Track your donation journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              {donations.length > 0 ? (
                <div className="space-y-4">
                  {donations.map(donation => (
                    <div key={donation.id} className="border-b pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">{donation.organ}</span>
                        <Badge variant={
                          donation.status === 'pending_health_check' ? 'outline' :
                          donation.status === 'test_completed' ? 'secondary' :
                          donation.status === 'organ_collected' ? 'default' : 'destructive'
                        }>
                          {donation.status === 'pending_health_check' ? 'Pending Health Check' :
                           donation.status === 'test_completed' ? 'Test Completed' :
                           donation.status === 'organ_collected' ? 'Organ Collected' : 'Not Viable'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Blood Group: {donation.bloodGroup}</p>
                      <p className="text-sm text-gray-600">
                        Appointment: {donation.appointmentDate}
                      </p>
                      {donation.testCompleted && (
                        <>
                          <p className="text-sm text-gray-600 mt-2">
                            Donor Health: {donation.donorHealth}
                          </p>
                          <p className="text-sm text-gray-600">
                            Organ Health: {donation.organHealth}
                          </p>
                        </>
                      )}
                      {donation.status === 'organ_collected' && (
                        <p className="text-sm text-gray-600 mt-2">
                          Collection Date: {donation.collectionDate}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  You haven't made any donation pledges yet.
                </p>
              )}
            </CardContent>
            {donations.length > 0 && (
              <CardFooter>
                <Link to="/donate">
                  <Button variant="outline" className="border-[#9b87f5] text-[#9b87f5]">Donate Again</Button>
                </Link>
              </CardFooter>
            )}
          </Card>
          
          {showHopeTokens ? (
            <Card>
              <CardHeader>
                <CardTitle>Hope Tokens</CardTitle>
                <CardDescription>
                  Your contribution makes a difference
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#F1F0FB] p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-[#9b87f5] mb-1">100</p>
                  <p className="text-sm text-[#7E69AB]">Hope Tokens Available</p>
                </div>
                <p className="text-gray-600 text-sm">
                  Thank you for your generous organ donation. Your Hope Tokens 
                  can be redeemed for health credits, insurance perks, or tax benefits.
                </p>
                <div className="bg-gray-50 p-3 rounded text-xs text-gray-500">
                  <p className="font-medium mb-1">Redemption Options:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Health insurance discount (50 tokens)</li>
                    <li>Tax credit certificate (75 tokens)</li>
                    <li>Community service recognition (25 tokens)</li>
                    <li>Full benefits package (100 tokens)</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
                  onClick={handleRedeem}
                >
                  Redeem Tokens
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Benefits of Donation</CardTitle>
                <CardDescription>
                  Why organ donation matters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  HopeConnect rewards donors with Hope Tokens that provide:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Health credits for preventive care</li>
                  <li>Insurance perks for you and your family</li>
                  <li>Tax benefits on annual filings</li>
                  <li>Community recognition for your gift</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/about">
                  <Button variant="outline" className="border-[#9b87f5] text-[#9b87f5]">Learn More</Button>
                </Link>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      
      <ConsentModal 
        open={consentModalOpen}
        onOpenChange={setConsentModalOpen}
      />
      
      <Footer />
    </div>
  );
};

export default DonorHome;
