import datos from '../json/DailyForecast_MX.json' assert {type: 'json'};
console.log("Total:"+datos.length);

var tabla = document.getElementById("tablaClima");
var fechaMenor;
var datosUnicos = [];

$(document).ready(()=>{
    let filasHtml = "";
    
    // Encontrar la fecha menor
    fechaMenor = encontrarFechaMenor();
    console.log("Fecha Menor: ", fechaMenor);

    // Si el dato tiene la fecha menor dentro del json:
    for(var i = 0; i<datos.length; i+=1){
        var elemento = datos[i];
        var fechaAux = new Date(fechaFormato(datos[i].dloc));
        if(fechaAux.getTime() == fechaMenor.getTime()){
            datosUnicos.push(elemento);
            filasHtml += `
            <tr id='fila'>
                <td scope='row' data-label='Estado'>${elemento.nes}</td>
                <td scope='row' data-label='Municipio'>${elemento.nmun}</td>
                <td scope='row' data-label='Temp. Mín.'>${elemento.tmin} °C</td>
                <td scope='row' data-label='Temp. Máx.'>${elemento.tmax} °C</td>
                <td scope='row' data-label='Desc. Cielo'>${elemento.desciel}</td>
                <td scope='row' data-label='Humedad'>${elemento.probprec}%</td>
                <td><img src='./img/${elemento.desciel}.png' class='cambiaTamImg'></td>
            </tr>
            `;
        }
    }
    $("#filasTabla").html(filasHtml);

    console.log("Número de localidades: ", datosUnicos.length);

    // Hacer las filas clickables
    var filas = tabla.getElementsByTagName("tr");
    for (var i = 1; i < filas.length; i++) {
        filas[i].addEventListener("click", function() {
            var celdas = this.getElementsByTagName("td");
            if(celdas){

                // Recolecta la información de los cuatro días de la fila seleccionada
                var datosLocalidad = [];
                for(var j=0; j<datos.length; j++){
                    if(celdas[0].innerText == datos[j].nes && celdas[1].innerText == datos[j].nmun){
                        datosLocalidad.push(datos[j]);
                    }
                }
                console.log(datosLocalidad);
                /*
                var rowData = {
                    id: celdas[0].innerText,
                    nombre: celdas[1].innerText,
                    apellido: celdas[2].innerText
                };
                console.log(rowData);
                */

                var c1 = document.getElementById("contenido1");
                var c2 = document.getElementById("contenido2");
                c1.classList.add("oculto");

                c1.addEventListener("transitionend", function() {
                    c1.classList.remove("mostrar");
                    c1.classList.add("oculto2");
                }, { once: true });

                /*
                var contenido1 = document.getElementById("contenido1");
                var c2 = document.getElementById("contenido2");
                contenido1.classList.add("oculto");

                contenido1.addEventListener("transitionend", function() {
                    contenido1.classList.add("oculto2");
                    c2.classList.remove("oculto");
                    c2.classList.remove("oculto2");
                }, { once: true });
                */
            }
            
        });
    }
});

/*************************************************************************************************
 *                                      LOCALIDADES ÚNICAS
*************************************************************************************************/
// Recibe una cadena como viene en el json y la transforma a fecha de js
function fechaFormato(fechaStr) {
    var anio = parseInt(fechaStr.substring(0, 4));
    var mes = parseInt(fechaStr.substring(4,6))-1;
    var dia = parseInt(fechaStr.substring(6,8));
    var fechaObj = new Date(anio, mes, dia);
    return fechaObj;
}

// Regresa la fecha menor de todo el json
function encontrarFechaMenor(){
    var fecha = new Date(fechaFormato(datos[0].dloc));
    for(var i = 1; i<datos.length; i+=1){
        var elemento = datos[i];
        var fechaAux = new Date(fechaFormato(datos[1].dloc));
        if(fechaAux.getTime() < fecha.getTime){
            fecha = fechaAux;
        }
    }
    return fecha;
}

/*************************************************************************************************
 *                                   FILTRADO DE LOCALIDADES
*************************************************************************************************/
var filtro = document.getElementById("filtro");

// Cada que se introduce un caracter a la barra de filtro, hace la búsqueda.
filtro.addEventListener("keyup", function(event) {
    if(filtro.value == ""){
        mostrarTodo();
    }
    else if((SimilarEstado(filtro.value) || SimilarMunicipio(filtro.value)) && (filtro.value).length !== 1){
        mostrarLocalidades(filtro.value)
        console.log("Se encuentra localidad");
    } else {
        console.log("Sin resultados para estado");
    }
    miFuncion(event);
});

