const preguntas = [
    {
        pregunta: "¿Cuál de los siguientes NO es un lenguaje de programación?",
        opciones: ["Python", "Java", "HTML", "C++"],
        respuestaCorrecta: "HTML"
    },
    {
        pregunta: "¿Qué significa CSS en desarrollo web?",
        opciones: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Cascading Simple Sheets"],
        respuestaCorrecta: "Cascading Style Sheets"
    },
    {
        pregunta: "¿Qué compañía desarrolló el lenguaje de programación Java?",
        opciones: ["Microsoft", "Apple", "Sun Microsystems", "IBM"],
        respuestaCorrecta: "Sun Microsystems"
    },
    {
        pregunta: "¿Qué palabra clave se usa para declarar una constante en JavaScript?",
        opciones: ["var", "let", "const", "static"],
        respuestaCorrecta: "const"
    },
    {
        pregunta: "¿Qué estructura de datos usa LIFO (Last-In, First-Out)?",
        opciones: ["Cola (Queue)", "Pila (Stack)", "Árbol (Tree)", "Lista (List)"],
        respuestaCorrecta: "Pila (Stack)"
    },
    {
        pregunta: "¿Qué es un 'bug' en programación?",
        opciones: ["Un error en el código", "Una característica nueva", "Un tipo de insecto", "Un programa antivirus"],
        respuestaCorrecta: "Un error en el código"
    },
    {
        pregunta: "¿Qué protocolo se usa para la transferencia segura de datos en la web?",
        opciones: ["HTTP", "FTP", "HTTPS", "SMTP"],
        respuestaCorrecta: "HTTPS"
    },
    {
        pregunta: "¿Cuál de estos NO es un paradigma de programación?",
        opciones: ["Orientado a objetos", "Funcional", "Imperativo", "Cascada"],
        respuestaCorrecta: "Cascada"
    },
    {
        pregunta: "¿Qué lenguaje se usa para añadir interactividad a las páginas web?",
        opciones: ["HTML", "CSS", "Python", "JavaScript"],
        respuestaCorrecta: "JavaScript"
    },
    {
        pregunta: "¿Qué significa 'IDE' en el contexto de desarrollo de software?",
        opciones: ["Internet Development Environment", "Integrated Development Environment", "Interactive Design Engine", "Internal Data Exchange"],
        respuestaCorrecta: "Integrated Development Environment"
    },
    {
        pregunta: "¿Qué es 'Git'?",
        opciones: ["Un lenguaje de programación", "Un sistema de control de versiones", "Un navegador web", "Una base de datos"],
        respuestaCorrecta: "Un sistema de control de versiones"
    },
    {
        pregunta: "¿Qué hace la etiqueta <br> en HTML?",
        opciones: ["Crea un párrafo", "Inserta un salto de línea", "Alinea el texto a la derecha", "Define un bloque de código"],
        respuestaCorrecta: "Inserta un salto de línea"
    },
    {
        pregunta: "¿Cuál es el propósito principal de un bucle 'for' en programación?",
        opciones: ["Definir una función", "Repetir un bloque de código un número específico de veces", "Tomar decisiones condicionales", "Almacenar datos en una lista"],
        respuestaCorrecta: "Repetir un bloque de código un número específico de veces"
    },
    {
        pregunta: "¿Qué es un 'framework' en desarrollo web?",
        opciones: ["Un tipo de base de datos", "Una biblioteca de herramientas y funciones predefinidas", "Un servidor web", "Un lenguaje de marcado"],
        respuestaCorrecta: "Una biblioteca de herramientas y funciones predefinidas"
    },
    {
        pregunta: "¿Qué concepto de POO permite a un objeto tomar muchas formas?",
        opciones: ["Herencia", "Encapsulación", "Polimorfismo", "Abstracción"],
        respuestaCorrecta: "Polimorfismo"
    }
];

// 2. Variables de estado
let indicePreguntaActual = 0;
let puntaje = 0;
let intervaloTemporizador;
let tiempoRestante = 300;
let nombreUsuario = '';
let preguntasQuiz = [];
const DURACION_QUIZ_SEGUNDOS = 300;
const NUM_PREGUNTAS_POR_QUIZ = 10;

// 3. Referencias a elementos HTML
const seccionBienvenida = document.getElementById('welcome-section');
const seccionQuiz = document.getElementById('quiz-section');
const seccionResultados = document.getElementById('results-section');
const seccionRanking = document.getElementById('ranking-section');

