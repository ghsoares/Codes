//iframe da página atual
var page_iframe;

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
    addLink($("#search-button")[0], "tabs/feed.html");
}

//pega os elementos da página
function getElements() {
    //pega o iframe da página
    page_iframe = $("#page")[0];

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

//adiciona um link para uma página
function addLink(button, page) {
    //ação ao clicar
    button.addEventListener("click", (e) => {
        //verifica o iframe já é ou não a página
        if (actual_page != page) {
            //muda a página do iframe
            page_iframe.src = page;

            //muda a página atual
            actual_page = page;
        }
    });
}