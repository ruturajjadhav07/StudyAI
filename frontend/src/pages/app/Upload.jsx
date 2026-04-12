import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadText, uploadPdf } from '../../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, FileText, Upload as UploadIcon, Loader2 } from 'lucide-react';

export default function Upload() {
  const [mode, setMode] = useState('text');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) { toast.error('Please enter a title'); return; }
    if (mode === 'text' && !text.trim()) { toast.error('Please enter some text'); return; }
    if (mode === 'pdf' && !file) { toast.error('Please select a PDF'); return; }

    setLoading(true);
    try {
      let res;
      if (mode === 'text') {
        res = await uploadText({ title: title.trim(), rawText: text.trim(), sourceType: 'TEXT' });
      } else {
        const fd = new FormData();
        fd.append('title', title.trim());
        fd.append('file', file);
        res = await uploadPdf(fd);
      }

      const materialId = res.data?.data?.id;
      if (!materialId) throw new Error('Invalid server response');

      toast.success('Material uploaded successfully!');
      navigate(`/study/${materialId}`);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition text-sm font-medium"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-1">Upload Study Material</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Paste your notes or upload a PDF</p>

        {/* Toggle Mode */}
        <div className="flex gap-3 mb-6">
          {[
            { id: 'text', icon: FileText, label: 'Paste Text' },
            { id: 'pdf', icon: UploadIcon, label: 'Upload PDF' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition border ${mode === id
                ? 'bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-500 dark:text-indigo-400'
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Give this material a title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white dark:bg-slate-900 dark:text-white"
          />

          {mode === 'text' ? (
            <textarea
              placeholder="Paste your study notes here..."
              value={text}
              onChange={e => setText(e.target.value)}
              rows={14}
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white dark:bg-slate-900 dark:text-white resize-y leading-relaxed"
            />
          ) : (
            <div
              onClick={() => document.getElementById('fileInput').click()}
              className="border-2 border-dashed border-indigo-200 dark:border-slate-800 rounded-2xl p-12 text-center cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition bg-white dark:bg-slate-900"
            >
              <UploadIcon className="mx-auto text-indigo-300 dark:text-indigo-500/50 mb-3" size={40} />
              <p className="text-slate-600 dark:text-slate-300 font-medium">
                {file ? `✅ ${file.name}` : 'Click to select a PDF file'}
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Max size: 10MB</p>
              <input
                id="fileInput"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={e => setFile(e.target.files[0])}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-slate-800 dark:disabled:text-slate-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 text-base shadow-lg shadow-indigo-100 dark:shadow-none"
          >
            {loading ? (
              <><Loader2 size={20} className="animate-spin" /> Uploading...</>
            ) : '🚀 Upload & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}