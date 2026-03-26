import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BookOpen,
    ArrowRight,
    Upload,
    Brain,
    Zap,
    ShieldCheck,
    Sparkles
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import ThemeToggle from '../component/ThemeToggle';

export default function LandingPage() {
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        const timer = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const features = [
        {
            icon: <Upload className="text-indigo-600 dark:text-indigo-400" size={24} />,
            title: "Easy Uploads",
            description: "Drop your PDFs, lecture slides, or messy handwritten notes and let our AI do the heavy lifting."
        },
        {
            icon: <Brain className="text-purple-600 dark:text-purple-400" size={24} />,
            title: "AI Summarization",
            description: "Turn 50-page chapters into 5-minute reads. Focus on core concepts without the fluff."
        },
        {
            icon: <Zap className="text-amber-500" size={24} />,
            title: "Smart MCQs",
            description: "Instantly generate practice quizzes from your content to test your retention and prep for exams."
        },
        {
            icon: <ShieldCheck className="text-emerald-500 dark:text-emerald-400" size={24} />,
            title: "Progress Insights",
            description: "Track your mastery over different subjects with our AI-driven personalized analytics."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 selection:bg-indigo-100 dark:selection:bg-indigo-900 overflow-x-hidden relative transition-colors duration-500">

            <style>
                {`
                    ::-webkit-scrollbar { display: none; }
                    html { scroll-behavior: smooth; -ms-overflow-style: none; scrollbar-width: none; }
                `}
            </style>

            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-indigo-200/40 dark:bg-indigo-900/20 rounded-full blur-[100px] -z-10"></div>

            <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 px-4 md:px-6 py-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-slate-800/40 rounded-2xl shadow-xl flex items-center justify-between transition-all">
                <button onClick={scrollToTop} className="flex items-center gap-2 group cursor-pointer bg-transparent border-none outline-none">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                        <BookOpen className="text-white" size={20} />
                    </div>
                    <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        StudyAI
                    </span>
                </button>

                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Features</a>
                    <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">How it Works</a>
                    <Link to="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Login</Link>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <ThemeToggle />
                    </div>
                    <Link to="/register" className="bg-slate-900 dark:bg-indigo-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:scale-105 transition-all shadow-lg whitespace-nowrap">
                        Get Started
                    </Link>
                </div>
            </nav>

            <header className="pt-48 pb-20 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/50 dark:bg-slate-800/50 border border-indigo-100 dark:border-slate-700 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                        <Sparkles size={14} /> The Future of Learning is Here
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
                        Turn Your Notes into <br />
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                            Smart Learning.
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Upload PDFs or notes and instantly generate MCQs, high-quality summaries, and flashcards. Study smarter, not harder.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register" className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 dark:hover:shadow-none transition-all flex items-center justify-center gap-2 group">
                            🚀 Start for Free <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                        </Link>
                        <button className="w-full sm:w-auto px-10 py-4 bg-white/80 dark:bg-slate-800 backdrop-blur-md text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-sm">
                            Watch Demo
                        </button>
                    </div>
                </div>
            </header>

            <section id="features" className="py-24 px-4 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Capabilities</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">Everything you need to master your exams in record time.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-8 rounded-[2rem] border border-white dark:border-slate-700 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                                <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="py-24 px-6 max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    {[
                        { step: "1", title: "Upload Notes", desc: "Drag & drop your study material." },
                        { step: "2", title: "AI Processing", desc: "Our AI analyzes and organizes data." },
                        { step: "3", title: "Start Learning", desc: "Get summaries and test yourself." }
                    ].map((item, i) => (
                        <div key={i} className="relative bg-white/40 dark:bg-slate-800/40 p-10 rounded-[2.5rem] text-center border border-white dark:border-slate-700 shadow-md transition-colors">
                            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl font-black mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition">
                                {item.step}
                            </div>
                            <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="mt-20 border-t border-white/50 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl px-8 py-12 transition-colors">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <button onClick={scrollToTop} className="flex items-center gap-2 justify-center md:justify-start group bg-transparent border-none outline-none">
                            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                                <BookOpen className="text-white" size={18} />
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">StudyAI</span>
                        </button>
                        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
                            &copy; {currentYear} Built with ❤️ by <span className="text-indigo-600 dark:text-indigo-400 font-bold">Ruturaj</span>
                        </p>
                    </div>

                    <div className="flex gap-8 text-sm font-bold text-slate-600 dark:text-slate-300">
                        <Link to="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Login</Link>
                        <Link to="/register" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Register</Link>
                        <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Privacy</a>
                    </div>

                    <div className="flex items-center gap-5">
                        {[
                            { icon: <FaGithub size={22} />, url: "https://github.com/ruturajjadhav07", hover: "hover:text-black dark:hover:text-white" },
                            { icon: <FaLinkedin size={22} />, url: "https://www.linkedin.com/in/ruturaj-jadhav-0a250821b/", hover: "hover:text-blue-600" },
                            { icon: <FaInstagram size={22} />, url: "https://instagram.com/ruturajj_07", hover: "hover:text-pink-500" },
                            { icon: <FaTwitter size={22} />, url: "https://twitter.com/spoidermon", hover: "hover:text-sky-400" }
                        ].map((social, i) => (
                            <a key={i} href={social.url} target="_blank" rel="noreferrer" className={`text-slate-400 dark:text-slate-500 ${social.hover} transition-all hover:scale-125 cursor-pointer`}>
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}