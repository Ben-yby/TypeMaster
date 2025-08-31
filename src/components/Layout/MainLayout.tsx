import React, { useState } from 'react';
import { EditorToolbar } from '../Editor/EditorToolbar';
import { RichTextEditor } from '../Editor/RichTextEditor';
import { FileImporter } from '../Editor/FileImporter';
import { useBlindTyping } from '../../hooks/useBlindTyping';

export const MainLayout: React.FC = () => {
  const [originalContent, setOriginalContent] = useState('');
  const [currentFileName, setCurrentFileName] = useState('');
  const [showImporter, setShowImporter] = useState(false);
  const [displayContent, setDisplayContent] = useState('');

  const { reset } = useBlindTyping({ originalContent });

  const handleFileImported = (content: string, filename: string) => {
    setOriginalContent(content);
    setCurrentFileName(filename);
    setShowImporter(false);
  };

  const handleImportClick = () => {
    setShowImporter(true);
  };

  const handleClear = () => {
    setOriginalContent('');
    setCurrentFileName('');
    setDisplayContent('');
    reset();
  };

  const handleContentChange = (content: string) => {
    setDisplayContent(content);
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      {showImporter ? (
        <div className="flex-1 flex flex-col bg-gray-50">
          <div className="flex-1 bg-white m-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                导入练习文档
              </h2>
              <button
                onClick={() => setShowImporter(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <FileImporter onFileImported={handleFileImported} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col bg-white w-full">
          <EditorToolbar
            currentFileName={currentFileName}
            onImportClick={handleImportClick}
            onClear={originalContent ? handleClear : undefined}
          />
          
          <div className="flex-1 w-full">
            <RichTextEditor
              originalContent={originalContent}
              onContentChange={handleContentChange}
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};