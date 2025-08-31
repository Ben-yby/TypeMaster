import { useState, useCallback } from 'react';
import { FileImportState, ImportedFile, SupportedFileType } from '../types/file';

interface UseFileImportReturn extends FileImportState {
  importFile: (file: File) => Promise<void>;
  importFromText: (text: string, filename?: string) => void;
  clearFile: () => void;
  validateFile: (file: File) => boolean;
}

const SUPPORTED_TYPES: SupportedFileType[] = ['text/plain', 'text/markdown'];
const SUPPORTED_EXTENSIONS = ['.txt', '.md'];

export const useFileImport = (): UseFileImportReturn => {
  const [state, setState] = useState<FileImportState>({
    isLoading: false,
    error: null,
    currentFile: null,
  });

  const validateFile = useCallback((file: File): boolean => {
    const isValidType = SUPPORTED_TYPES.includes(file.type as SupportedFileType) ||
      SUPPORTED_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext));
    
    if (!isValidType) {
      return false;
    }

    if (file.size > 1024 * 1024) {
      return false;
    }

    return true;
  }, []);

  const importFile = useCallback(async (file: File): Promise<void> => {
    if (!validateFile(file)) {
      setState(prev => ({
        ...prev,
        error: '请选择支持的文件格式(.txt, .md)且大小不超过1MB',
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const content = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result && typeof e.target.result === 'string') {
            resolve(e.target.result);
          } else {
            reject(new Error('Failed to read file content'));
          }
        };
        reader.onerror = () => reject(new Error('File reading failed'));
        reader.readAsText(file, 'UTF-8');
      });

      const importedFile: ImportedFile = {
        name: file.name,
        size: file.size,
        type: file.type || 'text/plain',
        lastModified: file.lastModified,
        content: content.trim(),
      };

      setState(prev => ({
        ...prev,
        isLoading: false,
        currentFile: importedFile,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : '文件读取失败',
      }));
    }
  }, [validateFile]);

  const importFromText = useCallback((text: string, filename = '粘贴内容.txt'): void => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      setState(prev => ({
        ...prev,
        error: '文本内容不能为空',
      }));
      return;
    }

    const importedFile: ImportedFile = {
      name: filename,
      size: trimmedText.length,
      type: 'text/plain',
      lastModified: Date.now(),
      content: trimmedText,
    };

    setState(prev => ({
      ...prev,
      currentFile: importedFile,
      error: null,
      isLoading: false,
    }));
  }, []);

  const clearFile = useCallback((): void => {
    setState({
      isLoading: false,
      error: null,
      currentFile: null,
    });
  }, []);

  return {
    ...state,
    importFile,
    importFromText,
    clearFile,
    validateFile,
  };
};