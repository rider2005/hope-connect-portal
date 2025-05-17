
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About HopeConnect</h1>
        <p className="text-gray-600 max-w-3xl mb-8">
          HopeConnect is revolutionizing the organ donation ecosystem with transparency, 
          trust, and cutting-edge technology. Our mission is to save more lives by 
          connecting donors and recipients efficiently and securely.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                HopeConnect aims to transform the organ donation process by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Creating transparency in the organ allocation process</li>
                <li>Reducing wait times for critical transplants</li>
                <li>Building trust through secure and verifiable donation tracking</li>
                <li>Connecting donors and recipients more efficiently</li>
                <li>Rewarding organ donors through the Hope Tokens program</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Technology & Innovation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Our platform leverages advanced technology to ensure security and efficiency:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>AI-driven matching algorithms for optimal donor-recipient pairing</li>
                <li>Secure tracking of each organ from donation to transplant</li>
                <li>Real-time updates on organ availability and transport</li>
                <li>Token-based incentive system for organ donors</li>
                <li>Comprehensive data analytics to improve donation outcomes</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">The Organ Donation Process</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-hopeBlue font-bold">1</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Registration</h3>
              <p className="text-gray-600 text-sm">
                Donors register on the platform and provide basic medical information.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-hopeBlue font-bold">2</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Health Check</h3>
              <p className="text-gray-600 text-sm">
                Donors undergo comprehensive health screening to ensure suitability.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-hopeBlue font-bold">3</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Matching</h3>
              <p className="text-gray-600 text-sm">
                Our AI algorithms find the best match between donors and recipients.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-hopeBlue font-bold">4</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Transplantation</h3>
              <p className="text-gray-600 text-sm">
                The organ is securely transported and transplanted to the recipient.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hope Tokens Program</h2>
          <p className="text-gray-600 max-w-3xl mb-6">
            Hope Tokens are our way of recognizing and rewarding organ donors for their 
            incredible gift of life. These tokens can be redeemed for various benefits 
            and services within our network of partners.
          </p>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">How to Earn</h3>
                  <p className="text-gray-600 text-sm">
                    Hope Tokens are automatically allocated to donors when their organs 
                    are collected for donation. The number of tokens depends on the 
                    specific organ donated.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Token Benefits</h3>
                  <p className="text-gray-600 text-sm">
                    Hope Tokens can be redeemed for various benefits including healthcare 
                    services, wellness programs, and community recognition.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2">Participation</h3>
                  <p className="text-gray-600 text-sm">
                    Participation in the Hope Tokens program is voluntary. Donors can 
                    opt-in during registration or at any time during their donation journey.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
