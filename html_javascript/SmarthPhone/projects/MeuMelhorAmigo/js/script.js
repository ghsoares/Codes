//iframe da página atual
var page_iframe;

//div de carregamento
var loading_div;

//botões de abas
var tab_buttons;

//página atual
var actual_page = "";

//chama a função antes de iniciar a página
preload();

//antes de iniciar a página
function preload() {

}

//inicia com a página
function ready() {
    //pega os elementos
    getElements();

    //ação de cada botão
    tabButtonsEvents();

    //adiciona os links
    addLink(tab_buttons[0], "tabs/home.html");
    addLink(tab_buttons[3], "tabs/register.html");

    //quando o iframe carregar
    page_iframe.onload = loaded;
}

//pega os elementos da página
function getElements() {
    //pega o iframe da página
    page_iframe = $("#page")[0];

    //div de carregamento
    loading_div = $("#loading")[0];

    //pega os botões de abas
    tab_buttons = $(".bottom-navbar-button");
}

//ação de cada botão
function tabButtonsEvents() {
    //passa por cada botão
    for (button of tab_buttons) {
        //evento
        button.addEventListener("click", (e) => {
            //alvo
            var target = e.target;

            //passa por cada botão de novo
            for (button of tab_buttons) {
                button.classList.remove("active");
            }

            //adiciona o atual para a aba atual
            target.classList.add("active");
        })
    }
}

//uma página está carregando
function loading() {
    loading_div.style.transform = "translateY(10em) rotateZ(45deg)";
}

//uma página carregou
function loaded() {
    loading_div.style.transform = "translateY(-30em) rotateZ(45deg)";
}

//adiciona um link para uma página
function addLink(button, page) {
    //verifica se o botão é o atual
    if (button.classList.contains("active")) {
        //verifica o iframe já é ou não a página
        if (actual_page != page) {
            //carregamento
            loading();

            //muda a página do iframe
            page_iframe.src = page;

            //muda a página atual
            actual_page = page;
        }
    }

    //ação ao clicar
    button.addEventListener("click", (e) => {
        //verifica o iframe já é ou não a página
        if (actual_page != page) {
            //carregamento
            loading();

            //muda a página do iframe
            page_iframe.src = page;

            //muda a página atual
            actual_page = page;
        }
    });
}