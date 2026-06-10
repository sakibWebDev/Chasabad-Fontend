// app/admin/seeds/categories/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Layers, Plus, Edit, Trash2, Search, 
  Sprout, Leaf, Flower,  Apple,
  ChevronRight, Package
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  seedCount: number;
  parentId: string | null;
  status: 'active' | 'inactive';
}

const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Vegetables', slug: 'vegetables', description: 'Garden vegetables', icon: 'Sprout', seedCount: 45, parentId: null, status: 'active' },
  { id: '2', name: 'Tomatoes', slug: 'tomatoes', description: 'Tomato varieties', icon: 'Sprout', seedCount: 12, parentId: '1', status: 'active' },
  { id: '3', name: 'Root Vegetables', slug: 'root-vegetables', description: 'Carrots, beets, etc', icon: 'Sprout', seedCount: 8, parentId: '1', status: 'active' },
  { id: '4', name: 'Herbs', slug: 'herbs', description: 'Culinary and medicinal herbs', icon: 'Leaf', seedCount: 28, parentId: null, status: 'active' },
  { id: '5', name: 'Basil', slug: 'basil', description: 'Basil varieties', icon: 'Leaf', seedCount: 6, parentId: '4', status: 'active' },
  { id: '6', name: 'Mint', slug: 'mint', description: 'Mint varieties', icon: 'Leaf', seedCount: 4, parentId: '4', status: 'active' },
  { id: '7', name: 'Flowers', slug: 'flowers', description: 'Flowering plants', icon: 'Flower', seedCount: 32, parentId: null, status: 'active' },
  { id: '8', name: 'Annuals', slug: 'annuals', description: 'Annual flowers', icon: 'Flower', seedCount: 18, parentId: '7', status: 'active' },
  { id: '9', name: 'Perennials', slug: 'perennials', description: 'Perennial flowers', icon: 'Flower', seedCount: 14, parentId: '7', status: 'active' },
  { id: '10', name: 'Fruits', slug: 'fruits', description: 'Fruit seeds', icon: 'Apple', seedCount: 15, parentId: null, status: 'active' }
];

const getIconComponent = (iconName: string) => {
  switch(iconName) {
    case 'Sprout': return <Sprout className="h-5 w-5 text-emerald-600" />;
    case 'Leaf': return <Leaf className="h-5 w-5 text-green-600" />;
    case 'Flower': return <Flower className="h-5 w-5 text-pink-600" />;
    case 'Tree': return <Apple className="h-5 w-5 text-orange-600" />;
    case 'Apple': return <Apple className="h-5 w-5 text-red-600" />;
    default: return <Package className="h-5 w-5 text-gray-600" />;
  }
};

export default function SeedCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setCategories(MOCK_CATEGORIES);
    setLoading(false);
  };

  const buildCategoryTree = (categoriesList: Category[], parentId: string | null = null): any[] => {
    return categoriesList
      .filter(cat => cat.parentId === parentId)
      .map(cat => ({
        ...cat,
        children: buildCategoryTree(categoriesList, cat.id)
      }));
  };

  const categoryTree = buildCategoryTree(categories);

  const toggleExpand = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const renderCategoryRow = (category: any, level = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category.id);

    return (
      <div key={category.id}>
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 border-b">
          <div className="flex items-center gap-3" style={{ marginLeft: `${level * 24}px` }}>
            {hasChildren && (
              <button
                onClick={() => toggleExpand(category.id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </button>
            )}
            {!hasChildren && <div className="w-6" />}
            {getIconComponent(category.icon)}
            <div>
              <div className="font-medium text-gray-800">{category.name}</div>
              <div className="text-sm text-gray-500">{category.description}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-500">
              {category.seedCount} seeds
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingCategory(category);
                  setShowModal(true);
                }}
                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  setSelectedCategory(category);
                  setShowDeleteModal(true);
                }}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        {isExpanded && hasChildren && category.children.map((child: any) => renderCategoryRow(child, level + 1))}
      </div>
    );
  };

  const stats = {
    total: categories.length,
    parent: categories.filter(c => !c.parentId).length,
    sub: categories.filter(c => c.parentId).length,
    totalSeeds: categories.reduce((sum, c) => sum + c.seedCount, 0)
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Seed Categories</h1>
          <p className="text-gray-600 mt-1">Organize your seed catalog</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90">Total Categories</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Parent Categories</p>
          <p className="text-2xl font-bold text-emerald-600">{stats.parent}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Sub Categories</p>
          <p className="text-2xl font-bold text-blue-600">{stats.sub}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Seed Products</p>
          <p className="text-2xl font-bold text-purple-600">{stats.totalSeeds}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Tree */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <div>
            {categoryTree.map(category => renderCategoryRow(category))}
            {categoryTree.length === 0 && (
              <div className="text-center py-12">
                <Layers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No categories found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={editingCategory?.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Parent Category</label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option value="">None (Top Level)</option>
                  {categories.filter(c => !c.parentId).map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={editingCategory?.description}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon</label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option value="Sprout">Sprout</option>
                  <option value="Leaf">Leaf</option>
                  <option value="Flower">Flower</option>
                  <option value="Tree">Tree</option>
                  <option value="Apple">Apple</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success(editingCategory ? 'Category updated' : 'Category created');
                    setShowModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-2">Delete Category</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedCategory.name}"? This will affect {selectedCategory.seedCount} seed products.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setCategories(prev => prev.filter(c => c.id !== selectedCategory.id));
                  toast.success('Category deleted');
                  setShowDeleteModal(false);
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg"
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