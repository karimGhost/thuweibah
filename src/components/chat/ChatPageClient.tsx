"use client";

import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '@/lib/firebase';
import type { User, Message } from '@/lib/types';
import ChatLayout from './ChatLayout';
import { useAuth } from '../useAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { boolean } from 'zod';
import { auth, rtdb } from '@/lib/firebase';
import {  ref, onValue, set } from 'firebase/database';

const currentUer: User = {
  id: 'thuwei',
  name: 'Thuweibah',
  avatarUrl: 'https://placehold.co/80x80.png',
  dataAiHint: 'woman portrait',
  online: true,
};

const otherUsr: User = {
  id: 'karim',
  name: 'karim',
  avatarUrl: 'https://placehold.co/80x80.png',
  dataAiHint: 'man portrait',
  online: true,
};

export default function ChatPageClient() {


const {uid} = useAuth();




const dummyUser: User = {
  id: '',
  name: 'Loading...',
  avatarUrl: 'https://placehold.co/80x80.png',
  dataAiHint: '',
  online: false,
};


const [currentUser, setCurrentUser] = useState<User >(dummyUser);
const [otherUser, setOtherUser] = useState<User >(dummyUser);







useEffect(() => {
  if (!uid) return;


  if (uid === '8ysoujfi0QTjz2qLouaqzS80hcC3') {

 



    setCurrentUser({
      id: uid,
      name: 'Thuweibah',
      avatarUrl: "/image/T.png",
      dataAiHint: 'woman portrait',
      online: true,
    });

    setOtherUser({
      id: 'rWyRWnVsH8g0QlrcBp0KObBFQbI3',
      name: 'karim',
      avatarUrl: "/image/K.png",
      dataAiHint: 'man portrait',
      online: false,
    });
  } else {


const statusRef = ref(rtdb, `/status/${'8ysoujfi0QTjz2qLouaqzS80hcC3'}`);


    setCurrentUser({
      id: uid,
      name: 'karim',
      avatarUrl:"/image/K.png",
      dataAiHint: 'man portrait',
      online: true,
    });

    setOtherUser({
      id: '8ysoujfi0QTjz2qLouaqzS80hcC3',
      name: 'Thuweibah',
      avatarUrl:"/image/T.png",
      dataAiHint: 'woman portrait',
      online: false,
    });
  }
}, [uid]);





useEffect(() => {

  const otherUserId = uid === 'rWyRWnVsH8g0QlrcBp0KObBFQbI3' ?  "8ysoujfi0QTjz2qLouaqzS80hcC3"  : 'rWyRWnVsH8g0QlrcBp0KObBFQbI3' ;
  const statusRef = ref(rtdb, `/status/${otherUserId}`);

  const unsubscribe = onValue(statusRef, (snapshot) => {
    const status = snapshot.val();
    console.log(`${otherUserId} is currently`, status?.state);

    if (status && status.state) {
      setOtherUser((prev) =>
        prev ? { ...prev, online: status.state === 'online' } : prev
      );
    }
  });

  return () => {
    unsubscribe(); // clean up on unmount
  };
}, []);


  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() ?? new Date(),
      })) as Message[];
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (text: string) => {
    await addDoc(collection(db, "messages"), {
      text,
      id: currentUser?.id,
      timestamp: serverTimestamp(),
       avatarUrl: 'https://placehold.co/80x80.png',
      status: 'sent',
    });
  };



  return (
    <ChatLayout
      currentUser={currentUser}
      otherUser={otherUser}
      messages={messages}
      onSendMessage={handleSendMessage}
    />
  );
}