const inputNombreUsuario = document.getElementById('username-input');
const botonIniciar = document.getElementById('start-button');
const botonVerRanking = document.getElementById('view-ranking-button');

const displayTemporizador = document.getElementById('timer-display');
const textoPregunta = document.getElementById('question-text');
const contenedorOpciones = document.getElementById('options-container');
const displayRetroalimentacion = document.getElementById('feedback-display');
const displayPuntaje = document.getElementById('score-display');
const botonSiguiente = document.getElementById('next-button');

const displayPuntajeFinal = document.getElementById('final-score-display');
const displayPorcentaje = document.getElementById('percentage-score-display');
const botonNuevoQuiz = document.getElementById('new-quiz-button');
const botonVolverMenu = document.getElementById('back-to-menu-button');
const cuerpoTablaRanking = document.getElementById('high-scores-body');
const botonVolverDeRanking = document.getElementById('back-from-ranking-button');

// 4. Navegación y control de UI
function mostrarSeccion(seccion) {
    const todasLasSecciones = [seccionBienvenida, seccionQuiz, seccionResultados, seccionRanking];
    todasLasSecciones.forEach(sec => {
        if (sec === seccion) {
            sec.classList.remove('hidden');
        } else {
            sec.classList.add('hidden');
        }
    });
}

inputNombreUsuario.addEventListener('input', () => {
    botonIniciar.disabled = inputNombreUsuario.value.trim() === '';
});

botonIniciar.addEventListener('click', iniciarJuego);
function iniciarJuego() {
    nombreUsuario = inputNombreUsuario.value.trim();
    if (!nombreUsuario) {
        alert('Por favor, ingresa tu nombre para iniciar la trivia.');
        return;
    }
    mostrarSeccion(seccionQuiz);
    indicePreguntaActual = 0;
    puntaje = 0;
    tiempoRestante = DURACION_QUIZ_SEGUNDOS;
    preguntasQuiz = mezclarArray([...preguntas]).slice(0, NUM_PREGUNTAS_POR_QUIZ);
    displayPuntaje.textContent = puntaje;
    displayRetroalimentacion.textContent = '';
    botonSiguiente.style.display = 'none';
    iniciarTemporizador();
    mostrarPregunta();
}

botonVerRanking.addEventListener('click', () => {
    mostrarSeccion(seccionRanking);
    cargarYMostrarRanking();
});

if (botonVolverDeRanking) {
    botonVolverDeRanking.addEventListener('click', () => {
        mostrarSeccion(seccionBienvenida);
        inputNombreUsuario.value = '';
        botonIniciar.disabled = true;
    });
}

