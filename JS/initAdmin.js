// =====================================
//   SEMILLA: ADMIN (texto plano)
//   Clave de usuarios: "usuarios"
//   Campo password: "password"
// =====================================
(function () {
  // 1) Migrar si existe vieja clave "users"
  const legacy = JSON.parse(localStorage.getItem("users") || "null");
  if (Array.isArray(legacy) && legacy.length) {
    // Mapear a formato actual (texto plano imposible recuperar si estaba btoa)
    // Solo moveremos aquellos que ya tengan 'password' texto plano
    const actuales = JSON.parse(localStorage.getItem("usuarios") || "[]");
    legacy.forEach(u => {
      // Si trae 'password' lo migramos; si solo trae 'pass' (codificado) lo ignoramos
      if (u && u.email && typeof u.password === "string") {
        if (!actuales.some(x => x.email === u.email)) {
          actuales.push({ nombre: u.nombre || "Usuario", email: u.email, password: u.password, rol: u.rol || "usuario" });
        }
      }
    });
    localStorage.setItem("usuarios", JSON.stringify(actuales));
    localStorage.removeItem("users"); // limpiar clave vieja
  }

  // 2) Asegurar admin en "usuarios" con password texto plano
  let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  if (!usuarios.some(u => u.email === "admin@matcha.com")) {
    usuarios.push({
      nombre: "Administrador",
      email: "admin@matcha.com",
      password: "123456",   // texto plano
      rol: "admin"
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }
})();
