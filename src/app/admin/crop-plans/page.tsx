// app/admin/crop-plans/page.tsx
'use client';

import { useState } from 'react';
import {
  Calendar,
  Plus,
  Search,
  Filter,
  Download,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  Sprout,
  Leaf,
  Droplet,
  Sun,
  MapPin,
  Activity,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Award,
  Target,
  BarChart3,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CropPlansPage() {
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const cropPlans = [
    {
      id: 1,
      name: 'Seasonal Rice Cultivation',
      crop: 'Rice',
      season: 'Kharif',
      startDate: '2024-03-01',
      endDate: '2024-06-30',
      status: 'active',
      farmers: 234,
      area: 1250,
      expectedYield: 3750,
      actualYield: null,
      budget: 125000,
      spent: 98750,
      progress: 78,
      tasks: [
        { name: 'Land Preparation', completed: true, date: '2024-03-10' },
        { name: 'Seed Sowing', completed: true, date: '2024-03-20' },
        { name: 'Fertilizer Application', completed: false, date: '2024-04-15' },
        { name: 'Irrigation', completed: false, date: '2024-05-01' },
        { name: 'Harvesting', completed: false, date: '2024-06-30' }
      ],
      location: 'Rajshahi Division',
      image: '/crops/rice.jpg'
    },
    {
      id: 2,
      name: 'Vegetable Farming Initiative',
      crop: 'Mixed Vegetables',
      season: 'Rabi',
      startDate: '2024-01-01',
      endDate: '2024-04-30',
      status: 'active',
      farmers: 156,
      area: 450,
      expectedYield: 1350,
      actualYield: 1280,
      budget: 75000,
      spent: 68250,
      progress: 91,
      tasks: [
        { name: 'Land Preparation', completed: true, date: '2024-01-10' },
        { name: 'Seed Sowing', completed: true, date: '2024-01-25' },
        { name: 'Fertilizer Application', completed: true, date: '2024-02-20' },
        { name: 'Pest Control', completed: true, date: '2024-03-10' },
        { name: 'Harvesting', completed: false, date: '2024-04-30' }
      ],
      location: 'Chattogram Division',
      image: '/crops/vegetables.jpg'
    },
    {
      id: 3,
      name: 'Wheat Production Plan',
      crop: 'Wheat',
      season: 'Rabi',
      startDate: '2023-11-01',
      endDate: '2024-03-31',
      status: 'completed',
      farmers: 98,
      area: 320,
      expectedYield: 960,
      actualYield: 1020,
      budget: 45000,
      spent: 43800,
      progress: 100,
      tasks: [
        { name: 'Land Preparation', completed: true, date: '2023-11-10' },
        { name: 'Seed Sowing', completed: true, date: '2023-11-25' },
        { name: 'Fertilizer Application', completed: true, date: '2023-12-20' },
        { name: 'Irrigation', completed: true, date: '2024-01-15' },
        { name: 'Harvesting', completed: true, date: '2024-03-31' }
      ],
      location: 'Khulna Division',
      image: '/crops/wheat.jpg'
    },
    {
      id: 4,
      name: 'Maize Cultivation Plan',
      crop: 'Maize',
      season: 'Kharif',
      startDate: '2024-04-15',
      endDate: '2024-08-15',
      status: 'planned',
      farmers: 67,
      area: 280,
      expectedYield: 980,
      actualYield: null,
      budget: 55000,
      spent: 0,
      progress: 0,
      tasks: [
        { name: 'Land Preparation', completed: false, date: '2024-04-20' },
        { name: 'Seed Sowing', completed: false, date: '2024-04-30' },
        { name: 'Fertilizer Application', completed: false, date: '2024-05-20' },
        { name: 'Pest Control', completed: false, date: '2024-06-15' },
        { name: 'Harvesting', completed: false, date: '2024-08-15' }
      ],
      location: 'Dhaka Division',
      image: '/crops/maize.jpg'
    }
  ];

  const stats = {
    total: cropPlans.length,
    active: cropPlans.filter(p => p.status === 'active').length,
    completed: cropPlans.filter(p => p.status === 'completed').length,
    planned: cropPlans.filter(p => p.status === 'planned').length,
    totalFarmers: cropPlans.reduce((acc, p) => acc + p.farmers, 0),
    totalArea: cropPlans.reduce((acc, p) => acc + p.area, 0),
    totalBudget: cropPlans.reduce((acc, p) => acc + p.budget, 0),
    avgProgress: Math.round(cropPlans.reduce((acc, p) => acc + p.progress, 0) / cropPlans.length)
  };

  const filteredPlans = cropPlans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      planned: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
    };
    const icons = {
      active: <Activity className="h-3 w-3" />,
      completed: <CheckCircle className="h-3 w-3" />,
      planned: <Clock className="h-3 w-3" />
    };
    return (
      <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${badges[status as keyof typeof badges]}`}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Link href="/admin" className="hover:text-indigo-600">Dashboard</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white">Crop Plans</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Crop Plans Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Plan and monitor crop cultivation activities
              </p>
            </div>
            
            <Link href="/admin/crop-plans/create">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>New Crop Plan</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Plans', value: stats.total, icon: Calendar, color: 'indigo' },
            { label: 'Active Plans', value: stats.active, icon: Activity, color: 'green' },
            { label: 'Total Farmers', value: stats.totalFarmers.toLocaleString(), icon: Users, color: 'teal' },
            { label: 'Total Area (Acres)', value: stats.totalArea.toLocaleString(), icon: MapPin, color: 'orange' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            const colorClasses = {
              indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600',
              green: 'bg-green-50 dark:bg-green-900/20 text-green-600',
              teal: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600',
              orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600'
            };
            return (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by plan name, crop, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                />
              </div>
            </div>
            
            <select className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700">
              <option>All Seasons</option>
              <option>Kharif</option>
              <option>Rabi</option>
            </select>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="planned">Planned</option>
            </select>
            
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
              <button 
                onClick={() => setView('grid')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${view === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
              >
                Grid
              </button>
              <button 
                onClick={() => setView('table')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${view === 'table' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {view === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <div key={plan.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden">
                {/* Header */}
                <div className="relative h-40 bg-gradient-to-br from-indigo-500 to-purple-600">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(plan.status)}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-white font-semibold text-lg">{plan.name}</h3>
                    <p className="text-white/90 text-sm">{plan.crop}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      <span>{plan.startDate} - {plan.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{plan.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{plan.farmers} farmers</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Sprout className="h-4 w-4 text-gray-400" />
                      <span>{plan.area} acres</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span className="font-semibold">{plan.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 rounded-full h-2 transition-all"
                        style={{ width: `${plan.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="flex items-center justify-between pt-3 border-t dark:border-gray-700">
                    <div>
                      <p className="text-xs text-gray-500">Budget</p>
                      <p className="font-semibold">${plan.budget.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Spent</p>
                      <p className="font-semibold">${plan.spent.toLocaleString()}</p>
                    </div>
                    <Link href={`/admin/crop-plans/${plan.id}`}>
                      <button className="px-3 py-1.5 text-sm bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {view === 'table' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr className="text-left text-sm text-gray-600 dark:text-gray-400">
                    <th className="px-6 py-3">Plan Name</th>
                    <th className="px-6 py-3">Crop</th>
                    <th className="px-6 py-3">Season</th>
                    <th className="px-6 py-3">Farmers</th>
                    <th className="px-6 py-3">Area (Acres)</th>
                    <th className="px-6 py-3">Progress</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredPlans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{plan.name}</td>
                      <td className="px-6 py-4">{plan.crop}</td>
                      <td className="px-6 py-4">{plan.season}</td>
                      <td className="px-6 py-4">{plan.farmers}</td>
                      <td className="px-6 py-4">{plan.area}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-indigo-600 rounded-full h-2" style={{ width: `${plan.progress}%` }} />
                          </div>
                          <span className="text-sm">{plan.progress}%</span>
                        </div>
                       </td>
                      <td className="px-6 py-4">{getStatusBadge(plan.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded-lg">
                            <Eye className="h-4 w-4 text-blue-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-lg">
                            <Edit className="h-4 w-4 text-green-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-lg">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                       </td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}