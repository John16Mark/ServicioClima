import datos from '../json/DailyForecast_MX.json' assert {type: 'json'};
var registros = []
var aux = []

function localidadUnica(){
    var valorCampo = document.getElementById('filtroEstado').value;
    if(valorCampo == ''){
        return true;
    } else {
        return false;
    }
}

function busqueda(input, tableId, col){
    
}

function actualizarTabla(){
    let filas = "";
    for(var i = 0; i<datos.length; i++){
        var elemento = datos[i];
        
        if(true){
            console.log(elemento);
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
    $("#filasProductos").html(filas);
    $(".materialboxed").materialbox();
}

function mostrarResumen(){
    let filas = "";
    for(var i = 0; i<datos.length; i+=4){
        var elemento = datos[i];
        if(true){
            console.log(elemento);
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
    $("#filasProductos").html(filas);
}

