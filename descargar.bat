@echo off
setlocal

set "url=https://smn.conagua.gob.mx/tools/GUI/webservices/index.php?method=1"

del .\json\DailyForecast_MX
curl -o ".\json\archivo.gz" %url%
7z x .\json\archivo.gz -o".\json"
del .\json\archivo.gz
del .\json\DailyForecast_MX.json

move ".\json\DailyForecast_MX" ".\json\DailyForecast_MX.json"

endlocal
