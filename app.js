const buyBtn = document.getElementById("buyBtn");
const result = document.getElementById("result");

buyBtn.addEventListener("click", () => {
  buyBtn.disabled = true;
  buyBtn.textContent = "Procesando pago...";

  // SIMULACIÓN (luego se reemplaza por Mercado Pago)
  setTimeout(() => {
    const boleto = generarBoleto();
    result.innerHTML = `
      ✅ Pago aprobado<br><br>
      🎟️ Tu número de boleto es:<br>
      <span style="font-size:22px">${boleto}</span><br><br>
      📸 Toma captura de pantalla
    `;
    result.classList.remove("hidden");
    buyBtn.textContent = "Pago completado";
  }, 1500);
});

function generarBoleto() {
  let num = Math.floor(Math.random() * 100000) + 1;
  return num.toString().padStart(8, "0");
}
