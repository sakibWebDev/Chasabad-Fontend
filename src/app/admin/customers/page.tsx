// app/admin/customers/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Award,
  ShoppingBag,
  DollarSign,
  Download,
  Star,
  MessageCircle,
  MoreVertical
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address: string;
  city: string;
  country: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'blocked';
  loyaltyPoints: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  notes?: string;
  newsletter: boolean;
  wishlist: number;
  reviews: number;
}

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+8801712345678",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=4F46E5&color=fff",
    address: "123 Main Street",
    city: "Dhaka",
    country: "Bangladesh",
    totalOrders: 24,
    totalSpent: 15750,
    joinDate: "2023-06-15T08:00:00Z",
    lastActive: "2024-01-15T14:30:00Z",
    status: "active",
    loyaltyPoints: 1250,
    tier: "gold",
    newsletter: true,
    wishlist: 8,
    reviews: 12
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+8801876543210",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=10B981&color=fff",
    address: "456 Park Avenue",
    city: "Chittagong",
    country: "Bangladesh",
    totalOrders: 12,
    totalSpent: 8900,
    joinDate: "2023-08-20T10:00:00Z",
    lastActive: "2024-01-14T09:15:00Z",
    status: "active",
    loyaltyPoints: 890,
    tier: "silver",
    newsletter: true,
    wishlist: 5,
    reviews: 8
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+8801912345678",
    avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=EF4444&color=fff",
    address: "789 Lake Road",
    city: "Sylhet",
    country: "Bangladesh",
    totalOrders: 5,
    totalSpent: 3200,
    joinDate: "2023-10-05T14:30:00Z",
    lastActive: "2024-01-10T16:20:00Z",
    status: "active",
    loyaltyPoints: 320,
    tier: "bronze",
    newsletter: false,
    wishlist: 3,
    reviews: 2
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+8801712345679",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Wilson&background=8B5CF6&color=fff",
    address: "321 Hill View",
    city: "Rajshahi",
    country: "Bangladesh",
    totalOrders: 45,
    totalSpent: 45200,
    joinDate: "2023-03-10T11:00:00Z",
    lastActive: "2024-01-16T10:45:00Z",
    status: "active",
    loyaltyPoints: 4520,
    tier: "platinum",
    newsletter: true,
    wishlist: 12,
    reviews: 28
  },
  {
    id: "5",
    name: "Alex Brown",
    email: "alex@example.com",
    phone: "+8801876543211",
    avatar: "https://ui-avatars.com/api/?name=Alex+Brown&background=F59E0B&color=fff",
    address: "654 Garden Road",
    city: "Khulna",
    country: "Bangladesh",
    totalOrders: 0,
    totalSpent: 0,
    joinDate: "2024-01-01T09:00:00Z",
    lastActive: "2024-01-05T11:00:00Z",
    status: "inactive",
    loyaltyPoints: 0,
    tier: "bronze",
    newsletter: true,
    wishlist: 2,
    reviews: 0
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+8801912345679",
    avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=EC4899&color=fff",
    address: "987 Lakefront",
    city: "Barisal",
    country: "Bangladesh",
    totalOrders: 8,
    totalSpent: 6700,
    joinDate: "2023-09-12T13:15:00Z",
    lastActive: "2024-01-12T08:30:00Z",
    status: "blocked",
    loyaltyPoints: 670,
    tier: "silver",
    newsletter: false,
    wishlist: 4,
    reviews: 3
  },
  {
    id: "7",
    name: "David Lee",
    email: "david@example.com",
    phone: "+8801712345680",
    avatar: "https://ui-avatars.com/api/?name=David+Lee&background=06B6D4&color=fff",
    address: "555 New Road",
    city: "Dhaka",
    country: "Bangladesh",
    totalOrders: 18,
    totalSpent: 23400,
    joinDate: "2023-07-22T10:30:00Z",
    lastActive: "2024-01-13T15:45:00Z",
    status: "active",
    loyaltyPoints: 2340,
    tier: "gold",
    newsletter: true,
    wishlist: 7,
    reviews: 11
  },
  {
    id: "8",
    name: "Lisa Wang",
    email: "lisa@example.com",
    phone: "+8801876543222",
    avatar: "https://ui-avatars.com/api/?name=Lisa+Wang&background=14B8A6&color=fff",
    address: "777 Lake Drive",
    city: "Chittagong",
    country: "Bangladesh",
    totalOrders: 32,
    totalSpent: 28900,
    joinDate: "2023-05-18T12:00:00Z",
    lastActive: "2024-01-15T09:00:00Z",
    status: "active",
    loyaltyPoints: 2890,
    tier: "platinum",
    newsletter: true,
    wishlist: 15,
    reviews: 22
  }
];

const TIER_COLORS = {
  bronze: "bg-amber-100 text-amber-800",
  silver: "bg-gray-100 text-gray-800",
  gold: "bg-yellow-100 text-yellow-800",
  platinum: "bg-purple-100 text-purple-800"
};

