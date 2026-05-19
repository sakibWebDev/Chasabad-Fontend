// app/admin/subsidies/page.tsx
'use client';

import { useState } from 'react';
import {
  Wallet,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Users,
  Sprout,
  TrendingUp,
  FileText,
  Upload,
  ChevronDown,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SubsidiesPage() {
  const router = useRouter();
  const [view, setView] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const subsidies = [
    {
      id: 1,
      name: 'Organic Farming Subsidy',
      code: 'SUB-ORG-2024',
      type: 'Organic',
      totalBudget: 500000,
      allocated: 325000,
      remaining: 175000,
      beneficiaries: 234,
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      eligibility: ['Organic certified farms', 'Minimum 2 years experience'],
      description: 'Financial support for organic farming practices'
    },
    {
      id: 2,
      name: 'Water Conservation Grant',
      code: 'SUB-WTR-2024',
      type: 'Infrastructure',
      totalBudget: 750000,
      allocated: 450000,
      remaining: 300000,
      beneficiaries: 156,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      eligibility: ['Farmers with irrigation systems', 'Water-scarce regions'],
      description: 'Support for water-efficient irrigation systems'
    },
    {
      id: 3,
      name: 'Seed Distribution Program',
      code: 'SUB-SED-2024',
      type: 'Input Support',
      totalBudget: 300000,
      allocated: 300000,
      remaining: 0,
      beneficiaries: 567,
      status: 'completed',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      eligibility: ['Small-scale farmers', 'Registered cooperatives'],
      description: 'High-quality seeds at subsidized rates'
    },
    {
      id: 4,
      name: 'Equipment Purchase Subsidy',
      code: 'SUB-EQP-2024',
      type: 'Equipment',
      totalBudget: 1000000,
      allocated: 200000,
      remaining: 800000,
      beneficiaries: 89,
      status: 'pending',
      startDate: '2024-04-01',
      endDate: '2024-09-30',
      eligibility: ['Farmer groups', 'Cooperatives'],
      description: '50% subsidy on agricultural equipment'
    }
  ];

  // Filter subsidies based on search and status
  const filteredSubsidies = subsidies.filter(subsidy => {
    const matchesSearch = searchTerm === '' || 
      subsidy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subsidy.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subsidy.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || subsidy.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: subsidies.length,
    active: subsidies.filter(s => s.status === 'active').length,
    completed: subsidies.filter(s => s.status === 'completed').length,
    pending: subsidies.filter(s => s.status === 'pending').length,
    totalBudget: subsidies.reduce((acc, s) => acc + s.totalBudget, 0),
    allocated: subsidies.reduce((acc, s) => acc + s.allocated, 0),
    beneficiaries: subsidies.reduce((acc, s) => acc + s.beneficiaries, 0),
    utilizationRate: Math.round((subsidies.reduce((acc, s) => acc + s.allocated, 0) / subsidies.reduce((acc, s) => acc + s.totalBudget, 0)) * 100)
  };

  // Handler functions
  const handleView = (id: number) => {
    router.push(`/admin/subsidies/${id}`);
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/subsidies/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this subsidy program?')) {
      // Here you would call your API to delete
      console.log('Delete subsidy:', id);
      toast.success('Subsidy program deleted successfully');
      // Refresh the list or update state
    }
  };

  const handleCreate = () => {
    router.push('/admin/subsidies/create');
  };

  const handleExport = () => {
    toast.success('Export started. Download will begin shortly.');
    // Implement export logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-lime-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Link href="/admin" className="hover:text-lime-600">Dashboard</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white">Subsidies</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
                Subsidies Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage agricultural subsidies and financial assistance programs
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleExport}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button 
                onClick={handleCreate}
                className="px-4 py-2 bg-lime-600 text-white rounded-xl hover:bg-lime-700 transition-all flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Subsidy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { label: 'Total Programs', value: stats.total, icon: Wallet, color: 'lime' },
            { label: 'Active Programs', value: stats.active, icon: CheckCircle, color: 'green' },
            { label: 'Total Budget', value: `$${(stats.totalBudget / 1000).toFixed(0)}K`, icon: DollarSign, color: 'emerald' },
            { label: 'Allocated', value: `$${(stats.allocated / 1000).toFixed(0)}K`, icon: TrendingUp, color: 'blue' },
            { label: 'Beneficiaries', value: stats.beneficiaries.toLocaleString(), icon: Users, color: 'purple' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            const colorClasses = {
              lime: 'bg-lime-50 dark:bg-lime-900/20 text-lime-600',
              green: 'bg-green-50 dark:bg-green-900/20 text-green-600',
              emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600',
              blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
              purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600'
            };
            return (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Utilization Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Budget Utilization</h3>
            <span className="text-2xl font-bold text-lime-600">{stats.utilizationRate}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-lime-500 to-green-500 rounded-full h-3 transition-all duration-500" 
              style={{ width: `${stats.utilizationRate}%` }} 
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Allocated: ${(stats.allocated / 1000).toFixed(0)}K</span>
            <span>Remaining: ${((stats.totalBudget - stats.allocated) / 1000).toFixed(0)}K</span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by program name, code, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            
            <button className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
            
            <button className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr className="text-left text-sm text-gray-600 dark:text-gray-400">
                  <th className="px-6 py-3">Program Name</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Budget</th>
                  <th className="px-6 py-3">Allocated</th>
                  <th className="px-6 py-3">Remaining</th>
                  <th className="px-6 py-3">Beneficiaries</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredSubsidies.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Wallet className="h-12 w-12 text-gray-400" />
                        <p className="text-gray-500 dark:text-gray-400">No subsidies found</p>
                        <button 
                          onClick={handleCreate}
                          className="mt-2 px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
                        >
                          Create First Subsidy
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSubsidies.map((subsidy) => (
                    <tr key={subsidy.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{subsidy.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{subsidy.code}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs text-gray-700 dark:text-gray-300">
                          {subsidy.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        ${subsidy.totalBudget.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        ${subsidy.allocated.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${
                          subsidy.remaining > 0 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          ${subsidy.remaining.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {subsidy.beneficiaries.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          subsidy.status === 'active' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                            : subsidy.status === 'completed' 
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        }`}>
                          {subsidy.status.charAt(0).toUpperCase() + subsidy.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleView(subsidy.id)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </button>
                          <button 
                            onClick={() => handleEdit(subsidy.id)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </button>
                          <button 
                            onClick={() => handleDelete(subsidy.id)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredSubsidies.length} of {subsidies.length} programs
        </div>
      </div>
    </div>
  );
}