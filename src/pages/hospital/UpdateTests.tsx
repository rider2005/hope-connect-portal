
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/lib/auth-context';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useDatabase, Donation } from '@/lib/db';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sendHealthCheckResultsEmail } from '@/lib/email';

const UpdateTests = () => {
  const { currentUser, hospital } = useAuth();
  const { getDonationsByHospitalId, updateDonation, findDonorByUserId } = useDatabase();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: { testCompleted: boolean, donorHealth: string, organHealth: string } }>({});
  const [isSubmitting, setIsSubmitting] = useState<{ [key: string]: boolean }>({});
  
  useEffect(() => {
    if (currentUser) {
      // Get donations with pending_health_check status for this hospital
      const hospitalDonations = getDonationsByHospitalId(currentUser.id)
        .filter(donation => donation.status === 'pending_health_check');
      
      setDonations(hospitalDonations);
      
      // Initialize form data
      const initialFormData: { [key: string]: { testCompleted: boolean, donorHealth: string, organHealth: string } } = {};
      hospitalDonations.forEach(donation => {
        initialFormData[donation.id] = {
          testCompleted: donation.testCompleted || false,
          donorHealth: donation.donorHealth || '',
          organHealth: donation.organHealth || ''
        };
      });
      setFormData(initialFormData);
    }
  }, [currentUser, getDonationsByHospitalId]);
  
  const handleInputChange = (donationId: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [donationId]: {
        ...prev[donationId],
        [field]: value
      }
    }));
  };
  
  const handleUpdateTest = async (donationId: string) => {
    const data = formData[donationId];
    
    if (!data.testCompleted || !data.donorHealth || !data.organHealth) {
      return;
    }
    
    setIsSubmitting(prev => ({ ...prev, [donationId]: true }));
    
    const donation = donations.find(d => d.id === donationId);
    
    if (donation) {
      updateDonation(donationId, {
        status: 'test_completed',
        testCompleted: data.testCompleted,
        donorHealth: data.donorHealth,
        organHealth: data.organHealth
      });
      
      // Find the donor for this donation
      const donor = donation ? findDonorByUserId(donation.donorId) : null;
      
      // Send email to donor
      if (donor && hospital) {
        sendHealthCheckResultsEmail(
          donor,
          {
            ...donation,
            testCompleted: data.testCompleted,
            donorHealth: data.donorHealth,
            organHealth: data.organHealth
          },
          hospital
        );
      }
      
      // Update UI state
      setDonations(prev => prev.filter(d => d.id !== donationId));
    }
    
    setTimeout(() => {
      setIsSubmitting(prev => ({ ...prev, [donationId]: false }));
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Update Test Results</h1>
        <p className="text-gray-600 mb-8">
          Update health check results for donors who selected {hospital?.hospitalName}
        </p>
        
        {donations.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">
                No pending health checks at the moment.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {donations.map(donation => (
              <Card key={donation.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>{donation.organ} Donation ({donation.bloodGroup})</span>
                    <span className="text-sm font-normal text-gray-500">
                      Donor ID: {donation.donorId}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`testCompleted-${donation.id}`}
                        checked={formData[donation.id]?.testCompleted || false}
                        onCheckedChange={(checked) => 
                          handleInputChange(donation.id, 'testCompleted', !!checked)
                        }
                      />
                      <Label htmlFor={`testCompleted-${donation.id}`}>Test Completed</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`donorHealth-${donation.id}`}>Health Status of the Donor</Label>
                      <Input 
                        id={`donorHealth-${donation.id}`}
                        value={formData[donation.id]?.donorHealth || ''}
                        onChange={(e) => 
                          handleInputChange(donation.id, 'donorHealth', e.target.value)
                        }
                        placeholder="e.g. Good overall health"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`organHealth-${donation.id}`}>Health Status of the Organs</Label>
                      <Input 
                        id={`organHealth-${donation.id}`}
                        value={formData[donation.id]?.organHealth || ''}
                        onChange={(e) => 
                          handleInputChange(donation.id, 'organHealth', e.target.value)
                        }
                        placeholder="e.g. Organ is in good condition"
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button
                        onClick={() => handleUpdateTest(donation.id)}
                        disabled={
                          isSubmitting[donation.id] ||
                          !formData[donation.id]?.testCompleted ||
                          !formData[donation.id]?.donorHealth ||
                          !formData[donation.id]?.organHealth
                        }
                      >
                        {isSubmitting[donation.id] ? "Updating..." : "Update Results"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default UpdateTests;
