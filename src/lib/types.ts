export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  dataAiHint: string;
  online: boolean;
}

export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  ids: string;
  text: string;
  senderId: string;
  timestamp: Date;
  status: MessageStatus;
  replyToId?: string | null; 
}


