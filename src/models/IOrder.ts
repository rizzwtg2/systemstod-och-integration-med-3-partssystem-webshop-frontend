import { RowDataPacket } from "mysql2";
import { IOrderItem } from "./IOrderItem";

export enum PaymentStatus {
  Paid = "Paid",
  Unpaid = "Unpaid",
  Completed = "Completed",
  Failed = "Failed",
  Refunded = "Refunded",
}

export enum OrderStatus {
  Pending = "Pending",
  Shipped = "Shipped",
  Cancelled = "Cancelled",
  Paid = "Paid",
  Delivered = "Delivered",
  Refunded = "Refunded",
}

export interface IOrder extends RowDataPacket {
  id: number | null;
  customer_id: number;
  total_price: number;
  payment_status: PaymentStatus;
  payment_id: string;
  order_status: OrderStatus;
  created_at: string;
  customer_firstname: string;
  customer_lastname: string;
  customer_email: string;
  customer_phone: string;
  customer_street_address: string;
  customer_postal_code: string;
  customer_city: string;
  customer_country: string;
  customers_created_at: string;
  order_items: IOrderItem[];
}

export interface IOrderCreate {
  customer_id: number;
  payment_status: PaymentStatus;
  payment_id: string;
  order_status: OrderStatus;
  order_items: IOrderItem[];
}

export interface IOrderResponse {
  id?: number;
  message: string;
}

export interface IOrderUpdate {
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  payment_id: string;
}
