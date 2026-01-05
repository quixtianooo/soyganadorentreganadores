import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getCountFromServer
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 FIREBASE CONFIG 🔥 */
const firebaseConfig = {
  apiKey: "AIzaSyA-JTJxPMMl3cu4xz3annvIPuOCDi_Bd6A",
  authDomain: "soy-ganador.firebaseapp.com",
  projectId: "soy-ganador",
  storageBucket: "soy-ganador.appspot.com",
  messagingSenderId: "813702370856",
  appId: "1:813702370856:web:347d04d6e0ce57b69e071d",
  measurementId: "G-6P9PQKJ185"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ELEMENTOS HTML */
const btn = document.getElementById("buyBtn");
const result = document.getElementById("result");
const contadorDiv = document.getElementById("contador");

/* CONFIG */
const MAX_BOLETOS = 60000;

/* CLICK */
btn.addEventListener("click", async () => {
  btn.disabled = true;
  result.innerText = "⏳ Generando tu boleto...";

  // Contar boletos vendidos
  const colRef = collection(db, "boletos");
  const snapshot = await getCountFromServer(colRef);
  const vendidos = snapshot.data().count;

  if (vendidos >= MAX_BOLETOS) {
    result.innerText = "❌ Boletos agotados";
    btn.disabled = true;
    return;
  }

  // Generar número aleatorio sin repetir
  let numero, ref, existe = true;

  while (existe) {
    numero = Math.floor(Math.random() * MAX_BOLETOS) + 1;
    ref = doc(db, "boletos", numero.toString());
    const snap = await getDoc(ref);
    existe = snap.exists();
  }

  // Guardar boleto
  await setDoc(ref, {
    numero: numero,
    fecha: new Date(),
    estado: "vendido"
  });

  result.innerText =
    "🎟️ Tu boleto es: " + numero.toString().padStart(5, "0");

  btn.disabled = false;
});

/* MOSTRAR CONTADOR */
async function cargarContador() {
  const colRef = collection(db, "boletos");
  const snapshot = await getCountFromServer(colRef);
  contadorDiv.innerText =
    🎫 Boletos vendidos: ${snapshot.data().count} / ${MAX_BOLETOS};
}

cargarContador();
