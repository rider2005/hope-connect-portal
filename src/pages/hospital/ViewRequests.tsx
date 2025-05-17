
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useDatabase, Receiver } from '@/lib/db';
import { Check, Truck } from 'lucide-react';

const ViewRequests = () => {
  const { currentUser } = useAuth();
  const { getReceiverByHospitalId, updateReceiver } = useDatabase();
  const [requests, setRequests] = useState<Receiver[]>([]);
  
  useEffect(() => {
    if (currentUser) {
      const hospitalRequests = getReceiverByHospitalId(currentUser.id);
      setRequests(hospitalRequests);
    }
  }, [currentUser, getReceiverByHospitalId]);
  
  const handleUpdateStatus = (receiverId: string, newStatus: 'approved' | 'transported' | 'transplanted') => {
    updateReceiver(receiverId, { status: newStatus });
    
    // Update local state
    setRequests(prev => 
      prev.map(request =>
        request.id === receiverId
          ? { ...request, status: newStatus }
          : request
      )
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Organ Requests</h1>
        <p className="text-gray-600 mb-8">
          View and manage your hospital's organ requests
        </p>
        
        {requests.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">
                No organ requests have been made yet.
              </p>
              <div className="flex justify-center mt-4">
                <Button asChild>
                  <a href="/hospital/request">Request an Organ</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {requests.map(request => (
              <Card key={request.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{request.neededOrgan} ({request.bloodGroup})</span>
                    <Badge variant={
                      request.status === 'pending' ? 'outline' :
                      request.status === 'approved' ? 'secondary' :
                      request.status === 'transported' ? 'default' :
                      'secondary' // Changed from 'success' to 'secondary' for transplanted status
                    }>
                      {request.status === 'pending' ? 'Pending' :
                       request.status === 'approved' ? 'Approved' :
                       request.status === 'transported' ? 'Transported' :
                       'Transplanted'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Receiver ID:</span>
                        <p>{request.receiverId}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Request Date:</span>
                        <p>{request.requestDate}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex flex-wrap gap-2">
                      {request.status === 'pending' && (
                        <Button 
                          onClick={() => handleUpdateStatus(request.id, 'approved')}
                          size="sm"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      )}
                      
                      {request.status === 'approved' && (
                        <Button 
                          onClick={() => handleUpdateStatus(request.id, 'transported')}
                          size="sm"
                          variant="outline"
                        >
                          <Truck className="h-4 w-4 mr-1" />
                          Organ Transported
                        </Button>
                      )}
                      
                      {request.status === 'transported' && (
                        <Button 
                          onClick={() => handleUpdateStatus(request.id, 'transplanted')}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Organ Received & Transplanted
                        </Button>
                      )}
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

export default ViewRequests;
