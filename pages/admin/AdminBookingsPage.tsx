import React, { useState, useEffect } from 'react';
import * as api from '../../services/databaseService';
import { PageWrapper } from '../../components/helpers';
import type { Booking, BookingStatus } from '../../types';
import { SERVICES_DATA } from '../../constants';

const AdminBookingsPage: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBookings = async () => {
        setIsLoading(true);
        const allBookings = await api.getAllBookings();
        setBookings(allBookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        setIsLoading(false);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusChange = async (bookingId: number, newStatus: BookingStatus) => {
        const success = await api.updateBookingStatus(bookingId, newStatus);
        if (success) {
            setBookings(prevBookings =>
                prevBookings.map(b =>
                    b.id === bookingId ? { ...b, status: newStatus } : b
                )
            );
        }
    };

    const handleDeleteBooking = async (bookingId: number) => {
        if (window.confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
            const success = await api.deleteBooking(bookingId);
            if (success) {
                setBookings(prevBookings => prevBookings.filter(b => b.id !== bookingId));
            } else {
                alert('Failed to delete the booking. Please try again.');
            }
        }
    };

    const getStatusChip = (status: BookingStatus) => {
        switch (status) {
            case 'Approved': return `bg-green-100 text-green-800`;
            case 'Pending': return `bg-yellow-100 text-yellow-800`;
            case 'Rejected': return `bg-red-100 text-red-800`;
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <PageWrapper>
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Manage Bookings</h1>
            {isLoading ? (
                <p className="text-center text-gray-600">Loading bookings...</p>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-xl overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-4">Booking #</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Service Details</th>
                                <th className="p-4">Date &amp; Time</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="border-b hover:bg-gray-50 align-top">
                                    <td className="p-4">
                                        <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm text-gray-700">{booking.bookingNumber}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-gray-800">{booking.name}</div>
                                        <div className="text-sm text-gray-500">{booking.email}</div>
                                        <div className="text-sm text-gray-500">{booking.phone}</div>
                                        <div className="text-sm text-gray-500 mt-1">{booking.address}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium">{SERVICES_DATA.find(s => s.id === booking.service)?.title || 'Unknown Service'}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium">{new Date(`${booking.date}T00:00:00`).toLocaleDateString()}</div>
                                        <div className="text-sm text-gray-500">{booking.time}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-sm font-semibold rounded-full ${getStatusChip(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center space-x-2">
                                            <select
                                                value={booking.status}
                                                onChange={(e) => handleStatusChange(booking.id, e.target.value as BookingStatus)}
                                                className="border border-gray-300 rounded-md p-1 focus:ring-sky-500 focus:border-sky-500 text-sm"
                                                aria-label={`Update status for booking ${booking.bookingNumber}`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                            <button
                                                onClick={() => handleDeleteBooking(booking.id)}
                                                className="text-red-600 hover:text-red-800 text-sm font-semibold p-1 rounded hover:bg-red-100 transition-colors"
                                                aria-label={`Delete booking ${booking.bookingNumber}`}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {bookings.length === 0 && <p className="text-center p-8 text-gray-500">No bookings found.</p>}
                </div>
            )}
        </PageWrapper>
    );
};

export default AdminBookingsPage;