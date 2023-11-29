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
});


