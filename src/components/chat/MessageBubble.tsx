'use client';

import type { Message } from '@/lib/types';
import { parseSimpleMarkdownToHTML } from '@/lib/markdown';
import { cn } from '@/lib/utils';
import { Check, CheckCheck } from 'lucide-react';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  senderName: string; // 👈 Add this prop to show name
}

export default function MessageBubble({ message, isCurrentUser, senderName }: MessageBubbleProps) {
  const alignment = isCurrentUser ? 'items-end' : 'items-start';
  const bubbleColors = isCurrentUser
    ? 'bg-black text-white' // You can also use bg-primary if themed
    : 'bg-gray-200 text-gray-900';

  const bubbleRadius = isCurrentUser
    ? 'rounded-tl-lg rounded-tr-lg rounded-bl-lg'
    : 'rounded-tr-lg rounded-tl-lg rounded-br-lg';

  const StatusIcon = () => {
    if (message.status === 'read') {
      return <CheckCheck className="h-4 w-4 text-green-500" />;
    }
    if (message.status === 'delivered') {
      return <CheckCheck className="h-4 w-4 text-gray-500" />;
    }
    return <Check className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className={cn('flex flex-col w-full animate-message-in', alignment)}>
      {/* Username */}
      <span className={cn('text-xs mb-1 px-2 text-muted-foreground', isCurrentUser ? 'text-right' : 'text-left')}>
        {senderName}
      </span>

      <div
        className={cn(
          'max-w-xs md:max-w-md lg:max-w-lg p-3 shadow-sm',
          bubbleColors,
          bubbleRadius
        )}
      >
        <div
          className="prose prose-sm text-inherit break-words"
          dangerouslySetInnerHTML={{ __html: parseSimpleMarkdownToHTML(message.text) }}
        />

        <div className={cn('text-xs mt-2 flex items-center gap-1', isCurrentUser ? 'justify-end text-white/70' : 'justify-start text-gray-500')}>
          <span>{format(new Date(message.timestamp), 'p')}</span>
          {isCurrentUser && <StatusIcon />}
        </div>
      </div>
    </div>
  );
}
