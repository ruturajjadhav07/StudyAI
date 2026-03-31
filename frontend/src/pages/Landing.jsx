import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';
import {
    ArrowRight,
    Upload,
    Brain,
    Zap,
    ShieldCheck,
    Sparkles,
    Menu,
    X
} from 'lucide-react';
import { FaGithub, FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiGooglecloud, SiSpringboot, SiDocker, SiVercel, SiRailway } from "react-icons/si";
import Footer from '../component/Footer';

const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Tech Stack", href: "#tech-stack" }
];

export default function LandingPage() {

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

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

    const techStack = [
        { name: "React", icon: <FaReact className="text-[#61DAFB]" />, desc: "Frontend" },
        { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" />, desc: "Styling" },
        { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" />, desc: "Runtime" },
        { name: "Spring Boot", icon: <SiSpringboot className="text-[#6DB33F]" />, desc: "Backend" },
        { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" />, desc: "Database" },
        { name: "Gemini AI", icon: <SiGooglecloud className="text-[#4285F4]" />, desc: "AI Engine" },
        { name: "Docker", icon: <SiDocker className="text-[#2496ED]" />, desc: "Containers" },
        { name: "Vercel", icon: <SiVercel className="text-black dark:text-white" />, desc: "Hosting" },
        { name: "Railway", icon: <SiRailway className="text-[#0B0D0E] dark:text-[#F5F5F5]" />, desc: "Deployment" },
        { name: "GitHub", icon: <FaGithub className="text-[#181717] dark:text-white" />, desc: "Code" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 selection:bg-indigo-100 dark:selection:bg-indigo-900 overflow-x-hidden relative transition-colors duration-500 font-sans">

            {/* NAVBAR */}
            <Navbar links={navLinks} />

            {/* HERO */}
            <header className="pt-32 md:pt-48 pb-16 md:pb-24 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6">
                        <Sparkles size={14} /> The Future of Learning is Here
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
                        Turn Your Notes into <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Smart Learning.</span>
                    </h1>
                    <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                        Upload PDFs or notes and instantly generate MCQs, high-quality summaries, and flashcards. Study smarter, not harder.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
                        <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 group">
                            🚀 Start Learning Free <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* CAPABILITIES */}
            <section id="features" className="py-16 md:py-24 px-6 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Capabilities</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-3 text-base md:text-lg">Everything you need to master your exams in record time.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-white/80 dark:bg-slate-800/80 p-8 rounded-[2rem] border border-white dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-slate-900 dark:text-white">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {[
                        { step: "1", title: "Upload Notes", desc: "Drag & drop your study material or lecture PDFs." },
                        { step: "2", title: "AI Processing", desc: "Our AI analyzes and organizes your data into key points." },
                        { step: "3", title: "Start Learning", desc: "Instantly get summaries, flashcards, and test yourself." }
                    ].map((item, i) => (
                        <div key={i} className="relative bg-white/40 dark:bg-slate-800/40 p-8 md:p-10 rounded-[2.5rem] text-center border border-white dark:border-slate-700">
                            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-black mb-6 shadow-lg">
                                {item.step}
                            </div>
                            <h3 className="font-bold text-lg md:text-xl text-slate-800 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* TECH STACK SECTION*/}
            <section id="tech-stack" className="py-16 md:py-24 px-6 bg-indigo-50/50 dark:bg-slate-950/50 border-y border-slate-100 dark:border-slate-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">The Tech Behind StudyAI</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">Built with high-performance modern technologies.</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {techStack.map((tech, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-white dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300">
                                <div className="text-3xl mb-3">{tech.icon}</div>
                                <span className="font-bold text-slate-800 dark:text-white text-[11px] md:text-xs uppercase tracking-wider">{tech.name}</span>
                                <span className="text-[9px] text-slate-400 mt-1 font-bold">{tech.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-16 md:py-24 px-4 md:px-6">
                <div className="max-w-6xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-700 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">It is 100% Free for Students.</h2>
                        <p className="text-indigo-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium opacity-90">
                            We believe education should be accessible. No hidden fees, no subscriptions—just pure AI-powered learning.
                        </p>
                        <Link to="/register" className="inline-block px-8 md:px-10 py-4 md:py-5 bg-white text-indigo-600 rounded-2xl font-extrabold text-lg md:text-xl hover:scale-105 transition-all">
                            Get Started Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}