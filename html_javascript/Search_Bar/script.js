//inicia
function _ready() {
    //pega todos os botões
    var search_buttons = $(".search-button");

    //passa por cada botão
    for (button of search_buttons) {
        //ação do botão
        button.addEventListener("click", close_open);

        //pega altura
        var h = $(button).css("height");
        $(button).css("width", h);
    }
}

//função para calcular pixels
function calculate(a, b, func) {
    let a2 = a.replace("px", " ");
    let b2 = b.replace("px", " ");

    let result = func(a2, b2) + "px";

    return result;
}

//abre ou fecha 
function close_open(event) {
    //elemento que ativou o evento
    var target = event.path[0];

    //pega o elemento pai
    var parent = $(target).parent();

    //muda o tamanho
    if ($(parent).css("width") == "32px") {
        $(parent).css("width", "512px")
    } else {
        //pega o input
        var input = $(target).prev();

        //o texto atual
        var actual_text = $(input).val();

        //caso tenha algo para pesquisar
        if (actual_text) {
            //redireciona
            window.location = "https://www.google.com/search?q=" + actual_text;
        }
    }
}

