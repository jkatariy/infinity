'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
};

export default function RichTextEditor({ value, onChange, placeholder = 'Start typing...', className = '' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [isLinkMode, setIsLinkMode] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const sanitizedValue = useMemo(() => {
    return DOMPurify.sanitize(value || '', {
      ALLOWED_TAGS: [
        'b',
        'strong',
        'i',
        'em',
        'a',
        'p',
        'div',
        'span',
        'br',
        'ul',
        'ol',
        'li',
        'blockquote',
        'u',
        'center',
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'style'],
      ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel|ftp):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
    });
  }, [value]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== sanitizedValue) {
      editorRef.current.innerHTML = sanitizedValue || '';
    }
  }, [sanitizedValue]);

  // Ensure new lines create proper paragraphs instead of bare divs
  useEffect(() => {
    try {
      document.execCommand('defaultParagraphSeparator', false, 'p');
    } catch (_) {
      // noop if unsupported
    }
  }, []);

  const exec = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    // Emit sanitized html
    if (editorRef.current) {
      const html = DOMPurify.sanitize(editorRef.current.innerHTML, {
        ALLOWED_ATTR: ['href', 'target', 'rel', 'style'],
      });
      onChange(html);
    }
  };

  const handleInput = () => {
    if (!editorRef.current) return;
    const html = DOMPurify.sanitize(editorRef.current.innerHTML, {
      ALLOWED_ATTR: ['href', 'target', 'rel', 'style'],
    });
    onChange(html);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    // Normalize pasted content to paragraphs and line breaks
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const paragraphHtml = text
      .split(/\n{2,}/) // split on blank lines
      .map((block) => {
        const safe = DOMPurify.sanitize(block);
        const withBreaks = safe.replace(/\n/g, '<br>');
        return `<p>${withBreaks}</p>`;
      })
      .join('');
    document.execCommand('insertHTML', false, paragraphHtml);
    handleInput();
  };

  const applyLink = () => {
    const url = linkUrl.trim();
    if (!url) {
      setIsLinkMode(false);
      return;
    }
    // ensure protocol
    const safeUrl = /^(https?:|mailto:|tel:)/.test(url) ? url : `https://${url}`;
    exec('createLink', safeUrl);
    // set target and rel on selection if possible
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const anchor = selection.anchorNode as HTMLElement | null;
      const container = anchor?.parentElement?.closest('a');
      if (container) {
        container.setAttribute('target', '_blank');
        container.setAttribute('rel', 'noopener noreferrer');
      }
    }
    setIsLinkMode(false);
    setLinkUrl('');
    handleInput();
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Toolbar */}
      <div className="mb-2 flex flex-wrap items-center gap-1 rounded-md border border-gray-200 bg-gray-50 p-1">
        <button type="button" onClick={() => exec('bold')} className="rounded px-2 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-100" aria-label="Bold text">
          B
        </button>
        <button type="button" onClick={() => exec('italic')} className="rounded px-2 py-1 text-sm italic text-gray-700 hover:bg-gray-100" aria-label="Italic text">
          I
        </button>
        <div className="mx-1 h-5 w-px bg-gray-300" />
        <button type="button" onClick={() => exec('justifyLeft')} className="rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100" aria-label="Align text left">
          Left
        </button>
        <button type="button" onClick={() => exec('justifyCenter')} className="rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100" aria-label="Align text center">
          Center
        </button>
        <div className="mx-1 h-5 w-px bg-gray-300" />
        {!isLinkMode ? (
          <button type="button" onClick={() => setIsLinkMode(true)} className="rounded px-2 py-1 text-sm text-blue-700 hover:bg-blue-50" aria-label="Add link">
            Link
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="h-8 w-48 rounded border border-gray-300 bg-white px-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              aria-label="Enter URL for link"
            />
            <button type="button" onClick={applyLink} className="rounded bg-blue-600 px-2 py-1 text-sm font-medium text-white hover:bg-blue-700" aria-label="Add link">
              Add
            </button>
            <button type="button" onClick={() => { setIsLinkMode(false); setLinkUrl(''); }} className="rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100" aria-label="Cancel adding link">
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onPaste={handlePaste}
        className="min-h-40 w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        data-placeholder={placeholder}
        style={{ whiteSpace: 'pre-wrap' }}
      />

      <style jsx>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af; /* text-gray-400 */
          pointer-events: none;
        }
        [contenteditable] a { color: #2563eb; text-decoration: underline; }
        [contenteditable] p { margin: 0 0 0.75rem 0; }
      `}</style>
    </div>
  );
}


