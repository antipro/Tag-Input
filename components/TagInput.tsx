import React, { useState, useRef, useImperativeHandle, forwardRef, KeyboardEvent, ChangeEvent } from 'react';
import { X } from 'lucide-react';

export interface TagInputHandle {
  /**
   * Returns an array of all current tag names.
   */
  getTags: () => string[];
}

interface TagInputProps {
  initialTags?: string[];
  placeholder?: string;
  className?: string;
  /**
   * Callback fired when tags change.
   */
  onChange?: (tags: string[]) => void;
}

export const TagInput = forwardRef<TagInputHandle, TagInputProps>(
  ({ initialTags = [], placeholder = "Add a tag...", className = "", onChange }, ref) => {
    const [tags, setTags] = useState<string[]>(initialTags);
    const [inputValue, setInputValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Expose the getTags method to the parent component
    useImperativeHandle(ref, () => ({
      getTags: () => tags
    }));

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // Check if the last character is a space
      if (value.endsWith(' ')) {
        const trimmedValue = value.trim();
        if (trimmedValue.length > 0) {
          addTags(trimmedValue);
        }
        setInputValue('');
      } else {
        setInputValue(value);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      // Handle Enter key to add tag
      if (e.key === 'Enter') {
        e.preventDefault();
        const trimmedValue = inputValue.trim();
        if (trimmedValue.length > 0) {
          addTags(trimmedValue);
          setInputValue('');
        }
      }

      // Handle Backspace to remove last tag if input is empty
      if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
        removeTag(tags.length - 1);
      }
    };

    const addTags = (newTagString: string) => {
      // Handle pasting or typing multiple words
      const newTags = newTagString.split(/\s+/).filter(tag => tag.length > 0);
      
      const updatedTags = [...tags, ...newTags];
      setTags(updatedTags);
      onChange?.(updatedTags);
    };

    const removeTag = (indexToRemove: number) => {
      const updatedTags = tags.filter((_, index) => index !== indexToRemove);
      setTags(updatedTags);
      onChange?.(updatedTags);
    };

    const handleContainerClick = () => {
      inputRef.current?.focus();
    };

    return (
      <div 
        className={`flex flex-wrap items-center gap-2 p-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 transition-all cursor-text ${className}`}
        onClick={handleContainerClick}
      >
        {tags.map((tag, index) => (
          <span 
            key={`${tag}-${index}`} 
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-200 text-sm font-medium border border-indigo-100 dark:border-indigo-700/50 animate-in fade-in zoom-in duration-200"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              className="text-indigo-400 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-800 rounded-full p-0.5 transition-colors focus:outline-none"
              aria-label={`Remove tag ${tag}`}
            >
              <X size={14} strokeWidth={3} />
            </button>
          </span>
        ))}
        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-grow min-w-[120px] outline-none bg-transparent text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>
    );
  }
);

TagInput.displayName = 'TagInput';