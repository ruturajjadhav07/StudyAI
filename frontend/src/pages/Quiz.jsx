import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuiz, submitQuiz } from '../services/api';
import toast from 'react-hot-toast';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, Flag, Loader2 } from 'lucide-react';

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [flagged, setFlagged] = useState(new Set());

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getQuiz(id);
        const quizData = res.data.data;
        setQuestions(quizData);

        // Try to recover time from localStorage, otherwise set new time
        const savedTime = localStorage.getItem(`quiz_timer_${id}`);
        if (savedTime) {
          setTimeLeft(parseInt(savedTime));
        } else {
          const initialTime = quizData.length * 60;
          setTimeLeft(initialTime);
          localStorage.setItem(`quiz_timer_${id}`, initialTime.toString());
        }
      } catch {
        toast.error('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const finalAnswers = {};
      questions.forEach(q => {
        finalAnswers[q.id] = answers[q.id] || null;
      });

      const res = await submitQuiz({
        materialId: parseInt(id),
        answers: finalAnswers
      });

      localStorage.removeItem(`quiz_timer_${id}`);
      navigate('/results', { state: { result: res.data.data } });
    } catch {
      toast.error('Submission failed');
      setSubmitting(false);
    }
  }, [answers, id, navigate, submitting, questions]);

  useEffect(() => {
    if (timeLeft <= 0 || loading) return;

    const timer = setInterval(() => {
      setTimeLeft(t => {
        const newTime = t - 1;

        // Update localStorage every second to keep sync on refresh
        if (newTime > 0) {
          localStorage.setItem(`quiz_timer_${id}`, newTime.toString());
        } else {
          clearInterval(timer);
          localStorage.removeItem(`quiz_timer_${id}`);
          handleSubmit();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading, handleSubmit, id]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="text-center">
        <Loader2 className="text-indigo-500 animate-spin mx-auto mb-4" size={40} />
        <p className="text-slate-500 dark:text-slate-400">Loading quiz...</p>
      </div>
    </div>
  );

  if (!questions.length) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="text-center px-4">
        <p className="text-slate-600 dark:text-slate-400 mb-4">No questions found. Please generate MCQs first.</p>
        <button onClick={() => navigate(-1)}
          className="px-6 py-2.5 border border-indigo-500 text-indigo-600 dark:text-indigo-400 rounded-xl font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition">
          Go Back
        </button>
      </div>
    </div>
  );

  const q = questions[current];
  const answered = Object.keys(answers).length;
  const progress = (answered / questions.length) * 100;
  const isLowTime = timeLeft < 60;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 py-4 sticky top-0 z-10 transition-colors">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg md:text-xl text-slate-800 dark:text-white whitespace-nowrap">📝 Quiz</span>
            <span className="text-slate-400 dark:text-slate-500 text-xs md:text-sm">
              Q {current + 1} of {questions.length}
            </span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm md:text-base transition-colors ${isLowTime
              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}>
              <Clock size={16} /> {formatTime(timeLeft)}
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 md:px-5 py-2 md:py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl transition text-sm whitespace-nowrap"
            >
              {submitting ? '...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1 bg-slate-200 dark:bg-slate-800 transition-colors">
        <div className="h-1 bg-indigo-600 transition-all duration-300"
          style={{ width: `${progress}%` }} />
      </div>
      <p className="text-center text-[10px] md:text-xs text-slate-400 dark:text-slate-500 py-2">
        {answered} of {questions.length} answered
      </p>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex flex-col lg:flex-row gap-6 items-start">
        {/* Question Area */}
        <div className="w-full lg:flex-1 bg-white dark:bg-slate-900 rounded-2xl p-5 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors order-1">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold">
              Q{current + 1}
            </span>
            {q.difficulty && (
              <span className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold ${q.difficulty === 'EASY' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : q.difficulty === 'MEDIUM' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}>
                {q.difficulty}
              </span>
            )}
            <button
              onClick={() => setFlagged(prev => {
                const n = new Set(prev);
                n.has(q.id) ? n.delete(q.id) : n.add(q.id);
                return n;
              })}
              className={`ml-auto p-1.5 rounded-lg transition ${flagged.has(q.id)
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20'
                : 'text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400'
                }`}
            >
              <Flag size={18} />
            </button>
          </div>

          <h2 className="text-base md:text-lg font-semibold text-slate-800 dark:text-slate-100 leading-relaxed mb-8 transition-colors">
            {q.questionText}
          </h2>

          <div className="space-y-3 mb-8">
            {['A', 'B', 'C', 'D'].map(opt => {
              const selected = answers[q.id] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                  className={`w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border text-left transition-all ${selected
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                >
                  <span className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0 transition-colors ${selected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                    {opt}
                  </span>
                  <span className="text-sm md:text-base text-slate-700 dark:text-slate-300 transition-colors">{q[`option${opt}`]}</span>
                  {selected && (
                    <CheckCircle className="ml-auto text-indigo-600 dark:text-indigo-400 flex-shrink-0" size={20} />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center gap-4">
            <button
              onClick={() => setCurrent(c => c - 1)}
              disabled={current === 0}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 font-semibold text-sm disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <ChevronLeft size={18} /> <span className="hidden sm:inline">Previous</span>
            </button>
            {current < questions.length - 1 ? (
              <button
                onClick={() => setCurrent(c => c + 1)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition"
              >
                <span className="hidden sm:inline">Next</span> <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold text-sm rounded-xl transition"
              >
                Finish 🎉
              </button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-56 flex-shrink-0 bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 lg:sticky lg:top-24 transition-colors order-2 lg:order-2 mb-8 lg:mb-0">
          <h4 className="font-bold text-slate-500 dark:text-slate-400 text-sm mb-4 transition-colors">Navigator</h4>
          <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-5 gap-1.5 mb-5">
            {questions.map((question, idx) => (
              <button
                key={question.id}
                onClick={() => setCurrent(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${idx === current
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : flagged.has(question.id)
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700'
                    : answers[question.id]
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="space-y-2 text-[10px] md:text-xs border-t border-slate-100 dark:border-slate-800 pt-4 transition-colors">
            {[
              { color: 'bg-indigo-600', label: 'Current' },
              { color: 'bg-green-400', label: 'Answered' },
              { color: 'bg-amber-400', label: 'Flagged' },
              { color: 'bg-slate-200 dark:bg-slate-700', label: 'Unanswered' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded ${l.color}`} />
                <span className="text-slate-500 dark:text-slate-400">{l.label}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 mt-4 pt-4 space-y-2 transition-colors">
            {[
              { label: 'Answered', value: `${answered}/${questions.length}` },
              { label: 'Flagged', value: flagged.size },
              { label: 'Remaining', value: questions.length - answered },
            ].map(s => (
              <div key={s.label} className="flex justify-between text-[10px] md:text-xs">
                <span className="text-slate-400 dark:text-slate-500">{s.label}</span>
                <span className="font-bold text-slate-700 dark:text-slate-200 transition-colors">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}