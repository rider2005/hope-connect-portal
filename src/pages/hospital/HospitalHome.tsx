
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useDatabase, Donation } from '@/lib/db';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDate } from '@/lib/db';

const HospitalHome = () => {
  const { currentUser, hospital } = useAuth();
  const { getDonationsByHospitalId, updateDonation } = useDatabase();
  const [donations, setDonations] = useState<Donation[]>([]);
  
  // Collection dialog state
  const [collectionDialogOpen, setCollectionDialogOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [collectionDate, setCollectionDate] = useState(formatDate(new Date()));
  
  useEffect(() => {
    if (currentUser) {
      const hospitalDonations = getDonationsByHospitalId(currentUser.id);
      setDonations(hospitalDonations);
    }
  }, [currentUser, getDonationsByHospitalId]);
  
  const openCollectionDialog = (donation: Donation) => {
    setSelectedDonation(donation);
    setCollectionDate(formatDate(new Date()));
    setCollectionDialogOpen(true);
  };
  
  const handleCollectOrgan = () => {
    if (selectedDonation) {
      updateDonation(selectedDonation.id, {
        status: 'organ_collected',
        collectionDate
      });
      
      // Update local state
      setDonations(prev => 
        prev.map(donation =>
          donation.id === selectedDonation.id
            ? { ...donation, status: 'organ_collected', collectionDate }
            : donation
        )
      );
      
      setCollectionDialogOpen(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {hospital?.hospitalName || 'Hospital'} Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Manage organ donations and requests
        </p>
        
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>
                Donations assigned to your hospital
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donations.length > 0 ? (
                  donations.slice(0, 3).map(donation => (
                    <div key={donation.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{donation.organ}</p>
                        <p className="text-sm text-gray-500">Blood Type: {donation.bloodGroup}</p>
                        <p className="text-sm text-gray-500">
                          Status: {donation.status === 'pending_health_check' ? 'Pending Health Check' :
                                  donation.status === 'test_completed' ? 'Test Completed' :
                                  donation.status === 'organ_collected' ? 'Organ Collected' : 'Not Viable'}
                        </p>
                      </div>
                      {donation.status === 'test_completed' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openCollectionDialog(donation)}
                        >
                          Mark Deceased
                        </Button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No donations assigned to your hospital.</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <a href="/hospital/tests">Manage Health Tests</a>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Organ Requests</CardTitle>
              <CardDescription>
                Request and track needed organs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Need an organ for a patient? Submit a request to search for matching donors.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <a href="/hospital/request">Request an Organ</a>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>
                Track status of organ requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Monitor and update the status of your hospital's organ requests.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href="/hospital/requests">View Requests</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Dialog open={collectionDialogOpen} onOpenChange={setCollectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Donor as Deceased</DialogTitle>
            <DialogDescription>
              Record organ collection from deceased donor
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Organ</Label>
              <Input value={selectedDonation?.organ} readOnly />
            </div>
            
            <div className="space-y-2">
              <Label>Blood Group</Label>
              <Input value={selectedDonation?.bloodGroup} readOnly />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="collectionDate">Collection Date</Label>
              <Input
                id="collectionDate"
                type="date"
                value={collectionDate}
                onChange={(e) => setCollectionDate(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setCollectionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCollectOrgan}
              variant="destructive"
            >
              Confirm Collection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default HospitalHome;
