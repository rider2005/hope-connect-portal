
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import PrivateRoute from "@/components/PrivateRoute";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorHome from "./pages/donor/DonorHome";
import Donate from "./pages/donor/Donate";
import HospitalHome from "./pages/hospital/HospitalHome";
import UpdateTests from "./pages/hospital/UpdateTests";
import RequestOrgan from "./pages/hospital/RequestOrgan";
import ViewRequests from "./pages/hospital/ViewRequests";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Donor Routes */}
            <Route element={<PrivateRoute allowedRoles={['donor']} />}>
              <Route path="/donor" element={<DonorHome />} />
              <Route path="/donate" element={<Donate />} />
            </Route>
            
            {/* Hospital Routes */}
            <Route element={<PrivateRoute allowedRoles={['hospital']} />}>
              <Route path="/hospital" element={<HospitalHome />} />
              <Route path="/hospital/tests" element={<UpdateTests />} />
              <Route path="/hospital/request" element={<RequestOrgan />} />
              <Route path="/hospital/requests" element={<ViewRequests />} />
            </Route>
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
