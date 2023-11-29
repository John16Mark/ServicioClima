var miInput = document.getElementById("filtroEstado");

// Agrega un eventListener para el evento keyup
miInput.addEventListener("keyup", function(event) {
    // Llama a la función que deseas ejecutar
    console.log("Tecla soltada. Valor actual del input: " + miInput.value);
    
    miFuncion(event);
});

// Definición de la función a ejecutar
function miFuncion(event) {
    // Tu lógica aquí
    
}