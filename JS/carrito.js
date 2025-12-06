console.log("carrito.js cargado OK");

// ======================= Cargar carrito =========================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ======================= Actualizar contador ======================
function actualizarContador() {
    const badge = document.getElementById("cart-count");

    if (!badge) {
        console.warn("No se encontró #cart-count");
        return;
    }

    let total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    badge.textContent = total;
}

// ======================= Agregar al carrito =======================
function agregarAlCarrito(nombre, precio) {
    let item = carrito.find(x => x.nombre === nombre);

    if (item) {
        item.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: parseFloat(precio),
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
}

// ======================= Detectar botones =========================
function activarBotones() {
    const botones = document.querySelectorAll(".price-btn");

    console.log("Botones detectados:", botones.length);

    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            const nombre = btn.dataset.nombre;
            const precio = btn.dataset.precio;

            agregarAlCarrito(nombre, precio);
        });
    });
}

// ======================= On Load =========================
document.addEventListener("DOMContentLoaded", () => {
    actualizarContador();
    activarBotones();
});
