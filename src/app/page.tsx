"use client";

import ChatPageClient from '@/components/chat/ChatPageClient';
import LoginPage from './Login/page';
import { useAuth } from '@/components/useAuth';
import { useEffect } from 'react';
export default function Home() {

  const {uid} = useAuth();
  
  useEffect(() =>{
console.log("uid", uid)
  }, [uid])
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
