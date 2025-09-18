import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Car, MapPin, Clock, Shield, Star, ArrowRight, Zap, Users, Award } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router";

export default function Landing() {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target.children,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) observer.observe(featuresRef.current);
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate(user?.role === "admin" ? "/admin" : "/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 glass-card mx-4 mt-4 p-4"
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">GlassDrive</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => navigate("/dashboard")}
            >
              Fleet
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => navigate("/about")}>
              About
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => navigate("/contact")}
            >
              Contact
            </Button>
            {isAuthenticated && (
              <Button
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            )}
            <Button onClick={handleGetStarted} className="glass-button">
              {isAuthenticated ? (user?.role === "admin" ? "Admin Panel" : "Dashboard") : "Get Started"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.nav>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center" ref={heroRef}>
          <motion.div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 glass-card text-white/80 text-sm mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Premium Car Rental Experience
            </div>
          </motion.div>

          <motion.h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            Your Ride,
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Your Way
            </span>
          </motion.h1>

          <motion.p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the future of car rental with Pick-Me-Up. Premium vehicles, instant booking, and seamless
            service at your fingertips.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={handleGetStarted} size="lg" className="glass-button text-lg px-8 py-6 group">
              {isAuthenticated ? "Go to Dashboard" : "Start Your Journey"}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="glass-button-outline text-lg px-8 py-6"
              onClick={() => {
                if (!isAuthenticated) {
                  alert('You are not logged in');
                  return;
                }
                navigate('/dashboard');
              }}
            >
              <Car className="w-5 h-5 mr-2" />
              View Fleet
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 relative"
        >
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 animate-pulse"></div>
              <Car className="w-24 h-24 text-white/60 relative z-10" />
              <div className="absolute top-4 left-4 glass-card p-2">
                <div className="flex items-center text-white/80 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Available Now
                </div>
              </div>
              <div className="absolute bottom-4 right-4 glass-card p-3">
                <div className="text-white font-semibold">$25/hour</div>
                <div className="text-white/60 text-sm">Tesla Model 3</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20" ref={statsRef}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div className="text-center">
            <div className="glass-card p-6 mb-4">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/70">Premium Cars</div>
            </div>
          </motion.div>
          <motion.div className="text-center">
            <div className="glass-card p-6 mb-4">
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/70">Happy Customers</div>
            </div>
          </motion.div>
          <motion.div className="text-center">
            <div className="glass-card p-6 mb-4">
              <div className="text-4xl font-bold text-white mb-2">25+</div>
              <div className="text-white/70">Cities</div>
            </div>
          </motion.div>
          <motion.div className="text-center">
            <div className="glass-card p-6 mb-4">
              <div className="text-4xl font-bold text-white mb-2">4.9★</div>
              <div className="text-white/70">Rating</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20" ref={featuresRef}>
        <motion.div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">Why Choose Pick-Me-Up?</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            We're revolutionizing car rental with cutting-edge technology and premium service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div className="glass-card p-8 group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Instant Booking</h3>
            <p className="text-white/70 leading-relaxed">
              Book your perfect ride in seconds with our streamlined booking process. No paperwork, no waiting.
            </p>
          </motion.div>

          <motion.div className="glass-card p-8 group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Fully Insured</h3>
            <p className="text-white/70 leading-relaxed">
              Drive with confidence knowing every vehicle comes with comprehensive insurance coverage.
            </p>
          </motion.div>

          <motion.div className="glass-card p-8 group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Multiple Locations</h3>
            <p className="text-white/70 leading-relaxed">
              Pick up and drop off at any of our convenient locations across the city.
            </p>
          </motion.div>

          <motion.div className="glass-card p-8 group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">24/7 Support</h3>
            <p className="text-white/70 leading-relaxed">
              Our dedicated support team is available round the clock to assist you.
            </p>
          </motion.div>

          <motion.div className="glass-card p-8 group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Premium Fleet</h3>
            <p className="text-white/70 leading-relaxed">
              Choose from our curated selection of luxury and premium vehicles.
            </p>
          </motion.div>

          <motion.div className="glass-card p-8 group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Best Prices</h3>
            <p className="text-white/70 leading-relaxed">
              Competitive pricing with no hidden fees. What you see is what you pay.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-12 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Hit the Road?</h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Pick-Me-Up for their transportation needs.
          </p>
          <Button onClick={handleGetStarted} size="lg" className="glass-button text-lg px-12 py-6 group">
            {isAuthenticated ? "Go to Dashboard" : "Get Started Today"}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      <footer className="relative z-10 glass-card mx-4 mb-4 p-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">GlassDrive</span>
          </div>
          <p className="text-white/60">
            © 2024 GlassDrive. All rights reserved. |
            <a
              href="https://vly.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 underline hover:text-white transition-colors"
            >
              Powered by vly.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}