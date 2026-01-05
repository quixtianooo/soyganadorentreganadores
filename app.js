alert("app.js está funcionando");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
 clave API : "AIzaSyA-JTJxPMMl3cu4xz3annvIPuOCDi_Bd6A" , 
  authDomain: "soy-ganador.firebaseapp.com",
  projectId: "soy-ganador",
  storageBucket : "soy-ganador.firebasestorage.app" , 
  messageSenderId : " 813702370856" 
  ID de aplicación : "1:813702370856:web:347d04d6e0ce57b69e071d" , 
  ID de medición : "G-6P9PQKJ185" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const btn = document.getElementById("comprarBtn");
const resultado = document.getElementById("resultado");

btn.addEventListener("click", async () => {
  const boletosRef = collection(db, "boletos");
  const snapshot = await getDocs(boletosRef);

  let usados = snapshot.docs.map(d => Number(d.id));
  if (usados.length >= 60000) {
    resultado.innerText = "❌ Boletos agotados";
    return;
  }

  let numero;
  do {
    numero = Math.floor(Math.random() * 60000) + 1;
  } while (usados.includes(numero));

  await setDoc(doc(db, "boletos", numero.toString()), {
    fecha: new Date()
  });

  resultado.innerText =
    "🎟️ Tu boleto es: " + numero.toString().padStart(5, "0");
});
