import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// Removed OTP imports
import { useAuth } from "@/hooks/use-auth";
import { ArrowRight, Loader2, Mail, Car } from "lucide-react";
import { Suspense, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { gsap } from "gsap";

function Auth({ redirectAfterAuth } = {}) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  // Remove step/otp state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      const redirect = redirectAfterAuth || "/dashboard";
      navigate(redirect);
    }
  }, [authLoading, isAuthenticated, navigate, redirectAfterAuth]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("login", formData);
      // Success: navigation will happen via useEffect
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      const redirect = redirectAfterAuth || "/dashboard";
      navigate(redirect);
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("The verification code you entered is incorrect.");
      setIsLoading(false);
      setOtp("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 glass-card mx-4 mt-4 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">GlassDrive</span>
          </div>
        </div>
      </motion.nav>

      <div className="flex-1 flex items-center justify-center relative z-10 px-4 py-20">
        <div className="flex items-center justify-center h-full flex-col">
          <Card ref={cardRef} className="min-w-[400px] pb-0 glass-card border-0 shadow-2xl">
            {/* Username/email + password login form */}
            <>
              <CardHeader className="text-center">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mt-4">
                    <Car className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-white">Welcome to GlassDrive</CardTitle>
                <CardDescription className="text-white/70">Sign in to your account</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent>
                  <div className="mb-4">
                    <Label htmlFor="email" className="text-white/80">Email</Label>
                    <Input name="email" id="email" placeholder="name@example.com" type="email" className="glass-input" disabled={isLoading} required />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="password" className="text-white/80">Password</Label>
                    <Input name="password" id="password" type="password" className="glass-input" disabled={isLoading} required />
                  </div>
                  {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button type="submit" className="w-full glass-button" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                    <span className="ml-2">Sign In</span>
                  </Button>
                  <Button type="button" variant="outline" className="w-full glass-button-outline" onClick={() => navigate('/register')}>
                    Register
                  </Button>
                </CardFooter>
              </form>
            </>

            <div className="py-4 px-6 text-xs text-center text-white/60 bg-white/5 border-t border-white/10 rounded-b-lg">
              Made by{" "}
              <a href="https://tpzao.vly.site/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
                MEhul
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage(props) {
  return (
    <Suspense>
      <Auth {...props} />
    </Suspense>
  );
}