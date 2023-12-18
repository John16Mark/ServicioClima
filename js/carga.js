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
            //regresarIcono(elemento.desciel, elemento.prec);
            filasHtml += `
            <tr id='fila'>
                <td scope='row' data-label='Estado'>${elemento.nes}</td>
                <td scope='row' data-label='Municipio'>${elemento.nmun}</td>
                <td scope='row' data-label='Temp. Mín.'>${elemento.tmin} °C</td>
                <td scope='row' data-label='Temp. Máx.'>${elemento.tmax} °C</td>
                <td scope='row' data-label='Desc. Cielo'>${elemento.desciel}</td>
                <td scope='row' data-label='Precipitación'>${elemento.prec} l/m2</td>
                <td class='celdaImg' ><img src='./${regresarIcono(elemento.desciel, elemento.prec)}.png' class='cambiaTamImg'></td>
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

                // Muestra la información
                var c1 = document.getElementById("contenido1");
                var c2 = document.getElementById("contenido2");
                c1.classList.add("oculto");
                c1.classList.remove("mostrar")
                
                c1.addEventListener("transitionend", function() {
                    c1.classList.add("oculto2");
                    c2.classList.remove("oculto");
                    
                    //c2.classList.add("mostrar");
                }, { once: true });
                c2.classList.remove("oculto2");
                
                // Cambia los textos:
                // Título
                var tituloImagen = document.getElementById("tituloImagen");
                tituloImagen.src = regresarIcono(datosLocalidad[0].desciel, datosLocalidad[0].prec)+".png";
                var caratula = document.getElementById("caratula");
                caratula.style.backgroundImage = "url('/img/estados/"+datosLocalidad[0].nes+".jpg')";
                var txtMun = document.getElementById("txtMunicipio");
                var txtEs = document.getElementById("txtEstado");
                var txtMax = document.getElementById("titulomax");
                var txtMin = document.getElementById("titulomin");
                var txtDia = document.getElementById("tituloDia");
                var txtFecha = document.getElementById("tituloFecha");
                var fecha1 = new Date(fechaFormato(datos[0].dloc));
                txtMun.innerText = datosLocalidad[0].nmun;
                txtEs.innerText = datosLocalidad[0].nes;
                txtMax.innerText = Math.floor(datosLocalidad[0].tmax);
                txtMin.innerText = Math.floor(datosLocalidad[0].tmin);
                txtDia.innerText = Dia(fecha1);
                txtFecha.innerText = Mes(fecha1)+" "+fecha1.getDate()+" "+fecha1.getFullYear();

                // Card día 1
                var imgGente = document.getElementById("lluviagente");
                imgGente.src = imagenGente(datosLocalidad[0].tmax, datosLocalidad[0].tmin, datosLocalidad[0].prec);
                var txtNubes = document.getElementById("dia1nubes");
                txtMax = document.getElementById("dia1max");
                txtMin = document.getElementById("dia1min");
                txtNubes.innerText = datosLocalidad[0].desciel;
                txtMax.innerText = datosLocalidad[0].tmax;
                txtMin.innerText = datosLocalidad[0].tmin;
                var txtHumedad = document.getElementById("dia1wet");
                var txtViento = document.getElementById("dia1wind");
                txtHumedad.innerText = datosLocalidad[0].prec;
                txtViento.innerText = datosLocalidad[0].velvien;

                // Card día 2
                var img1 = document.getElementById("imagen2");
                var card1 = document.getElementById("card2");
                img1.style.backgroundImage = "url('/"+regresarIcono(datosLocalidad[1].desciel, datosLocalidad[1].prec)+".png')";
                card1.addEventListener("mouseover", function() {
                    img1.style.backgroundImage = "url('/"+regresarIcono(datosLocalidad[1].desciel, datosLocalidad[1].prec)+".gif')";
                });
                card1.addEventListener("mouseout", function() {
                    img1.style.backgroundImage = "url('/"+regresarIcono(datosLocalidad[1].desciel, datosLocalidad[1].prec)+".png')";
                });
                var txtDia2 = document.getElementById("dia2");
                txtNubes = document.getElementById("dia2nubes");
                txtMax = document.getElementById("dia2max");
                txtMin = document.getElementById("dia2min");
                txtHumedad = document.getElementById("dia2wet");
                txtDia2.innerText = Dia(new Date(fechaFormato(datos[1].dloc)));
                txtNubes.innerText = datosLocalidad[1].desciel;
                txtMax.innerText = datosLocalidad[1].tmax+"°";
                txtMin.innerText = datosLocalidad[1].tmin+"°";
                txtHumedad.innerText = datosLocalidad[1].prec+" l/m2";

                // Card día 3
                var img2 = document.getElementById("imagen3");
                var card2 = document.getElementById("card3");
                img2.style.backgroundImage = "url('/"+regresarIcono(datosLocalidad[2].desciel, datosLocalidad[2].prec)+".png')";
                card2.addEventListener("mouseover", function() {
                    img2.style.backgroundImage = "url('/"+regresarIcono(datosLocalidad[2].desciel, datosLocalidad[2].prec)+".gif')";
                });
                card2.addEventListener("mouseout", function() {
                    img2.style.backgroundImage = "url('/"+regresarIcono(datosLocalidad[2].desciel, datosLocalidad[2].prec)+".png')";
                });
                var txtDia3 = document.getElementById("dia3");
                txtNubes = document.getElementById("dia3nubes");
                txtMax = document.getElementById("dia3max");
                txtMin = document.getElementById("dia3min");
                txtHumedad = document.getElementById("dia3wet");
                txtDia3.innerText = Dia(new Date(fechaFormato(datos[2].dloc)));
                txtNubes.innerText = datosLocalidad[2].desciel;
                txtMax.innerText = datosLocalidad[2].tmax+"°";
                txtMin.innerText = datosLocalidad[2].tmin+"°";
                txtHumedad.innerText = datosLocalidad[2].prec+" l/m2";

                // Card día 4
                var img3 = document.getElementById("imagen4");
                var card3 = document.getElementById("card4");
                img3.style.backgroundImage = "url('/"+regresarIcono(datosLocalidad[3].desciel, datosLocalidad[3].prec)+".png')";
                card3.addEventListener("mouseover", function() {
                    img3.style.backgroundImage = "url('/"+regresarIcono(datosLocalidad[3].desciel, datosLocalidad[3].prec)+".gif')";
                });
                card3.addEventListener("mouseout", function() {
                    img3.style.backgroundImage = "url('/"+regresarIcono(datosLocalidad[3].desciel, datosLocalidad[3].prec)+".png')";
                });
                var txtDia4 = document.getElementById("dia4");
                txtNubes = document.getElementById("dia4nubes");
                txtMax = document.getElementById("dia4max");
                txtMin = document.getElementById("dia4min");
                txtHumedad = document.getElementById("dia4wet");
                txtDia4.innerText = Dia(new Date(fechaFormato(datos[3].dloc)));
                txtNubes.innerText = datosLocalidad[3].desciel;
                txtMax.innerText = datosLocalidad[3].tmax+"°";
                txtMin.innerText = datosLocalidad[3].tmin+"°";
                txtHumedad.innerText = datosLocalidad[3].prec+" l/m2";
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

/*************************************************************************************************
 *                              FUNCIONES PARA ÍCONOS E IMÁGENES
*************************************************************************************************/
function regresarIcono(nubes, humedad){
    var cadena="icons/weather/";
    if(nubes == "Despejado") {
        return cadena+"dia-despejado";
    }
    else if(nubes == "Poco nuboso") {
        if(humedad < 2.0) {
            return cadena+"poco-nuboso";
        } else {
            return cadena+"parcialmente-nublado-lluvia";
        }
    }
    else if(nubes == "Medio nublado") {
        if(humedad < 2.0) {
            return cadena+"medio-nublado";
        } else if(humedad < 10.0) {
            return cadena+"nublado-pocalluvia";
        } else if(humedad < 20.0) {
            return cadena+"nublado-lluviamedia";
        } else {
            return cadena+"nublado-lluviaintensa";
        }
    }
    else if(nubes == "Cielo nublado") {
        if(humedad < 1.5) {
            return cadena+"medio-nublado";
        } else if(humedad < 10.0) {
            return cadena+"nublado-pocalluvia";
        } else if(humedad < 20.0) {
            return cadena+"nublado-lluviamedia";
        } else {
            return cadena+"nublado-lluviaintensa";
        }
    } else if(nubes == "Cielo cubierto") {
        if(humedad < 1.5) {
            return cadena+"nublado";
        } else if(humedad < 10.0) {
            return cadena+"nublado-pocalluvia";
        } else if(humedad < 20.0) {
            return cadena+"nublado-lluviamedia";
        } else {
            return cadena+"nublado-lluviaintensa";
        }
    }
    return cadena;
}

function Dia(fecha){
    switch(fecha.getDay()){
        case 0:
            return "Domingo";
        case 1:
            return "Lunes";
        case 2:
            return "Martes";
        case 3:
            return "Miércoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        case 6:
            return "Sábado";
        default:
            return "???";
    }
}

function Mes(fecha){
    switch(fecha.getMonth()){
        case 0:
            return "Enero";
        case 1:
            return "Febrero";
        case 2:
            return "Marzo";
        case 3:
            return "Abril";
        case 4:
            return "Mayo";
        case 5:
            return "Junio";
        case 6:
            return "Julio";
        case 7:
            return "Agosto";
        case 8:
            return "Septiembre";
        case 9:
            return "Octubre";
        case 10:
            return "Noviembre";
        case 11:
            return "Diciembre";
        default:
            return "???";
    }
}

function imagenGente(tmax, tmin, prec){
    var cad = "img/cartoon/"
    if(prec > 12.0){
        return "climaLluviaFuerte.png"
    }
    else if(prec > 2.0) {
        return cad+"climaLluviaLeve.png";
    }
    else {
        console.log((parseFloat(tmax)+parseFloat(tmin))/2.0)
        if((parseFloat(tmax)+parseFloat(tmin))/2.0 >= 30){
            return cad+"climaCalor.png";
        } else if((parseFloat(tmax)+parseFloat(tmin))/2.0 >= 15){
            return cad+"climaNormal.png"
        } else {
            return cad+"climaFrio.png"
        }
    }
}

/*************************************************************************************************
 *                                  SCROLL BACK TO TOP
*************************************************************************************************/

$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('#back-to-top').fadeIn();
    } else {
        $('#back-to-top').fadeOut();
    }
});
$('#back-to-top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 400);
    return false;
});

/*************************************************************************************************
 *                                  BOTÓN REGRESO
*************************************************************************************************/

var btnregresar = document.getElementById("btnregresar");
btnregresar.addEventListener("click", function() {
    var c1 = document.getElementById("contenido1");
    var c2 = document.getElementById("contenido2");
    //c2.classList.remove("mostrar")
    c2.classList.remove("mostrar")
    c2.classList.add("oculto");

    c2.addEventListener("transitionend", function() {
        c2.classList.add("oculto2");
        c1.classList.remove("oculto");
        c2.classList.add("oculto2");
    }, { once: true });
    c1.classList.remove("oculto2");
});