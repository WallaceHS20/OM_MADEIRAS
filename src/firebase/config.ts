import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-XtdMhJ7oQnoKD99Ne51o-KxWa_Cq9jc",
  authDomain: "om-madeiras.firebaseapp.com",
  projectId: "om-madeiras",
  storageBucket: "om-madeiras.appspot.com",
  messagingSenderId: "868195404074",
  appId: "1:868195404074:web:60aad0f3afa9ca59223653"
};

console.log(firebaseConfig)

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta as instâncias para usar nos seus componentes (Cadastro de mesas, etc)
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);