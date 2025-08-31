import React from 'react';
import { Button } from '../UI/Button';
import { 
  UploadIcon, 
  BoldIcon, 
  ItalicIcon, 
  UnderlineIcon, 
  HashIcon, 
  ListIcon,
  FileIcon
} from '../UI/Icons';
import { EditorStats } from '../../types/editor';

interface EditorToolbarProps {
  stats: EditorStats;
  currentFileName?: string;
  onImportClick: () => void;
  onFormatClick?: (format: string) => void;
  onClear?: () => void;
  className?: string;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  stats,
  currentFileName,
  onImportClick,
  onFormatClick,
  onClear,
  className = '',
}) => {
  const handleFormatClick = (format: string) => {
    onFormatClick?.(format);
  };

  return (
    <div className={`w-full border-b border-gray-200 px-4 py-3 ${className}`}>
      <div className="w-full flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            icon={<UploadIcon />}
            onClick={onImportClick}
            title="导入文档"
          />
          
          <div className="w-px h-6 bg-gray-300 mx-2" />
          
          <Button
            variant="ghost"
            size="sm"
            icon={<BoldIcon />}
            onClick={() => handleFormatClick('bold')}
            title="粗体"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={<ItalicIcon />}
            onClick={() => handleFormatClick('italic')}
            title="斜体"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={<UnderlineIcon />}
            onClick={() => handleFormatClick('underline')}
            title="下划线"
          />
          
          <div className="w-px h-6 bg-gray-300 mx-2" />
          
          <Button
            variant="ghost"
            size="sm"
            icon={<HashIcon />}
            onClick={() => handleFormatClick('heading')}
            title="标题"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={<ListIcon />}
            onClick={() => handleFormatClick('list')}
            title="列表"
          />
          
          {currentFileName && (
            <>
              <div className="w-px h-6 bg-gray-300 mx-2" />
              <div className="flex items-center text-sm text-gray-600">
                <FileIcon className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">{currentFileName}</span>
                <span className="sm:hidden">📄</span>
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>字数: <span className="font-medium">{stats.charCount}</span></span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">
              行数: <span className="font-medium">{stats.lineCount}</span>
            </span>
          </div>
          
          {onClear && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              清空
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};