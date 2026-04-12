import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-110 active:scale-95 transition-all"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="fill-slate-600" />
      ) : (
        <Sun size={20} className="fill-amber-400 text-amber-400" />
      )}
    </button>
  );
}