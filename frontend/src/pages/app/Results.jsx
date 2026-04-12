import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, RotateCcw, LayoutDashboard, Info } from 'lucide-react';

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  if (!result) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
      <button onClick={() => navigate('/dashboard')} className="text-indigo-600 font-medium hover:underline">
        Return to Dashboard
      </button>
    </div>
  );

  const { score, total, percentage, grade, results } = result;

  const statusColor = percentage >= 70 ? 'emerald' : percentage >= 40 ? 'amber' : 'rose';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-6 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">

        {/* Header Score */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-${statusColor}-50 dark:bg-${statusColor}-500/10 border border-${statusColor}-100 dark:border-${statusColor}-500/20`}>
              <span className={`text-3xl font-black text-${statusColor}-600 dark:text-${statusColor}-400`}>{grade}</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Quiz Results</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                You scored <span className="font-bold text-slate-700 dark:text-slate-200">{score} out of {total}</span> ({Math.round(percentage)}%)
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => navigate(-1)}
              className="p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Retake">
              <RotateCcw size={20} />
            </button>
            <button onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-all">
              <LayoutDashboard size={18} /> Dashboard
            </button>
          </div>
        </div>

        {/* Review List */}
        <div className="space-y-3">
          {results.map((r, i) => {
            const isCorrect = r.selectedOption?.toString().trim().toLowerCase() === r.correctOption?.toString().trim().toLowerCase();

            return (
              <div key={r.questionId || i} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    {isCorrect
                      ? <CheckCircle size={18} className="text-emerald-500" />
                      : <XCircle size={18} className="text-rose-500" />}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 leading-snug">
                      {r.questionText}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
                      <div className="text-xs">
                        <span className="text-slate-400 mr-1 uppercase font-bold tracking-tighter">Your Answer:</span>
                        <span className={`font-bold ${!r.selectedOption ? 'text-slate-400 italic' : isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {r.selectedOption || 'Skipped'}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="text-xs">
                          <span className="text-slate-400 mr-1 uppercase font-bold tracking-tighter">Correct:</span>
                          <span className="font-bold text-emerald-600">{r.correctOption}</span>
                        </div>
                      )}
                    </div>

                    {r.explanation && (
                      <div className="pl-3 border-l-2 border-slate-100 dark:border-slate-800 py-1">
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                          <span className="font-bold not-italic text-slate-400 mr-1">Note:</span>
                          {r.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}