
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';

// Hero section with enhanced descriptions from the problem statement
const HeroSection = () => {
  const { isAuthenticated, isDonor, isHospital } = useAuth();
  
  return (
    <div className="relative bg-[#F1F0FB] py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Revolutionizing Organ Donation with AI and Blockchain
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600">
            HopeConnect is a decentralized, AI-powered platform built to improve 
            transparency and efficiency in India's organ donation system.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {!isAuthenticated && (
              <>
                <Link to="/register">
                  <Button size="lg" className="rounded-full bg-[#9b87f5] hover:bg-[#7E69AB]">
                    Become a Donor
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="rounded-full border-[#9b87f5] text-[#9b87f5]">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
            
            {isDonor && (
              <Link to="/donate">
                <Button size="lg" className="rounded-full bg-[#9b87f5] hover:bg-[#7E69AB]">
                  Donate Now
                </Button>
              </Link>
            )}
            
            {isHospital && (
              <Link to="/hospital">
                <Button size="lg" className="rounded-full bg-[#9b87f5] hover:bg-[#7E69AB]">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Stats section with real numbers from the problem statement
const StatsSection = () => (
  <div className="bg-white py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <p className="text-3xl md:text-4xl font-bold text-[#0EA5E9]">300,000+</p>
          <p className="text-gray-600">Waitlist Patients</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold text-[#0EA5E9]">0.52</p>
          <p className="text-gray-600">Donations per Million</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold text-[#0EA5E9]">8</p>
          <p className="text-gray-600">Lives Saved Per Donor</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold text-red-500">20</p>
          <p className="text-gray-600">Deaths Daily Due to Shortage</p>
        </div>
      </div>
    </div>
  </div>
);

// Features section from the problem statement
const FeaturesSection = () => (
  <div className="bg-[#F1F0FB] py-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          HopeConnect uses cutting-edge technology to revolutionize the organ donation ecosystem.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0EA5E9" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21a48.25 48.25 0 0 1-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">AI-Optimized Matching</h3>
          <p className="text-gray-600">
            Advanced algorithms factoring blood type, HLA compatibility, age, 
            comorbidities, proximity, and predicted graft viability.
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0EA5E9" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">Blockchain Registry</h3>
          <p className="text-gray-600">
            Hyperledger Fabric ensures an immutable audit trail from consent to 
            transplant, with smart contracts enforcing donor-specified allocation.
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0EA5E9" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">Geospatial Hub</h3>
          <p className="text-gray-600">
            Combines Mapbox and OR-Tools to optimize transport logistics, 
            accounting for traffic, customs, and hospital readiness.
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0EA5E9" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">Stakeholder Portals</h3>
          <p className="text-gray-600">
            Dashboards for hospitals, NGOs, regulators, and donor families with 
            real-time data on allocations, compliance, and impact.
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0EA5E9" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">Donor Incentives</h3>
          <p className="text-gray-600">
            Encourages registrations via Hope Tokens that can be redeemed for
            health credits, insurance perks, or tax benefits.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CallToActionSection = () => (
  <div className="bg-gradient-to-r from-[#9b87f5] to-[#0EA5E9] text-white py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">Join the HopeConnect Network</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Together, we can increase India's organ donation rate and save thousands of lives.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/register">
          <Button size="lg" variant="secondary" className="text-gray-900">
            Register Now
          </Button>
        </Link>
        <Link to="/about">
          <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <CallToActionSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