// 5. Lógica del quiz activo
function iniciarTemporizador() {
    if (intervaloTemporizador) clearInterval(intervaloTemporizador);
    actualizarDisplayTemporizador();
    intervaloTemporizador = setInterval(() => {
        tiempoRestante--;
        actualizarDisplayTemporizador();
        if (tiempoRestante <= 0) {
            clearInterval(intervaloTemporizador);
            deshabilitarOpciones();
            displayRetroalimentacion.textContent = '¡Tiempo agotado!';
            botonSiguiente.style.display = 'block';
            botonSiguiente.textContent = 'Ver Resultados';
            botonSiguiente.removeEventListener('click', siguientePregunta);
            botonSiguiente.addEventListener('click', evaluarQuiz, { once: true });
        }
    }, 1000);
}
function actualizarDisplayTemporizador() {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    displayTemporizador.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
function mostrarPregunta() {
    if (indicePreguntaActual >= preguntasQuiz.length) {
        evaluarQuiz();
        return;
    }
    const preguntaActual = preguntasQuiz[indicePreguntaActual];
    textoPregunta.textContent = preguntaActual.pregunta;
    contenedorOpciones.innerHTML = '';
    displayRetroalimentacion.textContent = '';
    botonSiguiente.style.display = 'none';
    preguntaActual.opciones.forEach(opcion => {
        const boton = document.createElement('button');
        boton.classList.add('option-btn');
        boton.textContent = opcion;
        boton.addEventListener('click', () => verificarRespuesta(boton, opcion));
        contenedorOpciones.appendChild(boton);
    });
}
function verificarRespuesta(botonSeleccionado, opcionSeleccionada) {
    const preguntaActual = preguntasQuiz[indicePreguntaActual];
    deshabilitarOpciones();
    if (opcionSeleccionada === preguntaActual.respuestaCorrecta) {
        puntaje++;
        displayPuntaje.textContent = puntaje;
        displayRetroalimentacion.textContent = '¡Correcto!';
        displayRetroalimentacion.style.color = 'var(--color-correcto)';
        botonSeleccionado.classList.add('correct');
    } else {
        displayRetroalimentacion.textContent = `Incorrecto. La respuesta correcta era: "${preguntaActual.respuestaCorrecta}"`;
        displayRetroalimentacion.style.color = 'var(--color-incorrecto)';
        botonSeleccionado.classList.add('incorrect');
        Array.from(contenedorOpciones.children).forEach(boton => {
            if (boton.textContent === preguntaActual.respuestaCorrecta) {
                boton.classList.add('correct');
            }
        });
    }
    botonSiguiente.style.display = 'block';
    if (indicePreguntaActual < preguntasQuiz.length - 1) {
        botonSiguiente.textContent = 'Siguiente Pregunta';
        botonSiguiente.removeEventListener('click', evaluarQuiz);
        botonSiguiente.addEventListener('click', siguientePregunta, { once: true });
    } else {
        botonSiguiente.textContent = 'Ver Resultados';
        botonSiguiente.removeEventListener('click', siguientePregunta);
        botonSiguiente.addEventListener('click', evaluarQuiz, { once: true });
    }
}
function deshabilitarOpciones() {
    Array.from(contenedorOpciones.children).forEach(boton => {
        boton.disabled = true;
    });
}
function siguientePregunta() {
    indicePreguntaActual++;
    if (indicePreguntaActual < preguntasQuiz.length) {
        mostrarPregunta();
    } else {
        evaluarQuiz();
    }
}
function evaluarQuiz() {
    clearInterval(intervaloTemporizador);
    mostrarSeccion(seccionResultados);
    const porcentaje = (puntaje / NUM_PREGUNTAS_POR_QUIZ) * 100;
    displayPuntajeFinal.textContent = `${puntaje} / ${NUM_PREGUNTAS_POR_QUIZ}`;
    displayPorcentaje.textContent = `${porcentaje.toFixed(2)}%`;
    guardarPuntaje();
}

// 6. Persistencia de datos (localStorage)
function guardarPuntaje() {
    const mejoresPuntajes = JSON.parse(localStorage.getItem('quizMejoresPuntajes')) || [];
    const nuevoPuntaje = {
        nombre: nombreUsuario,
        puntaje: puntaje,
        fecha: new Date().toLocaleDateString('es-VE')
    };
    mejoresPuntajes.push(nuevoPuntaje);
    mejoresPuntajes.sort((a, b) => b.puntaje - a.puntaje);
    const top5 = mejoresPuntajes.slice(0, 5);
    localStorage.setItem('quizMejoresPuntajes', JSON.stringify(top5));
}
function cargarYMostrarRanking() {
    const mejoresPuntajes = JSON.parse(localStorage.getItem('quizMejoresPuntajes')) || [];
    cuerpoTablaRanking.innerHTML = '';
    if (mejoresPuntajes.length === 0) {
        cuerpoTablaRanking.innerHTML = '<tr><td colspan="4">No hay puntajes registrados aún.</td></tr>';
        return;
    }
    mejoresPuntajes.forEach((entrada, indice) => {
        const fila = cuerpoTablaRanking.insertRow();
        const celdaPosicion = fila.insertCell();
        const celdaNombre = fila.insertCell();
        const celdaPuntaje = fila.insertCell();
        const celdaFecha = fila.insertCell();
        celdaPosicion.textContent = indice + 1;
        celdaNombre.textContent = entrada.nombre;
        celdaPuntaje.textContent = entrada.puntaje;
        celdaFecha.textContent = entrada.fecha;
    });
}

// 7. Finalización y reinicio
botonNuevoQuiz.addEventListener('click', nuevoQuiz);
function nuevoQuiz() {
    mostrarSeccion(seccionBienvenida);
    inputNombreUsuario.value = '';
    botonIniciar.disabled = true;
}
botonVolverMenu.addEventListener('click', volverMenu);
function volverMenu() {
    mostrarSeccion(seccionBienvenida);
    inputNombreUsuario.value = '';
    botonIniciar.disabled = true;
}

// 8. Utilidades
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarSeccion(seccionBienvenida);
    cargarYMostrarRanking();
});