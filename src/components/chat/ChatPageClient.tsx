"use client";

import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc } from "firebase/firestore";
import { db } from '@/lib/firebase';
import type { User, Message } from '@/lib/types';
import ChatLayout from './ChatLayout';
import { useAuth } from '../useAuth';
import { onAuthStateChanged } from 'firebase/auth';
import { boolean } from 'zod';
import { auth, rtdb } from '@/lib/firebase';
import {  ref, onValue, set } from 'firebase/database';
import { updateDoc } from 'firebase/firestore';

import { off } from 'firebase/database';
export default function ChatPageClient() {


const {uid} = useAuth();




const dummyUser: User = {
  id: '',
  name: 'Loading...',
  avatarUrl: '',
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


// const statusRef = ref(rtdb, `/status/${'8ysoujfi0QTjz2qLouaqzS80hcC3'}`);


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
  const otherUserId = uid === 'rWyRWnVsH8g0QlrcBp0KObBFQbI3'
    ? '8ysoujfi0QTjz2qLouaqzS80hcC3'
    : 'rWyRWnVsH8g0QlrcBp0KObBFQbI3';

  const statusRef = ref(rtdb, `/status/${otherUserId}`);

  const unsubscribe = onValue(statusRef, (snapshot) => {
    const status = snapshot.val();
    if (status?.state) {
      setOtherUser((prev) =>
        prev ? { ...prev, online: status.state === 'online' } : prev
      );
    }
  });

  return () => {
    unsubscribe(); // ✅ this is correct and will stop listening on unmount
  };
}, [uid]);



  const [messages, setMessages] = useState<Message[]>([]);





  // useEffect(() => {
  //   const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const msgs: Message[] = snapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data(),
  //       timestamp: doc.data().timestamp?.toDate() ?? new Date(),
  //     })) as Message[];
  //     setMessages(msgs);
  //     console.log("Message:", msgs);

  //   });

  //   //set last message on the db status as read

  //   return () => unsubscribe();
  // }, []);




  useEffect(() => {
  const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const msgs: Message[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate() ?? new Date(),
    })) as Message[];

    setMessages(msgs);

    // 🔄 Mark the last message as read if it's from the other user
    const lastMessage = msgs[msgs.length - 1];
    if (lastMessage && lastMessage.id !== currentUser.id && lastMessage.status !== "read") {
      updateDoc(doc(db, "messages", lastMessage.id), {
        status: "read"
      }).catch(err => console.error("Failed to update status:", err));
    }
  });

  return () => unsubscribe();
}, []);



const handleSendMessage = async (text: string, replyTo?: Message | null) => {
    const newId = crypto.randomUUID(); // ✅ native way to generate unique ID

    await addDoc(collection(db, "messages"), {
      text,
      id: uid,
      ids: newId  ,
      timestamp: serverTimestamp(),
       avatarUrl: 'https://placehold.co/80x80.png',
      status: 'sent',
     replyToId: replyTo?.ids ?? null,

    });

    console.log("vow", replyTo?.ids)
    console.log("vow2", replyTo)
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


