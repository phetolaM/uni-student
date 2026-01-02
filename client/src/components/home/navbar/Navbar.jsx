import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Info, 
  Mail, 
  User, 
  Menu, 
  X,
  Bell,
  ChevronDown,
  LogOut,
  Settings
} from "lucide-react";
import toast from "react-hot-toast";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock notifications
  const notifications = [
    { id: 1, text: "Assignment due in 2 days", time: "2h ago" },
    { id: 2, text: "New grade posted", time: "1d ago" },
    { id: 3, text: "Class schedule updated", time: "3d ago" },
  ];

  const handleNotificationClick = (id) => {
    toast.success("Notification marked as read");
    // In a real app, you'd mark it as read here
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-gradient-to-r from-slate-900 to-blue-900"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-2"
            >
              <div className={`w-8 h-8 rounded-lg ${
                scrolled ? "bg-blue-600" : "bg-blue-500"
              } flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">CT</span>
              </div>
              <Link to="/" className="flex flex-col">
                <span className={`text-xl font-bold ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}>
                  CampusTools
                </span>
                <span className={`text-xs ${
                  scrolled ? "text-gray-600" : "text-blue-200"
                }`}>
                  University Portal
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavItem to="/" icon={<Home size={18} />} text="Home" scrolled={scrolled} />
              <NavItem to="/about" icon={<Info size={18} />} text="About" scrolled={scrolled} />
              <NavItem to="/contact" icon={<Mail size={18} />} text="Contact" scrolled={scrolled} />
              
              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className={`p-2 rounded-lg mx-2 relative ${
                    scrolled 
                      ? "hover:bg-gray-100 text-gray-700" 
                      : "hover:bg-white/10 text-white"
                  }`}
                >
                  <Bell size={20} />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                          <span className="text-xs text-blue-600 cursor-pointer hover:underline">
                            Mark all as read
                          </span>
                        </div>
                        <div className="space-y-2">
                          {notifications.map((notif) => (
                            <motion.div
                              key={notif.id}
                              whileHover={{ x: 4 }}
                              className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer border"
                              onClick={() => handleNotificationClick(notif.id)}
                            >
                              <p className="text-sm text-gray-800">{notif.text}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Profile Dropdown */}
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center space-x-2 p-2 rounded-lg ml-2 ${
                    scrolled
                      ? "hover:bg-gray-100 text-gray-700"
                      : "hover:bg-white/10 text-white"
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="font-medium hidden lg:inline">Alex Johnson</span>
                  <ChevronDown size={16} className={userDropdownOpen ? "rotate-180 transition-transform" : ""} />
                </motion.button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border"
                    >
                      <div className="p-2">
                        <div className="px-3 py-2 border-b">
                          <p className="font-semibold text-gray-900">Alex Johnson</p>
                          <p className="text-sm text-gray-600">Computer Science</p>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                        >
                          <User size={16} />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                        >
                          <Settings size={16} />
                          <span>Settings</span>
                        </Link>
                        <button
                          onClick={() => {
                            toast.success("Logged out successfully");
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 mt-2"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-1">
                  <MobileNavItem to="/" icon={<Home size={20} />} text="Home" onClick={() => setIsOpen(false)} />
                  <MobileNavItem to="/about" icon={<Info size={20} />} text="About" onClick={() => setIsOpen(false)} />
                  <MobileNavItem to="/contact" icon={<Mail size={20} />} text="Contact" onClick={() => setIsOpen(false)} />
                  
                  <div className="pt-4 mt-4 border-t">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <User size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Alex Johnson</p>
                        <p className="text-sm text-gray-600">Student ID: 202312345</p>
                      </div>
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      <button className="flex items-center space-x-2 w-full p-3 rounded-lg hover:bg-gray-100 text-gray-700">
                        <Bell size={18} />
                        <span>Notifications ({notifications.length})</span>
                      </button>
                      <button 
                        onClick={() => {
                          setIsOpen(false);
                          toast.success("Logged out successfully");
                        }}
                        className="flex items-center space-x-2 w-full p-3 rounded-lg hover:bg-red-50 text-red-600"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}

// Desktop Nav Item Component
const NavItem = ({ to, icon, text, scrolled }) => (
  <Link to={to}>
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        scrolled
          ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          : "text-white hover:text-blue-200 hover:bg-white/5"
      }`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </motion.div>
  </Link>
);

// Mobile Nav Item Component
const MobileNavItem = ({ to, icon, text, onClick }) => (
  <Link to={to} onClick={onClick}>
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
    >
      <div className="text-blue-600">{icon}</div>
      <span className="font-medium">{text}</span>
    </motion.div>
  </Link>
);

export default Navbar;