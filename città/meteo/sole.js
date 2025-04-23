// 🔴 Rimuove gli elementi meteo precedenti
document.querySelectorAll(".sun").forEach(el => el.remove());

// 🔵 Crea il nuovo effetto sole
const sun = document.createElement("div");
sun.classList.add("sun", "weather-element");

document.body.appendChild(sun);
