// ############# Poke Hotel - Hospedaje de Pokemon #############

// Lista de huéspedes (pokemon) que aceptamos en el hotel

const huespedes = [
  { nombre: "Charmander 🔥", tipo: "fuego", id: 4, precioPorNoche: 50 },
  { nombre: "Vulpix 🔥", tipo: "fuego", id: 37, precioPorNoche: 45 },
  { nombre: "Growlithe 🔥", tipo: "fuego", id: 58, precioPorNoche: 55 },
  { nombre: "Ponyta 🔥", tipo: "fuego", id: 77, precioPorNoche: 40 },
  { nombre: "Magmar 🔥", tipo: "fuego", id: 126, precioPorNoche: 60 },
  { nombre: "Squirtle 💧", tipo: "agua", id: 7, precioPorNoche: 45 },
  { nombre: "Psyduck 💧", tipo: "agua", id: 54, precioPorNoche: 50 },
  { nombre: "Poliwag 💧", tipo: "agua", id: 60, precioPorNoche: 40 },
  { nombre: "Horsea 💧", tipo: "agua", id: 116, precioPorNoche: 50 },
  { nombre: "Staryu 💧", tipo: "agua", id: 120, precioPorNoche: 35 },
  { nombre: "Bulbasaur 🌱", tipo: "planta", id: 1, precioPorNoche: 45 },
  { nombre: "Oddish 🌱", tipo: "planta", id: 43, precioPorNoche: 35 },
  { nombre: "Bellsprout 🌱", tipo: "planta", id: 69, precioPorNoche: 30 },
  { nombre: "Exeggcute 🌱", tipo: "planta", id: 102, precioPorNoche: 40 },
  { nombre: "Tangela 🌱", tipo: "planta", id: 114, precioPorNoche: 50 },
];

// #### Variables y elementos del DOM ####

// reservaActiva guarda objetos con { nombre, tipo, id, precioPorNoche, noches }
let reservaActiva = JSON.parse(localStorage.getItem("reservaActiva")) || [];

const listaPokemones = document.getElementById("listaPokemones");
const filtroTipo = document.getElementById("filtroTipo");
const listaReservas = document.getElementById("listaReservas");
const formularioConfirmarReserva = document.getElementById("formularioReserva");
const btnVaciarReserva = document.getElementById("btnVaciarReserva");

// #### Funciones auxiliares ####

const calcularTotalAPagar = () => {
  return reservaActiva.reduce((suma, pokemon) => {
    const noches = pokemon.noches || 1;
    return suma + pokemon.precioPorNoche * noches;
  }, 0);
};

const mostrarTotalReserva = () => {
  const divTotalReserva = document.getElementById("totalReserva");
  divTotalReserva.innerText = `El total que deberás pagar por tu reserva es de $${calcularTotalAPagar()}.`;
};

const guardarReserva = () => {
  localStorage.setItem("reservaActiva", JSON.stringify(reservaActiva));
};

// #### Mostrar y actualizar lista de reservas ####

const mostrarReservas = () => {
  listaReservas.innerHTML = "";
  if (reservaActiva.length === 0) {
    const li = document.createElement("li");
    li.innerText = "No hay pokemones en la reserva.";
    listaReservas.appendChild(li);
    return;
  }

  reservaActiva.forEach((huesped) => {
    const li = document.createElement("li");
    const noches = huesped.noches || 1;
    const subtotal = huesped.precioPorNoche * noches;
    li.innerHTML = `${huesped.nombre} — ${noches} ${noches === 1 ? "noche" : "noches"} — $${
      huesped.precioPorNoche
    } por noche — Subtotal: $${subtotal}`;
    listaReservas.appendChild(li);
  });
};

// #### Vaciar la reserva activa ####

const vaciarReserva = () => {
  reservaActiva = [];
  guardarReserva();
  mostrarReservas();
  mostrarTotalReserva();

  mostrarHuespedes();

  const divAgradecimiento = document.getElementById("agradecimiento");
  divAgradecimiento.innerText = "No hay reservas activas. ¡Esperamos verte pronto!";
  const divUltimoPokemonAgregado = document.getElementById("ultimoPokemonAgregado");
  divUltimoPokemonAgregado.innerText = "";
};

// #### Añadir / quitar noches por huesped ####

const sumarNoches = (huesped) => {
  const idx = reservaActiva.findIndex((p) => p.id === huesped.id);
  if (idx !== -1) {
    reservaActiva[idx].noches = (reservaActiva[idx].noches || 1) + 1;
  } else {
    reservaActiva.push({ ...huesped, noches: 1 });
  }
  guardarReserva();
  mostrarReservas();
  mostrarTotalReserva();
};

const restarNoches = (huesped) => {
  const idx = reservaActiva.findIndex((p) => p.id === huesped.id);
  if (idx === -1) return; // no está en reserva
  const actuales = reservaActiva[idx].noches || 1;
  if (actuales > 1) {
    reservaActiva[idx].noches = actuales - 1;
  } else {
    // si llega a 0 noches, lo removemos
    reservaActiva.splice(idx, 1);
  }
  guardarReserva();
  mostrarReservas();
  mostrarTotalReserva();
};

// #### Mostrar lista de huéspedes (filtrados por tipo) ####

