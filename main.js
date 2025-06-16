/* Esta BIBLIOAPP es una aplicación de gestión de préstamos de libros para La Bibliot3ca.
Permite a los usuarios pedir prestados libros, devolverlos y buscar préstamos por nombre de lector.
*/

const bibliot3ca = {
  // Este es un array que almacena los préstamos de libros de La Bibliot3ca
  prestamos: [],

  // FUNCION 1: Esta función pregunta por el nombre del lector y el título del libro,
  // y agrega un nuevo préstamo al array de préstamos (al final de la lista).
  agregarPrestamo() {
    const lector = prompt("Ingresá el nombre del lector:").toUpperCase();
    const libro = prompt("Ingresá el título del libro:").toUpperCase();

    bibliot3ca.prestamos.push({ lector, libro });

    alert(`Préstamo registrado: ${lector} tiene el libro "${libro}" de préstamo.`);
  },

  // FUNCION 2: Devolver el primer libro prestado de la lista.
  // Si no hay libros prestados, muestra un mensaje de error.

  devolverLibro() {
    if (bibliot3ca.prestamos.length === 0) {
      alert("No hay libros prestados para devolver.");
      return;
    }
    const prestamoDevuelto = bibliot3ca.prestamos.shift();
    alert(`El libro "${prestamoDevuelto.libro}" fue devuelto por ${prestamoDevuelto.lector}`);
  },

  // FUNCION 3: Esta función busca un préstamo por el nombre del lector.
  // Si encuentra un préstamo, muestra el nombre del lector y el título del libro.
  // Si no encuentra ningún préstamo, muestra un mensaje de error.

  buscarPrestamo() {
    const lectorBuscado = prompt("Ingresá el nombre del lector a buscar:").toUpperCase();
    const prestamos = bibliot3ca.prestamos;
    let encontrado = false;

    for (let i = 0; i < prestamos.length; i++) {
      if (prestamos[i].lector === lectorBuscado) {
        alert(
          `${prestamos[i].lector} tiene prestado el libro "${prestamos[i].libro}" y no hay otras ediciones disponibles por ahora.`
        );
        encontrado = true;
        break;
      }
    }

    if (!encontrado) {
      alert(`No encontramos ningún préstamo a nombre de ${lectorBuscado}`);
    }
  },
};

// FUNCION 4: Está función le muestra las opciones al usuario y le deja elegir una entre 1 y 4.

function elegirOpcion() {
  let opcionElegida;

  do {
    const numeroIngresado = prompt(
      "Seleccioná una opción:\n" +
        "1 - Pedir prestado un libro\n" +
        "2 - Devolver libro\n" +
        "3 - Buscar préstamo\n" +
        "4 - Salir"
    );

    opcionElegida = parseInt(numeroIngresado);
  } while (isNaN(opcionElegida) || opcionElegida < 1 || opcionElegida > 4);

  return opcionElegida;
}

// FUNCION 5: Esta función inicia la aplicación y muestra un mensaje de bienvenida. Dependiendo de la opción elegida por el usuario, llama a una función específica de bibliot3ca.

function appBiblio() {
  alert("Bienvenido a La Bibliot3ca.\n" + "La biobliteca de libros prestados más cool del mundo. 😎");
  let appBiblioActiva = true;
  while (appBiblioActiva) {
    const opcion = elegirOpcion();
    switch (opcion) {
      case 1:
        bibliot3ca.agregarPrestamo();
        break;
      case 2:
        bibliot3ca.devolverLibro();
        break;
      case 3:
        bibliot3ca.buscarPrestamo();
        break;
      case 4:
        appBiblioActiva = false;
        break;
    }
  }
  alert("Gracias por visitar La Bibliot3ca más cool del mundo.\n" + "¡Hasta la próxima!👋");
}

// Corre la aplicación llamando a la función appBiblio.
appBiblio();
