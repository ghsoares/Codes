//pega todos os botões de aba
var tab_buttons;

//inicia com a página
function start() {
    tab_buttons = $(".tab-button");
    //passa por cada botão
    for (tab_button of tab_buttons) {
        //ação de pressionar o botão
        tab_button.addEventListener("click", function(event) {
            //pega o botão atual
            var active = $(".active")[0];

            //muda a classe
            active.classList.remove("active");

            //alvo
            var target = event.target;

            //muda a classe do alvo
            target.classList.add("active");
        });
    }
}