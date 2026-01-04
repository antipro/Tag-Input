import React, { useRef, useState } from 'react';
import { TagInput, TagInputHandle } from './components/TagInput';
import { Terminal, Copy, CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  const tagInputRef = useRef<TagInputHandle>(null);
  const [retrievedTags, setRetrievedTags] = useState<string[] | null>(null);

  const handleGetTags = () => {
    if (tagInputRef.current) {
      const tags = tagInputRef.current.getTags();
      setRetrievedTags(tags);
    }
  };

  const handleClear = () => {
    // This demonstrates we can also control it via keys usually, 
    // but here we just reset our local display state.
    // Ideally, the component might expose a clear method too, 
    // but the requirement was specifically for getTags.
    setRetrievedTags(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Tag Input Component</h1>
          <p className="text-slate-500">
            Type words and press <kbd className="bg-slate-200 px-1 rounded text-sm font-mono">Space</kbd> or <kbd className="bg-slate-200 px-1 rounded text-sm font-mono">Enter</kbd> to create tags.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-6">
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Add Tags
            </label>
            <TagInput 
              ref={tagInputRef} 
              placeholder="Type something..." 
              initialTags={["react", "typescript", "tailwind"]}
            />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={handleGetTags}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all focus:ring-4 focus:ring-indigo-100"
            >
              <Terminal size={18} />
              Call getTags()
            </button>
            
            {retrievedTags && (
              <button
                onClick={handleClear}
                className="text-slate-500 hover:text-slate-700 text-sm font-medium px-3 py-2"
              >
                Clear Output
              </button>
            )}
          </div>

          {retrievedTags && (
            <div className="bg-slate-900 rounded-lg p-4 overflow-hidden relative group animate-in fade-in slide-in-from-top-2 duration-300">
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

        <div className="bg-white/50 backdrop-blur-sm border border-slate-200 p-6 rounded-xl text-sm text-slate-600">
          <h2 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600"/>
            Features Implemented
          </h2>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li>Splits input by space character automatically.</li>
            <li>Supports <strong>Backspace</strong> to delete the last tag when input is empty.</li>
            <li>Exposes a public <code>getTags()</code> method via <code>forwardRef</code>.</li>
            <li>Prevents adding empty tags.</li>
            <li>Visual close icon on each tag.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default App;