import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useBlindTyping } from '../../hooks/useBlindTyping';
import { EditIcon } from '../UI/Icons';

interface RichTextEditorProps {
  originalContent: string;
  onContentChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  originalContent,
  onContentChange,
  placeholder = "开始输入...",
  className = '',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [normalContent, setNormalContent] = useState('');
  
  // 只有在有原始内容时才使用盲打模式
  const hasOriginalContent = Boolean(originalContent);
  const { state, stats, handleInput, handleDelete, setContent } = useBlindTyping({
    originalContent: hasOriginalContent ? originalContent : '',
  });

  useEffect(() => {
    if (hasOriginalContent) {
      setContent(originalContent);
    }
  }, [originalContent, setContent, hasOriginalContent]);

  useEffect(() => {
    if (hasOriginalContent) {
      onContentChange?.(state.displayContent);
    } else {
      onContentChange?.(normalContent);
    }
  }, [state.displayContent, normalContent, onContentChange, hasOriginalContent]);

  // 盲打模式的编辑器更新逻辑
  const updateBlindEditor = useCallback(() => {
    if (editorRef.current && !isComposing && hasOriginalContent) {
      const selection = window.getSelection();
      editorRef.current.textContent = state.displayContent;

      if (state.displayContent) {
        try {
          const newRange = document.createRange();
          const textNode = editorRef.current.firstChild;
          
          if (textNode) {
            const maxOffset = Math.min(
              state.displayContent.length,
              textNode.textContent?.length || 0
            );
            newRange.setStart(textNode, maxOffset);
            newRange.setEnd(textNode, maxOffset);
            
            selection?.removeAllRanges();
            selection?.addRange(newRange);
          }
        } catch (error) {
          console.warn('Failed to set cursor position:', error);
        }
      }
    }
  }, [state.displayContent, isComposing, hasOriginalContent]);

  useEffect(() => {
    if (hasOriginalContent) {
      updateBlindEditor();
    }
  }, [updateBlindEditor, hasOriginalContent]);

  // 处理输入事件
  const handleEditorInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    if (isComposing) return;
    
    const target = e.currentTarget;
    const content = target.textContent || '';
    
    if (hasOriginalContent) {
      // 盲打模式：使用盲打逻辑
      handleInput(content.length);
    } else {
      // 普通模式：直接更新内容
      setNormalContent(content);
    }
  }, [handleInput, isComposing, hasOriginalContent]);

  // 处理按键事件
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isComposing) return;

    if (hasOriginalContent && (e.key === 'Backspace' || e.key === 'Delete')) {
      // 盲打模式：使用盲打删除逻辑
      const target = e.currentTarget;
      setTimeout(() => {
        const newContent = target.textContent || '';
        handleDelete(newContent.length);
      }, 0);
    }
    // 普通模式：让浏览器处理正常的编辑操作
  }, [handleDelete, isComposing, hasOriginalContent]);

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);

  const handleCompositionEnd = useCallback((e: React.CompositionEvent<HTMLDivElement>) => {
    setIsComposing(false);
    const target = e.currentTarget;
    const content = target.textContent || '';
    
    if (hasOriginalContent) {
      handleInput(content.length);
    } else {
      setNormalContent(content);
    }
  }, [handleInput, hasOriginalContent]);

  const hasBlindContent = Boolean(hasOriginalContent && state.displayContent);
  const showPlaceholder = !hasOriginalContent && !normalContent;

  return (
    <div className={`h-full w-full flex flex-col relative ${className}`}>
      <div className="flex-1 w-full flex flex-col">
        <div
          ref={editorRef}
          className="flex-1 w-full font-mono text-base leading-relaxed focus:outline-none whitespace-pre-wrap p-6 overflow-auto"
          contentEditable
          onInput={handleEditorInput}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          suppressContentEditableWarning
          spellCheck={false}
          data-placeholder={placeholder}
          style={{
            caretColor: '#3B82F6',
          }}
        />
        
        {hasBlindContent && state.cycleCount > 0 && (
          <div className="mx-6 mb-6 p-2 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600">
              🎉 已完成 {state.cycleCount} 轮练习！继续输入会重新开始循环。
            </p>
          </div>
        )}
      </div>
    </div>
  );
};