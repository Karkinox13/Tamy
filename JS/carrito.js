// Cargar carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

// Sincronizar cantidades visibles en las cards al cargar la página
function sincronizarServicios() {
    const displays = document.querySelectorAll(".qty-display");

    displays.forEach(display => {
        let nombre = display.getAttribute("data-nombre");

        if (carrito[nombre]) {
            display.textContent = carrito[nombre].cantidad;
        } else {
            display.textContent = "0";
        }
    });
}

// Ejecutar la sincronización al entrar a la página
document.addEventListener("DOMContentLoaded", sincronizarServicios);

// VALIDACIÓN PARA BORRAR CARRITO VIEJO
let carritoInvalido = false;

for (const key in carrito) {
    if (
        !carrito[key].hasOwnProperty("precio") ||
        !carrito[key].hasOwnProperty("cantidad")
    ) {
        carritoInvalido = true;
        break;
    }
}

if (carritoInvalido) {
    carrito = {};
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para actualizar el contador del navbar
function actualizarContador() {
    let total = 0;
    for (const key in carrito) {
        total += carrito[key].cantidad;
    }
    document.getElementById("cart-count").textContent = total;
}


actualizarContador();

// ========== MANEJO DE BOTONES + Y - ==========
document.addEventListener("click", function (e) {

    // BOTÓN +
    if (e.target.classList.contains("plus")) {
        let nombre = e.target.dataset.nombre;
        let precio = parseFloat(e.target.dataset.precio);

        agregarProducto(nombre, precio);
    }

    // BOTÓN -
    if (e.target.classList.contains("minus")) {
        let nombre = e.target.dataset.nombre;
        quitarProducto(nombre);
    }
});

// ========== FUNCIONES PRINCIPALES ==========
function agregarProducto(nombre, precio) {
    if (!carrito[nombre]) {
        carrito[nombre] = { cantidad: 1, precio: precio };
    } else {
        carrito[nombre].cantidad++;
    }

    actualizarDisplay(nombre);
    guardarCarrito();
    actualizarContador();
}

function quitarProducto(nombre) {
    if (!carrito[nombre]) return;

    carrito[nombre].cantidad--;

    if (carrito[nombre].cantidad <= 0) {
        delete carrito[nombre];
    }

    actualizarDisplay(nombre);
    guardarCarrito();
    actualizarContador();
}

// ========== ACTUALIZA EL NÚMERO EN LA CARD ==========
function actualizarDisplay(nombre) {
    let display = document.querySelector(`.qty-display[data-nombre="${nombre}"]`);
    if (display) {
        display.textContent = carrito[nombre] ? carrito[nombre].cantidad : 0;
    }
}

// ========== GUARDA EN LOCALSTORAGE ==========
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ========== ACTUALIZA EL CONTADOR DEL NAVBAR ==========
function actualizarContador() {
    let total = 0;

    for (let item in carrito) {
        total += carrito[item].cantidad;
    }

    let contador = document.getElementById("cart-count");
    if (contador) {
        contador.textContent = total;
    }
}
