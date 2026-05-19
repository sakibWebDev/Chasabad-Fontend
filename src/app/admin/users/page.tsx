// app/admin/users/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  User,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Shield,
  Users,
  UserCheck,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Mail,
  Phone,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { useAppSelector } from '@/lib/hooks/useAppSelector';
import {  useAppDispatch } from '@/lib/hooks/useAppDispatch';

import { fetchAllUsers, deleteUser, setPage, setLimit } from '@/lib/features/users/usersSlice';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { users, loading, error, pagination } = useAppSelector((state) => state.users);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch users with current filters
 // In your page component
const fetchUsers = useCallback(async () => {
  try {
    // Create a clean params object without 'all' values
    const params = {
      page: pagination.page,
      limit: itemsPerPage,
      search: searchTerm || '',
      role: filterRole === 'all' ? '' : filterRole,
      status: filterStatus === 'all' ? '' : filterStatus,
      startDate: dateRange.start || '',
      endDate: dateRange.end || '',
    };
    
    console.log('Fetching users with params:', params);
    
    const result = await dispatch(fetchAllUsers(params)).unwrap();
    console.log('Fetch result:', result);
  } catch (error: any) {
    console.error('Failed to fetch users:', error);
    toast.error(error?.message || 'Failed to fetch users');
  }
}, [dispatch, pagination.page, itemsPerPage, searchTerm, filterRole, filterStatus, dateRange.start, dateRange.end]);
  // Initial load and filter changes
  useEffect(() => {
    if (pagination.page !== 1) {
      dispatch(setPage(1));
    } else {
      fetchUsers();
    }
  }, [searchTerm, filterRole, filterStatus, dateRange.start, dateRange.end, itemsPerPage]);

  // Fetch when page changes
  useEffect(() => {
    if (pagination.page > 0) {
      fetchUsers();
    }
  }, [pagination.page]);

  const handleDeleteUser = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      await dispatch(deleteUser(id)).unwrap();
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'Failed to delete user');
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      dispatch(setPage(newPage));
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    dispatch(setLimit(value));
    dispatch(setPage(1));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilterRole('all');
    setFilterStatus('all');
    setDateRange({ start: '', end: '' });
    dispatch(setPage(1));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400';
      case 'BLOCKED':
        return 'bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400';
      case 'DELETED':
        return 'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'ADMIN':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'EXPERT':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'RESEARCHER':
        return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const totalUsers = pagination.total;
  const activeUsers = users.filter((user) => user.status === 'ACTIVE').length;
  const adminUsers = users.filter(
    (user) => user.role === 'ADMIN' || user.role === 'SUPER_ADMIN'
  ).length;

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
          <div className="text-red-600 dark:text-red-400 mb-2">
            <AlertCircle className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
            Error Loading Users
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            User Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage system users, roles and permissions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          <Link
            href="/admin/users/create"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition"
          >
            <Plus className="h-5 w-5" />
            Add User
          </Link>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <h2 className="text-3xl font-bold mt-2">{totalUsers.toLocaleString()}</h2>
              <p className="text-xs text-gray-400 mt-1">All registered users</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Users className="text-blue-600 w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Users</p>
              <h2 className="text-3xl font-bold mt-2">{activeUsers.toLocaleString()}</h2>
              <p className="text-xs text-gray-400 mt-1">Currently active accounts</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <UserCheck className="text-green-600 w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Administrators</p>
              <h2 className="text-3xl font-bold mt-2">{adminUsers.toLocaleString()}</h2>
              <p className="text-xs text-gray-400 mt-1">With admin privileges</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Shield className="text-purple-600 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS SECTION */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="p-5">
          {/* Basic Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Roles</option>
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="ADMIN">Admin</option>
                <option value="EXPERT">Expert</option>
                <option value="RESEARCHER">Researcher</option>
                <option value="USER">User</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="BLOCKED">Blocked</option>
                <option value="DELETED">Deleted</option>
              </select>

              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`px-4 py-3 rounded-xl border transition flex items-center gap-2 ${
                  showAdvancedFilters 
                    ? 'bg-green-50 border-green-500 text-green-600' 
                    : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Date Range</span>
              </button>

              {(searchTerm || filterRole !== 'all' || filterStatus !== 'all' || dateRange.start || dateRange.end) && (
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear All</span>
                </button>
              )}
            </div>
          </div>

          {/* Advanced Filters - Date Range */}
          {showAdvancedFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {(searchTerm || filterRole !== 'all' || filterStatus !== 'all' || dateRange.start || dateRange.end) && (
            <div className="mt-4 pt-3 flex flex-wrap gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs">
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm('')} className="hover:text-green-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterRole !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs">
                  Role: {filterRole}
                  <button onClick={() => setFilterRole('all')} className="hover:text-blue-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs">
                  Status: {filterStatus}
                  <button onClick={() => setFilterStatus('all')} className="hover:text-yellow-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {(dateRange.start || dateRange.end) && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs">
                  Date: {dateRange.start || 'any'} → {dateRange.end || 'any'}
                  <button onClick={() => setDateRange({ start: '', end: '' })} className="hover:text-purple-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        {loading ? (
          <div className="h-72 flex items-center justify-center">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-green-500 border-t-transparent"></div>
          </div>
        ) : users.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Joined</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {user.image ? (
                            <img src={user.image} alt={user.name} className="h-12 w-12 rounded-full object-cover" />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow">
                              {user?.name?.charAt(0)?.toUpperCase()}
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" /> {user.email}
                            </p>
                            {user.phone && (
                              <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                <Phone className="w-3 h-3" /> {user.phone}
                              </p>
                            )}
                          </div>
                        </div>
                       </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                          {user.role.replace('_', ' ')}
                        </span>
                       </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                       </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.phone || 'No phone'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </div>
                       </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/users/${user.id}`} className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link href={`/admin/users/${user.id}/edit`} className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition">
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleDeleteUser(user.id)} className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                       </td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 0 && (
              <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-500">
                    Showing {Math.min((pagination.page - 1) * itemsPerPage + 1, pagination.total)} to{' '}
                    {Math.min(pagination.page * itemsPerPage, pagination.total)} of {pagination.total} users
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Show:</span>
                      <select
                        value={itemsPerPage}
                        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                        className="px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm"
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={pagination.page === 1}
                        className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        First
                      </button>
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {(() => {
                          const total = pagination.totalPages;
                          const current = pagination.page;
                          let pages = [];
                          
                          if (total <= 5) {
                            pages = Array.from({ length: total }, (_, i) => i + 1);
                          } else if (current <= 3) {
                            pages = [1, 2, 3, 4, '...', total];
                          } else if (current >= total - 2) {
                            pages = [1, '...', total - 3, total - 2, total - 1, total];
                          } else {
                            pages = [1, '...', current - 1, current, current + 1, '...', total];
                          }
                          
                          return pages.map((page, idx) => (
                            page === '...' ? (
                              <span key={idx} className="px-2 text-gray-500">...</span>
                            ) : (
                              <button
                                key={idx}
                                onClick={() => handlePageChange(Number(page))}
                                className={`px-3 py-1 rounded-lg transition ${
                                  current === page
                                    ? 'bg-green-600 text-white'
                                    : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                              >
                                {page}
                              </button>
                            )
                          ));
                        })()}
                      </div>
                      
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePageChange(pagination.totalPages)}
                        disabled={pagination.page === pagination.totalPages}
                        className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      >
                        Last
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-full mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Users Found</h2>
            <p className="text-gray-500 mt-2">Try changing filters or add a new user.</p>
            {(searchTerm || filterRole !== 'all' || filterStatus !== 'all') && (
              <button onClick={clearAllFilters} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}