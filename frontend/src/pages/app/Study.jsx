import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getMaterial, getStudyData, generateSummary,
  generateMCQ, generateFlashcards,
} from '../../services/api';
import toast from 'react-hot-toast';
import {
  ArrowLeft, BookOpen, Zap, Brain, ChevronLeft,
  ChevronRight, RotateCcw, PlayCircle, FileText,
  Layers, Loader2,
} from 'lucide-react';

function FlashCard({ card, index, total }) {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => { setFlipped(false); }, [card]);

  return (
    <div
      className="w-full h-64 cursor-pointer mb-6"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className="relative w-full h-full transition-all duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            backfaceVisibility: 'hidden',
          }}
        >
          <span className="text-xs font-bold tracking-widest text-indigo-200 mb-4 uppercase">
            Question
          </span>
          <p className="text-white font-semibold text-lg leading-relaxed">
            {card.frontText}
          </p>
          <span className="text-white/50 text-xs mt-4 italic">👆 Click to reveal answer</span>
          <span className="absolute bottom-4 right-4 text-white/40 text-xs font-mono">
            {index + 1} / {total}
          </span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl border border-white/10"
          style={{
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <span className="text-xs font-bold tracking-widest text-cyan-400 mb-4 uppercase">
            Answer
          </span>
          <p className="text-white font-semibold text-lg leading-relaxed">
            {card.backText}
          </p>
          <span className="text-white/50 text-xs mt-4 italic">👆 Click to go back</span>
          <span className="absolute bottom-4 right-4 text-cyan-400/40 text-xs font-mono">
            {index + 1} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Study() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [material, setMaterial] = useState(null);
  const [summary, setSummary] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [activeTab, setActiveTab] = useState('summary');
  const [cardIndex, setCardIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingFlashcards, setLoadingFlashcards] = useState(false);
  const [loadingMCQ, setLoadingMCQ] = useState(false);
  const [mcqCount, setMcqCount] = useState(10);
  const [mcqDifficulty, setMcqDifficulty] = useState('MEDIUM');

  useEffect(() => {
    const load = async () => {
      try {
        const matRes = await getMaterial(id);
        setMaterial(matRes.data.data);
        const studyRes = await getStudyData(id);
        const sd = studyRes.data.data;
        if (sd.summary) setSummary(sd.summary);
        if (sd.flashcards) setFlashcards(sd.flashcards || []);
      } catch { toast.error('Failed to load material'); }
      finally { setLoading(false); }
    };
    load();
  }, [id]);

  const handleGenerateSummary = async () => {
    setLoadingSummary(true);
    try {
      const res = await generateSummary(id);
      setSummary(res.data.data);
      toast.success('Summary generated!');
    } catch { toast.error('Failed to generate summary'); }
    finally { setLoadingSummary(false); }
  };

  const handleGenerateFlashcards = async () => {
    setLoadingFlashcards(true);
    try {
      const res = await generateFlashcards(id);
      setFlashcards(res.data.data);
      setCardIndex(0);
      toast.success('Flashcards created!');
    } catch { toast.error('Failed to generate flashcards'); }
    finally { setLoadingFlashcards(false); }
  };

  const handleGenerateMCQ = async () => {
    setLoadingMCQ(true);
    try {
      await generateMCQ(id, mcqCount, mcqDifficulty);
      toast.success('Quiz ready!');
      setTimeout(() => navigate(`/quiz/${id}`), 600);
    } catch {
      toast.error('Failed to generate quiz');
      setLoadingMCQ(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <Loader2 className="text-indigo-500 animate-spin mx-auto mb-4" size={40} />
        <p className="text-slate-500 dark:text-slate-400">Loading material...</p>
      </div>
    </div>
  );

  if (!material) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <p className="text-slate-600 dark:text-slate-400 mb-4">Material not found.</p>
        <button onClick={() => navigate('/dashboard')}
          className="px-6 py-2 bg-indigo-600 text-white rounded-xl">
          Go to Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Nav */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-medium transition">
            <ArrowLeft size={18} /> Dashboard
          </button>
          <div className="flex items-center gap-3">
            <BookOpen className="text-indigo-600" size={20} />
            <span className="font-bold text-slate-800 dark:text-white text-lg truncate max-w-[200px] md:max-w-md">{material.title}</span>
            <span className="hidden sm:block text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-semibold">
              {material.sourceType}
            </span>
          </div>
          <button
            onClick={handleGenerateMCQ}
            disabled={loadingMCQ}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-slate-800 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-indigo-100 dark:shadow-none"
          >
            {loadingMCQ
              ? <><Loader2 size={15} className="animate-spin" /> Generating...</>
              : <><PlayCircle size={15} /> Start Quiz</>}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col lg:flex-row gap-6 items-start">
        {/* Main Content */}
        <div className="w-full lg:flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl mb-4">
            {[
              { id: 'summary', icon: FileText, label: 'Summary' },
              { id: 'flashcards', icon: Layers, label: 'Flashcards' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition ${activeTab === id
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
              >
                <Icon size={16} /> {label}
                {id === 'flashcards' && flashcards.length > 0 && (
                  <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {flashcards.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-7 shadow-sm border border-slate-100 dark:border-slate-800 min-h-[400px]">
              {!summary ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                  <Brain className="text-indigo-200 dark:text-indigo-900/50" size={56} />
                  <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No summary yet</h3>
                  <p className="text-slate-400 dark:text-slate-500 max-w-xs">
                    Let AI summarize your study material into key points
                  </p>
                  <button
                    onClick={handleGenerateSummary}
                    disabled={loadingSummary}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-100 dark:shadow-none"
                  >
                    {loadingSummary
                      ? <><Loader2 size={16} className="animate-spin" /> Generating...</>
                      : <><Zap size={16} /> Generate Summary</>}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">📋 AI Summary</h2>
                    <button
                      onClick={handleGenerateSummary}
                      disabled={loadingSummary}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      <RotateCcw size={13} />
                      {loadingSummary ? 'Regenerating...' : 'Regenerate'}
                    </button>
                  </div>
                  <div className="space-y-2 prose prose-slate dark:prose-invert max-w-none">
                    {summary.summaryText.split('\n').filter(l => l.trim()).map((line, i) => {
                      if (/^\d+\./.test(line.trim())) return (
                        <h4 key={i} className="font-bold text-slate-800 dark:text-slate-200 mt-4 mb-1 border-b border-slate-100 dark:border-slate-800 pb-1">
                          {line.trim()}
                        </h4>
                      );
                      if (/^[-•*]/.test(line.trim())) return (
                        <div key={i} className="flex gap-3 items-start py-1">
                          <span className="text-indigo-500 text-xs mt-1.5 flex-shrink-0">●</span>
                          <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            {line.replace(/^[-•*]\s*/, '').trim()}
                          </span>
                        </div>
                      );
                      return (
                        <p key={i} className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                          {line.trim()}
                        </p>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Flashcards Tab */}
          {activeTab === 'flashcards' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-7 shadow-sm border border-slate-100 dark:border-slate-800 min-h-[400px]">
              {flashcards.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                  <Layers className="text-indigo-200 dark:text-indigo-900/50" size={56} />
                  <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No flashcards yet</h3>
                  <p className="text-slate-400 dark:text-slate-500 max-w-xs">
                    AI will generate front/back cards from your material
                  </p>
                  <button
                    onClick={handleGenerateFlashcards}
                    disabled={loadingFlashcards}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-100 dark:shadow-none"
                  >
                    {loadingFlashcards
                      ? <><Loader2 size={16} className="animate-spin" /> Creating...</>
                      : <><Zap size={16} /> Generate Flashcards</>}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">🃏 Flashcards</h2>
                    <button
                      onClick={handleGenerateFlashcards}
                      disabled={loadingFlashcards}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      <RotateCcw size={13} />
                      {loadingFlashcards ? 'Regenerating...' : 'Regenerate'}
                    </button>
                  </div>

                  <FlashCard card={flashcards[cardIndex]} index={cardIndex} total={flashcards.length} />

                  {/* Nav */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={() => setCardIndex(i => Math.max(0, i - 1))}
                      disabled={cardIndex === 0}
                      className="flex items-center gap-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 font-medium text-sm disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      <ChevronLeft size={18} /> Prev
                    </button>
                    <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
                      {flashcards.map((_, i) => (
                        <button key={i} onClick={() => setCardIndex(i)}
                          className={`w-2 h-2 rounded-full transition ${i === cardIndex ? 'bg-indigo-600 scale-125' : 'bg-slate-300 dark:bg-slate-700'
                            }`} />
                      ))}
                    </div>
                    <button
                      onClick={() => setCardIndex(i => Math.min(flashcards.length - 1, i + 1))}
                      disabled={cardIndex === flashcards.length - 1}
                      className="flex items-center gap-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 font-medium text-sm disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      Next <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* All cards */}
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                    <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">All Cards</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                      {flashcards.map((card, i) => (
                        <div
                          key={i}
                          onClick={() => setCardIndex(i)}
                          className={`flex gap-3 p-3 rounded-xl cursor-pointer border transition ${i === cardIndex
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                            : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                        >
                          <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500 flex-shrink-0">
                            {i + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                              {card.frontText}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{card.backText}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0 space-y-4">
          {/* Preview */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-600 dark:text-slate-400 text-xs mb-3 uppercase tracking-wider">📄 Material Preview</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-6 italic">
              {material.rawText?.substring(0, 300)}
              {material.rawText?.length > 300 &&
                <span className="text-slate-400 dark:text-slate-600"> ... (truncated)</span>}
            </p>
          </div>

          {/* Quiz Generator */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-600 dark:text-slate-400 text-xs mb-4 uppercase tracking-wider">🎯 Generate Quiz</h4>

            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mb-2">
              Questions
            </p>
            <div className="grid grid-cols-4 gap-1.5 mb-4">
              {[5, 10, 15, 20].map(n => (
                <button key={n} onClick={() => setMcqCount(n)}
                  className={`py-2 rounded-lg text-xs font-bold border transition ${mcqCount === n
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}>
                  {n}
                </button>
              ))}
            </div>

            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mb-2">
              Difficulty
            </p>
            <div className="space-y-1.5 mb-4">
              {[
                { id: 'EASY', emoji: '😊', color: 'green' },
                { id: 'MEDIUM', emoji: '🤔', color: 'yellow' },
                { id: 'HARD', emoji: '🔥', color: 'red' },
              ].map(({ id, emoji, color }) => (
                <button key={id} onClick={() => setMcqDifficulty(id)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-medium border text-left transition ${mcqDifficulty === id
                    ? color === 'green' ? 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-500 text-green-700 dark:text-green-400 font-bold'
                      : color === 'yellow' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-500 text-yellow-700 dark:text-yellow-400 font-bold'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 font-bold'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}>
                  {emoji} {id}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerateMCQ}
              disabled={loadingMCQ}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-slate-800 text-white font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 dark:shadow-none"
            >
              {loadingMCQ
                ? <><Loader2 size={15} className="animate-spin" /> Generating...</>
                : <><PlayCircle size={15} /> Generate & Start Quiz</>}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-600 dark:text-slate-400 text-xs mb-3 uppercase tracking-wider">⚡ Quick Actions</h4>
            <div className="space-y-2">
              <button onClick={handleGenerateSummary} disabled={loadingSummary}
                className="w-full flex items-center gap-2 px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition text-left">
                <Brain className="text-indigo-500" size={16} />
                {loadingSummary ? 'Generating...' : 'Regenerate Summary'}
              </button>
              <button onClick={handleGenerateFlashcards} disabled={loadingFlashcards}
                className="w-full flex items-center gap-2 px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition text-left">
                <Layers className="text-indigo-500" size={16} />
                {loadingFlashcards ? 'Generating...' : 'Regenerate Flashcards'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}