import { Draft } from '@reduxjs/toolkit';
import { Order } from './order.types';

// Helper type for components that receive orders from Redux
export type ReduxOrder = Order | Draft<Order>;

// Helper function to safely use order in components
export function toPlainOrder(order: ReduxOrder): Order {
  return order as Order;
}

// Helper for arrays
export function toPlainOrders(orders: ReduxOrder[]): Order[] {
  return orders as Order[];
}