"use client";

import type { User, Message } from '@/lib/types';
import UserProfileSection from './UserProfileSection';
import ChatInterface from './ChatInterface';

interface ChatLayoutProps {
  currentUser: User;
  otherUser: User;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

export default function ChatLayout({ currentUser, otherUser, messages, onSendMessage }: ChatLayoutProps) {
  return (
    <div className="flex h-screen max-h-screen overflow-hidden bg-background p-4 gap-4">
      <aside className="w-1/4 min-w-[280px] max-w-[350px] h-full hidden md:block">
        <UserProfileSection currentUser={currentUser} otherUser={otherUser} />
      </aside>
      <main className="flex-grow h-full">
        <ChatInterface
          currentUser={currentUser}
          otherUser={otherUser}
          messages={messages}
          onSendMessage={onSendMessage}
        />
      </main>
    </div>
  );
}
