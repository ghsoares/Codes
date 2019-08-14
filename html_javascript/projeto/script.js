//pega todos as opções colapsáveis
var collapsables = document.getElementsByClassName("collapse");

//botões com link
var button_links = document.getElementsByClassName("link");

//passa por cada opção colapsável
for (option of collapsables) {
    option.addEventListener("click", () => {
        var target = option.nextElementSibling;
        if (target.style.height) {
            target.style.height = null;
        } else {
            target.style.height = target.scrollHeight + "px";
        }
    })
}

//passa por cada botão com link
for (b_link of button_links) {
    b_link.addEventListener("click", () => {
        var attribute = b_link.getAttribute("data-link");
        if (attribute) {
            window.location.replace(attribute);
        }
    })
}