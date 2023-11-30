import datos from '../json/DailyForecast_MX.json' assert {type: 'json'};
console.log("Total:"+datos.length);
$(document).ready(()=>{
    let filas = "";
    var j=0;
    var comparador ="";
    for(var i = 0; i<datos.length; i+=1){
        var elemento = datos[i];
        if(elemento.nmun != comparador){
            j++;
            comparador = elemento.nmun;
            //console.log(elemento);
            filas += `
            <tr>
                <td>${elemento.nes}</td>
                <td>${elemento.nmun}</td>
                <td>${elemento.desciel}</td>
                <td><img src='./img/${elemento.desciel}.png' class='materialboxed cambiaTamImg'></td>
            </tr>
            `;
        }
    }
    console.log("Comparados:"+j);
    $("#filasProductos").html(filas);

    var arr = [];
    for(var i=0; i<4; i++){
        arr.push(datos[i]);
    }

    console.log(verLocalidadUnica(arr));
    console.log("Palabras Sim: "+palabraSimilar("Holá", "ola"))
});

function verLocalidadUnica(array){
    if(array.length !== 4){
        return false;
    }
    for(var i=0; i<4; i++){
        if((array[i].nes != array[0].nes) || (array[i].nmun != array[0].nmun)){
            return false;
        }
    }
    return true;
}

var inputEstado = document.getElementById("filtroEstado");
var inputMunicipio = document.getElementById("filtroMunicipio");

inputEstado.addEventListener("keyup", function(event) {
    //console.log("Tecla soltada. Valor actual del input: " + inputEstado.value);
    if(EstadoIgual(inputEstado.value)){
        console.log("Se encuentra el estado");
    } else if(EstadoSimilar(inputEstado.value)){
        console.log("Se encuentra estado similar");
    } else {
        console.log("Sin resultados para estado");
    }

    if(EstadoIgual(inputEstado.value) && MunicicpioIgual(inputMunicipio.value)){
        console.log("ESPECÍFICO");
    } else if(EstadoIgual(inputEstado.value)){
        mostrarPosiblesSoloEstado(inputEstado.value);
    } else if(EstadoSimilar(inputEstado.value)){
        mostrarPosiblesSimilarEstado(inputEstado.value);
    } else if(inputEstado.value == "" && inputMunicipio.value == ""){
        mostrarTodo();
    }

    miFuncion(event);
});

inputMunicipio.addEventListener("keyup", function(event) {
    //console.log("Tecla soltada. Valor actual del input: " + inputMunicipio.value);
    if(MunicicpioIgual(inputMunicipio.value)){
        console.log("Se encuentra el municipio");
    } else if(MunicicpioSimilar(inputMunicipio.value)){
        console.log("Se encuentra municipio similar");
    } else {
        console.log("Sin resultados para municipio");
    }

    if(EstadoIgual(inputEstado.value) && MunicicpioIgual(inputMunicipio.value)){
        console.log("ESPECÍFICO");
    } else if(EstadoIgual(inputEstado.value)){
        mostrarPosiblesSoloEstado(inputEstado.value);
    } else if(EstadoSimilar(inputEstado.value)){
        mostrarPosiblesSimilarEstado(inputEstado.value);
    } else if(inputEstado.value == "" && inputMunicipio.value == ""){
        mostrarTodo();
    }


    miFuncion(event);
});

function mostrarTodo(){
    var tabla = document.getElementById("tblProductos");
    var filas = tabla.getElementsByTagName("tr");
    for (var i = 0; i < filas.length; i++) {
        filas[i].style.display = "";
    }
}

function mostrarPosiblesSoloEstado(estado){
    var tabla = document.getElementById("tblProductos");
    var filas = tabla.getElementsByTagName("tr");
    for (var i = 0; i < filas.length; i++) {
        var columna1 = filas[i].getElementsByTagName("td")[0];
        if (columna1) {
            var cad = columna1.textContent.trim();
            if(palabraIgual(cad, input)) {
                console.log(cad+" "+input);
                filas[i].style.display = "";
            } else {
                filas[i].style.display = "none";
            } 
        }
    }
}

function mostrarPosiblesSimilarEstado(input){
    var tabla = document.getElementById("tblProductos");
    var filas = tabla.getElementsByTagName("tr");
    for (var i = 0; i < filas.length; i++) {
        var columna1 = filas[i].getElementsByTagName("td")[0];
        if (columna1) {
            var cad = columna1.textContent.trim();
            if(palabraSimilar(cad, input)) {
                console.log(cad+" "+input);
                filas[i].style.display = "";
            } else {
                filas[i].style.display = "none";
            } 
        }
    }
}

function miFuncion(event) {

}

function EstadoIgual(palabra){
    for(var i=0; i<datos.length; i++){
        if(datos[i].nes == palabra){
            return true;
        }
    }
    return false;
}

function EstadoSimilar(palabra){
    if(palabra == ""){
        return false;
    }
    for(var i=0; i<datos.length; i++){
        if(palabraSimilar(datos[i].nes,palabra)){
            return true;
        }
    }
    return false;
}

function MunicicpioIgual(palabra){
    for(var i=0; i<datos.length; i++){
        if(datos[i].nmun == palabra){
            return true;
        }
    }
    return false;
}

function MunicicpioSimilar(palabra){
    if(palabra == ""){
        return false;
    }
    for(var i=0; i<datos.length; i++){
        if(datos[i].nmun.includes(palabra)){
            return true;
        }
    }
    return false;
}

function quitarAcentos(cadena){
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}

function palabraSimilar(palabra1, palabra2){
    var cad1 = palabra1.toUpperCase();
    var cad2 = palabra2.toUpperCase();
    if(quitarAcentos(cad1).includes(quitarAcentos(cad2))){
        return true;
    }
    return false;
}

function palabraIgual(palabra1, palabra2){
    var cad1 = palabra1.toUpperCase();
    var cad2 = palabra2.toUpperCase();
    if(quitarAcentos(cad1) == quitarAcentos(cad2)){
        return true;
    }
    if(palabra1 == "Veracruz de Ignacio de la Llave" && cad2 == "VERACRUZ"){
        return true;
    }
    if(palabra1 == "Veracruz de Ignacio de la Llave" && cad2 == "VERACRUZ"){
        return true;
    }
    if(palabra1 == "Michoacán de Ocampo" && cad2 == "MICHOACAN"){
        return true;
    }
    if(palabra1 == "Estado de México" && (cad2 == "EDOMEX" || cad2 == "EDO MEX" || cad2 == "EDO.MEX." || cad2 == "EDO. MEX.")){
        return true;
    }
    if(palabra1 == "Querétaro de Arteaga" && cad2 == "QUERETARO"){
        return true;
    }
    return false;
}