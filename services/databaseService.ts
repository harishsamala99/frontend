import type { Booking, BookingStatus, BookingDetails, Password } from '../types';

// Base URL (from .env or default localhost)
const API_BASE_URL = "http://localhost:8080/api";

// ==================== BOOKINGS ====================

export const getAllBookings = async (): Promise<Booking[]> => {
  const res = await fetch(`${API_BASE_URL}/bookings`);
  return res.ok ? await res.json() : [];
};

export const getBookingById = async (id: number): Promise<Booking | null> => {
  const res = await fetch(`${API_BASE_URL}/bookings/${id}`);
  return res.ok ? await res.json() : null;
};

export const getBookingByNumber = async (
  bookingNumber: string
): Promise<Booking | null> => {
  const res = await fetch(`${API_BASE_URL}/bookings/number/${bookingNumber}`);
  return res.ok ? await res.json() : null;
};

export const createBooking = async (
  booking: BookingDetails
): Promise<Booking | null> => {
  const res = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  return res.ok ? await res.json() : null;
};

export const updateBookingStatus = async (
  id: number,
  status: BookingStatus
): Promise<boolean> => {
  const res = await fetch(`${API_BASE_URL}/bookings/${id}/status?status=${status}`, {
    method: "PUT",
  });
  return res.ok;
};

export const deleteBooking = async (id: number): Promise<boolean> => {
  const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
    method: "DELETE",
  });
  return res.ok;
};

// ==================== ADMIN PASSWORDS ====================

export const login = async (password: string): Promise<{ success: boolean; name?: string }> => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) return { success: false };
  const data = await res.json();
  return data;
};

export const getPasswords = async (): Promise<Password[]> => {
  const res = await fetch(`${API_BASE_URL}/auth/passwords`);
  return res.ok ? await res.json() : [];
};

export const addPassword = async (password: Omit<Password, 'id'>): Promise<Password | null> => {
  const res = await fetch(`${API_BASE_URL}/auth/passwords`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(password),
  });
  return res.ok ? await res.json() : null;
};

export const deletePassword = async (id: number): Promise<boolean> => {
  const res = await fetch(`${API_BASE_URL}/auth/passwords/${id}`, {
    method: "DELETE",
  });
  return res.ok;
};