function mostrarHuespedes(tipo = "todos") {
  listaPokemones.innerHTML = "";

  const huespedesFiltrados = tipo === "todos" ? huespedes : huespedes.filter((h) => h.tipo === tipo);

  huespedesFiltrados.forEach((huesped) => {
    const li = document.createElement("li");
    const infoDiv = document.createElement("div");
    const controlesDiv = document.createElement("div");

    // Elementos de control: - , contador, +
    const btnMinus = document.createElement("button");
    const spanNoches = document.createElement("span");
    const btnPlus = document.createElement("button");

    // Texto principal del item
    const texto = document.createElement("span");
    texto.innerText = `${huesped.nombre} - $${huesped.precioPorNoche} por noche `;
    texto.style.marginRight = "10px";

    // Inicializar contador según reservaActiva
    const reservaExistente = reservaActiva.find((r) => r.id === huesped.id);
    spanNoches.innerText = reservaExistente ? `${reservaExistente.noches}` : `0`;
    spanNoches.style.display = "inline-block";
    spanNoches.style.minWidth = "24px";
    spanNoches.style.textAlign = "center";
    spanNoches.style.margin = "0 6px";

    btnMinus.innerText = "-";
    btnMinus.setAttribute("aria-label", `Restar noches a ${huesped.nombre}`);
    btnMinus.style.marginRight = "6px";

    btnPlus.innerText = "+";
    btnPlus.setAttribute("aria-label", `Sumar noches a ${huesped.nombre}`);
    btnPlus.style.marginLeft = "6px";

    // Handlers
    btnPlus.addEventListener("click", () => {
      sumarNoches(huesped);
      // actualizar contador visible para este li
      const registro = reservaActiva.find((r) => r.id === huesped.id);
      spanNoches.innerText = registro ? registro.noches : 0;

      const divUltimoPokemonAgregado = document.getElementById("ultimoPokemonAgregado");
      const noches = registro ? registro.noches : 0;
      divUltimoPokemonAgregado.innerText = `¡${huesped.nombre} reservado por ${noches} ${
        noches === 1 ? "noche" : "noches"
      }!`;
    });

    btnMinus.addEventListener("click", () => {
      restarNoches(huesped);
      const registro = reservaActiva.find((r) => r.id === huesped.id);
      spanNoches.innerText = registro ? registro.noches : 0;

      const divUltimoPokemonAgregado = document.getElementById("ultimoPokemonAgregado");
      if (registro) {
        const noches = registro.noches;
        divUltimoPokemonAgregado.innerText = `${huesped.nombre} ahora tiene ${noches} ${
          noches === 1 ? "noche" : "noches"
        }.`;
      } else {
        divUltimoPokemonAgregado.innerText = `${huesped.nombre} fue removido de la reserva.`;
      }
    });

    // Estructura en DOM
    infoDiv.appendChild(texto);
    controlesDiv.appendChild(btnMinus);
    controlesDiv.appendChild(spanNoches);
    controlesDiv.appendChild(btnPlus);

    // Alineación simple
    li.appendChild(infoDiv);
    li.appendChild(controlesDiv);

    listaPokemones.appendChild(li);
  });
}

// #### Filtro por tipo de pokemon ####

filtroTipo.addEventListener("change", () => {
  mostrarHuespedes(filtroTipo.value);
});

// #### Confirmar reserva ####

const confirmarReserva = (nombreHumano, email) => {
  const divAgradecimiento = document.getElementById("agradecimiento");

  let mensaje = `¡Gracias ${nombreHumano} por tu reserva! Tus pokemon están listos para hospedarse y pasar unas lindas vacaciones en nuestro hotel. ♥️<br>Te estaremos enviando un correo a <em>${email}</em> con los detalles de tu reserva.<br><br>`;

  if (reservaActiva.length > 0) {
    mensaje += `<strong>Estos son los pokemon que registraste como huéspedes:</strong><ul>`;
    reservaActiva.forEach((huesped) => {
      const noches = huesped.noches || 1;
      const subtotal = huesped.precioPorNoche * noches;
      mensaje += `<li>${huesped.nombre} — ${noches} ${noches === 1 ? "noche" : "noches"} — Subtotal: $${subtotal}</li>`;
    });
    mensaje += `</ul>`;
    mensaje += `<p><strong>Total a pagar: $${calcularTotalAPagar()}</strong></p>`;
  } else {
    mensaje += `<em>No registraste ningún pokemon como huésped.</em>`;
  }

  divAgradecimiento.innerHTML = mensaje;
};

// ### Manejo del envío del formulario ####

// Captura los datos del formulario y llama a confirmarReserva
formularioConfirmarReserva.addEventListener("submit", (e) => {
  e.preventDefault();

  const information = new FormData(e.target);
  const submit = Object.fromEntries(information);
  console.log(submit);

  confirmarReserva(submit.nombreHumano.toUpperCase(), submit.email);
});

// Botón para vaciar la reserva
btnVaciarReserva.addEventListener("click", vaciarReserva);

// #### Inicializar pagina con datos guardados ####

mostrarHuespedes();
mostrarReservas();
mostrarTotalReserva();

// ############### Dark Mode en navbar ###############

// Activa el modo oscuro al hacer clic en el botón de la barra de navegación
const toggleBtn = document.getElementById("darkModeToggle");

// Aplica el modo oscuro si está guardado en localStorage
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

// Alterna el modo oscuro y guarda la preferencia
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
});
