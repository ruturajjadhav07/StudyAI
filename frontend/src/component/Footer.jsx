import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950 backdrop-blur-2xl px-8 py-16 transition-colors duration-500 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
                        <button onClick={scrollToTop} className="flex items-center gap-2 group w-fit bg-transparent border-none cursor-pointer p-0">
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg group-hover:rotate-12 transition-all">
                                <BookOpen className="text-white" size={20} />
                            </div>
                            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">StudyAI</span>
                        </button>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-semibold">
                            Empowering students with AI-driven study tools to maximize productivity and learning outcomes.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-5">
                        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Platform</h4>
                        <ul className="flex flex-col gap-3 list-none p-0">
                            <li><Link to="/login" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-semibold no-underline">Login</Link></li>
                            <li><Link to="/register" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-semibold no-underline">Register</Link></li>
                            <li><a href="#features" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-semibold no-underline">Features</a></li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="flex flex-col gap-5">
                        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Legal</h4>
                        <ul className="flex flex-col gap-3 list-none p-0">
                            <li><Link to="/privacy" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-semibold no-underline">Privacy Policy</Link></li>
                            <li><a href="/terms" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-semibold no-underline">Terms of Service</a></li>
                            <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-semibold no-underline">Cookie Policy</a></li>
                        </ul>
                    </div>

                    {/* Connect Section */}
                    <div className="flex flex-col items-start md:items-end gap-6">
                        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Connect</h4>
                        <div className="flex items-center gap-4">
                            {[
                                { icon: <FaGithub size={22} />, url: "https://github.com/ruturajjadhav07" },
                                { icon: <FaLinkedin size={22} />, url: "https://www.linkedin.com/in/ruturaj-jadhav-0a250821b/" },
                                { icon: <FaInstagram size={22} />, url: "https://instagram.com/ruturajj_07" },
                                { icon: <FaTwitter size={22} />, url: "https://twitter.com/spoidermon" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all duration-300 no-underline"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                        &copy; {currentYear} Built with ❤️ by <span className="font-bold text-indigo-600">Ruturaj</span>
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                        Made for students, by students.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;