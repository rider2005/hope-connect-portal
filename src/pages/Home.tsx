
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';

const HeroSection = () => {
  const { isAuthenticated, isDonor, isHospital } = useAuth();
  
  return (
    <div className="relative bg-hopeGray py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Revolutionizing Organ Donation with Trust and Transparency
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600">
            HopeConnect is building a more efficient, transparent, and rewarding 
            organ donation ecosystem that saves more lives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {!isAuthenticated && (
              <>
                <Link to="/register">
                  <Button size="lg" className="rounded-full">
                    Become a Donor
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="rounded-full">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
            
            {isDonor && (
              <Link to="/donate">
                <Button size="lg" className="rounded-full">
                  Donate Now
                </Button>
              </Link>
            )}
            
            {isHospital && (
              <Link to="/hospital">
                <Button size="lg" className="rounded-full">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-16 bg-wave-pattern opacity-10"></div>
    </div>
  );
};

const StatsSection = () => (
  <div className="bg-white py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <p className="text-3xl md:text-4xl font-bold text-hopeBlue">100,000+</p>
          <p className="text-gray-600">Waitlist Patients</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold text-hopeBlue">36,000+</p>
          <p className="text-gray-600">Annual Transplants</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold text-hopeBlue">8</p>
          <p className="text-gray-600">Lives Saved Per Donor</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-bold text-hopeBlue">75+</p>
          <p className="text-gray-600">Lives Enhanced</p>
        </div>
      </div>
    </div>
  </div>
);

const FeaturesSection = () => (
  <div className="bg-hopeGray py-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">How HopeConnect Works</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Our platform connects donors, hospitals, and recipients through a secure and
          transparent process powered by advanced technology.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0EA5E9" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">Secure Registration</h3>
          <p className="text-gray-600">
            Donors and hospitals register securely on our platform with full 
            encryption of sensitive personal and medical data.
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0EA5E9" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21a48.25 48.25 0 0 1-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">AI-Driven Matching</h3>
          <p className="text-gray-600">
            Advanced algorithms match donors and recipients based on medical 
            compatibility, urgency, and geographical proximity.
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#0EA5E9" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">Hope Tokens</h3>
          <p className="text-gray-600">
            Donors receive Hope Tokens as recognition for their life-saving 
            contributions, redeemable for various benefits.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => (
  <div className="bg-white py-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Stories of Hope</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Real stories from donors and recipients whose lives have been 
          transformed through organ donation.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-hopeGray rounded-lg p-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
            <div>
              <h3 className="font-bold">Sarah Johnson</h3>
              <p className="text-sm text-gray-600">Kidney Recipient</p>
            </div>
          </div>
          <p className="text-gray-600">
            "HopeConnect made the process transparent and gave me confidence. 
            I received my kidney transplant within 6 months and now I'm living 
            a full life again."
          </p>
        </div>
        
        <div className="bg-hopeGray rounded-lg p-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
            <div>
              <h3 className="font-bold">Dr. Michael Chen</h3>
              <p className="text-sm text-gray-600">Transplant Surgeon</p>
            </div>
          </div>
          <p className="text-gray-600">
            "The platform's tracking system has revolutionized how we manage 
            organ transplants. It's increased our efficiency by 40% and improved 
            outcomes for our patients."
          </p>
        </div>
        
        <div className="bg-hopeGray rounded-lg p-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
            <div>
              <h3 className="font-bold">Robert Williams</h3>
              <p className="text-sm text-gray-600">Organ Donor</p>
            </div>
          </div>
          <p className="text-gray-600">
            "Knowing my donation was tracked securely gave me peace of mind. 
            The Hope Tokens program was an unexpected bonus that recognized my 
            contribution."
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CallToActionSection = () => (
  <div className="hope-gradient text-white py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">Join the HopeConnect Community</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Whether you're a potential donor, a hospital, or someone in need of a transplant, 
        HopeConnect is here to help make the donation process safer and more efficient.
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
        <TestimonialsSection />
        <CallToActionSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
