// Obtenemos referencias a los elementos HTML usando sus IDs
const miBoton = document.getElementById('cambiar-texto-btn');
const parrafoDinamico = document.getElementById('parrafo-dinamico');

// Variable para controlar el estado del texto
let estaCambio = false;

// Añadimos un "escuchador de eventos" (event listener) al botón
miBoton.addEventListener('click', function() {
    if (!estaCambio) {
        // Si el texto no ha cambiado, lo cambiamos
        parrafoDinamico.textContent = '¡El texto fue modificado con JavaScript! ¿Genial, no?';
        document.body.style.backgroundColor = '#d4edda'; // Cambia el fondo a un verde claro
        this.textContent = 'Volver al texto original'; // Cambia el texto del botón
    } else {
        // Si el texto ya cambió, lo revertimos
        parrafoDinamico.textContent = 'Este texto cambiará con JavaScript.';
        document.body.style.backgroundColor = '#e0f2f7'; // Vuelve al fondo original
        this.textContent = 'Haz clic para interactuar'; // Vuelve al texto original del botón
    }
    // Invertimos el estado
    estaCambio = !estaCambio;
});