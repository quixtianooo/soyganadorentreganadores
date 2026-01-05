// === TEST DE CARGA ===
console.log("app.js cargado");

// === BOTÓN ===
const btn = document.getElementById("buyBtn");
const result = document.getElementById("result");

btn.addEventListener("click", () => {
  const numero = Math.floor(Math.random() * 60000) + 1;
  result.innerText = "Tu boleto es: " + numero.toString().padStart(5, "0");
});
