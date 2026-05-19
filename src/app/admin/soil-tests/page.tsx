// app/admin/soil-tests/page.tsx
'use client';

import { useState } from 'react';
import {
  Database,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Activity,
  Droplet,
  FileText,
  Upload,
  RefreshCw,
  ArrowUpRight,
  Clock,
  User,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';

export default function SoilTestsPage() {
  const [view, setView] = useState('grid'); // grid or table
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [soilTypeFilter, setSoilTypeFilter] = useState('all');

  // Mock Soil Tests Data
  const soilTests = [
    {
      id: 1,
      testId: "ST-2024-001",
      farmerName: "Md. Karim Uddin",
      location: "Rajshahi, Bangladesh",
      dateSubmitted: "2024-01-15",
      dateCompleted: "2024-01-18",
      status: "completed",
      soilType: "Loamy",
      ph: 6.8,
      phStatus: "optimal",
      nitrogen: 45,
      nitrogenStatus: "medium",
      phosphorus: 32,
      phosphorusStatus: "medium",
      potassium: 28,
      potassiumStatus: "low",
      organicMatter: 2.8,
      conductivity: 0.45,
      recommendations: [
        "Add organic compost to improve soil structure",
        "Apply potassium-rich fertilizer",
        "Maintain current irrigation schedule"
      ],
      cropSuggestions: ["Tomatoes", "Peppers", "Eggplants"],
      labTechnician: "Dr. Rahman",
      contact: "01712345678",
      coordinates: { lat: 24.3745, lng: 88.6042 }
    },
    {
      id: 2,
      testId: "ST-2024-002",
      farmerName: "Fatema Begum",
      location: "Jessore, Bangladesh",
      dateSubmitted: "2024-01-14",
      dateCompleted: null,
      status: "processing",
      soilType: "Clay",
      ph: 7.2,
      phStatus: "optimal",
      nitrogen: 28,
      nitrogenStatus: "low",
      phosphorus: 45,
      phosphorusStatus: "high",
      potassium: 35,
      potassiumStatus: "optimal",
      organicMatter: 1.5,
      conductivity: 0.68,
      recommendations: [],
      cropSuggestions: ["Rice", "Jute", "Wheat"],
      labTechnician: "Dr. Sultana",
      contact: "01898765432",
      coordinates: { lat: 23.1667, lng: 89.2083 }
    },
    {
      id: 3,
      testId: "ST-2024-003",
      farmerName: "Abdul Halim",
      location: "Bogra, Bangladesh",
      dateSubmitted: "2024-01-10",
      dateCompleted: "2024-01-12",
      status: "completed",
      soilType: "Sandy Loam",
      ph: 5.5,
      phStatus: "low",
      nitrogen: 52,
      nitrogenStatus: "high",
      phosphorus: 28,
      phosphorusStatus: "medium",
      potassium: 22,
      potassiumStatus: "low",
      organicMatter: 1.2,
      conductivity: 0.32,
      recommendations: [
        "Add lime to increase pH",
        "Increase organic matter content",
        "Apply potassium fertilizer",
        "Practice crop rotation"
      ],
      cropSuggestions: ["Potatoes", "Carrots", "Onions"],
      labTechnician: "Dr. Islam",
      contact: "01987654321",
      coordinates: { lat: 24.8511, lng: 89.3699 }
    },
    {
      id: 4,
      testId: "ST-2024-004",
      farmerName: "Nurul Amin",
      location: "Comilla, Bangladesh",
      dateSubmitted: "2024-01-16",
      dateCompleted: null,
      status: "pending",
      soilType: "",
      ph: 0,
      phStatus: "pending",
      nitrogen: 0,
      nitrogenStatus: "pending",
      phosphorus: 0,
      phosphorusStatus: "pending",
      potassium: 0,
      potassiumStatus: "pending",
      organicMatter: 0,
      conductivity: 0,
      recommendations: [],
      cropSuggestions: [],
      labTechnician: "",
      contact: "01711223344",
      coordinates: { lat: 23.4581, lng: 91.1839 }
    }
  ];

  // Filtered tests based on search and filters
  const filteredTests = soilTests.filter(test => {
    const matchesSearch = searchTerm === '' || 
      test.testId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || test.status === statusFilter;
    const matchesSoilType = soilTypeFilter === 'all' || test.soilType === soilTypeFilter;
    
    return matchesSearch && matchesStatus && matchesSoilType;
  });

  const stats = {
    total: soilTests.length,
    completed: soilTests.filter(t => t.status === 'completed').length,
    processing: soilTests.filter(t => t.status === 'processing').length,
    pending: soilTests.filter(t => t.status === 'pending').length,
    averagePH: (soilTests.filter(t => t.ph > 0).reduce((acc, t) => acc + t.ph, 0) / soilTests.filter(t => t.ph > 0).length).toFixed(1),
    lowNutrient: soilTests.filter(t => t.nitrogenStatus === 'low' || t.potassiumStatus === 'low' || t.phosphorusStatus === 'low').length
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
    };
    const icons = {
      completed: <CheckCircle className="h-3 w-3" />,
      processing: <RefreshCw className="h-3 w-3 animate-spin" />,
      pending: <Clock className="h-3 w-3" />
    };
    return (
      <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${badges[status as keyof typeof badges]}`}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPHStatus = (ph: number) => {
    if (ph < 5.5) return { text: 'Acidic', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' };
    if (ph > 7.5) return { text: 'Alkaline', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' };
    return { text: 'Optimal', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' };
  };

  const getNutrientStatus = (value: number, status: string) => {
    if (status === 'low') return { status: 'Low', color: 'text-red-600' };
    if (status === 'high') return { status: 'High', color: 'text-orange-600' };
    return { status: 'Optimal', color: 'text-green-600' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Link href="/admin" className="hover:text-orange-600">Dashboard</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white">Soil Tests</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Soil Tests Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage soil analysis reports and recommendations
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Last 30 Days</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span className="text-sm">New Test</span>
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span className="text-sm">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { label: 'Total Tests', value: stats.total, icon: Database, color: 'blue', change: '+12%' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'green', change: '+8%' },
            { label: 'Processing', value: stats.processing, icon: RefreshCw, color: 'blue', change: '+5%' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'yellow', change: '-3%' },
            { label: 'Avg. pH Level', value: stats.averagePH, icon: Droplet, color: 'orange', suffix: '' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
              green: 'bg-green-50 dark:bg-green-900/20 text-green-600',
              yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600',
              orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600'
            };
            return (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">
                      {stat.value}
                      {stat.suffix && <span className="text-lg ml-1">{stat.suffix}</span>}
                    </p>
                    {stat.change && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-xs text-green-600 flex items-center gap-0.5">
                          <ArrowUpRight className="h-3 w-3" />
                          {stat.change}
                        </span>
                        <span className="text-xs text-gray-500">vs last month</span>
                      </div>
                    )}
                  </div>
                  <div className={`p-3 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by test ID, farmer name, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
              </select>
              
              <select 
                value={soilTypeFilter}
                onChange={(e) => setSoilTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700"
              >
                <option value="all">All Soil Types</option>
                <option value="Loamy">Loamy</option>
                <option value="Clay">Clay</option>
                <option value="Sandy Loam">Sandy Loam</option>
              </select>
              
              <button className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <Filter className="h-4 w-4" />
              </button>
              
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
        </div>

        {/* Grid View */}
        {view === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => {
              const phStatus = getPHStatus(test.ph);
              const nutrientWarnings = [];
              if (test.nitrogenStatus === 'low') nutrientWarnings.push('Nitrogen');
              if (test.phosphorusStatus === 'low') nutrientWarnings.push('Phosphorus');
              if (test.potassiumStatus === 'low') nutrientWarnings.push('Potassium');
              
              return (
                <div key={test.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group">
                  {/* Header */}
                  <div className="p-4 border-b dark:border-gray-700 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-gray-500">{test.testId}</p>
                        <h3 className="font-semibold text-lg mt-1">{test.farmerName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <p className="text-xs text-gray-500">{test.location}</p>
                        </div>
                      </div>
                      {getStatusBadge(test.status)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    {/* Soil Type & pH */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplet className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">Soil Type:</span>
                        <span className="text-sm font-medium">{test.soilType || '—'}</span>
                      </div>
                      {test.ph > 0 && (
                        <div className={`px-2 py-1 rounded-lg text-xs font-medium ${phStatus.bg} ${phStatus.color}`}>
                          pH: {test.ph} ({phStatus.text})
                        </div>
                      )}
                    </div>

                    {/* Nutrient Levels */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-500">NUTRIENT LEVELS</p>
                      <div className="space-y-1.5">
                        {[
                          { label: 'Nitrogen', value: test.nitrogen, status: test.nitrogenStatus },
                          { label: 'Phosphorus', value: test.phosphorus, status: test.phosphorusStatus },
                          { label: 'Potassium', value: test.potassium, status: test.potassiumStatus }
                        ].map((nutrient, idx) => {
                          const nutrientStatus = getNutrientStatus(nutrient.value, nutrient.status);
                          return (
                            <div key={idx}>
                              <div className="flex justify-between text-xs mb-1">
                                <span>{nutrient.label}</span>
                                <span className={nutrientStatus.color}>
                                  {nutrient.value > 0 ? `${nutrient.value} ppm` : '—'} ({nutrientStatus.status})
                                </span>
                              </div>
                              {nutrient.value > 0 && (
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                  <div 
                                    className={`rounded-full h-1.5 ${
                                      nutrient.status === 'low' ? 'bg-red-500' :
                                      nutrient.status === 'high' ? 'bg-orange-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${(nutrient.value / 60) * 100}%` }}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Warnings */}
                    {nutrientWarnings.length > 0 && (
                      <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <p className="text-xs text-yellow-700 dark:text-yellow-300">
                          Low {nutrientWarnings.join(', ')} - Action needed
                        </p>
                      </div>
                    )}

                    {/* Date Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t dark:border-gray-700">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Submitted: {test.dateSubmitted}</span>
                      </div>
                      {test.dateCompleted && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>Completed: {test.dateCompleted}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between gap-2">
                    <button className="flex-1 px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
                      <Eye className="h-4 w-4" />
                      View Details
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Report
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table View - FIXED VERSION */}
        {view === 'table' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr className="text-left text-sm text-gray-600 dark:text-gray-400">
                    <th className="px-6 py-3">Test ID</th>
                    <th className="px-6 py-3">Farmer Name</th>
                    <th className="px-6 py-3">Location</th>
                    <th className="px-6 py-3">Soil Type</th>
                    <th className="px-6 py-3">pH</th>
                    <th className="px-6 py-3">Nutrients</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredTests.map((test) => (
                    <tr key={test.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm">{test.testId}</span>
                       </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{test.farmerName}</span>
                        </div>
                       </td>
                      <td className="px-6 py-4 text-sm">{test.location}</td>
                      <td className="px-6 py-4 text-sm">{test.soilType || '—'}</td>
                      <td className="px-6 py-4">
                        {test.ph > 0 ? (
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPHStatus(test.ph).bg} ${getPHStatus(test.ph).color}`}>
                            {test.ph}
                          </span>
                        ) : '—'}
                       </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <div className={`w-2 h-2 rounded-full ${test.nitrogenStatus === 'low' ? 'bg-red-500' : test.nitrogenStatus === 'high' ? 'bg-orange-500' : 'bg-green-500'}`} 
                               title={`Nitrogen: ${test.nitrogenStatus}`} />
                          <div className={`w-2 h-2 rounded-full ${test.phosphorusStatus === 'low' ? 'bg-red-500' : test.phosphorusStatus === 'high' ? 'bg-orange-500' : 'bg-green-500'}`}
                               title={`Phosphorus: ${test.phosphorusStatus}`} />
                          <div className={`w-2 h-2 rounded-full ${test.potassiumStatus === 'low' ? 'bg-red-500' : test.potassiumStatus === 'high' ? 'bg-orange-500' : 'bg-green-500'}`}
                               title={`Potassium: ${test.potassiumStatus}`} />
                        </div>
                       </td>
                      <td className="px-6 py-4">{getStatusBadge(test.status)}</td>
                      <td className="px-6 py-4 text-sm">{test.dateSubmitted}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Eye className="h-4 w-4 text-blue-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Edit className="h-4 w-4 text-green-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
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

        {/* Soil Health Summary Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Soil Health Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4">Soil Health Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>pH Level Distribution</span>
                  <span>Optimal: 50% | Acidic: 25% | Alkaline: 25%</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 w-1/2" />
                  <div className="bg-orange-500 w-1/4" />
                  <div className="bg-blue-500 w-1/4" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Organic Matter</span>
                  <span>Average: 1.8%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-emerald-500 rounded-full h-2" style={{ width: '36%' }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">Target: 3-5% for optimal growth</p>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Nutrient Deficiency Alerts</span>
                  <span>{stats.lowNutrient} tests show deficiencies</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Nitrogen</span>
                    <span className="text-red-600">32% low</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Phosphorus</span>
                    <span className="text-yellow-600">18% low</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Potassium</span>
                    <span className="text-red-600">45% low</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Recommendations */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4">Recent Recommendations</h3>
            <div className="space-y-3">
              {soilTests.filter(t => t.recommendations.length > 0).slice(0, 3).map((test, idx) => (
                <div key={idx} className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-orange-200 dark:bg-orange-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-orange-700">{idx + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{test.farmerName}</p>
                      <p className="text-xs text-gray-500 mt-1">{test.recommendations[0]}</p>
                      <button className="text-xs text-orange-600 hover:text-orange-700 mt-2">
                        View Full Report →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}