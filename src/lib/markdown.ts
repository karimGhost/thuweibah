export function parseSimpleMarkdownToHTML(text: string): string {
  let html = text;
  // Escape basic HTML characters to prevent XSS if text is not fully trusted
  // For this specific app with two known users, this might be overly cautious,
  // but good practice.
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Bold: **text** or __text__
  html = html.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>');
  // Italics: *text* or _text_
  html = html.replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>');
  
  return html;
}
