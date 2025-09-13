import React, { useState, FormEvent } from 'react';
import { useAuth } from '../../components/auth';
import { PageWrapper } from '../../components/helpers';

const AdminSettingsPage = () => {
    const { passwords, addPassword, deletePassword } = useAuth();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const handleAddPassword = async (e: FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (await addPassword(newPassword)) {
            setMessage({ text: 'Admin password added successfully.', type: 'success' });
            setNewPassword('');
        } else {
            setMessage({ text: 'Password cannot be empty.', type: 'error' });
        }
    };

    const handleDeletePassword = async (id: number) => {
        setMessage(null);
        if (await deletePassword(id)) {
            setMessage({ text: 'Admin password removed successfully.', type: 'success' });
        } else {
            setMessage({ text: 'Cannot remove the last admin password.', type: 'error' });
        }
    };

    return (
        <PageWrapper>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Admin Settings</h1>
                <div className="bg-white p-8 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Admin Passwords</h2>

                    {message && (
                        <div className={`p-4 mb-6 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="space-y-4 mb-8">
                        {passwords.map(p => (
                            <div key={p.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                                <span className="font-mono text-gray-700">Password ID: {p.id}</span>
                                <button
                                    onClick={() => handleDeletePassword(p.id)}
                                    className="text-red-500 hover:text-red-700 font-semibold disabled:text-gray-400 disabled:cursor-not-allowed"
                                    disabled={passwords.length <= 1}
                                    aria-label={`Remove password with ID ${p.id}`}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleAddPassword} className="space-y-4 pt-6 border-t">
                        <h3 className="text-xl font-semibold text-gray-700">Add New Admin Password</h3>
                        <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-sky-500 text-white py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium hover:bg-sky-600">
                                Add Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </PageWrapper>
    );
};

export default AdminSettingsPage;
