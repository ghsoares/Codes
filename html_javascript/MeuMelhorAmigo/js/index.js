/* Botões da página */
var buttons;

/* Iframes da página */
var iframes;

/* Tab atual */
var current_tab = 0;

/* Tabs do aplicativo */
const TABS = [
    "tabs/home.php",
    "tabs/user.php",
]

/* Chamado quando o body da página terminar de carregar */
function ready() {
    /* Pega os botões da página */
    buttons = $(".bottom-navbar-button");
    
    /* Pega os iframes da página */
    iframes = $(".tab");

    /* Passa por cada iframe e muda o src */
    for (let i = 0; i < iframes.length; i++) {
        iframes[i].src = TABS[i];
    }

    /* Passa por cada botão */
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            setCurrentTab(i);
        }
    }
}

/* Animação atual */
var current_animation;

/* Muda a tab atual */
function setCurrentTab(id) {
    if(current_tab != id) {
        current_tab = id;
        /* Alvo */
        var target = $("#tab-list");

        /* Animação */
        if (current_animation) {
            current_animation.stop_animation();
        }
        current_animation = new AnimationFunction(target, target.scrollLeft, target.scrollLeft(), 980 * id, 500);
    }
}