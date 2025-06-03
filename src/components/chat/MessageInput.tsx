'use client';

import { useState,useRef, type FormEvent, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizontal, X } from 'lucide-react';
import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  replyTo?: Message | null;
  onCancelReply?: () => void;
}

export default function MessageInput({ onSendMessage, replyTo = null, onCancelReply }: MessageInputProps) {
  const [messageText, setMessageText] = useState('');






  useEffect(() => {
    if (replyTo) {
      // Optionally focus input when reply starts
      // inputRef.current?.focus();
    }
  }, [replyTo]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText('');
    }
  };



  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const minSwipeDistance = 50; // minimum px distance to count as swipe

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchEndX.current - touchStartX.current;
      if (distance > minSwipeDistance) {
        onReply?.();
      }
    }
  };
  return (
 <div
      className={cn('flex flex-col w-full animate-message-in ', )}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      // You can add mouse events similarly if you want desktop swipe support
    >      {/* Reply Preview */}
      {replyTo && (
        <div className="flex items-center justify-between p-2 bg-blue-100 border border-blue-300 rounded-t">
          <div className="truncate max-w-full text-sm text-blue-900">
            Replying to: <strong>{replyTo.id === "8ysoujfi0QTjz2qLouaqzS80hcC3"  ? "thuweibah" :  "karim" }</strong> -{' '}
            {replyTo.text.length > 50 ? replyTo.text.slice(0, 50) + '...' : replyTo.text}
          </div>
          <button
            onClick={onCancelReply}
            aria-label="Cancel reply"
            className="p-1 rounded hover:bg-blue-200 text-blue-700"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Message Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4">
        <Input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow focus-visible:ring-accent"
          aria-label="Message input"
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="text-primary hover:bg-primary/10 hover:text-primary rounded-full"
        >
          <SendHorizontal className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}
