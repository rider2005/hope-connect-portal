
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState<'donor' | 'hospital'>('donor');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const success = login(email, password);
      
      if (success) {
        if (accountType === 'donor') {
          navigate('/donor');
        } else {
          navigate('/hospital');
        }
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="donor" 
              className="w-full mb-6"
              onValueChange={(value) => setAccountType(value as 'donor' | 'hospital')}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="donor">Donor</TabsTrigger>
                <TabsTrigger value="hospital">Hospital</TabsTrigger>
              </TabsList>
              
              <TabsContent value="donor">
                <p className="text-sm text-muted-foreground mb-4">
                  Sign in to manage your organ donations and hope tokens.
                </p>
              </TabsContent>
              
              <TabsContent value="hospital">
                <p className="text-sm text-muted-foreground mb-4">
                  Hospital staff can sign in here to manage donations and requests.
                </p>
                <div className="bg-muted p-3 rounded-md mb-4">
                  <p className="text-xs text-muted-foreground mb-1">Demo Hospital Credentials:</p>
                  <p className="text-xs">- mercy@hospital.com / password123</p>
                  <p className="text-xs">- central@hospital.com / password123</p>
                  <p className="text-xs">- hope@hospital.com / password123</p>
                  <p className="text-xs">- city@hospital.com / password123</p>
                </div>
              </TabsContent>
            </Tabs>
            
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="#" 
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Register here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
