export interface BlindTypingState {
  originalContent: string;
  displayContent: string;
  inputCount: number;
  cursorPosition: number;
  cycleCount: number;
}

export interface EditorStats {
  wordCount: number;
  lineCount: number;
  charCount: number;
}

export interface EditorSelection {
  start: number;
  end: number;
}