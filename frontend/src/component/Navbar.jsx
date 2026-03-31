import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Menu, X, ArrowLeft } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ links = [], showBackHome = false, showToggle = true }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-800/40 rounded-2xl shadow-xl transition-all">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group no-underline">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-1.5 md:p-2 rounded-xl shadow-lg">
                        <BookOpen className="text-white" size={18} />
                    </div>
                    <span className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">StudyAI</span>
                </Link>

                <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {links.map((link, index) => (
                        <a key={index} href={link.href} className="hover:text-indigo-600 transition no-underline">
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    {/* Toggle */}
                    {showToggle && <ThemeToggle />}
                    
                    {showBackHome && (
                        <Link to="/" className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition no-underline">
                            <ArrowLeft size={16} /> <span className="hidden sm:inline">Back Home</span>
                        </Link>
                    )}

                    {!showBackHome && (
                        <div className="hidden sm:flex items-center gap-4">
                            <Link to="/login" className="text-sm font-bold text-slate-700 dark:text-slate-300 no-underline">Login</Link>
                            <Link to="/register" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg no-underline">Get Started</Link>
                        </div>
                    )}
                    
                    {links.length > 0 && (
                        <button className="lg:hidden p-2 text-slate-600 dark:text-slate-300 bg-transparent border-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;