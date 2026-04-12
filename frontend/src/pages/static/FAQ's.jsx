import React, { useState, useEffect } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200 dark:border-slate-800 last:border-0 selection:bg-indigo-100 no-scrollbar">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-7 flex items-center justify-between text-left gap-4 bg-transparent border-none cursor-pointer group"
            >
                <span className="text-lg md:text-xl font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">
                    {question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-indigo-600 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <ChevronDown size={18} />
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-8' : 'max-h-0'}`}>
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default function FAQ() {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Question and answer
    const faqs = [
        {
            question: "Is StudyAI really free for students?",
            answer: "Yes, 100%. We believe that high-quality AI study tools should be accessible to everyone. There are no hidden subscriptions or premium tiers."
        },
        {
            question: "What types of files can I upload?",
            answer: "You can upload PDFs, Word documents, PowerPoint slides, and even images of handwritten notes. Our AI extracts text from all of them."
        },
        {
            question: "How does the AI generate quizzes?",
            answer: "Our system uses Gemini AI to identify key concepts and relationships in your material to create Multiple Choice Questions for active recall."
        },
        {
            question: "Is my study data secure?",
            answer: "Absolutely. Your uploads are processed securely and are private to your account. We do not sell your data or use it for marketing."
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 selection:bg-indigo-100 no-scrollbar">

            <div className="fixed top-[-5%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* NAVBAR */}
            <Navbar links={[]} showBackHome={true} showToggle={false} />

            <header className="pt-32 md:pt-44 pb-16 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Sparkles size={13} /> Support & Help
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                        Common <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Questions</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        Everything you need to know about StudyAI to get the most out of your learning experience.
                    </p>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 pb-32">
                <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800/60 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-indigo-500/5">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} />
                    ))}
                </div>
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}