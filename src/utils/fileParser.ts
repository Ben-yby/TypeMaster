export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const getFileExtension = (filename: string): string => {
  return filename.slice(filename.lastIndexOf('.'));
};

export const isMarkdownFile = (filename: string): boolean => {
  return filename.toLowerCase().endsWith('.md');
};

export const isTxtFile = (filename: string): boolean => {
  return filename.toLowerCase().endsWith('.txt');
};