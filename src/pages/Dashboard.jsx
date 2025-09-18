
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { dataSource } from "@/lib/dataSource";
import { Navigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, Calendar, MapPin, Clock, Fuel, Users, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { isLoading, isAuthenticated, user, signOut } = useAuth();
  const [availableCars, setAvailableCars] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingStep, setBookingStep] = useState("form"); // "form" | "success"
  const [city, setCity] = useState("Mumbai");
  const [dropoffMode, setDropoffMode] = useState("service"); // "service" | "custom"
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    pickupLocation: "",
    dropoffLocation: "",
    notes: "",
  });

  // Fetch available cars and user bookings from REST API
  useEffect(() => {
    async function fetchData() {
      try {
        const cars = await dataSource.getAvailableCars();
        setAvailableCars(cars || []);
      } catch {}
      try {
        const bookings = await dataSource.getUserBookings();
        setUserBookings(bookings || []);
      } catch {}
    }
    fetchData();
  }, []);

  const serviceCenterAddress = (c) => {
    switch (c) {
      case "Mumbai":
        return "GlassDrive Service Center - Mumbai, BKC, 400051";
      case "Kolkata":
        return "GlassDrive Service Center - Kolkata, Park Street, 700016";
      case "Delhi NCR":
        return "GlassDrive Service Center - Delhi NCR, Cyber City, 122002";
      default:
        return "GlassDrive Service Center";
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [availableCars]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="glass-card p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const openBooking = (car) => {
    setSelectedCar(car);
    const defaultCity = "Mumbai";
    setCity(defaultCity);
    setDropoffMode("service");
    setForm({
      startDate: "",
      endDate: "",
      pickupLocation: "",
      dropoffLocation: serviceCenterAddress(defaultCity),
      notes: "",
    });
    setBookingStep("form");
    setIsBookingOpen(true);
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    if (!form.startDate || !form.endDate || !form.pickupLocation || !form.dropoffLocation) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const start = new Date(form.startDate).getTime();
    const end = new Date(form.endDate).getTime();
    if (isNaN(start) || isNaN(end) || end <= start) {
      toast.error("Please select a valid date range.");
      return;
    }
    try {
      await dataSource.createBooking({
        carId: selectedCar._id,
        startDate: start,
        endDate: end,
        pickupLocation: form.pickupLocation,
        dropoffLocation: form.dropoffLocation,
        notes: form.notes || undefined,
      });
      toast.success("Booking created successfully!");
      setBookingStep("success");
      // Refresh bookings
      const bookings = await dataSource.getUserBookings();
      setUserBookings(bookings || []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create booking.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "rented":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "maintenance":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  // Main dashboard UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name || user?.email || "User"}!</h1>
              {user?.email && (
                <p className="text-white/70">Email: {user.email}</p>
              )}
              {user?.role && (
                <p className="text-white/70 capitalize">Role: {user.role}</p>
              )}
              <p className="text-white/70">Ready to pick up your next ride?</p>
            </div>
            <div className="flex items-center">
              {user?.role === "admin" && (
                <Button onClick={() => navigate("/admin")} variant="outline" className="glass-button">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Panel
                </Button>
              )}
              <Button onClick={() => signOut()} variant="ghost" className="ml-2 text-white/80 hover:text-white hover:bg-white/10">
                Sign out
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" ref={containerRef}>
          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Available Cars</CardTitle>
              <Car className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{availableCars?.length || 0}</div>
              <p className="text-xs text-white/60">Ready to book now</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Your Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userBookings?.length || 0}</div>
              <p className="text-xs text-white/60">Total reservations</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">Active Rentals</CardTitle>
              <Clock className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{userBookings?.filter((b) => b.status === "active").length || 0}</div>
              <p className="text-xs text-white/60">Currently rented</p>
            </CardContent>
          </Card>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Available Cars</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCars?.map((car) => (
              <motion.div key={car._id} whileHover={{ scale: 1.02 }} className="glass-card p-4 cursor-pointer group">
                <div className="aspect-video bg-white/5 rounded-lg mb-4 overflow-hidden">
                  {car.imageUrl ? (
                    <img
                      src={car.imageUrl}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Car className="w-12 h-12 text-white/40" />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-white">
                      {car.make} {car.model}
                    </h3>
                    <p className="text-sm text-white/60">
                      {car.year} • {car.color}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-white/70">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {car.seats}
                    </div>
                    <div className="flex items-center gap-1">
                      <Fuel className="w-4 h-4" />
                      {car.fuelType}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {car.location}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold text-white">${car.pricePerHour}/hr</p>
                      <p className="text-sm text-white/60">${car.pricePerDay}/day</p>
                    </div>
                    <Badge className={getStatusColor(car.status)}>{car.status}</Badge>
                  </div>

                  <Button className="w-full glass-button" onClick={() => openBooking(car)}>Book Now</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent className="glass-card border-0 max-w-xl">
            {bookingStep === "form" ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-white">Book {selectedCar ? `${selectedCar.make} ${selectedCar.model}` : "Car"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateBooking} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate" className="text-white/80">Start Date & Time</Label>
                      <Input
                        id="startDate"
                        type="datetime-local"
                        className="glass-input"
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate" className="text-white/80">End Date & Time</Label>
                      <Input
                        id="endDate"
                        type="datetime-local"
                        className="glass-input"
                        value={form.endDate}
                        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-white/80">City</Label>
                      <Select
                        value={city}
                        onValueChange={(value) => {
                          setCity(value);
                          if (dropoffMode === "service") {
                            setForm((f) => ({ ...f, dropoffLocation: serviceCenterAddress(value) }));
                          }
                        }}
                      >
                        <SelectTrigger className="glass-input">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mumbai">Mumbai</SelectItem>
                          <SelectItem value="Kolkata">Kolkata</SelectItem>
                          <SelectItem value="Delhi NCR">Delhi NCR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="pickupLocation" className="text-white/80">Pickup Address</Label>
                      <Input
                        id="pickupLocation"
                        className="glass-input"
                        placeholder="Street, City, Zip"
                        value={form.pickupLocation}
                        onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white/80 mb-2 block">Drop-off Preference</Label>
                    <RadioGroup
                      className="grid grid-cols-1 md:grid-cols-2 gap-3"
                      value={dropoffMode}
                      onValueChange={(val) => {
                        setDropoffMode(val);
                        if (val === "service") {
                          setForm((f) => ({ ...f, dropoffLocation: serviceCenterAddress(city) }));
                        } else {
                          setForm((f) => ({ ...f, dropoffLocation: "" }));
                        }
                      }}
                    >
                      <div className="glass-card p-3 flex items-center gap-2">
                        <RadioGroupItem id="service" value="service" />
                        <Label htmlFor="service" className="text-white">Service Center (default)</Label>
                      </div>
                      <div className="glass-card p-3 flex items-center gap-2">
                        <RadioGroupItem id="custom" value="custom" />
                        <Label htmlFor="custom" className="text-white">Custom Drop-off (extra charge)</Label>
                      </div>
                    </RadioGroup>
                    <p className="text-white/60 text-xs mt-2">
                      Custom drop-off incurs an additional fee based on distance. Final amount will be shared at pickup.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="dropoffLocation" className="text-white/80">Drop-off Address</Label>
                    <Input
                      id="dropoffLocation"
                      className="glass-input"
                      placeholder={dropoffMode === "service" ? "Auto-filled GlassDrive Service Center" : "Street, City, Zip"}
                      value={form.dropoffLocation}
                      disabled={dropoffMode === "service"}
                      onChange={(e) => setForm({ ...form, dropoffLocation: e.target.value })}
                      required
                    />
                    {dropoffMode === "service" && (
                      <p className="text-white/60 text-xs mt-2">Auto-set to closest GlassDrive Service Center for {city}.</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-white/80">Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      className="glass-input"
                      placeholder="Any special instructions..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    />
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10" onClick={() => setIsBookingOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="glass-button">Confirm Booking</Button>
                  </DialogFooter>
                </form>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="text-white">Booking Confirmed</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-white/80">
                  <p>Your {selectedCar ? `${selectedCar.make} ${selectedCar.model}` : "car"} has been reserved.</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Delivery: Our agent will deliver the car to your pickup address at the selected start time.</li>
                    <li>Return: Please return the car to your selected drop-off address or any nearby GlassDrive Service Center.</li>
                    <li>Verification: Keep your valid ID and driver's license handy for handover.</li>
                  </ul>
                  <p className="text-white/60 text-sm">You can view details anytime under "Your Recent Bookings".</p>
                </div>
                <DialogFooter>
                  <Button className="glass-button" onClick={() => setIsBookingOpen(false)}>Done</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {userBookings && userBookings.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Your Recent Bookings</h2>
            <div className="space-y-4">
              {userBookings.slice(0, 3).map((booking) => (
                <div key={booking._id} className="glass-card p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white">
                        {booking.car?.make} {booking.car?.model}
                      </h3>
                      <p className="text-sm text-white/60">
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-white/70 mt-1">
                        {booking.pickupLocation} → {booking.dropoffLocation}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      <p className="text-lg font-bold text-white mt-2">${booking.totalAmount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}