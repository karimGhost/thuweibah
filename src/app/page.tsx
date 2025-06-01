"use client";

import ChatPageClient from '@/components/chat/ChatPageClient';
import LoginPage from './Login/page';
import { useAuth } from '@/components/useAuth';
import { useEffect, useState } from 'react';
export default function Home() {

  const {uid} = useAuth();
   const [loading, setLoading] = useState(true);
  const [userid, setUserid] = useState<string | null>(null);

  useEffect(() => {
    if (uid) {
      setUserid(uid);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [uid]);

  if (loading || !userid) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );
  }


  return (
        <> 
        {uid ?  

 <ChatPageClient />

  : 

  <LoginPage />

}
        </>   
  )

  
 
}
