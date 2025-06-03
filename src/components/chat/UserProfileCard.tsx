"use client";

import type { User } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UserProfileCardProps {
  user: User;
}

export default function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card className="w-full shadow-md">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="relative mb-3">
          <Image
            src={"/image/K.png"}
            alt={`${user?.name}'s avatar`}
            width={80}
            height={80}
            data-ai-hint={user.dataAiHint}
            className="rounded-full border-2 border-primary"
          />
          <Badge
            variant={user.online ? 'default' : 'secondary'}
            className={`absolute bottom-0 right-0 p-1 h-5 w-5 flex items-center justify-center rounded-full border-2 border-card ${user.online ? 'bg-green-500' : 'bg-gray-400'}`}
            aria-label={user.online ? 'Online' : 'Offline'}
          >
             <span className="sr-only">{user.online ? 'Online' : 'Offline'}</span>
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
        <p className={`text-xs ${user.online ? 'text-green-600' : 'text-muted-foreground'}`}>
          {user.online ? 'Online' : 'Offline'}
        </p>
      </CardContent>
    </Card>
  );
}
