import datos from '../json/DailyForecast_MX.json' assert {type: 'json'};
$(document).ready(()=>{
    
    let filas = "";

    for(var i = 0; i < 5 || i<datos.length; i++){
        var elemento = datos[i];
        
        if(elemento.nes == 'Baja California Sur'){
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
    //console.log(filas);
    $("#filasProductos").html(filas);
    $(".materialboxed").materialbox();
});