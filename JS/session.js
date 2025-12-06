// ===============================
//  MOSTRAR NOMBRE DEL USUARIO
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const userArea = document.getElementById("user-area");
    if (!userArea) return;

    const usuario = JSON.parse(localStorage.getItem("usuarioConectado"));

    if (usuario) {
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

        // EVENTO CERRAR SESIÓN
        const logoutBtn = document.getElementById("logout-btn");
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("usuarioConectado");
            window.location.reload();
        });
    }
});
