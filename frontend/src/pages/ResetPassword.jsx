import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/api';
import toast from 'react-hot-toast';
import { Lock, Hash, Loader2 } from 'lucide-react';

export default function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: location.state?.email || '',
        otp: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await resetPassword(form);
            toast.success('Password reset successfully! Please login.');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid OTP or request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Set New Password</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Enter the 6-digit code sent to your email.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="6-digit OTP"
                            maxLength="6"
                            value={form.otp}
                            onChange={e => setForm({ ...form, otp: e.target.value })}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}