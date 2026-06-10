"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Sun,
  Moon,
  ChevronDown,
  User,
  Shield,
  TrendingUp,
  Calendar,
  MessageSquare,
  Database,
  Truck,
  Wallet,
  Layers,
  Grid,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Key,
  Plus,
  Star,
  Mail,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { fetchCurrentUser, logoutUser, clearError } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/lib/hooks/useAppSelector";

// Role based access control
const ALLOWED_ROLES = ["SUPER_ADMIN", "ADMIN"];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  
  const dispatch = useAppDispatch();
  const { user, loading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();

  const [notifications] = useState([
    { id: 1, title: "New order received", message: "Order #ORD-001 has been placed", time: "5 min ago", read: false },
    { id: 2, title: "User registered", message: "New user John Doe signed up", time: "1 hour ago", read: false },
    { id: 3, title: "Low stock alert", message: "Rice seeds stock is low", time: "2 hours ago", read: true },
    { id: 4, title: "Payment received", message: "Payment of $299 received", time: "3 hours ago", read: true },
  ]);

  // Hydration fix
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch user and load theme
  useEffect(() => {
    if (isHydrated) {
      dispatch(fetchCurrentUser());
    }
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, [dispatch, isHydrated]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Authentication and role checking
  useEffect(() => {
    if (!isHydrated || loading) return;
    
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      toast.error("Please login to access admin panel");
      router.push("/login?redirect=/admin");
      return;
    }

    // Check if user has admin role
    if (!ALLOWED_ROLES.includes(user?.role?.toUpperCase() || "")) {
      toast.error("Access denied. Admin privileges required.");
      router.push("/");
      return;
    }
  }, [user, loading, isAuthenticated, router, isHydrated]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const toggleMenu = (menuTitle: string) => {
    if (expandedMenus.includes(menuTitle)) {
      setExpandedMenus(expandedMenus.filter((item) => item !== menuTitle));
    } else {
      setExpandedMenus([...expandedMenus, menuTitle]);
    }
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      color: "text-blue-500",
    },
    {
      title: "User Management",
      path: "/admin/users",
      icon: Users,
      color: "text-green-500",
      subItems: [
        { title: "All Users", path: "/admin/users", icon: Users },
        { title: "Add User", path: "/admin/users/create", icon: Plus },
        { title: "User Roles", path: "/admin/users/roles", icon: Shield },
      ],
    },
    {
      title: "Seed Management",
      path: "/admin/seeds",
      icon: Package,
      color: "text-emerald-500",
      subItems: [
        { title: "All Seeds", path: "/admin/seeds", icon: Grid },
        { title: "Add Seed", path: "/admin/seeds/create", icon: Plus },
        { title: "Categories", path: "/admin/seeds/categories", icon: Layers },
        { title: "Inventory", path: "/admin/seeds/inventory", icon: Database },
      ],
    },
    {
      title: "Order Management",
      path: "/admin/orders",
      icon: ShoppingCart,
      color: "text-purple-500",
      subItems: [
        { title: "All Orders", path: "/admin/orders", icon: ShoppingCart },
        { title: "Pending Orders", path: "/admin/orders/pending", icon: Clock },
        { title: "Processing", path: "/admin/orders/processing", icon: RefreshCw },
        { title: "Shipped", path: "/admin/orders/shipped", icon: Truck },
        { title: "Delivered", path: "/admin/orders/delivered", icon: CheckCircle },
        { title: "Cancelled", path: "/admin/orders/cancelled", icon: XCircle },
      ],
    },
    {
      title: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
      color: "text-yellow-500",
      subItems: [
        { title: "Overview", path: "/admin/analytics", icon: BarChart3 },
        { title: "Sales Report", path: "/admin/analytics/sales", icon: TrendingUp },
        { title: "User Analytics", path: "/admin/analytics/users", icon: Users },
        { title: "Seed Performance", path: "/admin/analytics/seeds", icon: Package },
      ],
    },
    {
      title: "Soil Tests",
      path: "/admin/soil-tests",
      icon: Database,
      color: "text-orange-500",
    },
    {
      title: "Expert Advice",
      path: "/admin/expert-advice",
      icon: MessageSquare,
      color: "text-pink-500",
      subItems: [
        { title: "All Advice", path: "/admin/expert-advice", icon: MessageSquare },
        { title: "Add Advice", path: "/admin/expert-advice/create", icon: Plus },
        { title: "Categories", path: "/admin/expert-advice/categories", icon: Layers },
      ],
    },
    {
      title: "Crop Plans",
      path: "/admin/crop-plans",
      icon: Calendar,
      color: "text-indigo-500",
    },
    {
      title: "Farmer Groups",
      path: "/admin/farmer-groups",
      icon: Users,
      color: "text-teal-500",
    },
    {
      title: "Subsidies",
      path: "/admin/subsidies",
      icon: Wallet,
      color: "text-lime-500",
    },
    {
      title: "Reviews",
      path: "/admin/reviews",
      icon: Star,
      color: "text-amber-500",
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: Settings,
      color: "text-gray-500",
      subItems: [
        { title: "General", path: "/admin/settings", icon: Settings },
        { title: "Payment", path: "/admin/settings/payment", icon: DollarSign },
        { title: "Email", path: "/admin/settings/email", icon: Mail },
        { title: "API Keys", path: "/admin/settings/api", icon: Key },
      ],
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isMenuOpen = (menuTitle: string) => {
    return expandedMenus.includes(menuTitle);
  };

  const shouldExpandSubmenu = (item: any) => {
    if (!item.subItems) return false;
    return item.subItems.some((subItem: any) => pathname === subItem.path);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showNotifications || showUserMenu) {
        const target = event.target as HTMLElement;
        if (!target.closest('.notification-dropdown') && !target.closest('.user-menu-dropdown')) {
          setShowNotifications(false);
          setShowUserMenu(false);
        }
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showNotifications, showUserMenu]);

  // Show loading state
  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-500 mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if no user or not admin (will redirect in useEffect)
  if (!isAuthenticated || !user || !ALLOWED_ROLES.includes(user?.role?.toUpperCase() || "")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full transition-all duration-300 ${
          sidebarOpen ? "w-72" : "w-20"
        } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} bg-white dark:bg-gray-800 shadow-xl overflow-y-auto`}
      >
        {/* Logo Section */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            {sidebarOpen && (
              <Link href="/admin" className="flex items-center space-x-3">
                <div className="text-3xl">🌾</div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    AgriGuide
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">Admin Panel</span>
                </div>
              </Link>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5 text-gray-500" />
              ) : (
                <Menu className="h-5 w-5 text-gray-500" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* User Info */}
        {sidebarOpen && (
          <div className="p-4 border-b dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user?.name || "Admin"}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {user?.name?.charAt(0) || "A"}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.role || "Administrator"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.path}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      isMenuOpen(item.title) || shouldExpandSubmenu(item)
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-600 dark:text-green-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                      {sidebarOpen && <span className="text-sm font-medium">{item.title}</span>}
                    </div>
                    {sidebarOpen && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isMenuOpen(item.title) || shouldExpandSubmenu(item) ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                  {sidebarOpen && (isMenuOpen(item.title) || shouldExpandSubmenu(item)) && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className={`flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                            pathname === subItem.path
                              ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          <subItem.icon className="h-4 w-4" />
                          <span>{subItem.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-600 dark:text-green-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  {sidebarOpen && <span className="text-sm font-medium">{item.title}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="sticky bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "lg:ml-72" : "lg:ml-20"
        }`}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left Side */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="h-5 w-5 text-gray-500" />
              </button>

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="h-5 w-5 text-gray-500" />
              </button>

              {/* Search Bar */}
              <div className="hidden md:flex items-center relative">
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {/* Notifications */}
              <div className="relative notification-dropdown">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
                >
                  <Bell className="h-5 w-5 text-gray-500" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 z-50">
                    <div className="p-4 border-b dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                        <button className="text-xs text-green-600 hover:text-green-700">
                          Mark all as read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                            !notification.read ? "bg-blue-50 dark:bg-blue-900/10" : ""
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="mt-0.5">
                              <Bell className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800 dark:text-white">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center border-t dark:border-gray-700">
                      <button className="text-sm text-green-600 hover:text-green-700">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative user-menu-dropdown">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user?.name || "Admin"}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user?.name?.charAt(0) || "A"}
                      </span>
                    </div>
                  )}
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 z-50">
                    <div className="p-4 border-b dark:border-gray-700">
                      <p className="font-semibold text-gray-800 dark:text-white">{user?.name || "Admin User"}</p>
                      <p className="text-xs text-gray-500">{user?.email || "admin@example.com"}</p>
                      <div className="mt-2 flex items-center space-x-1">
                        <Shield className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-green-600">{user?.role || "Administrator"}</span>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/admin/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/admin/settings"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-1 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}