"use client";

import { useEffect, useRef, useState } from 'react';
import type { User, Message } from '@/lib/types';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useAuth } from '../useAuth';
interface ChatInterfaceProps {
  currentUser: User;
  otherUser: User;
  messages: Message[];
  onSendMessage: (text: string, replyTo?: Message | null) => void;
}

export default function ChatInterface({ currentUser, otherUser, messages, onSendMessage }: ChatInterfaceProps) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
const {uid} = useAuth();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="h-full flex flex-col shadow-lg rounded-lg">
      <CardHeader className="p-4 border-b border-border flex flex-row items-center gap-3 bg-card fixed " style={{zIndex:"99"}}>
        <Image
          src={otherUser.avatarUrl || "/image/K.png"}
          alt={`${otherUser.name}'s avatar`}
          width={40}
          height={40}
          data-ai-hint={otherUser.dataAiHint}
          className="rounded-full"
        />
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">{otherUser.name}</CardTitle>
          <p className={`text-xs ${otherUser.online ? 'text-green-600' : 'text-muted-foreground'}`}>
            {otherUser.online ? 'Online' : 'Offline' }

          </p>
        </div>
        <div className="flex justify-center items-center from-pink-500 via-red-500 to-yellow-500 ml-5">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg animate-pulse ml-4">
            K<span className="text-black-300">&</span>T
          </h1>
        </div>
      </CardHeader>
      <CardContent style={{paddingTop:"100px"}} className="flex-grow overflow-y-auto p-4 space-y-4 bg-background/50">
       {messages.map((msg) => {
  const repliedMessage = messages.find((m) => m.ids === msg.replyToId) || null;
  return (
    <MessageBubble
      key={msg.id}
      message={msg}
      isCurrentUser={msg.id === uid}
      senderName={msg.id === uid ? currentUser.name : otherUser.name}
      onReply={() => setReplyTo(msg)}
      isReplyingTo={replyTo?.id === msg.id}
      replyToMessage={repliedMessage} // ✅ This is what enables the reply bubble
    />
  );
})}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-0">
        <MessageInput
          onSendMessage={(text) => {
            onSendMessage(text, replyTo);
            setReplyTo(null);
          }}
          replyTo={replyTo}
          onCancelReply={() => setReplyTo(null)}
        />
      </CardFooter>
    </Card>
  );
}