export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface ImportedFile extends FileInfo {
  content: string;
}

export type SupportedFileType = 'text/plain' | 'text/markdown';

export interface FileImportState {
  isLoading: boolean;
  error: string | null;
  currentFile: ImportedFile | null;
}