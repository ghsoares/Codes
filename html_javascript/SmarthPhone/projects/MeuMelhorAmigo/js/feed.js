//cria um novo post
function newPost() {
    //pega a lista de posts
    var post_list = $("#posts-list")[0];

    //novo elemento
    var post = document.createElement("div");

    //nova imagem de perfil
    var profile_img = document.createElement("img");

    //classe do elemento
    post.className = "post";
}

//quando tenta ver mais da descrição de um post
function readMore(btn) {
    //caminho do span dos três pontos (...)
    var dots = $(btn).prev().find(".dots")[0];

    //caminho do resto do texto
    var more = $(btn).prev().find(".more")[0];

    //o texto está escondido
    if (dots.style.display == "none") {
        dots.style.display = "inline";
        btn.innerHTML = "READ MORE";
        more.style.display = "none";
    } else {
        dots.style.display = "none";
        btn.innerHTML = "READ LESS";
        more.style.display = "inline";
    }
}