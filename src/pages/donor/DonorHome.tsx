
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
    setRedeemMessage('Congratulations! You have successfully redeemed your Hope Tokens. Your community benefits will be processed shortly.');
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
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome, Donor</h1>
        
        {redeemMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
            {redeemMessage}
          </div>
        )}
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Organ Donation</CardTitle>
              <CardDescription>
                Learn about organ donation and its impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Organ donation is a life-saving gift. A single donor can save 
                up to 8 lives and enhance many others.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Over 100,000 people are waiting for organ transplants</li>
                <li>A new person is added to the waiting list every 10 minutes</li>
                <li>One organ donor can save up to eight lives</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/donate">
                <Button>Become a Donor</Button>
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
                  <Button variant="outline">Donate Again</Button>
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
                <div className="bg-accent/20 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-accent mb-1">100</p>
                  <p className="text-sm text-accent">Hope Tokens Available</p>
                </div>
                <p className="text-gray-600 text-sm">
                  Thank you for your generous organ donation. Your Hope Tokens 
                  can be redeemed for community benefits.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant="secondary"
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
                  Organ donation provides numerous benefits:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Save multiple lives with a single donation</li>
                  <li>Give hope to families waiting for transplants</li>
                  <li>Create a lasting legacy of generosity</li>
                  <li>Contribute to medical research and innovation</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/about">
                  <Button variant="outline">Learn More</Button>
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
