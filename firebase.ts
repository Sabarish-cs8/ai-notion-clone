import {initializeApp,getApps,getApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAquX0D7zKtIwPD_B1FcVPowRmugIMB9pw",
    authDomain: "ai-notion-clone-5796b.firebaseapp.com",
    projectId: "ai-notion-clone-5796b",
    storageBucket: "ai-notion-clone-5796b.firebasestorage.app",
    messagingSenderId: "259769882347",
    appId: "1:259769882347:web:43b3c8c6d8d9ac789050ae",
    measurementId: "G-X0PD3L58PM"
  };

  const app=getApps().length ===0 ? initializeApp(firebaseConfig):getApp();

  const db=getFirestore(app);

  export {db};