import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';

const ClientPortal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    toast({
      title: "Login functionality",
      description: "This is a demo. Backend integration coming soon.",
    });
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <Card className="bg-slate-900/80 backdrop-blur-lg border-slate-800">
          <CardHeader className="text-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_03aae5c1-aaf2-4127-99b1-8c468650ee5d/artifacts/dp0lp6h4_image.png" 
              alt="SKRadius" 
              className="h-16 w-auto mx-auto mb-6"
            />
            <CardTitle className="text-3xl text-white">Client Portal</CardTitle>
            <CardDescription className="text-gray-400">
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-orange-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-400">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-orange-500 hover:text-orange-400 transition-colors">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6">
                Sign In
              </Button>

              <div className="text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <a href="#" className="text-orange-500 hover:text-orange-400 transition-colors">
                  Contact Sales
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ClientPortal;