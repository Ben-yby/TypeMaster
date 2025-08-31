export const sanitizeText = (text: string): string => {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
};

export const processMarkdown = (text: string): string => {
  return sanitizeText(text);
};

export const getTextStats = (text: string) => {
  const trimmed = text.trim();
  
  return {
    charCount: text.length,
    wordCount: trimmed ? trimmed.split(/\s+/).length : 0,
    lineCount: text.split('\n').length,
    paragraphCount: text.split(/\n\s*\n/).filter(p => p.trim()).length,
  };
};