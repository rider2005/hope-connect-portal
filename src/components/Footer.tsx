
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-gray-600 text-sm">
              HopeConnect is revolutionizing organ donation through transparency, 
              trust, and technology.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-hopeBlue text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-hopeBlue text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-hopeBlue text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">For Donors</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/donate" className="text-gray-600 hover:text-hopeBlue text-sm">
                  Donate an Organ
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-hopeBlue text-sm">
                  Donor Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-hopeBlue text-sm">
                  Register as Donor
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">For Hospitals</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-600 hover:text-hopeBlue text-sm">
                  Hospital Login
                </Link>
              </li>
              <li>
                <Link to="/hospital/request" className="text-gray-600 hover:text-hopeBlue text-sm">
                  Request Organ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-8 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} HopeConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
