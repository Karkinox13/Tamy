// ===============================
// BARRA DE USUARIO (no borra ni redirige)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const userArea = document.getElementById("user-area");
  if (!userArea) return;

  const usuario = JSON.parse(localStorage.getItem("usuarioConectado"));

  if (usuario) {
    userArea.innerHTML = `
      <span style="color:#5E925C; font-weight:700;">Hola, ${usuario.nombre}</span>
      <button id="logout-btn" style="
        margin-left:10px;background:#ff5b5b;border:none;color:white;
        padding:6px 10px;border-radius:8px;cursor:pointer;">Salir</button>
    `;

    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("usuarioConectado");
      window.location.href = "index.html";
    });
  } else {
    // Si no hay usuario, mantener el ícono de login
    userArea.innerHTML = `
      <a href="login.html" aria-label="Iniciar Sesión" id="login-link">
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <circle cx="12" cy="7" r="4" stroke="#5E925C" stroke-width="2" fill="none"></circle>
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#5E925C" stroke-width="2" fill="none" stroke-linecap="round"></path>
        </svg>
      </a>
    `;
  }
});
