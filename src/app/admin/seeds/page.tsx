// app/admin/seeds/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Package, Plus, Search, Filter, ChevronLeft, ChevronRight, 
  Edit, Trash2, Eye, Grid, Layers, Database, TrendingUp, 
  DollarSign, AlertCircle, Star, Clock, Download, 
  Upload, MoreVertical, Sprout, Leaf, Flower, 
  Trees, // Use Trees instead of Tree
  Apple, // Add Apple for fruits
  Beans, // Alternative for vegetables
  Flower2, // Alternative flower icon
  LeafyGreen, // For leafy vegetables
  Salad, // For salad greens
  Wheat, // For grains
  Cherry, // For fruits
  Citrus, // For citrus fruits
  Stethoscope, // Alternative
  Activity,
  BarChart,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

// Types
interface Seed {
  id: string;
  name: string;
  slug: string;
  category: string;
  subCategory: string;
  price: number;
  comparePrice: number;
  quantity: number;
  unit: string;
  germinationRate: number;
  purity: number;
  origin: string;
  season: string[];
  growingDifficulty: 'easy' | 'moderate' | 'advanced';
  daysToMaturity: number;
  plantingDepth: string;
  spacing: string;
  sunlight: string;
  watering: string;
  description: string;
  features: string[];
  images: string[];
  tags: string[];
  status: 'active' | 'draft' | 'discontinued';
  featured: boolean;
  organic: boolean;
  nonGmo: boolean;
  heirloom: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

// Mock Seeds Data
const MOCK_SEEDS: Seed[] = [
  {
    id: "1",
    name: "Organic Tomato Seeds",
    slug: "organic-tomato-seeds",
    category: "Vegetables",
    subCategory: "Tomatoes",
    price: 299,
    comparePrice: 499,
    quantity: 450,
    unit: "packet",
    germinationRate: 85,
    purity: 99,
    origin: "India",
    season: ["Spring", "Summer"],
    growingDifficulty: "easy",
    daysToMaturity: 75,
    plantingDepth: "0.5 cm",
    spacing: "24 inches apart",
    sunlight: "Full sun",
    watering: "Regular",
    description: "High-yielding organic tomato seeds perfect for home gardens. Produces sweet, juicy tomatoes.",
    features: ["High yield", "Disease resistant", "Organic"],
    images: ["/seeds/tomato.jpg"],
    tags: ["organic", "vegetable", "summer"],
    status: "active",
    featured: true,
    organic: true,
    nonGmo: true,
    heirloom: true,
    rating: 4.8,
    reviewCount: 124,
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Premium Basil Seeds",
    slug: "premium-basil-seeds",
    category: "Herbs",
    subCategory: "Basil",
    price: 199,
    comparePrice: 299,
    quantity: 280,
    unit: "packet",
    germinationRate: 90,
    purity: 98,
    origin: "Italy",
    season: ["Spring", "Summer", "Fall"],
    growingDifficulty: "easy",
    daysToMaturity: 60,
    plantingDepth: "0.3 cm",
    spacing: "12 inches apart",
    sunlight: "Partial to full sun",
    watering: "Moderate",
    description: "Aromatic Genovese basil seeds. Perfect for pesto and Italian dishes.",
    features: ["Aromatic", "Fast growing", "Continuous harvest"],
    images: ["/seeds/basil.jpg"],
    tags: ["herbs", "organic", "kitchen garden"],
    status: "active",
    featured: true,
    organic: true,
    nonGmo: true,
    heirloom: false,
    rating: 4.9,
    reviewCount: 89,
    createdAt: "2024-01-12T09:15:00Z",
    updatedAt: "2024-01-14T14:20:00Z"
  },
  {
    id: "3",
    name: "Heirloom Carrot Seeds",
    slug: "heirloom-carrot-seeds",
    category: "Vegetables",
    subCategory: "Root Vegetables",
    price: 249,
    comparePrice: 399,
    quantity: 320,
    unit: "packet",
    germinationRate: 80,
    purity: 99,
    origin: "USA",
    season: ["Spring", "Fall"],
    growingDifficulty: "easy",
    daysToMaturity: 70,
    plantingDepth: "0.6 cm",
    spacing: "2-3 inches apart",
    sunlight: "Full sun",
    watering: "Regular",
    description: "Sweet and crunchy heirloom carrots. Rich in flavor and nutrients.",
    features: ["Sweet flavor", "Crunchy texture", "Heirloom variety"],
    images: ["/seeds/carrot.jpg"],
    tags: ["organic", "heirloom", "winter"],
    status: "active",
    featured: false,
    organic: true,
    nonGmo: true,
    heirloom: true,
    rating: 4.7,
    reviewCount: 56,
    createdAt: "2024-01-08T11:30:00Z",
    updatedAt: "2024-01-13T09:45:00Z"
  },
  {
    id: "4",
    name: "Sunflower Seeds",
    slug: "sunflower-seeds",
    category: "Flowers",
    subCategory: "Annuals",
    price: 179,
    comparePrice: 279,
    quantity: 560,
    unit: "packet",
    germinationRate: 92,
    purity: 99,
    origin: "Ukraine",
    season: ["Spring", "Summer"],
    growingDifficulty: "easy",
    daysToMaturity: 85,
    plantingDepth: "2.5 cm",
    spacing: "12 inches apart",
    sunlight: "Full sun",
    watering: "Moderate",
    description: "Giant sunflower seeds that grow up to 8 feet tall. Attracts pollinators.",
    features: ["Tall growing", "Pollinator friendly", "Beautiful blooms"],
    images: ["/seeds/sunflower.jpg"],
    tags: ["flowers", "summer", "pollinators"],
    status: "active",
    featured: true,
    organic: false,
    nonGmo: true,
    heirloom: true,
    rating: 4.9,
    reviewCount: 203,
    createdAt: "2024-01-05T14:45:00Z",
    updatedAt: "2024-01-12T16:10:00Z"
  },
  {
    id: "5",
    name: "Cucumber Seeds",
    slug: "cucumber-seeds",
    category: "Vegetables",
    subCategory: "Cucurbits",
    price: 199,
    comparePrice: 299,
    quantity: 190,
    unit: "packet",
    germinationRate: 88,
    purity: 98,
    origin: "Netherlands",
    season: ["Spring", "Summer"],
    growingDifficulty: "easy",
    daysToMaturity: 55,
    plantingDepth: "1 cm",
    spacing: "36 inches apart",
    sunlight: "Full sun",
    watering: "Regular",
    description: "Crisp and refreshing cucumber seeds. Perfect for salads and pickling.",
    features: ["High yield", "Crisp texture", "Disease resistant"],
    images: ["/seeds/cucumber.jpg"],
    tags: ["vegetable", "summer", "salad"],
    status: "low_stock",
    featured: false,
    organic: true,
    nonGmo: true,
    heirloom: false,
    rating: 4.6,
    reviewCount: 78,
    createdAt: "2024-01-03T10:00:00Z",
    updatedAt: "2024-01-10T11:20:00Z"
  },
  {
    id: "6",
    name: "Lavender Seeds",
    slug: "lavender-seeds",
    category: "Herbs",
    subCategory: "Flowering Herbs",
    price: 349,
    comparePrice: 499,
    quantity: 45,
    unit: "packet",
    germinationRate: 75,
    purity: 97,
    origin: "France",
    season: ["Spring"],
    growingDifficulty: "moderate",
    daysToMaturity: 90,
    plantingDepth: "0.2 cm",
    spacing: "18 inches apart",
    sunlight: "Full sun",
    watering: "Low",
    description: "Fragrant lavender seeds. Perfect for aromatherapy and landscaping.",
    features: ["Fragrant", "Drought tolerant", "Pollinator friendly"],
    images: ["/seeds/lavender.jpg"],
    tags: ["herbs", "fragrant", "perennial"],
    status: "active",
    featured: false,
    organic: true,
    nonGmo: true,
    heirloom: true,
    rating: 4.8,
    reviewCount: 45,
    createdAt: "2024-01-15T08:30:00Z",
    updatedAt: "2024-01-15T08:30:00Z"
  },
  {
    id: "7",
    name: "Chili Pepper Seeds",
    slug: "chili-pepper-seeds",
    category: "Vegetables",
    subCategory: "Peppers",
    price: 249,
    comparePrice: 399,
    quantity: 340,
    unit: "packet",
    germinationRate: 85,
    purity: 99,
    origin: "Mexico",
    season: ["Spring", "Summer"],
    growingDifficulty: "moderate",
    daysToMaturity: 80,
    plantingDepth: "0.5 cm",
    spacing: "24 inches apart",
    sunlight: "Full sun",
    watering: "Regular",
    description: "Spicy chili pepper seeds. Great for hot sauces and drying.",
    features: ["Very spicy", "High yield", "Ornamental"],
    images: ["/seeds/chili.jpg"],
    tags: ["vegetable", "spicy", "summer"],
    status: "active",
    featured: false,
    organic: false,
    nonGmo: true,
    heirloom: true,
    rating: 4.7,
    reviewCount: 112,
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-08T15:30:00Z"
  },
  {
    id: "8",
    name: "Organic Spinach Seeds",
    slug: "organic-spinach-seeds",
    category: "Vegetables",
    subCategory: "Leafy Greens",
    price: 179,
    comparePrice: 279,
    quantity: 420,
    unit: "packet",
    germinationRate: 82,
    purity: 99,
    origin: "USA",
    season: ["Spring", "Fall"],
    growingDifficulty: "easy",
    daysToMaturity: 45,
    plantingDepth: "1 cm",
    spacing: "4 inches apart",
    sunlight: "Partial shade",
    watering: "Regular",
    description: "Nutrient-rich organic spinach seeds. Perfect for salads and smoothies.",
    features: ["Fast growing", "Nutrient dense", "Cold tolerant"],
    images: ["/seeds/spinach.jpg"],
    tags: ["organic", "leafy green", "salad"],
    status: "discontinued",
    featured: false,
    organic: true,
    nonGmo: true,
    heirloom: false,
    rating: 4.5,
    reviewCount: 34,
    createdAt: "2023-12-20T09:00:00Z",
    updatedAt: "2024-01-05T10:15:00Z"
  }
];

const CATEGORIES = ["All", "Vegetables", "Herbs", "Flowers", "Fruits", "Grains"];
const DIFFICULTY_COLORS = {
  easy: "bg-green-100 text-green-800",
  moderate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800"
};

export default function SeedsPage() {
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'draft' | 'discontinued'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSeed, setSelectedSeed] = useState<Seed | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'quantity' | 'rating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    loadSeeds();
  }, []);

  const loadSeeds = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setSeeds(MOCK_SEEDS);
    setLoading(false);
    toast.success(`${MOCK_SEEDS.length} seeds loaded`);
  };

  const handleDeleteSeed = () => {
    if (selectedSeed) {
      setSeeds(prev => prev.filter(s => s.id !== selectedSeed.id));
      toast.success(`Seed "${selectedSeed.name}" deleted`);
      setShowDeleteModal(false);
      setSelectedSeed(null);
    }
  };

  const handleToggleStatus = (seed: Seed) => {
    const newStatus = seed.status === 'active' ? 'draft' : 'active';
    setSeeds(prev => prev.map(s => 
      s.id === seed.id ? { ...s, status: newStatus as Seed['status'] } : s
    ));
    toast.success(`Seed status updated to ${newStatus}`);
  };

  const handleToggleFeatured = (seed: Seed) => {
    setSeeds(prev => prev.map(s => 
      s.id === seed.id ? { ...s, featured: !s.featured } : s
    ));
    toast.success(seed.featured ? 'Removed from featured' : 'Added to featured');
  };

  const filteredSeeds = seeds
    .filter(seed => {
      if (searchTerm && !seed.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !seed.category.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (selectedCategory !== 'All' && seed.category !== selectedCategory) return false;
      if (selectedStatus !== 'all' && seed.status !== selectedStatus) return false;
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'quantity':
          comparison = a.quantity - b.quantity;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSeeds = filteredSeeds.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSeeds.length / itemsPerPage);

  const stats = {
    total: seeds.length,
    active: seeds.filter(s => s.status === 'active').length,
    lowStock: seeds.filter(s => s.quantity < 200).length,
    featured: seeds.filter(s => s.featured).length,
    totalValue: seeds.reduce((sum, s) => sum + (s.price * s.quantity), 0),
    organic: seeds.filter(s => s.organic).length,
    avgGermination: Math.round(seeds.reduce((sum, s) => sum + s.germinationRate, 0) / seeds.length)
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedStatus('all');
    setSortBy('name');
    setSortOrder('asc');
    setCurrentPage(1);
    toast.success('All filters reset');
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Category', 'Price', 'Quantity', 'Status', 'Germination Rate', 'Organic', 'Featured'];
    const csvData = filteredSeeds.map(seed => [
      seed.name, seed.category, seed.price, seed.quantity, seed.status,
      seed.germinationRate, seed.organic ? 'Yes' : 'No', seed.featured ? 'Yes' : 'No'
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seeds_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Seeds exported successfully');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Seed Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your seed inventory</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-3 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            {viewMode === 'grid' ? '📋 List' : '🔲 Grid'}
          </button>
          <Link
            href="/admin/seeds/create"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Seed
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Seeds</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Sprout className="h-8 w-8 text-emerald-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <Leaf className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock</p>
              <p className="text-2xl font-bold text-orange-600">{stats.lowStock}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Featured</p>
              <p className="text-2xl font-bold text-purple-600">{stats.featured}</p>
            </div>
            <Star className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inventory Value</p>
              <p className="text-2xl font-bold text-blue-600">৳{stats.totalValue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Organic</p>
              <p className="text-2xl font-bold text-emerald-600">{stats.organic}</p>
            </div>
            <Leaf className="h-8 w-8 text-emerald-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Germination</p>
              <p className="text-2xl font-bold text-cyan-600">{stats.avgGermination}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-cyan-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search seeds by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="discontinued">Discontinued</option>
          </select>

          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [newSortBy, newSortOrder] = e.target.value.split('-');
              setSortBy(newSortBy as any);
              setSortOrder(newSortOrder as 'asc' | 'desc');
            }}
            className="px-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price Low to High</option>
            <option value="price-desc">Price High to Low</option>
            <option value="quantity-desc">Stock High to Low</option>
            <option value="quantity-asc">Stock Low to High</option>
            <option value="rating-desc">Rating High to Low</option>
          </select>

          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </button>

          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Reset
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredSeeds.length} of {seeds.length} seeds
        </div>
      </div>

      {/* Seeds Display */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentSeeds.map((seed) => (
            <div
              key={seed.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-700 dark:to-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  {seed.category === 'Vegetables' && <Sprout className="h-16 w-16 text-emerald-400" />}
                  {seed.category === 'Herbs' && <Leaf className="h-16 w-16 text-green-400" />}
                  {seed.category === 'Flowers' && <Flower className="h-16 w-16 text-pink-400" />}
                  {seed.category === 'Fruits' && <Tree className="h-16 w-16 text-orange-400" />}
                </div>
                
                {/* Badges */}
                <div className="absolute top-2 left-2 z-10 flex gap-1">
                  {seed.featured && (
                    <span className="px-2 py-1 text-xs font-semibold bg-yellow-500 text-white rounded">
                      Featured
                    </span>
                  )}
                  {seed.organic && (
                    <span className="px-2 py-1 text-xs font-semibold bg-emerald-500 text-white rounded">
                      Organic
                    </span>
                  )}
                  {seed.nonGmo && (
                    <span className="px-2 py-1 text-xs font-semibold bg-blue-500 text-white rounded">
                      Non-GMO
                    </span>
                  )}
                  {seed.heirloom && (
                    <span className="px-2 py-1 text-xs font-semibold bg-purple-500 text-white rounded">
                      Heirloom
                    </span>
                  )}
                </div>

                {/* Status */}
                <div className="absolute top-2 right-2 z-10">
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    seed.status === 'active' ? 'bg-green-100 text-green-800' :
                    seed.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {seed.status}
                  </span>
                </div>

                {/* Stock Warning */}
                {seed.quantity < 200 && seed.quantity > 0 && (
                  <div className="absolute bottom-2 left-2 right-2 z-10">
                    <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Low Stock: {seed.quantity} units left
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-1">
                      {seed.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {seed.category} / {seed.subCategory}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{seed.rating}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-bold text-emerald-600">
                    ৳{seed.price.toLocaleString()}
                  </span>
                  {seed.comparePrice > seed.price && (
                    <span className="text-sm text-gray-400 line-through">
                      ৳{seed.comparePrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="text-sm">
                    <span className="text-gray-500">Stock:</span>
                    <span className={`ml-1 font-medium ${seed.quantity < 200 ? 'text-orange-600' : ''}`}>
                      {seed.quantity}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Germination:</span>
                    <span className="ml-1 font-medium">{seed.germinationRate}%</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Difficulty:</span>
                    <span className={`ml-1 px-1 rounded ${DIFFICULTY_COLORS[seed.growingDifficulty]}`}>
                      {seed.growingDifficulty}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Maturity:</span>
                    <span className="ml-1 font-medium">{seed.daysToMaturity} days</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Link
                    href={`/admin/seeds/${seed.id}`}
                    className="flex-1 px-3 py-2 text-center text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 text-sm"
                  >
                    <Eye className="h-4 w-4 inline mr-1" />
                    View
                  </Link>
                  <Link
                    href={`/admin/seeds/${seed.id}/edit`}
                    className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleToggleStatus(seed)}
                    className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {seed.status === 'active' ? '📝' : '✓'}
                  </button>
                  <button
                    onClick={() => handleToggleFeatured(seed)}
                    className={`px-3 py-2 border rounded-lg ${
                      seed.featured 
                        ? 'text-yellow-600 border-yellow-600 hover:bg-yellow-50'
                        : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Star className={`h-4 w-4 ${seed.featured ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSeed(seed);
                      setShowDeleteModal(true);
                    }}
                    className="px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Seed Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Germination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {currentSeeds.map((seed) => (
                  <tr key={seed.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium">{seed.name}</div>
                      <div className="text-sm text-gray-500">{seed.subCategory}</div>
                    </td>
                    <td className="px-6 py-4">{seed.category}</td>
                    <td className="px-6 py-4 font-semibold text-emerald-600">৳{seed.price}</td>
                    <td className="px-6 py-4">
                      <span className={seed.quantity < 200 ? 'text-orange-600 font-semibold' : ''}>
                        {seed.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4">{seed.germinationRate}%</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded ${
                        seed.status === 'active' ? 'bg-green-100 text-green-800' :
                        seed.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {seed.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/seeds/${seed.id}`} className="text-blue-600">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button className="text-red-600">
                          <Trash2 className="h-4 w-4" />
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

      {/* Empty State */}
      {!loading && filteredSeeds.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <Sprout className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No seeds found</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {!loading && filteredSeeds.length > 0 && (
        <div className="flex items-center justify-between mt-6 px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSeeds.length)} of {filteredSeeds.length} seeds
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

      {/* Delete Modal */}
      {showDeleteModal && selectedSeed && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">Delete Seed</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedSeed.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSeed}
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