// Muestra todas las localidades
function mostrarTodo(){
    var filas = tabla.getElementsByTagName("tr");
    for (var i = 0; i < filas.length; i++) {
        filas[i].style.display = "";
    }
}

// Muestra todas las filas que contengan un valor similar al introducido en el filtro
function mostrarLocalidades(input){
    var filas = tabla.getElementsByTagName("tr");
    for (var i = 0; i < filas.length; i++) {
        var celdaEs = filas[i].getElementsByTagName("td")[0];
        var celdaMun = filas[i].getElementsByTagName("td")[1];
        if (celdaEs || celdaMun) {
            var textoEs = celdaEs.textContent.trim();
            var textoMun = celdaMun.textContent.trim();
            if(palabraSimilar(textoEs, input) || palabraSimilar(textoMun, input)) {
                //console.log(textoEstado+" "+input);
                filas[i].style.display = "";
            } else {
                filas[i].style.display = "none";
            } 
        }
    }
}

function miFuncion(event) {

}

// Busca si existe un estado con nombre similar a la palabra
function SimilarEstado(palabra){
    if(palabra == ""){
        return false;
    }
    for(var i=0; i<datosUnicos.length; i++){
        if(palabraSimilar(datosUnicos[i].nes, palabra)){
            return true;
        }
    }
    return false;
}

// Busca si existe un municipio con nombre similar a la palabra
function SimilarMunicipio(palabra){
    if(palabra == ""){
        return false;
    }
    for(var i=0; i<datosUnicos.length; i++){
        if(palabraSimilar(datosUnicos[i].nmun, palabra)){
            return true;
        }
    }
    return false;
}

/*************************************************************************************************
 *                              FUNCIONES PARA COMPARAR CADENAS
*************************************************************************************************/
function quitarAcentos(cadena){
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}

function palabraSimilar(palabra1, palabra2){
    var cad1 = palabra1.toUpperCase();
    var cad2 = palabra2.toUpperCase();
    cad1 = quitarAcentos(cad1);
    cad2 = quitarAcentos(cad2);
    if(palabraIgual(cad1, cad2)){
        return true;
    }
    if(cad1.includes(cad2)){
        return true;
    }
    return false;
}

function palabraIgual(palabra1, palabra2){
    if(quitarAcentos(palabra1) == quitarAcentos(palabra2)){
        return true;
    }
    if(palabra1 == "AGUASCALIENTES" && palabra2 == "AGS"){
        return true;
    }
    if(palabra1 == "BAJA CALIFORNIA" && (palabra2 == "BC" || palabra2 == "B.C.")){
        return true;
    }
    if(palabra1 == "BAJA CALIFORNIA SUR" && (palabra2 == "BCS" || palabra2 == "B.C.S.")){
        return true;
    }
    if(palabra1 == "CHIAPAS" && palabra2 == "CHIS"){
        return true;
    }
    if(palabra1 == "CIUDAD DE MEXICO" && palabra2 == "CDMX"){
        return true;
    }
    if(palabra1 == "DURANGO" && palabra2 == "DGO"){
        return true;
    }
    if(palabra1 == "GUANAJUATO" && palabra2 == "GTO"){
        return true;
    }
    if(palabra1 == "GUERRERO" && palabra2 == "GRO"){
        return true;
    }
    if(palabra1 == "HIDALGO" && palabra2 == "HGO"){
        return true;
    }
    if(palabra1 == "ESTADO DE MEXICO" && (palabra2 == "EDOMEX" || palabra2 == "EDO MEX" || palabra2 == "EDO.MEX." || palabra2 == "EDO. MEX." || palabra2 == "MEX")){
        return true;
    }
    if(palabra1 == "NUEVO LEON" && palabra2 == "NL"){
        return true;
    }
    if(palabra1 == "QUERETARO DE ARTEAGA" && palabra2 == "QRO"){
        return true;
    }
    if(palabra1 == "QUINTANA ROO" && palabra2 == "QROO"){
        return true;
    }
    if(palabra1 == "SAN LUIS POTOSI" && (palabra2 == "SLP")){
        return true;
    }
    if(palabra1 == "TAMAULIPAS" && palabra2 == "TAMPS"){
        return true;
    }
    return false;
}