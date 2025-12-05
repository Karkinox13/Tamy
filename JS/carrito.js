// Crear carrito si no existe
if (!localStorage.getItem("carrito")) {
    localStorage.setItem("carrito", JSON.stringify([]));
}

// Actualizar contador
function actualizarCarritoNav() {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    let total = carrito.reduce((sum, item) => sum + item.cantidad, 0);

    const badge = document.getElementById("cart-count");
    if (badge) badge.textContent = total;
}

// Escuchar clicks en botones de agregar
document.addEventListener("click", function(e) {

    if (e.target.classList.contains("price-btn")) {

        let nombre = e.target.dataset.nombre;
        let precio = parseFloat(e.target.dataset.precio);

        let carrito = JSON.parse(localStorage.getItem("carrito"));

        let item = carrito.find(p => p.nombre === nombre);

        if (item) {
            item.cantidad++;
        } else {
            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarritoNav();
        alert(nombre + " añadido al carrito ✔");
    }
});

// Cargar contador al iniciar
actualizarCarritoNav();
