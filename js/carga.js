import datos from '../json/DailyForecast_MX.json' assert {type: 'json'};

for(var i = 0; i < 5 && i<datos.length; i++){
    var elemento = datos[i];
    console.log(elemento);
}