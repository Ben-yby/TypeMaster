import { useState, useCallback, useEffect } from 'react';
import { BlindTypingState, EditorStats } from '../types/editor';

interface UseBlindTypingOptions {
  originalContent: string;
}

interface UseBlindTypingReturn {
  state: BlindTypingState;
  stats: EditorStats;
  handleInput: (inputLength: number) => void;
  handleDelete: (deletedLength: number) => void;
  reset: () => void;
  setContent: (content: string) => void;
}

export const useBlindTyping = ({ originalContent }: UseBlindTypingOptions): UseBlindTypingReturn => {
  const [state, setState] = useState<BlindTypingState>({
    originalContent,
    displayContent: '',
    inputCount: 0,
    cursorPosition: 0,
    cycleCount: 0,
  });

  const calculateDisplayContent = useCallback((inputCount: number, content: string) => {
    if (!content || content.length === 0) return { displayContent: '', cycleCount: 0 };
    
    if (inputCount === 0) {
      return { displayContent: '', cycleCount: 0 };
    }
    
    const cycleCount = Math.floor((inputCount - 1) / content.length);
    const position = ((inputCount - 1) % content.length) + 1;
    
    return {
      displayContent: content.substring(0, position),
      cycleCount,
    };
  }, []);

  const handleInput = useCallback((inputLength: number) => {
    setState(prevState => {
      const { displayContent, cycleCount } = calculateDisplayContent(inputLength, prevState.originalContent);
      
      return {
        ...prevState,
        inputCount: inputLength,
        displayContent,
        cycleCount,
        cursorPosition: displayContent.length,
      };
    });
  }, [calculateDisplayContent]);

  const handleDelete = useCallback((deletedLength: number) => {
    setState(prevState => {
      const newInputCount = Math.max(0, deletedLength);
      const { displayContent, cycleCount } = calculateDisplayContent(newInputCount, prevState.originalContent);
      
      return {
        ...prevState,
        inputCount: newInputCount,
        displayContent,
        cycleCount,
        cursorPosition: displayContent.length,
      };
    });
  }, [calculateDisplayContent]);

  const reset = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      displayContent: '',
      inputCount: 0,
      cursorPosition: 0,
      cycleCount: 0,
    }));
  }, []);

  const setContent = useCallback((content: string) => {
    setState(prevState => ({
      ...prevState,
      originalContent: content,
      displayContent: '',
      inputCount: 0,
      cursorPosition: 0,
      cycleCount: 0,
    }));
  }, []);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      originalContent,
    }));
  }, [originalContent]);

  const stats: EditorStats = {
    charCount: state.inputCount,
    wordCount: 0, // 不需要词数统计
    lineCount: state.displayContent.split('\n').length,
  };

  return {
    state,
    stats,
    handleInput,
    handleDelete,
    reset,
    setContent,
  };
};