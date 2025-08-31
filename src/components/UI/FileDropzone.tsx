import React, { useCallback, useState } from 'react';

interface FileDropzoneProps {
  onFilesDrop: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFilesDrop,
  accept = '.txt,.md',
  multiple = false,
  disabled = false,
  className = '',
  children,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesDrop(multiple ? files : [files[0]]);
    }
  }, [onFilesDrop, multiple, disabled]);

  const baseClasses = 'transition-colors duration-200';
  const stateClasses = isDragOver && !disabled 
    ? 'bg-primary-50 border-primary-300' 
    : 'bg-transparent';
  const disabledClasses = disabled ? 'opacity-50 pointer-events-none' : '';

  return (
    <div
      className={`${baseClasses} ${stateClasses} ${disabledClasses} ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};