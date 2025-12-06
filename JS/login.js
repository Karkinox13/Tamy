// ====================================
// USUARIO DEMO CREADO AUTOMÁTICAMENTE
// ====================================
if (!localStorage.getItem("usuarios")) {
    const usuariosDemo = [
        {
            nombre: "Administrador",
            email: "admin@matcha.com",
            password: "123456",
            rol: "admin"
        }
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuariosDemo));
}

// ====================================
// LOGIN FUNCIONAL
// ====================================
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("login-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.querySelectorAll(".login-input")[0].value.trim();
        const password = document.querySelectorAll(".login-input")[1].value.trim();

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuario = usuarios.find(
            u => u.email === email && u.password === password
        );

        if (!usuario) {
            mostrarError("Correo o contraseña incorrectos");
            return;
        }

        // Guardar la sesión
        localStorage.setItem("usuarioConectado", JSON.stringify(usuario));

        // Si es admin → Panel admin
        if (usuario.rol === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "index.html";
        }
    });
});


// ====================================
// MOSTRAR ERROR DE LOGIN
// ====================================
function mostrarError(mensaje) {
    let errorBox = document.querySelector(".login-error");

    if (!errorBox) {
        errorBox = document.createElement("p");
        errorBox.className = "login-error";
        errorBox.style.color = "#d9534f";
        errorBox.style.fontWeight = "700";
        errorBox.style.marginTop = "10px";
        document.getElementById("login-form").appendChild(errorBox);
    }

    errorBox.textContent = mensaje;
}
