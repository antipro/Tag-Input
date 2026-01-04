# TagInput Component Specification

## Overview
The `TagInput` component is a React functional component designed to capture multiple text tags from a single input field. It separates user input into distinct tags using the space character as a delimiter.

## Features
- **Space Delimited**: Input text is automatically tokenized into tags when a space is typed.
- **Visual Feedback**: Tags are displayed as distinct pills with a visual remove (X) button.
- **Tag Removal**: 
    - Click the 'X' icon on a tag to remove it.
    - Press `Backspace` when the input field is empty to remove the last tag.
- **Programmatic Access**: Exposes a `getTags()` method to parent components via a ref.

## Usage

```tsx
import { useRef } from 'react';
import { TagInput, TagInputHandle } from './components/TagInput';

function MyForm() {
  const tagInputRef = useRef<TagInputHandle>(null);

  const handleSubmit = () => {
    // Access tags programmatically
    const currentTags = tagInputRef.current?.getTags();
    console.log(currentTags);
  };

  return (
    <TagInput 
      ref={tagInputRef} 
      placeholder="Enter tags..." 
    />
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialTags` | `string[]` | `[]` | Initial list of tags to display. |
| `placeholder` | `string` | `"Add a tag..."` | Placeholder text for the input. |
| `className` | `string` | `""` | Additional CSS classes for the container. |
| `onChange` | `(tags: string[]) => void` | `undefined` | Callback function fired whenever the tag list changes. |

### Methods (via Ref)

The component exposes the following methods via `ref`:

#### `getTags()`
- **Returns**: `string[]`
- **Description**: Returns a copy of the current array of tag names.

## Behaviors
1. **Input Splitting**: typing "hello world " results in two tags: `["hello", "world"]`.
2. **Empty Input**: Pressing space without text does not create a tag.
3. **Paste Support**: Pasting "tag1 tag2 tag3" automatically splits and creates 3 tags.
