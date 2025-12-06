// ===============================
//   MANEJO ESPECIAL PARA ADMIN.HTML
// ===============================
if (window.location.pathname.includes("admin.html")) {
    document.addEventListener("DOMContentLoaded", () => {

        const usuario = JSON.parse(localStorage.getItem("usuarioConectado"));
        const userArea = document.getElementById("user-area");

        // Si existe sesión y es admin → mostrar info
        if (usuario && usuario.rol === "admin" && userArea) {
            userArea.innerHTML = `
                <span style="color:#5E925C; font-weight:700;">Admin</span>
                <button id="logout-btn"
                        style="margin-left:10px;background:#ff5b5b;border:none;color:white;padding:6px 10px;border-radius:8px;cursor:pointer;">
                    Salir
                </button>`;
        }

        // Botón salir
        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("usuarioConectado");
                window.location.href = "login.html";
            });
        }
    });

    // IMPORTANTE: NO HACEMOS return;
    // Ahora admin.html también puede manejar user-area normalmente
}


// ===============================
//  MOSTRAR NOMBRE DEL USUARIO EN TODAS LAS DEMÁS PÁGINAS
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    const userArea = document.getElementById("user-area");
    if (!userArea) return;

    const usuario = JSON.parse(localStorage.getItem("usuarioConectado"));
    if (!usuario) return;

    if (usuario.rol === "admin") {

        userArea.innerHTML = `
            <span style="color:#5E925C; font-weight:700;">Admin</span>

            <a href="admin.html" 
                style="margin-left:10px; background:#8dce88; padding:6px 10px; border-radius:8px; color:white; font-weight:700;">
                Panel
            </a>

            <button id="logout-btn" style="
                margin-left:10px;
                background:#ff5b5b;
                border:none;
                color:white;
                padding:6px 10px;
                border-radius:8px;
                cursor:pointer;
            ">Salir</button>
        `;

    } else {

        userArea.innerHTML = `
            <span style="color:#5E925C; font-weight:700;">Hola, ${usuario.nombre}</span>

            <button id="logout-btn" style="
                margin-left:10px;
                background:#ff5b5b;
                border:none;
                color:white;
                padding:6px 10px;
                border-radius:8px;
                cursor:pointer;
            ">Salir</button>
        `;
    }

    // Evento salir
    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuarioConectado");
        window.location.href = "login.html";
    });
});
