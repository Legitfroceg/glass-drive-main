import { Car, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function Contact() {
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
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10" onClick={() => navigate("/about")}>
              About
            </Button>
            <Button className="glass-button" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </motion.nav>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Get in touch</h2>
            <div className="space-y-4 text-white/80">
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5" /> support@glassdrive.app
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5" /> +91 98765 43210
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="w-5 h-5" /> Mumbai • Kolkata • Delhi NCR
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-card p-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! We’ll get back to you shortly.");
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input className="glass-input" placeholder="Your name" required />
              <Input className="glass-input" type="email" placeholder="Your email" required />
            </div>
            <Input className="glass-input" placeholder="Subject" required />
            <Textarea className="glass-input" rows={6} placeholder="How can we help you?" required />
            <Button type="submit" className="glass-button">Send Message</Button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
