//chave do api OpenWeatherMap
var APPID = '817edc3a3d0710414e7a6e05d9499bfc';

//cidade
var CITY = 'São Paulo';

//url
var url = createUrl(APPID, CITY);

//elementos
var elements = {
    'temp': $('.temperature'),
};

//manda um request sobre o clima
httpRequestAsync(url, weather);

//recebe as informações do clima
function weather(data) {
    //a data é recebido em um arquivo JSON, é preciso transformar em um objeto
    let jsonObject = JSON.parse(data);

    //converte fahrenheit em celcius
    let fahrenheit2celcius = (fahrenheit) => {
        return Math.round(fahrenheit - 273.15);
    }

    //temperatura atual
    let currentTemperature = fahrenheit2celcius(jsonObject['main']['temp']);

    //muda o texto de temperatura
    elements.temp.html(String(currentTemperature) + '°');

}

//cria o url
function createUrl(appId, city) {
    //retorna o url com a cidade e a chave do api OpenWeatherMap
    return 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + String(appId);
}

//manda um request
function httpRequestAsync(url, callback) {
    return
    //nova requisição http
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

//pega o botão menu
var menu_button = $('.menu-button')[0];

//conteúdo do menu
var menu_content = $('.menu-content')[0];

//adiciona um evento
menu_button.addEventListener('click', (event) => {
    //animação
    menu_button.classList.toggle('menu-animation');
    menu_content.classList.toggle('menu-animation-content')
});