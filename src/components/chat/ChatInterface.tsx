"use client";

import { useEffect, useRef } from 'react';
import type { User, Message } from '@/lib/types';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

interface ChatInterfaceProps {
  currentUser: User;
  otherUser: User;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

export default function ChatInterface({ currentUser, otherUser, messages, onSendMessage }: ChatInterfaceProps) {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="h-full flex flex-col shadow-lg rounded-lg">
      <CardHeader className="p-4 border-b border-border flex flex-row items-center gap-3 bg-card">
        <Image
          src={otherUser.avatarUrl}
          alt={`${otherUser.name}'s avatar`}
          width={40}
          height={40}
          data-ai-hint={otherUser.dataAiHint}
          className="rounded-full"
        />

 <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow-md">
    <span role="img" aria-label="heart" className="text-xs">🤍</span>
  </div>

        <div>
          <CardTitle className="text-lg font-semibold text-foreground">{otherUser.name}</CardTitle>

          <p className={`text-xs ${otherUser.online ? 'text-green-600' : 'text-muted-foreground'}`}>
            {otherUser.online ? 'Online' : 'Offline'}
          </p>
        </div>
<div className="flex justify-center items-center  from-pink-500 via-red-500 to-yellow-500 ml-5">
  <h1 className="text-6xl font-extrabold text-white drop-shadow-lg animate-pulse ml-4">
    T<span className="text-black-300">&</span>K
  </h1>
</div>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 bg-background/50">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
             isCurrentUser={msg.id === currentUser?.id}
  senderName={msg.id === currentUser?.id ? currentUser.name : otherUser.name}
          />
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-0">
        <MessageInput onSendMessage={onSendMessage} />
      </CardFooter>
    </Card>
  );
}
