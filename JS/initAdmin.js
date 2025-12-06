/* JS/initAdmin.js
   - Fuente única: localStorage["usuarios"]
   - Estructura: { nombre, email, password, rol }
   - Admin semilla: email admin@matcha.com / password 123456 / rol admin
   - Migra automáticamente de la antigua clave "users" (si existe)
*/
(function () {
  // 1) Migrar de "users" (antiguo) a "usuarios" (nuevo)
  try {
    const legacy = JSON.parse(localStorage.getItem("users"));
    if (Array.isArray(legacy) && legacy.length) {
      // Normalizar legacy -> usuarios (password en texto plano)
      const migrados = legacy.map((u) => ({
        nombre: u.nombre || "Usuario",
        email:  u.email,
        // si venía con base64, no podemos revertirlo sin saberlo; asumimos ya venía en texto plano o lo sobreescribirá el user
        password: u.password || u.pass || "", 
        rol: u.rol || "usuario",
      }));
      const actuales = JSON.parse(localStorage.getItem("usuarios")) || [];
      // fusionar evitando duplicados por email (preferir actuales)
      const map = new Map(actuales.map(u => [u.email, u]));
      migrados.forEach(u => { if (!map.has(u.email)) map.set(u.email, u); });
      localStorage.setItem("usuarios", JSON.stringify(Array.from(map.values())));
      localStorage.removeItem("users");
    }
  } catch (e) {
    // ignorar
  }

  // 2) Asegurar admin de prueba en "usuarios"
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const existeAdmin = usuarios.some(u => u.email === "admin@matcha.com");
  if (!existeAdmin) {
    usuarios.push({
      nombre: "Administrador",
      email: "admin@matcha.com",
      password: "123456", // plano
      rol: "admin",
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }
})();
