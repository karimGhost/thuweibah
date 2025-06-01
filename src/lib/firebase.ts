import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onDisconnect, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDeDQy_FhwWdgOr55B8Ec47VkAcBDTMxBU",
  authDomain: "thuweibahs-showcase.firebaseapp.com",
  databaseURL: "https://thuweibahs-showcase-default-rtdb.firebaseio.com",
  projectId: "thuweibahs-showcase",
  storageBucket: "thuweibahs-showcase.firebasestorage.app",
  messagingSenderId: "817557931275",
  appId: "1:817557931275:web:16cf52f465534007a20e0e"
};

// Initialize
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const rtdb = getDatabase(app);

// Optional: Auto-manage online status on auth change
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userStatusRef = ref(rtdb, `/status/${user.uid}`);
    
    // Set as online
    set(userStatusRef, {
      state: 'online',
      last_changed: Date.now()
    });

    // Set offline on disconnect
    onDisconnect(userStatusRef).set({
      state: 'offline',
      last_changed: Date.now()
    });
  }
});
