import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Car } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="glass-card p-10 text-center max-w-md">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
          <Car className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-white/70 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <Button onClick={() => navigate("/")} className="glass-button">Back to GlassDrive</Button>
      </div>
    </div>
  );
}