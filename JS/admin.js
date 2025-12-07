/* ============================================================
              SISTEMA ADMIN COMPLETO – MATCHASALON
      CRUD Usuarios – CRUD Servicios – CRUD Productos – Reservas
   ============================================================ */

/* ============================================================
      1. DATOS BASE (solo si no existen)
   ============================================================ */

/* ---- PRODUCTOS BASE ---- */
const productosBase = [
    { id: 1, nombre: "Shampoo Herbal", descripcion: "Repara y fortalece desde el interior.", precio: 12.00, imagen: "Imagen/shampooHerbal.jpg" },
    { id: 2, nombre: "Acondicionador Nutrisoft", descripcion: "Hidratación profunda y brillo natural.", precio: 14.00, imagen: "Imagen/acondicionadorNutrisoft.jpg" },
    { id: 3, nombre: "Cera de cabello", descripcion: "Cera para estilizar tus peinados favoritos.", precio: 15.00, imagen: "Imagen/cera.jpg" },
    { id: 4, nombre: "Gel para cabello", descripcion: "Define tus rizos todo el día.", precio: 13.00, imagen: "Imagen/gel.jpg" },
    { id: 5, nombre: "Aceite de cabello", descripcion: "Repara y reduce el frizz sin grasa.", precio: 28.00, imagen: "Imagen/aceite.jpg" },
    { id: 6, nombre: "Plancha Profesional Titanium Pro", descripcion: "Herramienta profesional para cualquier estilo.", precio: 39.99, imagen: "Imagen/plancha.jpg" },
    { id: 7, nombre: "Secadora profesional", descripcion: "Tecnología iónica doble avanzada.", precio: 39.99, imagen: "Imagen/secadora.jpg" }
];
if (!localStorage.getItem("productos")) {
    localStorage.setItem("productos", JSON.stringify(productosBase));
}

/* ---- SERVICIOS BASE ---- */
const serviciosBase = [
    { id: 1, nombre: "Manicure + Esmaltado", duracion: 40, precio: 25 },
    { id: 2, nombre: "Pedicure Spa + Esmaltado Liso", duracion: 50, precio: 20 },
    { id: 3, nombre: "Corte de Cabello", duracion: 30, precio: 30 },
    { id: 4, nombre: "Highlights", duracion: 80, precio: 80 },
    { id: 5, nombre: "Manicure + Diseños", duracion: 45, precio: 35 },
    { id: 6, nombre: "Limpieza Facial + Hidratación", duracion: 60, precio: 60 }
];
if (!localStorage.getItem("servicios")) {
    localStorage.setItem("servicios", JSON.stringify(serviciosBase));
}

/* ============================================================
      2. UTILIDADES
   ============================================================ */
function guardar(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function cargar(key) { return JSON.parse(localStorage.getItem(key)) || []; }

/* ============================================================
      3. SIDEBAR – Cambiar secciones
   ============================================================ */
document.querySelectorAll(".sidebar-menu li").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".sidebar-menu li").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const target = btn.dataset.section;
        document.querySelectorAll(".admin-section").forEach(sec => sec.classList.remove("active"));
        document.getElementById(target).classList.add("active");

        actualizarDashboard();
        cargarUsuarios();
        cargarServicios();
        cargarProductos();
        cargarReservas();
    });
});

/* ============================================================
      4. DASHBOARD
   ============================================================ */
function actualizarDashboard() {
    document.getElementById("count-usuarios").textContent = cargar("usuarios").length;
    document.getElementById("count-servicios").textContent = cargar("servicios").length;
    document.getElementById("count-productos").textContent = cargar("productos").length;
    document.getElementById("count-reservas").textContent = cargar("reservas").length;
}

/* ============================================================
      5. CRUD USUARIOS
   ============================================================ */
function cargarUsuarios() {
    const lista = cargar("usuarios");
    const tbody = document.getElementById("usuarios-body");
    tbody.innerHTML = "";

    lista.forEach(user => {
        tbody.innerHTML += `
            <tr>
                <td>${user.nombre}</td>
                <td>${user.email}</td>
                <td>${user.rol}</td>
                <td>
                    <button onclick="editarUsuario('${user.email}')">✏️</button>
                    <button onclick="eliminarUsuario('${user.email}')">🗑️</button>
                </td>
            </tr>`;
    });
}

/* ============================================================
      6. CRUD SERVICIOS – FORMULARIO VISUAL COMPLETO
   ============================================================ */

let servicios = cargar("servicios");
function saveServicios() { guardar("servicios", servicios); }

/* ---- MOSTRAR EN TABLA ---- */
function cargarServicios() {
    const tbody = document.getElementById("servicios-body");
    tbody.innerHTML = "";

    servicios.forEach(serv => {
        tbody.innerHTML += `
            <tr>
                <td>${serv.nombre}</td>
                <td>${serv.duracion} min</td>
                <td>$${serv.precio}</td>
                <td>
                    <button onclick="cargarServicioParaEditar(${serv.id})">✏️ Editar</button>
                    <button onclick="eliminarServicio(${serv.id})">🗑️ Eliminar</button>
                </td>
            </tr>`;
    });
}

/* ---- AGREGAR SERVICIO ---- */
document.getElementById("btn-save-servicio").addEventListener("click", () => {
    const nombre = document.getElementById("serv-nombre").value.trim();
    const duracion = parseInt(document.getElementById("serv-duracion").value);
    const precio = parseFloat(document.getElementById("serv-precio").value);

    if (!nombre || !duracion || !precio) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    servicios.push({
        id: Date.now(),
        nombre,
        duracion,
        precio
    });

    saveServicios();
    cargarServicios();

    document.getElementById("serv-nombre").value = "";
    document.getElementById("serv-duracion").value = "";
    document.getElementById("serv-precio").value = "";

    alert("Servicio agregado correctamente.");
});

