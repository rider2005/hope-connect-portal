
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/lib/auth-context';
import { useDatabase, generateId, formatDate } from '@/lib/db';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const RequestOrgan = () => {
  const { currentUser } = useAuth();
  const { createReceiver } = useDatabase();
  const navigate = useNavigate();
  
  const [organ, setOrgan] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;
    
    setIsSubmitting(true);
    
    // Generate a unique receiver ID
    const receiverId = `R${generateId().substring(0, 8).toUpperCase()}`;
    
    // Create receiver record
    createReceiver({
      hospitalId: currentUser.id,
      receiverId,
      neededOrgan: organ,
      bloodGroup,
      requestDate: formatDate(new Date()),
      status: 'pending',
    });
    
    // Navigate to requests page after a brief delay
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/hospital/requests');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Request an Organ</h1>
          <p className="text-gray-600 mb-8">
            Submit a new organ request for a patient in need.
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle>Organ Request Form</CardTitle>
              <CardDescription>
                Provide details about the organ needed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="organ">Needed Organ</Label>
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
                    <Label htmlFor="bloodGroup">Required Blood Group</Label>
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
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing Request..." : "Submit Request"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col text-center">
              <p className="text-sm text-muted-foreground">
                Once submitted, your request will be processed by the HopeConnect system.
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RequestOrgan;
