import React, { useRef, useState, useEffect } from 'react';
import { TagInput, TagInputHandle } from './components/TagInput';
import { Terminal, Copy, CheckCircle, Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const tagInputRef = useRef<TagInputHandle>(null);
  const [retrievedTags, setRetrievedTags] = useState<string[] | null>(null);
  
  // Initialize dark mode from system preference or default to false
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Toggle the 'dark' class on the html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleGetTags = () => {
    if (tagInputRef.current) {
      const tags = tagInputRef.current.getTags();
      setRetrievedTags(tags);
    }
  };

  const handleClear = () => {
    setRetrievedTags(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300 p-8 flex flex-col items-center justify-center relative">
      
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="max-w-2xl w-full space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white tracking-tight transition-colors">Tag Input Component</h1>
          <p className="text-slate-500 dark:text-slate-400 transition-colors">
            Type words and press <kbd className="bg-slate-200 dark:bg-slate-700 dark:text-slate-200 px-1 rounded text-sm font-mono transition-colors">Space</kbd> or <kbd className="bg-slate-200 dark:bg-slate-700 dark:text-slate-200 px-1 rounded text-sm font-mono transition-colors">Enter</kbd> to create tags.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 space-y-6 transition-all duration-300">
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors">
              Add Tags
            </label>
            <TagInput 
              ref={tagInputRef} 
              placeholder="Type something..." 
              initialTags={["react", "typescript", "tailwind"]}
            />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-700 transition-colors">
            <button
              onClick={handleGetTags}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900"
            >
              <Terminal size={18} />
              Call getTags()
            </button>
            
            {retrievedTags && (
              <button
                onClick={handleClear}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-sm font-medium px-3 py-2 transition-colors"
              >
                Clear Output
              </button>
            )}
          </div>

          {retrievedTags && (
            <div className="bg-slate-900 dark:bg-black rounded-lg p-4 overflow-hidden relative group animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="absolute top-3 right-3 text-slate-500">
                <Copy size={16} />
              </div>
              <h3 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">
                Console Output
              </h3>
              <code className="font-mono text-green-400 block">
                [
                {retrievedTags.map((tag, i) => (
                  <span key={i}>
                    "{tag}"{i < retrievedTags.length - 1 ? ", " : ""}
                  </span>
                ))}
                ]
              </code>
            </div>
          )}
        </div>

        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6 rounded-xl text-sm text-slate-600 dark:text-slate-400 transition-colors">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2 transition-colors">
            <CheckCircle size={16} className="text-green-600 dark:text-green-500"/>
            Features Implemented
          </h2>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li>Splits input by space character automatically.</li>
            <li>Supports <strong>Backspace</strong> to delete the last tag when input is empty.</li>
            <li>Exposes a public <code>getTags()</code> method via <code>forwardRef</code>.</li>
            <li>Prevents adding empty tags.</li>
            <li>Visual close icon on each tag.</li>
            <li>Dark mode support.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default App;