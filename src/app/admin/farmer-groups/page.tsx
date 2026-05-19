// app/admin/farmer-groups/page.tsx
'use client';

import { useState } from 'react';
import {
  Users,
  Plus,
  Search,

  Sprout,
 
  Phone,
  MapPin,
  Calendar,
 
  CheckCircle,
 
  Award,
  DollarSign,

  UserPlus,
 
} from 'lucide-react';
import Link from 'next/link';


export default function FarmerGroupsPage() {
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const groups = [
    {
      id: 1,
      name: 'Rajshahi Farmers Cooperative',
      location: 'Rajshahi',
      members: 245,
      established: '2020-03-15',
      status: 'active',
      type: 'Cooperative',
      totalArea: 1250,
      totalProduction: 3750,
      revenue: 1250000,
      leader: 'Md. Karim Uddin',
      contact: '+8801712345678',
      email: 'rajshahi.farmers@coop.bd',
      achievements: [
        'Best Cooperative Award 2023',
        'Highest Rice Production 2022'
      ],
      image: '/groups/rajshahi.jpg'
    },
    {
      id: 2,
      name: 'Women Farmers Association',
      location: 'Jessore',
      members: 189,
      established: '2021-06-20',
      status: 'active',
      type: 'Association',
      totalArea: 890,
      totalProduction: 2450,
      revenue: 890000,
      leader: 'Fatema Begum',
      contact: '+8801987654321',
      email: 'women.farmers@jessore.bd',
      achievements: [
        'Women Empowerment Award 2023'
      ],
      image: '/groups/women.jpg'
    },
    {
      id: 3,
      name: 'Organic Farmers Network',
      location: 'Sylhet',
      members: 156,
      established: '2019-11-10',
      status: 'active',
      type: 'Network',
      totalArea: 670,
      totalProduction: 1890,
      revenue: 950000,
      leader: 'Dr. Aminul Islam',
      contact: '+8801756789234',
      email: 'organic.sylhet@farmers.bd',
      achievements: [
        'Organic Certification 2023',
        'Export Quality Award'
      ],
      image: '/groups/organic.jpg'
    },
    {
      id: 4,
      name: 'Young Farmers Initiative',
      location: 'Dhaka',
      members: 98,
      established: '2022-01-05',
      status: 'pending',
      type: 'Initiative',
      totalArea: 340,
      totalProduction: 890,
      revenue: 450000,
      leader: 'Tanvir Hasan',
      contact: '+8801678945321',
      email: 'young.farmers@dhaka.bd',
      achievements: [],
      image: '/groups/young.jpg'
    }
  ];

  const stats = {
    total: groups.length,
    active: groups.filter(g => g.status === 'active').length,
    pending: groups.filter(g => g.status === 'pending').length,
    totalMembers: groups.reduce((acc, g) => acc + g.members, 0),
    totalArea: groups.reduce((acc, g) => acc + g.totalArea, 0),
    totalRevenue: groups.reduce((acc, g) => acc + g.revenue, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Link href="/admin" className="hover:text-teal-600">Dashboard</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white">Farmer Groups</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Farmer Groups
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage farmer cooperatives and associations
              </p>
            </div>
            
            <button className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Create Group</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          {[
            { label: 'Total Groups', value: stats.total, icon: Users, color: 'teal' },
            { label: 'Active', value: stats.active, icon: CheckCircle, color: 'green' },
            { label: 'Total Members', value: stats.totalMembers.toLocaleString(), icon: UserPlus, color: 'blue' },
            { label: 'Total Area', value: `${stats.totalArea.toLocaleString()} acres`, icon: MapPin, color: 'orange' },
            { label: 'Total Revenue', value: `$${(stats.totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: 'emerald' },
            { label: 'Avg. Members/Group', value: Math.round(stats.totalMembers / stats.total), icon: Users, color: 'purple' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            const colorClasses = {
              teal: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600',
              green: 'bg-green-50 dark:bg-green-900/20 text-green-600',
              blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
              orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600',
              emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600',
              purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600'
            };
            return (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
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

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search groups by name, location, or leader..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{group.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <p className="text-xs text-gray-500">{group.location}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    group.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {group.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{group.members} members</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Est. {group.established}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Sprout className="h-4 w-4 text-gray-400" />
                    <span>{group.totalArea} acres</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span>${(group.revenue / 1000).toFixed(0)}K revenue</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Group Leader</p>
                  <p className="text-sm font-medium">{group.leader}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{group.contact}</span>
                  </div>
                </div>

                {group.achievements.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <p className="text-xs font-semibold">Achievements</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {group.achievements.map((achievement, i) => (
                        <span key={i} className="px-2 py-0.5 bg-yellow-50 text-yellow-700 text-xs rounded-lg">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-3 border-t dark:border-gray-700">
                  <button className="flex-1 px-3 py-1.5 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    View Details
                  </button>
                  <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}