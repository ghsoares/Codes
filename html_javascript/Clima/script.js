//chave do api OpenWeatherMap
var APPID = '817edc3a3d0710414e7a6e05d9499bfc'

//url
var url = createUrl(APPID, 'São Paulo')

//manda um request sobre o clima
httpRequestAsync(url, weather)

//recebe as informações do clima
function weather(data) {
    //a data é recebido em um arquivo JSON, é preciso transformar em um objeto
    let jsonObject = JSON.parse(data);

    //converte fahrenheit em celcius

    //temperatura atual
    let currentTemperature = jsonObject['main']['temp']
    
}

//cria o url
function createUrl(appId, city) {
    return 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + String(appId);
}

//manda um request
function httpRequestAsync(url, callback) {
    //nova requisição http
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}