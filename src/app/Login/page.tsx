'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { db } from '@/lib/firebase'; // Firestore
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { fireConfettiBurst } from '@/lib/confetii';
export default function LoginPage() {
  const [identifier, setIdentifier] = useState(''); // username or email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  let email = identifier;

  try {

   if (identifier.toLowerCase() === 'thuweibah') {
      fireConfettiBurst();
      setShowMessage(true);

      // Hide message after 3 seconds
      setTimeout(() => setShowMessage(false), 3000);
    }


    // If input does NOT contain '@', treat it as username and append domain
    if (!identifier.includes('@')) {
      email = `${identifier}@gmail.com`;
    }

    await signInWithEmailAndPassword(auth, email, password);
   

   
  } catch (err: any) {
    setError(err.message || 'Login failed');
  }
};



if(showMessage){

return(


  <div className="fixed top-10 left-1/2 transform -translate-x-1/2 text-pink-500 text-xl font-bold animate-fadeOut">
    I love you Thuweibah 💖
  </div>

)

}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Username or Email"
          className="w-full mb-3 p-2 border rounded"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
