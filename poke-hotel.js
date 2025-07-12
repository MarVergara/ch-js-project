// ############# Poke Hotel - Hospedaje de Pokémon #############

// Lista de huéspedes disponibles

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

// Variables de estado y elementos del DOM

let reservaActiva = JSON.parse(localStorage.getItem("reservaActiva")) || [];

const listaPokemones = document.getElementById("listaPokemones");
const filtroTipo = document.getElementById("filtroTipo");
const listaReservas = document.getElementById("listaReservas");
const formularioConfirmarReserva = document.getElementById("formularioReserva");
const btnVaciarReserva = document.getElementById("btnVaciarReserva");

// Funciones auxiliares

const calcularTotalAPagar = () => {
  let total = reservaActiva.reduce((suma, pokemon) => {
    return (suma += pokemon.precioPorNoche);
  }, 0);
  return total;
};

const mostrarTotalReserva = () => {
  const divTotalReserva = document.getElementById("totalReserva");
  divTotalReserva.innerText = `El total que deberás pagar por tu reserva es de $${calcularTotalAPagar()}.`;
};

const guardarReserva = () => {
  const reservaActivaJSON = JSON.stringify(reservaActiva);
  localStorage.setItem("reservaActiva", reservaActivaJSON);
};

// Mostrar y actualizar lista de reservas

const mostrarReservas = () => {
  listaReservas.innerHTML = ""; // Limpia la lista antes de renderizar
  reservaActiva.forEach((huesped) => {
    const li = document.createElement("li");
    li.innerHTML = `${huesped.nombre} - $${huesped.precioPorNoche} por noche`;
    listaReservas.appendChild(li);
  });
};

// Vaciar la reserva activa

const vaciarReserva = () => {
  reservaActiva = [];
  guardarReserva();
  mostrarReservas();
  mostrarTotalReserva();
  const divAgradecimiento = document.getElementById("agradecimiento");
  divAgradecimiento.innerText = "No hay reservas activas. ¡Esperamos verte pronto!";
  const divUltimoPokemonAgregado = document.getElementById("ultimoPokemonAgregado");
  divUltimoPokemonAgregado.innerText = [];
};

// Agregar huésped a la reserva

const agregarReserva = (huesped) => {
  reservaActiva.push(huesped);
  mostrarReservas();
  mostrarTotalReserva();
  guardarReserva();
};

// Mostrar lista de huéspedes (filtrados por tipo)

function mostrarHuespedes(tipo = "todos") {
  listaPokemones.innerHTML = "";

  const huespedesFiltrados = tipo === "todos" ? huespedes : huespedes.filter((h) => h.tipo === tipo);

  huespedesFiltrados.forEach((huesped) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const btn = document.createElement("button");

    li.id = huesped.id;
    li.innerText = `${huesped.nombre} - $${huesped.precioPorNoche} por noche`;
    btn.innerText = "Reservar";

    btn.addEventListener("click", () => {
      agregarReserva(huesped);
      const divUltimoPokemonAgregado = document.getElementById("ultimoPokemonAgregado");
      divUltimoPokemonAgregado.innerText = `¡${huesped.nombre} ha sido agregado a tu reserva!`;
    });

    li.appendChild(div);
    div.appendChild(btn);
    listaPokemones.appendChild(li);
  });
}

// Filtro por tipo de Pokémon

filtroTipo.addEventListener("change", () => {
  mostrarHuespedes(filtroTipo.value);
});

// Confirmar reserva

const confirmarReserva = (nombreHumano, email) => {
  const divAgradecimiento = document.getElementById("agradecimiento");

  // Crear el mensaje de agradecimiento
  let mensaje = `¡Gracias ${nombreHumano} por tu reserva! Tus pokemones están listos para hospedarse y pasar unas lindas vacaciones en nuestro hotel. ♥️<br>Te estaremos enviando un correo a <em>${email}</em> con los detalles de tu reserva.<br><br>`;

  // Agregar los pokémon registrados como huéspedes
  if (reservaActiva.length > 0) {
    mensaje += `<strong>Estos son los pokemones que registraste como huéspedes:</strong><ul>`;
    reservaActiva.forEach((huesped) => {
      mensaje += `<li>${huesped.nombre}</li>`;
    });
    mensaje += `</ul>`;
  } else {
    mensaje += `<em>No registraste ningún Pokémon como huésped.</em>`;
  }

  // Mostrar mensaje
  divAgradecimiento.innerHTML = mensaje;
};

// Manejo del envío del formulario

formularioConfirmarReserva.addEventListener("submit", (e) => {
  e.preventDefault();

  const information = new FormData(e.target);
  const submit = Object.fromEntries(information);
  console.log(submit);

  confirmarReserva(submit.nombreHumano.toUpperCase(), submit.email);
});

// Botón para vaciar la reserva

btnVaciarReserva.addEventListener("click", vaciarReserva);

// Inicializar página con datos guardados

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
