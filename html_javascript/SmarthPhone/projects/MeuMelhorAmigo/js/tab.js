//tempo antes de esconder o alerta
var hideAlertTime;

//novo alerta
function alert(title, text, backgroundColor = "rgb(129, 255, 161)", textColor = "black") {
    //div do alerta
    var alert = top.document.getElementById("alert");
    
    //muda o título
    $(alert).find("#alert-title").html(title);

    //muda o texto
    $(alert).find("#alert-text").html(text);

    //caso já tenha um alerta a ser escondido
    if (hideAlertTime) {
        clearInterval(hideAlertTime);
    }

    //esconde o alerta com o tempo
    hideAlertTime = setInterval(hideAlert, 5*1000);

    //transform
    $(alert).css("transform", "translateY(1em)");
}

//esconde o alerta
function hideAlert() {
    //limpa o tempo antes de ser escondido
    clearInterval(hideAlertTime);

    //div do alerta
    var alert = top.document.getElementById("alert");

    //transform
    $(alert).css("transform", "translateY(-20em)");
}