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

let reservaActiva = JSON.parse(localStorage.getItem("reservaActiva")) || []; // Carga la reserva guardada o arranca con una vacía

// Elementos que se actualizan en la UI
const listaPokemones = document.getElementById("listaPokemones");
const filtroTipo = document.getElementById("filtroTipo");
const listaReservas = document.getElementById("listaReservas");
const formularioConfirmarReserva = document.getElementById("formularioReserva");
const btnVaciarReserva = document.getElementById("btnVaciarReserva");

// #### Funciones auxiliares ####

// Suma los precios por noche * noches de los pokemon actualmente en la reserva
const calcularTotalAPagar = () => {
  let total = reservaActiva.reduce((suma, pokemon) => {
    // calcular subtotal por pokemon: precioPorNoche * noches
    const noches = pokemon.noches || 1;
    return suma + pokemon.precioPorNoche * noches;
  }, 0);
  return total;
};

// Muestra el total calculado en pantalla
const mostrarTotalReserva = () => {
  const divTotalReserva = document.getElementById("totalReserva");
  divTotalReserva.innerText = `El total que deberás pagar por tu reserva es de $${calcularTotalAPagar()}.`;
};

// Guarda la reserva actual en el localStorage
const guardarReserva = () => {
  const reservaActivaJSON = JSON.stringify(reservaActiva);
  localStorage.setItem("reservaActiva", reservaActivaJSON);
};

// #### Mostrar y actualizar lista de reservas ####

// Muestra en pantalla todos los pokemon agregados a la reserva
const mostrarReservas = () => {
  listaReservas.innerHTML = ""; // Limpia lista anterior
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
    // Muestra nombre, noches y subtotal por ese pokemon
    li.innerHTML = `${huesped.nombre} — ${noches} ${noches === 1 ? "noche" : "noches"} — $${
      huesped.precioPorNoche
    } por noche — Subtotal: $${subtotal}`;
    listaReservas.appendChild(li);
  });
};

// #### Vaciar la reserva activa ####

// Reinicia el array, actualiza la UI y borra del localStorage
const vaciarReserva = () => {
  reservaActiva = [];
  guardarReserva();
  mostrarReservas();
  mostrarTotalReserva();
  const divAgradecimiento = document.getElementById("agradecimiento");
  divAgradecimiento.innerText = "No hay reservas activas. ¡Esperamos verte pronto!";
  const divUltimoPokemonAgregado = document.getElementById("ultimoPokemonAgregado");
  divUltimoPokemonAgregado.innerText = "";
};

// #### Agregar huésped a la reserva ####

// Agrega un pokemon a la reserva y actualiza todo lo necesario
const agregarReserva = (huesped) => {
  const existenteIndex = reservaActiva.findIndex((p) => p.id === huesped.id);

  if (existenteIndex !== -1) {
    // Si ya está, incrementamos las noches
    reservaActiva[existenteIndex].noches = (reservaActiva[existenteIndex].noches || 1) + 1;
  } else {
    // Si no está, agregamos noches
    const nuevo = { ...huesped, noches: 1 };
    reservaActiva.push(nuevo);
  }

  mostrarReservas();
  mostrarTotalReserva();
  guardarReserva();
};

// #### Mostrar lista de huéspedes (filtrados por tipo) ####

// Muestra todos los Pokemon según el tipo seleccionado (o todos)
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

    // Cuando se hace clic, se agrega a la reserva y se muestra un mensaje
    btn.addEventListener("click", () => {
      agregarReserva(huesped);
      const divUltimoPokemonAgregado = document.getElementById("ultimoPokemonAgregado");

      // Cuántas noches tiene ahora ese pokemon para el mensaje
      const registro = reservaActiva.find((p) => p.id === huesped.id);
      const noches = registro ? registro.noches : 1;
      divUltimoPokemonAgregado.innerText = `¡${huesped.nombre} está reservado por ${noches} ${
        noches === 1 ? "noche" : "noches"
      }!`;
    });

    li.appendChild(div);
    div.appendChild(btn);
    listaPokemones.appendChild(li);
  });
}

// #### Filtro por tipo de pokemon ####

// Al cambiar el filtro, se actualiza la lista de huéspedes mostrados
filtroTipo.addEventListener("change", () => {
  mostrarHuespedes(filtroTipo.value);
});

// #### Confirmar reserva ####

// Genera y muestra el mensaje final de confirmación de reserva
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

// #### Inicializar página con datos guardados ####

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
