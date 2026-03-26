import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Trophy, RotateCcw, Home } from 'lucide-react';

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  if (!result) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <p className="text-slate-600 mb-4">No results found.</p>
        <button onClick={() => navigate('/dashboard')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold">
          Go to Dashboard
        </button>
      </div>
    </div>
  );

  const { score, total, percentage, grade, results } = result;

  const gradeColor =
    grade === 'A+' || grade === 'A' ? 'text-green-500'
      : grade === 'B' ? 'text-blue-500'
        : grade === 'C' ? 'text-amber-500'
          : grade === 'D' ? 'text-orange-500'
            : 'text-red-500';

  const progressColor =
    grade === 'A+' || grade === 'A' ? 'bg-green-500'
      : grade === 'B' ? 'bg-blue-500'
        : grade === 'C' ? 'bg-amber-500'
          : grade === 'D' ? 'bg-orange-500'
            : 'bg-red-500';

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Score Card */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 text-center mb-8">
          <Trophy className="text-amber-400 mx-auto mb-4" size={52} />
          <h1 className="text-3xl font-extrabold text-slate-800 mb-8">Quiz Complete!</h1>

          <div className="flex justify-center gap-16 mb-8">
            <div className="flex flex-col items-center gap-1">
              <span className={`text-5xl font-black ${gradeColor}`}>{grade}</span>
              <span className="text-sm text-slate-400 font-medium">Grade</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl font-extrabold text-slate-800">
                {score}/{total}
              </span>
              <span className="text-sm text-slate-400 font-medium">Score</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className={`text-4xl font-extrabold ${gradeColor}`}>
                {percentage?.toFixed(1)}%
              </span>
              <span className="text-sm text-slate-400 font-medium">Percentage</span>
            </div>
          </div>

          <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-8">
            <div className={`h-3 rounded-full transition-all ${progressColor}`}
              style={{ width: `${percentage}%` }} />
          </div>

          <div className="flex justify-center gap-3">
            <button onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-6 py-3 border border-indigo-500 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition">
              <RotateCcw size={16} /> Retake
            </button>
            <button onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition">
              <Home size={16} /> Dashboard
            </button>
          </div>
        </div>

        {/* Detailed Results */}
        <h2 className="text-xl font-bold text-slate-800 mb-4">Detailed Review</h2>
        <div className="space-y-3">
          {results.map((r, i) => (
            <div key={r.questionId}
              className={`bg-white rounded-xl p-5 border-l-4 shadow-sm ${r.isCorrect ? 'border-green-500' : 'border-red-500'
                }`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-slate-100 text-slate-500 font-bold text-xs px-2.5 py-1 rounded-full">
                  Q{i + 1}
                </span>
                {r.isCorrect
                  ? <CheckCircle className="text-green-500" size={18} />
                  : <XCircle className="text-red-500" size={18} />}
                <span className={`font-semibold text-sm ${r.isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {r.isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </div>
              <p className="text-slate-800 font-medium text-sm leading-relaxed mb-3">
                {r.questionText}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {r.selectedOption && (
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${r.isCorrect
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                    }`}>
                    Your answer: {r.selectedOption}
                  </span>
                )}
                {!r.isCorrect && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    Correct: {r.correctOption}
                  </span>
                )}
              </div>
              {r.explanation && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 leading-relaxed">
                  <strong>💡 Explanation: </strong>{r.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}