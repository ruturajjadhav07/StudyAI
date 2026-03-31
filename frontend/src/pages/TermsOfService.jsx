import React, { useEffect } from 'react';
import {
    Scale,
    FileText,
    AlertCircle,
    UserX,
    Sparkles
} from 'lucide-react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

function Body({ children, className = '' }) {
    return (
        <p className={`text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium mb-6 ${className}`}>
            {children}
        </p>
    );
}

function SectionTitle({ icon: Icon, title, colorClass }) {
    return (
        <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 ${colorClass} rounded-2xl flex items-center justify-center`}>
                <Icon size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h2>
        </div>
    );
}

export default function TermsOfService() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 selection:bg-indigo-100 no-scrollbar relative">

            <div className="fixed top-[-5%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* NAVBAR */}
            <Navbar links={[]} showBackHome={true} showToggle={false} />

            <header className="pt-40 md:pt-48 pb-16 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Sparkles size={13} /> Usage Agreement
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                        Terms of <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-500 bg-clip-text text-transparent">Service</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        Please read these terms carefully before using StudyAI to ensure a fair and productive experience for everyone.
                    </p>
                </div>
            </header>

            {/* CONTENT */}
            <main className="max-w-3xl mx-auto px-6 pb-24 space-y-16 relative z-10">

                <section>
                    <SectionTitle
                        icon={Scale}
                        title="Acceptance of Terms"
                        colorClass="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    />
                    <Body>
                        By accessing or using StudyAI, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the service. These terms apply to all students, educators, and visitors who use the platform.
                    </Body>
                </section>

                <section>
                    <SectionTitle
                        icon={FileText}
                        title="User Responsibilities"
                        colorClass="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                    />
                    <Body>
                        You are responsible for maintaining the confidentiality of your account and password. You agree to use StudyAI only for lawful educational purposes. Any attempt to reverse-engineer the AI models or scrape data from the platform is strictly prohibited.
                    </Body>
                    <Body>
                        Content uploaded to StudyAI remains your property, but you grant us the necessary rights to process that content for the purpose of generating study aids, summaries, and quizzes.
                    </Body>
                </section>

                <section>
                    <SectionTitle
                        icon={AlertCircle}
                        title="AI Accuracy Disclaimer"
                        colorClass="bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                    />
                    <Body>
                        StudyAI utilizes advanced Gemini AI models to process information. While we strive for high accuracy, AI-generated content (summaries, MCQs, explanations) may occasionally contain errors. We recommend cross-referencing AI outputs with your original study materials before exams.
                    </Body>
                </section>

                <section>
                    <SectionTitle
                        icon={UserX}
                        title="Termination"
                        colorClass="bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                    />
                    <Body>
                        We reserve the right to terminate or suspend your access to our platform immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users of the service.
                    </Body>
                </section>

            </main>
            {/* FOOTER */}
            <Footer />
        </div>
    );
}