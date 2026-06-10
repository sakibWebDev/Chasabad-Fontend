// app/admin/seeds/inventory/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Database, Search, Filter, ChevronLeft, ChevronRight,
  AlertCircle, TrendingUp, TrendingDown, Package,
  Edit, Eye, ArrowUp, ArrowDown, Download
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface InventoryItem {
  id: string;
  seedId: string;
  seedName: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  lastRestocked: string;
  nextDelivery: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'overstocked';
  stockValue: number;
}

const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    seedId: '1',
    seedName: 'Organic Tomato Seeds',
    category: 'Vegetables',
    currentStock: 450,
    minStock: 100,
    maxStock: 1000,
    reorderPoint: 150,
    lastRestocked: '2024-01-10',
    nextDelivery: '2024-02-10',
    status: 'in_stock',
    stockValue: 134550
  },
  {
    id: '2',
    seedId: '5',
    seedName: 'Cucumber Seeds',
    category: 'Vegetables',
    currentStock: 190,
    minStock: 200,
    maxStock: 800,
    reorderPoint: 200,
    lastRestocked: '2024-01-05',
    nextDelivery: '2024-01-25',
    status: 'low_stock',
    stockValue: 37810
  },
  {
    id: '3',
    seedId: '6',
    seedName: 'Lavender Seeds',
    category: 'Herbs',
    currentStock: 45,
    minStock: 100,
    maxStock: 500,
    reorderPoint: 100,
    lastRestocked: '2023-12-20',
    nextDelivery: '2024-01-30',
    status: 'low_stock',
    stockValue: 15705
  },
  {
    id: '4',
    seedId: '2',
    seedName: 'Premium Basil Seeds',
    category: 'Herbs',
    currentStock: 280,
    minStock: 150,
    maxStock: 600,
    reorderPoint: 150,
    lastRestocked: '2024-01-08',
    nextDelivery: '2024-02-08',
    status: 'in_stock',
    stockValue: 55720
  },
  {
    id: '5',
    seedId: '4',
    seedName: 'Sunflower Seeds',
    category: 'Flowers',
    currentStock: 560,
    minStock: 200,
    maxStock: 1500,
    reorderPoint: 200,
    lastRestocked: '2024-01-12',
    nextDelivery: '2024-02-12',
    status: 'in_stock',
    stockValue: 100240
  },
  {
    id: '6',
    seedId: '8',
    seedName: 'Organic Spinach Seeds',
    category: 'Vegetables',
    currentStock: 42,
    minStock: 100,
    maxStock: 500,
    reorderPoint: 100,
    lastRestocked: '2023-12-15',
    nextDelivery: 'N/A',
    status: 'out_of_stock',
    stockValue: 7518
  }
];

const STATUS_CONFIG = {
  in_stock: { label: 'In Stock', color: 'bg-green-100 text-green-800', icon: Package },
  low_stock: { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
  out_of_stock: { label: 'Out of Stock', color: 'bg-red-100 text-red-800', icon: AlertCircle },
  overstocked: { label: 'Overstocked', color: 'bg-orange-100 text-orange-800', icon: TrendingUp }
};

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock' | 'overstocked'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showStockModal, setShowStockModal] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setInventory(MOCK_INVENTORY);
    setLoading(false);
  };

  const handleUpdateStock = (id: string, newStock: number) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, currentStock: newStock } : item
    ));
    toast.success('Stock updated successfully');
    setShowStockModal(false);
  };

  const filteredInventory = inventory
    .filter(item => {
      if (searchTerm && !item.seedName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      return true;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);

  const stats = {
    totalItems: inventory.length,
    totalValue: inventory.reduce((sum, i) => sum + i.stockValue, 0),
    lowStockCount: inventory.filter(i => i.status === 'low_stock').length,
    outOfStockCount: inventory.filter(i => i.status === 'out_of_stock').length,
    totalUnits: inventory.reduce((sum, i) => sum + i.currentStock, 0)
  };

  const exportToCSV = () => {
    const headers = ['Seed Name', 'Category', 'Current Stock', 'Min Stock', 'Max Stock', 'Status', 'Stock Value'];
    const csvData = filteredInventory.map(item => [
      item.seedName, item.category, item.currentStock, item.minStock, 
      item.maxStock, item.status, item.stockValue
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Inventory exported');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Database className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Inventory Management</h1>
            <p className="text-gray-600 mt-1">Track and manage seed stock levels</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90">Total Inventory Value</p>
          <p className="text-2xl font-bold">৳{stats.totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Units</p>
          <p className="text-2xl font-bold">{stats.totalUnits.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Products</p>
          <p className="text-2xl font-bold">{stats.totalItems}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Low Stock Alert</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.lowStockCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">{stats.outOfStockCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search seeds..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="overstocked">Overstocked</option>
          </select>

          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Seed Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Current Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Min / Max</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Reorder Point</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Stock Value</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {currentItems.map((item) => {
                    const StatusIcon = STATUS_CONFIG[item.status].icon;
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{item.seedName}</td>
                        <td className="px-6 py-4 text-gray-600">{item.category}</td>
                        <td className="px-6 py-4">
                          <span className={`font-semibold ${
                            item.currentStock <= item.reorderPoint ? 'text-red-600' : 'text-gray-800'
                          }`}>
                            {item.currentStock}
                          </span>
                         </td>
                        <td className="px-6 py-4 text-gray-600">
                          {item.minStock} / {item.maxStock}
                         </td>
                        <td className="px-6 py-4">{item.reorderPoint}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${STATUS_CONFIG[item.status].color}`}>
                            <StatusIcon className="h-3 w-3" />
                            {STATUS_CONFIG[item.status].label}
                          </span>
                         </td>
                        <td className="px-6 py-4 font-semibold">৳{item.stockValue.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/seeds/${item.seedId}`} className="text-blue-600">
                              <Eye className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => {
                                setSelectedItem(item);
                                setShowStockModal(true);
                              }}
                              className="text-emerald-600"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                       </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredInventory.length === 0 && (
              <div className="text-center py-12">
                <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No inventory items found</p>
              </div>
            )}

            {/* Pagination */}
            {filteredInventory.length > 0 && (
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredInventory.length)} of {filteredInventory.length} items
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-3 py-1">Page {currentPage} of {totalPages}</span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Update Stock Modal */}
      {showStockModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Update Stock</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Seed Name</label>
                <input
                  type="text"
                  value={selectedItem.seedName}
                  disabled
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Current Stock</label>
                <input
                  type="number"
                  defaultValue={selectedItem.currentStock}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-yellow-800">
                  <AlertCircle className="h-4 w-4" />
                  Reorder point: {selectedItem.reorderPoint}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowStockModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateStock(selectedItem.id, 500)}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg"
                >
                  Update Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}