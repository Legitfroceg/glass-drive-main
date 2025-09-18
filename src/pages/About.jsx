import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 glass-card mx-4 mt-4 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">GlassDrive</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10" onClick={() => navigate("/contact")}>
              Contact
            </Button>
            <Button className="glass-button" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </motion.nav>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-10 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">About GlassDrive</h1>
          <p className="text-white/80 leading-relaxed">
            GlassDrive is a modern car rental platform built for speed, comfort, and clarity. Enjoy a premium fleet, instant booking,
            transparent pricing, and a delightful UI with glassmorphism aesthetics.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="glass-card p-4">
              <p className="text-white font-semibold">Premium Fleet</p>
              <p className="text-white/70 text-sm">Curated vehicles for every journey.</p>
            </div>
            <div className="glass-card p-4">
              <p className="text-white font-semibold">Instant Booking</p>
              <p className="text-white/70 text-sm">Reserve your ride in seconds.</p>
            </div>
            <div className="glass-card p-4">
              <p className="text-white font-semibold">Trusted Support</p>
              <p className="text-white/70 text-sm">Available 24/7 to assist.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
