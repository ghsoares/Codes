//elemento do botão do menu
var options_buttons = document.getElementsByClassName("options-button");

//menu está aberto
var menu_open = false;

//passa por cada botão
for (button of options_buttons) {
    //novo escutador de evento
    button.addEventListener('click', (event) => {
        //alvo
        let target = $(event.path[0]).children().prevObject[0];

        //alvos
        let targets = [
            $(target).find('#b1'),
            $(target).find('#b2'),
            $(target).find('#b3')
        ]

        if (menu_open) {
            for (bar of targets) {
                $(bar).css("background-color", "white");
            }
        } else {
            for (bar of targets) {
                $(bar).css("background-color", "black");
            }
        }

        menu_open = !menu_open;
    })
}