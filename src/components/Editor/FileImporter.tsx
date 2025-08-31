import React, { useRef } from "react";
import { Button } from "../UI/Button";
import { FileDropzone } from "../UI/FileDropzone";
import { UploadIcon, FileIcon } from "../UI/Icons";
import { useFileImport } from "../../hooks/useFileImport";
import { formatFileSize } from "../../utils/fileParser";

interface FileImporterProps {
  onFileImported: (content: string, filename: string) => void;
  className?: string;
}

export const FileImporter: React.FC<FileImporterProps> = ({
  onFileImported,
  className = "",
}: FileImporterProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isLoading,
    error,
    currentFile,
    importFile,
    importFromText,
    clearFile,
  } = useFileImport();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await importFile(file);
    }
  };

  const handleFilesDrop = async (files: File[]) => {
    if (files.length > 0) {
      await importFile(files[0]);
    }
  };

  const handleUseFile = () => {
    if (currentFile) {
      onFileImported(currentFile.content, currentFile.name);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) {
        importFromText(text);
      }
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  React.useEffect(() => {
    if (currentFile && !error) {
      onFileImported(currentFile.content, currentFile.name);
    }
  }, [currentFile, error, onFileImported]);

  return (
    <div className={`space-y-4 ${className}`}>
      <FileDropzone
        onFilesDrop={handleFilesDrop}
        disabled={isLoading}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6"
      >
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <UploadIcon className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-lg font-medium text-gray-900 mb-2">
            选择文档开始练习
          </p>
          <p className="text-sm text-gray-500 mb-4">
            拖拽文件到这里，或点击按钮选择文件
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
            <Button
              onClick={handleFileSelect}
              disabled={isLoading}
              icon={<FileIcon />}
            >
              {isLoading ? "导入中..." : "选择文件"}
            </Button>
            <span className="text-sm text-gray-400">或</span>
            <Button
              variant="secondary"
              onClick={handlePaste}
              disabled={isLoading}
            >
              粘贴文本
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            支持 .txt 和 .md 格式，最大 1MB
          </p>
        </div>
      </FileDropzone>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {currentFile && !error && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <FileIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-900">
                  {currentFile.name}
                </p>
                <p className="text-xs text-green-600">
                  {formatFileSize(currentFile.size)} •{" "}
                  {currentFile.content.split("\n").length} 行
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleUseFile}>
                开始练习
              </Button>
              <Button size="sm" variant="ghost" onClick={clearFile}>
                清除
              </Button>
            </div>
          </div>

          {currentFile.content.length > 200 && (
            <div className="mt-3 p-2 bg-white rounded border border-green-200">
              <p className="text-xs text-gray-600 mb-1">预览:</p>
              <p className="text-sm text-gray-700 font-mono leading-relaxed">
                {currentFile.content.substring(0, 200)}...
              </p>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
