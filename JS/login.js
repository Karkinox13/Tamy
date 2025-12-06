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
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.querySelector("input[type=email]").value.trim();
    let pass = document.querySelector("input[type=password]").value.trim();

    // 🔥 CORRECTO: cargar desde "usuarios"
    let users = JSON.parse(localStorage.getItem("usuarios")) || [];

    // 🔥 CORRECTO: comparar con campo "password"
    let user = users.find(u => u.email === email && u.password === pass);

    if (!user) {
        alert("Correo o contraseña incorrectos.");
        return;
    }

    // Guardar sesión correcta
    localStorage.setItem("usuarioConectado", JSON.stringify(user));

    // Si es administrador → panel admin
    if (user.rol === "admin") {
        alert("Bienvenido Administrador");
        window.location.href = "admin.html";
        return;
    }

    // Usuario normal → index
    alert("Bienvenido " + user.nombre.split(" ")[0] + "!");
    window.location.href = "index.html";
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
