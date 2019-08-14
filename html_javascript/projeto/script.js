//pega todos as opções colapsáveis
var collapsables = document.getElementsByClassName("collapse");

//botões com link
var button_links = document.getElementsByClassName("link");

//função de redirecionamento
function redirect(event) {
    var target = event.path[0];
    var link = target.getAttribute("data-link");
    if (link) {
        window.location.replace(link);
    }
}

//função de expansão de uma opção
function expand(event) {
    var target = event.path[0].nextElementSibling;
    if (target.style.height) {
        target.style.height = null;
    } else {
        target.style.height = target.scrollHeight + "px";
    }
}

//passa por cada opção colapsável
for (option of collapsables) {
    var target = option.nextElementSibling;
    option.addEventListener("click", expand);
}



//passa por cada botão com link
for (b_link of button_links) {
    b_link.addEventListener("click", redirect);
}