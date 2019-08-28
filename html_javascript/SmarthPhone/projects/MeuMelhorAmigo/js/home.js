//chamado quando a página é carregada
function ready() {
    newPost(
        "https://www.flynz.co.nz/wp-content/uploads/profile-placeholder.png",
        "GDGameDev", [
            "https://developers.google.com/web/tools/chrome-devtools/remote-debugging/imgs/add-rule.png?hl=pt-br",
            "https://developers.google.com/web/tools/chrome-devtools/remote-debugging/imgs/add-rule.png?hl=pt-br",
            "https://icon-library.net/images/placeholder-image-icon/placeholder-image-icon-7.jpg"
        ],
        "Things intention like side perhaps thanks articles dog of flooding once expenses. Who text us successful members doctor's but so desk. Council’s again similar over hypnotised ask wish designed name. Psychiatrist middle fifteen profanities data."
    );
    newPost(
        "https://www.flynz.co.nz/wp-content/uploads/profile-placeholder.png",
        "GDGameDev", [
            "https://icon-library.net/images/placeholder-image-icon/placeholder-image-icon-7.jpg",
            "https://icon-library.net/images/placeholder-image-icon/placeholder-image-icon-7.jpg",
            "https://icon-library.net/images/placeholder-image-icon/placeholder-image-icon-7.jpg"
        ],
        "Things intention like side perhaps thanks articles dog of flooding once expenses. Who text us successful members doctor's but so desk. Council’s again similar over hypnotised ask wish designed name. Psychiatrist middle fifteen profanities data."
    );
}

//cria um novo post
function newPost(profile_image, profile_name, post_images_series, post_description_text) {
    //pega a lista de posts
    var post_list = $("#posts-list")[0];

    //novo div .post
    var post = document.createElement("div");
    post.classList.add("post"); //classe

    //novo div .post-top (filho do .post)
    var post_top = document.createElement("div");
    post_top.classList.add("post-top");

    //novo img .post-profile-img (filho do .post-top)
    var post_profile_image = document.createElement("img");
    post_profile_image.classList.add("post-profile-img");

    //imagem de perfil
    post_profile_image.src = profile_image;

    //novo h1 .post-profile-name (filho do .post-top)
    var post_profile_name = document.createElement("h1");
    post_profile_name.classList.add("post-profile-name");

    //nome
    post_profile_name.innerHTML = profile_name;

    //novo ul .post-images (filho do .post)
    var post_images = document.createElement("ul");
    post_images.classList.add("post-images");

    //passa por cada imagem
    for (image of post_images_series) {
        //novo li .post-image (filho do .post-images)
        var post_image = document.createElement("li");
        post_image.classList.add("post-image");

        //novo img (filho do .post-image)
        var img = document.createElement("img");
        img.style.background = "grey";

        //quando carregar
        img.onload = (ev) => {
            img = ev.path[0];
            img.style.background = "none";
        }

        //imagem
        img.src = image;

        //adiciona a imagem ao .post-image
        post_image.appendChild(img);

        //adiciona o .post-image ao .post-images
        post_images.appendChild(post_image);
    }

    //novo ul .post-options (filho do .post)
    var post_options = document.createElement("ul");
    post_options.classList.add("post-options");

    //novo li (filho do .post-options)
    var li1 = document.createElement("li");

    //novo botão .post-option .post-like (filho do li)
    var post_like = document.createElement("button");
    post_like.classList.add("post-option");
    post_like.classList.add("post-like");

    //novo ícone like
    var like_icon = document.createElement("i");
    like_icon.classList.add("icon-like");

    //novo li (filho do .post-options)
    var li2 = document.createElement("li");

    //novo botão .post-option .post-comment (filho do li)
    var post_comment = document.createElement("button");
    post_comment.classList.add("post-option");
    post_comment.classList.add("post-comment");

    //novo ícone comment
    var comment_icon = document.createElement("i");
    comment_icon.classList.add("icon-comment");

    //novo div .post-description (filho do .post)
    var post_description = document.createElement("div");
    post_description.classList.add("post-description");

    //novo p (filho do .post-description)
    var p = document.createElement("p");

    //novo button .post-read-more (filho do .post-description)
    var read_more = document.createElement("button");
    read_more.classList.add("post-read-more");

    //texto do botão
    read_more.innerHTML = "READ MORE"

    //muda a ação do clique do botão
    read_more.addEventListener("click", readMore);

    //analiza o tamanho do texto
    if (post_description_text.length > 64) {
        //divide o texto
        var before = post_description_text.slice(0, 64);
        var after = post_description_text.slice(64, post_description.length);

        //novo span .dots (filho do p)
        var dots = document.createElement("span");
        dots.classList.add("dots");
        dots.innerHTML = "..."

        //novo span .more (filho do p)
        var more = document.createElement("span");
        more.classList.add("more");

        //descrição antes
        p.innerHTML = before;

        //descrição depois
        more.innerHTML = after;

        //adiciona o .dots ao p 
        p.appendChild(dots);

        //adiciona o .more ao p
        p.appendChild(more);
    } else {
        //descrição
        p.innerHTML = post_description_text;
    }

    //adiciona o p ao .post-description
    post_description.appendChild(p);

    //adiciona o .post-read-more ao .post-description
    post_description.appendChild(read_more);

    //adiciona os icones like e comment aos respectivos botões
    post_like.appendChild(like_icon);
    post_comment.appendChild(comment_icon);

    //adiciona os botões aos respectivos lis
    li1.appendChild(post_like);
    li2.appendChild(post_comment);

    //adiciona os lis ao .post-options
    post_options.appendChild(li1);
    post_options.appendChild(li2);

    //adiciona o .post-profile-img ao .post-top
    post_top.appendChild(post_profile_image);

    //adiciona o .post-profile-name ao .post-top
    post_top.appendChild(post_profile_name);

    //adiciona o .post-top ao .post
    post.appendChild(post_top);

    //adiciona o .post-images ao .post
    post.appendChild(post_images);

    //adiciona o .post-options ao .post
    post.appendChild(post_options);

    //adiciona o .post-description ao .post
    post.appendChild(post_description);

    //adiciona o post á lista de posts
    post_list.appendChild(post);
}

//quando tenta ver mais da descrição de um post
function readMore(ev) {
    //pega o botão
    var btn = ev.target;

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