const STATUS_COLORS = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  blocked: "bg-red-100 text-red-800"
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'blocked'>('all');
  const [tierFilter, setTierFilter] = useState<'all' | 'bronze' | 'silver' | 'gold' | 'platinum'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setCustomers(MOCK_CUSTOMERS);
    setLoading(false);
    toast.success(`${MOCK_CUSTOMERS.length} customers loaded`);
  };

  const handleDeleteCustomer = () => {
    if (selectedCustomer) {
      setCustomers(prev => prev.filter(c => c.id !== selectedCustomer.id));
      toast.success(`Customer "${selectedCustomer.name}" deleted`);
      setShowDeleteModal(false);
      setSelectedCustomer(null);
    }
  };

  const handleToggleStatus = (customer: Customer) => {
    const newStatus = customer.status === 'active' ? 'inactive' : 'active';
    setCustomers(prev => prev.map(c => 
      c.id === customer.id ? { ...c, status: newStatus as Customer['status'] } : c
    ));
    toast.success(`Customer status updated to ${newStatus}`);
  };

  const filteredCustomers = customers
    .filter(customer => {
      if (searchTerm && !customer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !customer.email.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (statusFilter !== 'all' && customer.status !== statusFilter) return false;
      if (tierFilter !== 'all' && customer.tier !== tierFilter) return false;
      return true;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    blocked: customers.filter(c => c.status === 'blocked').length,
    totalSpent: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    averageOrder: customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.filter(c => c.totalOrders > 0).length,
    newThisMonth: customers.filter(c => new Date(c.joinDate) > new Date('2024-01-01')).length
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Total Orders', 'Total Spent', 'Status', 'Tier', 'Join Date', 'Last Active'];
    const csvData = filteredCustomers.map(c => [
      c.name, c.email, c.phone, c.totalOrders, c.totalSpent, c.status, c.tier,
      new Date(c.joinDate).toLocaleDateString(),
      new Date(c.lastActive).toLocaleDateString()
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Customers exported successfully');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Customer Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your customer base</p>
        </div>
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Download className="h-5 w-5" />
          Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inactive</p>
              <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
            </div>
            <Users className="h-8 w-8 text-gray-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold text-purple-600">৳{stats.totalSpent.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Order</p>
              <p className="text-2xl font-bold text-orange-600">৳{Math.round(stats.averageOrder).toLocaleString()}</p>
            </div>
            <ShoppingBag className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New This Month</p>
              <p className="text-2xl font-bold text-cyan-600">{stats.newThisMonth}</p>
            </div>
            <Calendar className="h-8 w-8 text-cyan-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>

          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value as any)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Tiers</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setTierFilter('all');
              toast.success('Filters reset');
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Customers Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentCustomers.map((customer) => (
              <div
                key={customer.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src={customer.avatar || `https://ui-avatars.com/api/?name=${customer.name}&background=4F46E5&color=fff`}
                        alt={customer.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                          {customer.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${STATUS_COLORS[customer.status]}`}>
                            {customer.status}
                          </span>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${TIER_COLORS[customer.tier]}`}>
                            {customer.tier}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="h-4 w-4" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="h-4 w-4" />
                      {customer.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      {customer.city}, {customer.country}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      Joined {new Date(customer.joinDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t dark:border-gray-700">
                    <div>
                      <p className="text-xs text-gray-500">Total Orders</p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {customer.totalOrders}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Spent</p>
                      <p className="text-lg font-semibold text-green-600">
                        ৳{customer.totalSpent.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Loyalty Points</p>
                      <p className="text-lg font-semibold text-purple-600">
                        {customer.loyaltyPoints}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Wishlist Items</p>
                      <p className="text-lg font-semibold text-pink-600">
                        {customer.wishlist}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setShowDetailsModal(true);
                      }}
                      className="flex-1 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </button>
                    <button
                      onClick={() => handleToggleStatus(customer)}
                      className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setShowDeleteModal(true);
                      }}
                      className="px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {!loading && filteredCustomers.length > 0 && (
            <div className="flex items-center justify-between mt-6 px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCustomers.length)} of {filteredCustomers.length} customers
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-3 py-1">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Customer Details Modal */}
      {showDetailsModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={selectedCustomer.avatar}
                    alt={selectedCustomer.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {selectedCustomer.name}
                    </h2>
                    <div className="flex gap-2 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${STATUS_COLORS[selectedCustomer.status]}`}>
                        {selectedCustomer.status}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${TIER_COLORS[selectedCustomer.tier]}`}>
                        {selectedCustomer.tier}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <p className="font-medium">{selectedCustomer.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Address</label>
                    <p className="font-medium">{selectedCustomer.address}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">City, Country</label>
                    <p className="font-medium">{selectedCustomer.city}, {selectedCustomer.country}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Join Date</label>
                    <p className="font-medium">{new Date(selectedCustomer.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Last Active</label>
                    <p className="font-medium">{new Date(selectedCustomer.lastActive).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Newsletter</label>
                    <p className="font-medium">{selectedCustomer.newsletter ? 'Subscribed' : 'Not Subscribed'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Reviews</label>
                    <p className="font-medium">{selectedCustomer.reviews} reviews</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                    rows={3}
                    placeholder="Add notes about this customer..."
                    defaultValue={selectedCustomer.notes}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      toast.success(`Email sent to ${selectedCustomer.name}`);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Send Email
                  </button>
                  <button
                    onClick={() => {
                      toast.success(`Message sent to ${selectedCustomer.name}`);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Send SMS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">Delete Customer</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedCustomer.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCustomer}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}