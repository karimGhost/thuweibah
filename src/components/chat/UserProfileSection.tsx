"use client";

import type { User } from '@/lib/types';
import UserProfileCard from './UserProfileCard';

interface UserProfileSectionProps {
  currentUser: User;
  otherUser: User;
}

export default function UserProfileSection({ currentUser, otherUser }: UserProfileSectionProps) {
  return (
    <div className="h-full p-4 space-y-6 bg-card rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center text-primary-foreground bg-primary py-2 rounded-md">Thuweibah&karim</h2>
      <UserProfileCard user={currentUser} />
      <UserProfileCard user={otherUser} />
    </div>
  );
}
