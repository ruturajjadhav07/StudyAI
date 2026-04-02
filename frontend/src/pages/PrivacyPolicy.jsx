import React, { useEffect } from 'react';
import {
  Shield, Lock, UserCheck, Sparkles
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

function InfoBox({ children }) {
  return (
    <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 text-indigo-800 dark:text-indigo-300 rounded-2xl px-6 py-5 my-8 text-base font-medium leading-relaxed">
      {children}
    </div>
  );
}

export default function PrivacyPolicy() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 selection:bg-indigo-100 no-scrollbar">

      <div className="fixed top-[-5%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* NAVBAR */}
      <Navbar links={[]} showBackHome={true} showToggle={false} />

      <header className="pt-32 md:pt-44 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={13} /> Legal & Privacy
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            Privacy <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Terms</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Our commitment to protecting your information and maintaining a safe learning environment as per privacy terms.
          </p>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-3xl mx-auto px-6 pb-24 space-y-16">

        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center">
              <Shield className="text-indigo-600 dark:text-indigo-400" size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Information Policy</h2>
          </div>
          <Body>
            We hold the security of your information in the highest regard. This policy outlines how data is managed to ensure a personalized and efficient study experience. We only process details that are essential for providing core platform functionalities, such as account management and dashboard personalization.
          </Body>
          <Body>
            Your study materials and interactions are processed strictly to facilitate AI-driven learning enhancements. This data is used to help track your individual progress and generate educational aids tailored to your curriculum requirements, ensuring your privacy remains intact throughout the process.
          </Body>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center">
              <Lock className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Data Integrity</h2>
          </div>
          <Body>
            Security is embedded into our infrastructure using industry-standard protocols. All information is encrypted during transmission and storage. We ensure that your data is never sold or shared with external parties for marketing purposes. Any external processing is limited strictly to necessary infrastructure support.
          </Body>
          <InfoBox>
            We maintain strict internal controls to ensure that your personal identity is shielded and that data processing aligns with established privacy standards.
          </InfoBox>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center">
              <UserCheck className="text-teal-600 dark:text-teal-400" size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">User Rights</h2>
          </div>
          <Body>
            Every user retains full authority over their digital presence on our platform. You have the inherent right to access your stored information, correct inaccuracies, or request the complete deletion of your account and all associated data. We are committed to honoring these requests promptly to ensure you have total control over your information.
          </Body>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}