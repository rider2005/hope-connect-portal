
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/lib/auth-context';
import { useDatabase, generateId, getTwoDaysFromNow } from '@/lib/db';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { sendDonationConfirmation } from '@/lib/email';

const Donate = () => {
  const { currentUser } = useAuth();
  const { createDonation, getAllHospitals } = useDatabase();
  const navigate = useNavigate();
  
  const [organ, setOrgan] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const hospitals = getAllHospitals();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;
    
    setIsSubmitting(true);
    
    // Generate a unique donor ID
    const donorId = `D${generateId().substring(0, 8).toUpperCase()}`;
    
    // Get appointment date (2 days from now)
    const appointmentDate = getTwoDaysFromNow();
    
    // Create donation record
    const donation = createDonation({
      donorId,
      donorId: currentUser.id,
      organ,
      bloodGroup,
      hospitalId,
      status: 'pending_health_check',
      appointmentDate,
    });
    
    // Get selected hospital details
    const selectedHospital = hospitals.find(h => h.id === hospitalId);
    
    // Send confirmation email
    if (selectedHospital) {
      sendDonationConfirmation(
        { ...currentUser, id: currentUser.id } as any, 
        donation,
        selectedHospital
      );
    }
    
    // Navigate to donor home after a brief delay
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/donor');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Donate an Organ</h1>
          <p className="text-gray-600 mb-8">
            Thank you for considering organ donation. Please fill out the form below 
            to register your intent to donate.
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle>Organ Donation Form</CardTitle>
              <CardDescription>
                Provide details about your donation intent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="organ">Organ to Donate</Label>
                    <Select 
                      value={organ} 
                      onValueChange={setOrgan}
                      required
                    >
                      <SelectTrigger id="organ">
                        <SelectValue placeholder="Select organ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kidney">Kidney</SelectItem>
                        <SelectItem value="liver">Liver</SelectItem>
                        <SelectItem value="heart">Heart</SelectItem>
                        <SelectItem value="lungs">Lungs</SelectItem>
                        <SelectItem value="pancreas">Pancreas</SelectItem>
                        <SelectItem value="intestines">Intestines</SelectItem>
                        <SelectItem value="corneas">Corneas</SelectItem>
                        <SelectItem value="skin">Skin</SelectItem>
                        <SelectItem value="bone_marrow">Bone Marrow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select 
                      value={bloodGroup} 
                      onValueChange={setBloodGroup}
                      required
                    >
                      <SelectTrigger id="bloodGroup">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hospital">Preferred Hospital</Label>
                    <Select 
                      value={hospitalId} 
                      onValueChange={setHospitalId}
                      required
                    >
                      <SelectTrigger id="hospital">
                        <SelectValue placeholder="Select hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        {hospitals.map(hospital => (
                          <SelectItem key={hospital.id} value={hospital.id}>
                            {hospital.hospitalName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <p className="text-xs text-muted-foreground">
                      By submitting this form, you agree to be contacted by the selected 
                      hospital for further screening and to schedule your health check 
                      appointment.
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Submit Donation"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col text-center">
              <p className="text-sm text-muted-foreground">
                Need more information before proceeding?{" "}
                <a href="/about" className="text-primary hover:underline">
                  Learn more about the donation process
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Donate;
