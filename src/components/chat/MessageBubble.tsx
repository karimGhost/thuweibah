import type { Message } from '@/lib/types';
import { parseSimpleMarkdownToHTML } from '@/lib/markdown';
import { cn } from '@/lib/utils';
import { Check, CheckCheck } from 'lucide-react';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  senderName: string;
  onReply?: () => void;
  replyToMessage?: Message | null;
  isReplyingTo?: boolean;
}

export default function MessageBubble({
  message,
  isCurrentUser,
  senderName,
  onReply,
  replyToMessage,
  isReplyingTo,
}: MessageBubbleProps) {
  const alignment = isCurrentUser ? 'items-end' : 'items-start';
 const bubbleColors = isCurrentUser
  ? 'bg-neutral-800 text-white'       // Clean dark for your messages
  : 'bg-white text-neutral-900';      // Crisp white for others
  const bubbleRadius = isCurrentUser
    ? 'rounded-tl-lg rounded-tr-lg rounded-bl-lg'
    : 'rounded-tr-lg rounded-tl-lg rounded-br-lg';

  const StatusIcon = () => {
    if (message.status === 'delivered') {
      return <CheckCheck className="h-4 w-4 text-green-500" />;
    }
    if (message.status === 'read') {
      return <CheckCheck className="h-4 w-4 text-gray-500" />;
    }

    return <Check className="h-4 w-4 text-gray-400" />;
  };

  console.log("replyto", replyToMessage);




  return (
    <div className={cn('flex flex-col w-full animate-message-in', alignment)}>
      <span className={cn('text-xs mb-1 px-2 text-muted-foreground', isCurrentUser ? 'text-right' : 'text-left')}>
        {senderName}
      </span>

      <div
        onDoubleClick={onReply}
     className={cn(
  'max-w-xs md:max-w-md lg:max-w-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200',
  bubbleColors,
  bubbleRadius
)}
        style={{ width: '170px' }}
      >
     {replyToMessage && (
  <div className="text-xs italic text-neutral-600 border-l-4 border-neutral-300 pl-2 mb-2 bg-neutral-100 rounded-sm">
    ↪ <i style={{fontSize:"10px"}}>{replyToMessage.id === "8ysoujfi0QTjz2qLouaqzS80hcC3" ? "thuweibah" : "karim"} </i> {replyToMessage.text}
  </div>
)}

        <div
          style={{ fontSize: '0.9rem' }}
          className="prose prose-sm text-inherit break-words"
          dangerouslySetInnerHTML={{ __html: parseSimpleMarkdownToHTML(message.text) }}
        />

        <div className={cn('text-xs mt-2 flex items-center gap-1')}>
          <span>{format(new Date(message.timestamp), 'p')}</span>
          {<StatusIcon />}
        </div>
      </div>
    </div>
  );
}
