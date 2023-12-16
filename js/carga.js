import datos from '../json/DailyForecast_MX.json' assert {type: 'json'};
console.log("Total:"+datos.length);

var tabla = document.getElementById("tablaClima");
// Crea la tabla a partir del json
$(document).ready(()=>{
    let filasHtml = "";
    var comparador = "";
    var datosUnicos = [];



    for(var i = 0; i<datos.length; i+=1){
        var elemento = datos[i];
        if(elemento.nmun != comparador){
            comparador = elemento.nmun;
            filasHtml += `
            <tr id='fila'>
                <td>${elemento.nes}</td>
                <td>${elemento.nmun}</td>
                <td>${elemento.desciel}</td>
                <td><img src='./img/${elemento.desciel}.png' class='materialboxed cambiaTamImg'></td>
            </tr>
            `;
        }
    }
    $("#filasProductos").html(filasHtml);

    var arr = [];
    for(var i=0; i<4; i++){
        arr.push(datos[i]);
    }

    console.log(verLocalidadUnica(arr));

    // Hacer las filas clickables
    var filas = tabla.getElementsByTagName("tr");
    console.log(filas);
    for (var i = 0; i < filas.length; i++) {
        filas[i].addEventListener("click", function() {
            // Obtener la información de la fila seleccionada
            var celdas = this.getElementsByTagName("td");
            var rowData = {
                id: celdas[0].innerText,
                nombre: celdas[1].innerText,
                apellido: celdas[2].innerText
            };

            // Hacer algo con la información, por ejemplo, mostrarla en la consola
            console.log(rowData);
        });
    }
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

/*************************************************************************************************
 *                                      LOCALIDADES ÚNICAS
*************************************************************************************************/
function as() {

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
    for(var i=0; i<datos.length; i++){
        if(palabraSimilar(datos[i].nes, palabra)){
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
    for(var i=0; i<datos.length; i++){
        if(palabraSimilar(datos[i].nmun, palabra)){
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