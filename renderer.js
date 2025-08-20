document.addEventListener("DOMContentLoaded", () => {
  const perfilSection = document.getElementById("perfil-section");
  const notasSection = document.getElementById("notas-section");

  const perfilGuardado = localStorage.getItem("perfilUsuario");

  if (perfilGuardado) {
    // Si ya hay perfil, mostrar notas directamente
    mostrarNotas();
  } else {
    // Si no hay perfil, mostrar formulario
    perfilSection.style.display = "block";
    notasSection.style.display = "none";
  }

  // Guardar perfil al enviar formulario
  document.getElementById("perfil-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const alias = document.getElementById("alias").value;
    const foto = document.getElementById("foto").files[0];

    let fotoURL = "";
    if (foto) {
      fotoURL = URL.createObjectURL(foto);
    }

    const perfil = { nombre, apellido, alias, fotoURL };
    localStorage.setItem("perfilUsuario", JSON.stringify(perfil));

    mostrarNotas();
  });

  // Mostrar la sección de notas
  function mostrarNotas() {
    perfilSection.style.display = "none";
    notasSection.style.display = "block";
  }
});