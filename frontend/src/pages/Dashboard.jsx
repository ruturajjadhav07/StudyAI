import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyMaterials } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../component/ThemeToggle';
import {
  BookOpen, Plus, FileText, LogOut, Brain,
  Loader2, LayoutDashboard, Clock, ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logoutUser } = useAuth();

  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await getMyMaterials();
        setMaterials(res.data?.data || []);
      } catch (err) {
        if (err.response?.status !== 401) {
          toast.error('Failed to load materials');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  const totalQuizzesTaken = materials.reduce((acc, m) => acc + (m.quizzes?.length || 0), 0);

  const handleLogout = () => {
    logoutUser();
    toast.success('Logged out successfully');
    navigate('/', { replace: true });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short'
    });
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${theme === 'dark' ? 'dark bg-slate-950' : 'bg-[#f8fafc]'}`}>

      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col sticky top-0 h-screen transition-colors">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-indigo-200 dark:shadow-none shadow-lg">
              <BookOpen className="text-white" size={22} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              StudyAI
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded-xl font-semibold transition">
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button onClick={() => navigate('/upload')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition">
            <Plus size={18} /> New Upload
          </button>
        </nav>

        <div className="p-4 mt-auto space-y-4">
          <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-4 text-white">
            <p className="text-xs text-slate-400 mb-1">Current Plan</p>
            <p className="text-sm font-bold mb-3 italic text-indigo-400">Free Scholar</p>
            <button className="w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-xs font-bold rounded-lg transition">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Unified Navbar */}
        <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 sticky top-0 z-20 flex items-center justify-between transition-colors">

          <div className="flex items-center gap-3">
            <div className="lg:hidden flex items-center gap-3">
              <BookOpen className="text-indigo-600" size={24} />
              <span className="font-bold dark:text-white">StudyAI</span>
            </div>
            <div className="hidden lg:block text-slate-500 dark:text-slate-400 font-medium">
              Welcome back, <span className="text-slate-900 dark:text-white font-bold">{user?.name}</span> ✨
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition"
            >
              <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
            </button>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

            <ThemeToggle />
          </div>
        </nav>

        <div className="p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Dashboard</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Managing {materials.length} smart study materials</p>
            </div>
            <button
              onClick={() => navigate('/upload')}
              className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition shadow-xl shadow-indigo-100 dark:shadow-none hover:scale-[1.02] active:scale-95"
            >
              <Plus size={20} /> Create New
            </button>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Total Files', value: materials.length, icon: FileText, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { label: 'AI Quizzes', value: totalQuizzesTaken, icon: Brain, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
              { label: 'Study Streak', value: '1 Day', icon: Clock, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Recent Materials</h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="text-indigo-500 animate-spin mb-4" size={48} />
              <p className="text-slate-400 font-medium">Gathering your notes...</p>
            </div>
          ) : materials.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-16 text-center">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="text-slate-300 dark:text-slate-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Your library is empty</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 mb-8 max-w-sm mx-auto">
                Ready to study? Upload your PDF or paste your notes to start the AI magic.
              </p>
              <button
                onClick={() => navigate('/upload')}
                className="px-8 py-3.5 bg-slate-900 dark:bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-600 dark:hover:bg-indigo-500 transition shadow-lg"
              >
                Upload First Document
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {materials.map(m => (
                <div key={m.id} className="group bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-50 dark:hover:shadow-none transition-all duration-300 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {m.sourceType === 'PDF' ? '📄' : '📝'}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {m.sourceType}
                      </span>
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-[10px] font-black">
                        <Brain size={10} /> {m.quizzes?.length || 0} QUIZZES
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {m.title}
                  </h3>

                  <p className="text-sm text-slate-400 dark:text-slate-500 font-medium mb-4 flex items-center gap-2">
                    <Clock size={14} /> {formatDate(m.createdAt)}
                  </p>

                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3 italic">
                    "{m.rawText?.substring(0, 100)}..."
                  </p>

                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <button
                      onClick={() => navigate(`/study/${m.id}`)}
                      className="py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-xl transition"
                    >
                      Study Notes
                    </button>
                    <button
                      onClick={() => navigate(`/quiz/${m.id}`)}
                      className="py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-indigo-100 dark:shadow-none"
                    >
                      Quiz AI
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}