/* ---- CARGAR PARA EDITAR ---- */
function cargarServicioParaEditar(id) {
    const s = servicios.find(x => x.id === id);

    document.getElementById("form-edit-servicio").style.display = "block";

    document.getElementById("edit-serv-id").value = s.id;
    document.getElementById("edit-serv-nombre").value = s.nombre;
    document.getElementById("edit-serv-duracion").value = s.duracion;
    document.getElementById("edit-serv-precio").value = s.precio;
}

/* ---- EDITAR ---- */
document.getElementById("btn-update-servicio").addEventListener("click", () => {

    const id = parseInt(document.getElementById("edit-serv-id").value);
    const nombre = document.getElementById("edit-serv-nombre").value.trim();
    const duracion = parseInt(document.getElementById("edit-serv-duracion").value);
    const precio = parseFloat(document.getElementById("edit-serv-precio").value);

    const index = servicios.findIndex(s => s.id === id);

    servicios[index] = { id, nombre, duracion, precio };

    saveServicios();
    cargarServicios();

    document.getElementById("form-edit-servicio").style.display = "none";

    alert("Servicio actualizado correctamente.");
});

/* ---- CANCELAR ---- */
document.getElementById("btn-cancel-serv-edit").addEventListener("click", () => {
    document.getElementById("form-edit-servicio").style.display = "none";
});

/* ---- ELIMINAR ---- */
function eliminarServicio(id) {
    if (!confirm("¿Seguro que deseas eliminar este servicio?")) return;

    servicios = servicios.filter(s => s.id !== id);
    saveServicios();
    cargarServicios();
}

/* ============================================================
      7. CRUD PRODUCTOS – VERSIÓN FINAL (NO TOCAR)
   ============================================================ */

let productos = cargar("productos");
function saveProductos() { guardar("productos", productos); }

function cargarProductos() {
    const tbody = document.getElementById("productos-body");
    tbody.innerHTML = "";

    productos.forEach(prod => {
        tbody.innerHTML += `
            <tr>
                <td>${prod.nombre}</td>
                <td>${prod.descripcion}</td>
                <td>$${prod.precio}</td>
                <td>
                    <button onclick="cargarProductoParaEditar(${prod.id})">✏️</button>
                    <button onclick="eliminarProducto(${prod.id})">🗑️</button>
                </td>
            </tr>`;
    });
}

/* ---- AGREGAR ---- */
document.getElementById("btn-save-producto").addEventListener("click", () => {
    const nombre = document.getElementById("prod-nombre").value.trim();
    const desc = document.getElementById("prod-desc").value.trim();
    const precio = parseFloat(document.getElementById("prod-precio").value);
    const imagen = document.getElementById("prod-imagen").value.trim();

    if (!nombre || !desc || !precio || !imagen) return alert("Todos los campos son obligatorios");

    productos.push({ id: Date.now(), nombre, descripcion: desc, precio, imagen });
    saveProductos();
    cargarProductos();

    document.getElementById("prod-nombre").value = "";
    document.getElementById("prod-desc").value = "";
    document.getElementById("prod-precio").value = "";
    document.getElementById("prod-imagen").value = "";

    alert("Producto agregado correctamente.");
});

/* ---- CARGAR PARA EDITAR ---- */
function cargarProductoParaEditar(id) {
    const prod = productos.find(p => p.id === id);

    document.getElementById("form-edit-producto").style.display = "block";
    document.getElementById("edit-prod-id").value = prod.id;
    document.getElementById("edit-prod-nombre").value = prod.nombre;
    document.getElementById("edit-prod-desc").value = prod.descripcion;
    document.getElementById("edit-prod-precio").value = prod.precio;
    document.getElementById("edit-prod-imagen").value = prod.imagen;
}

/* ---- EDITAR ---- */
document.getElementById("btn-update-producto").addEventListener("click", () => {
    const id = parseInt(document.getElementById("edit-prod-id").value);
    const nombre = document.getElementById("edit-prod-nombre").value;
    const desc = document.getElementById("edit-prod-desc").value;
    const precio = parseFloat(document.getElementById("edit-prod-precio").value);
    const imagen = document.getElementById("edit-prod-imagen").value;

    const index = productos.findIndex(p => p.id === id);

    productos[index] = { id, nombre, descripcion: desc, precio, imagen };
    saveProductos();
    cargarProductos();

    document.getElementById("form-edit-producto").style.display = "none";

    alert("Producto actualizado.");
});

/* ---- CANCELAR ---- */
document.getElementById("btn-cancel-edit").addEventListener("click", () => {
    document.getElementById("form-edit-producto").style.display = "none";
});

/* ---- ELIMINAR ---- */
function eliminarProducto(id) {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    productos = productos.filter(p => p.id !== id);
    saveProductos();
    cargarProductos();
}

/* ============================================================
      8. CRUD RESERVAS
   ============================================================ */
function cargarReservas() {
    const lista = cargar("reservas");
    const tbody = document.getElementById("reservas-body");
    tbody.innerHTML = "";

    lista.forEach(res => {
        tbody.innerHTML += `
            <tr>
                <td>${res.cliente}</td>
                <td>${res.servicio}</td>
                <td>${res.fecha}</td>
                <td>${res.estado}</td>
                <td>
                    <button onclick="cambiarEstado(${res.id})">✔</button>
                    <button onclick="eliminarReserva(${res.id})">🗑️</button>
                </td>
            </tr>`;
    });
}

/* ============================================================
      9. INICIALIZACIÓN
   ============================================================ */
actualizarDashboard();
cargarUsuarios();
cargarServicios();
cargarProductos();
cargarReservas();
