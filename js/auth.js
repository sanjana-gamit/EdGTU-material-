import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';

export async function login(email, password){
  try{
    const u = await signInWithEmailAndPassword(auth, email, password);
    return u.user;
  } catch(err){ throw err; }
}

export async function logout(){
  await signOut(auth);
}
