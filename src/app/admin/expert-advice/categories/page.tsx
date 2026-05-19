// app/admin/expert-advice/categories/page.tsx
'use client';

import { useState } from 'react';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  FolderOpen,
  TrendingUp,
  Clock,
  Eye,
  Award,
  Save,
  X,
  MessageSquare,
  Bug,
  Droplet,
  Sprout
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdviceCategoriesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Farming Tips',
      slug: 'farming-tips',
      description: 'Practical tips for better farming practices',
      articleCount: 45,
      status: 'active',
      createdAt: '2024-01-01',
      icon: TrendingUp
    },
    {
      id: 2,
      name: 'Pest Control',
      slug: 'pest-control',
      description: 'Natural and chemical pest management solutions',
      articleCount: 32,
      status: 'active',
      createdAt: '2024-01-01',
      icon: Bug
    },
    {
      id: 3,
      name: 'Soil Health',
      slug: 'soil-health',
      description: 'Improving soil fertility and structure',
      articleCount: 28,
      status: 'active',
      createdAt: '2024-01-02',
      icon: Award
    },
    {
      id: 4,
      name: 'Water Management',
      slug: 'water-management',
      description: 'Efficient irrigation and water conservation',
      articleCount: 19,
      status: 'active',
      createdAt: '2024-01-03',
      icon: Droplet
    },
    {
      id: 5,
      name: 'Crop Selection',
      slug: 'crop-selection',
      description: 'Choosing the right crops for your region',
      articleCount: 15,
      status: 'inactive',
      createdAt: '2024-01-04',
      icon: Sprout
    }
  ]);

  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    status: 'active'
  });

  const stats = {
    total: categories.length,
    active: categories.filter(c => c.status === 'active').length,
    inactive: categories.filter(c => c.status === 'inactive').length,
    totalArticles: categories.reduce((acc, c) => acc + c.articleCount, 0)
  };

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast.error('Category name is required');
      return;
    }

    const slug = newCategory.slug || newCategory.name.toLowerCase().replace(/ /g, '-');
    
    setCategories([
      ...categories,
      {
        id: categories.length + 1,
        ...newCategory,
        slug,
        articleCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        icon: FolderOpen
      }
    ]);
    
    toast.success('Category added successfully');
    setShowAddModal(false);
    setNewCategory({ name: '', slug: '', description: '', status: 'active' });
  };

  const handleDeleteCategory = (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
      toast.success('Category deleted successfully');
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      slug: category.slug,
      description: category.description,
      status: category.status
    });
    setShowAddModal(true);
  };

  const handleUpdateCategory = () => {
    if (!newCategory.name) {
      toast.error('Category name is required');
      return;
    }

    const slug = newCategory.slug || newCategory.name.toLowerCase().replace(/ /g, '-');
    
    setCategories(categories.map(cat => 
      cat.id === editingCategory.id 
        ? { ...cat, ...newCategory, slug }
        : cat
    ));
    
    toast.success('Category updated successfully');
    setShowAddModal(false);
    setEditingCategory(null);
    setNewCategory({ name: '', slug: '', description: '', status: 'active' });
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Link href="/admin" className="hover:text-pink-600">Dashboard</Link>
                <span>/</span>
                <Link href="/admin/expert-advice" className="hover:text-pink-600">Expert Advice</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white">Categories</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Advice Categories
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Organize expert advice into categories
              </p>
            </div>
            
            <button
              onClick={() => {
                setEditingCategory(null);
                setNewCategory({ name: '', slug: '', description: '', status: 'active' });
                setShowAddModal(true);
              }}
              className="px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-all flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Category</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Categories', value: stats.total, icon: Layers, color: 'pink' },
            { label: 'Active', value: stats.active, icon: CheckCircle, color: 'green' },
            { label: 'Inactive', value: stats.inactive, icon: XCircle, color: 'red' },
            { label: 'Total Articles', value: stats.totalArticles, icon: MessageSquare, color: 'blue' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            const colorClasses = {
              pink: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600',
              green: 'bg-green-50 dark:bg-green-900/20 text-green-600',
              red: 'bg-red-50 dark:bg-red-900/20 text-red-600',
              blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
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

        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      category.status === 'active' 
                        ? 'bg-pink-50 dark:bg-pink-900/20 text-pink-600'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditCategory(category)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{category.slug}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {category.articleCount} articles
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {category.createdAt}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        category.status === 'active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {category.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">No categories found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or create a new category</p>
          </div>
        )}

        {/* Add/Edit Category Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                    setNewCategory({ name: '', slug: '', description: '', status: 'active' });
                  }}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category Name *</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => {
                      setNewCategory({ ...newCategory, name: e.target.value });
                      if (!editingCategory) {
                        setNewCategory(prev => ({ 
                          ...prev, 
                          slug: e.target.value.toLowerCase().replace(/ /g, '-') 
                        }));
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-700"
                    placeholder="e.g., Organic Farming"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <input
                    type="text"
                    value={newCategory.slug}
                    onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-700"
                    placeholder="auto-generated from name"
                  />
                  <p className="text-xs text-gray-500 mt-1">URL-friendly version of the name</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-700"
                    placeholder="Category description..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={newCategory.status}
                    onChange={(e) => setNewCategory({ ...newCategory, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-700"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                  className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                    setNewCategory({ name: '', slug: '', description: '', status: 'active' });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}