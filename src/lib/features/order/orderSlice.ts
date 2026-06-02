// store/slices/orderSlice.ts
import { createSlice, createAsyncThunk, PayloadAction, Draft } from '@reduxjs/toolkit';
import { orderApi } from './order.api';
import { OrdersState, CreateOrderInput, Order } from './order.types';
import toast from 'react-hot-toast';

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  stats: null,
  pagination: {
    total: 0,
    page: 1,
    totalPages: 0,
    limit: 20,
  },
  loading: {
    list: false,
    detail: false,
    create: false,
    update: false,
    delete: false,
    stats: false,
  },
  error: {
    list: null,
    detail: null,
    create: null,
    update: null,
    delete: null,
    stats: null,
  },
};

// ============ Async Thunks ============

// Create order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: CreateOrderInput, { rejectWithValue }) => {
    try {
      const response = await orderApi.createOrder(orderData);
      if (response.success) {
        toast.success(response.message || 'অর্ডার সফলভাবে সম্পন্ন হয়েছে!');
        return response.data as Order;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'অর্ডার করতে সমস্যা হয়েছে';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Get all orders (Admin)
export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async ({ page, limit, status }: { page: number; limit: number; status?: string }, { rejectWithValue }) => {
    try {
      const response = await orderApi.getAllOrders(page, limit, status);
      if (response.success) {
        return {
          orders: response.data.orders as Order[],
          total: response.data.total,
          page: response.data.page,
          totalPages: response.data.totalPages,
          limit: response.data.limit,
        };
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

// Get user orders
export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderApi.getUserOrders();
      if (response.success) {
        return response.data as Order[];
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your orders');
    }
  }
);

// Get order by ID
export const getOrderById = createAsyncThunk(
  'orders/getOrderById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await orderApi.getOrderById(id);
      if (response.success) {
        return response.data as Order;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch order details');
    }
  }
);

// Get order by orderId (tracking)
export const getOrderByOrderId = createAsyncThunk(
  'orders/getOrderByOrderId',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await orderApi.getOrderByOrderId(orderId);
      if (response.success) {
        return response.data as Order;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Order not found');
    }
  }
);

// Update order status (Admin)
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
    try {
      const response = await orderApi.updateOrderStatus(id, status);
      if (response.success) {
        toast.success(`Order status updated to ${status}`);
        return response.data as Order;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update order status';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Update payment status (Admin)
export const updatePaymentStatus = createAsyncThunk(
  'orders/updatePaymentStatus',
  async ({ id, paymentStatus }: { id: string; paymentStatus: string }, { rejectWithValue }) => {
    try {
      const response = await orderApi.updatePaymentStatus(id, paymentStatus);
      if (response.success) {
        toast.success(`Payment status updated to ${paymentStatus}`);
        return response.data as Order;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update payment status';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Update tracking number (Admin)
export const updateTrackingNumber = createAsyncThunk(
  'orders/updateTrackingNumber',
  async ({ id, trackingNumber }: { id: string; trackingNumber: string }, { rejectWithValue }) => {
    try {
      const response = await orderApi.updateTrackingNumber(id, trackingNumber);
      if (response.success) {
        toast.success('Tracking number updated successfully');
        return response.data as Order;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update tracking number';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Cancel order
export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await orderApi.cancelOrder(id);
      if (response.success) {
        toast.success('Order cancelled successfully');
        return response.data as Order;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to cancel order';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Delete order (Admin)
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await orderApi.deleteOrder(id);
      if (response.success) {
        toast.success('Order deleted successfully');
        return id;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete order';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Get order statistics (Admin)
export const getOrderStats = createAsyncThunk(
  'orders/getOrderStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderApi.getOrderStats();
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

// Search orders (Admin)
export const searchOrders = createAsyncThunk(
  'orders/searchOrders',
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const response = await orderApi.searchOrders(searchTerm);
      if (response.success) {
        return response.data as Order[];
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search orders');
    }
  }
);

// Get monthly revenue (Admin)
export const getMonthlyRevenue = createAsyncThunk(
  'orders/getMonthlyRevenue',
  async ({ year, month }: { year: number; month: number }, { rejectWithValue }) => {
    try {
      const response = await orderApi.getMonthlyRevenue(year, month);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch revenue');
    }
  }
);

// ============ Helper functions for type-safe state updates ============

// Helper to update an order in the orders array
const updateOrderInArray = (orders: (Order | Draft<Order>)[], updatedOrder: Order | Draft<Order>) => {
  const index = orders.findIndex(o => o.id === updatedOrder.id);
  if (index !== -1) {
    orders[index] = updatedOrder as any;
  }
  return orders;
};

// ============ Slice ============

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.error.detail = null;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.pagination = initialState.pagination;
    },
    clearErrors: (state) => {
      state.error = initialState.error;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1;
    },
  },
  extraReducers: (builder) => {
    // ===== Create Order =====
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading.create = false;
        state.currentOrder = action.payload as any;
        state.orders.unshift(action.payload as any);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload as string;
      });

    // ===== Get All Orders (Admin) =====
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading.list = true;
        state.error.list = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading.list = false;
        state.orders = action.payload.orders as any;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          limit: action.payload.limit,
        };
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading.list = false;
        state.error.list = action.payload as string;
      });

    // ===== Get User Orders =====
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.loading.list = true;
        state.error.list = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading.list = false;
        state.orders = action.payload as any;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading.list = false;
        state.error.list = action.payload as string;
      });

    // ===== Get Order By ID =====
    builder
      .addCase(getOrderById.pending, (state) => {
        state.loading.detail = true;
        state.error.detail = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading.detail = false;
        state.currentOrder = action.payload as any;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading.detail = false;
        state.error.detail = action.payload as string;
      });

    // ===== Get Order By OrderId =====
    builder
      .addCase(getOrderByOrderId.pending, (state) => {
        state.loading.detail = true;
        state.error.detail = null;
      })
      .addCase(getOrderByOrderId.fulfilled, (state, action) => {
        state.loading.detail = false;
        state.currentOrder = action.payload as any;
      })
      .addCase(getOrderByOrderId.rejected, (state, action) => {
        state.loading.detail = false;
        state.error.detail = action.payload as string;
      });

    // ===== Update Order Status =====
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading.update = false;
        const index = state.orders.findIndex(o => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload as any;
        }
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload as any;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload as string;
      });

    // ===== Update Payment Status =====
    builder
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload as any;
        }
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload as any;
        }
      });

    // ===== Update Tracking Number =====
    builder
      .addCase(updateTrackingNumber.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload as any;
        }
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload as any;
        }
      });

    // ===== Cancel Order =====
    builder
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload as any;
        }
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload as any;
        }
      });

    // ===== Delete Order =====
    builder
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(o => o.id !== action.payload) as any;
        if (state.currentOrder?.id === action.payload) {
          state.currentOrder = null;
        }
      });

    // ===== Get Order Stats =====
    builder
      .addCase(getOrderStats.pending, (state) => {
        state.loading.stats = true;
        state.error.stats = null;
      })
      .addCase(getOrderStats.fulfilled, (state, action) => {
        state.loading.stats = false;
        state.stats = action.payload;
      })
      .addCase(getOrderStats.rejected, (state, action) => {
        state.loading.stats = false;
        state.error.stats = action.payload as string;
      });

    // ===== Search Orders =====
    builder
      .addCase(searchOrders.fulfilled, (state, action) => {
        state.orders = action.payload as any;
      });
  },
});

export const { 
  clearCurrentOrder, 
  clearOrders, 
  clearErrors,
  setPage,
  setLimit
} = orderSlice.actions;

export default orderSlice.reducer;