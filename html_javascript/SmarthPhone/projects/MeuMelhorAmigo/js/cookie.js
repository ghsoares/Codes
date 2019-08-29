//salva um cookie
function setCookie(cname, cvalue, exdays=1) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = `${cname}=${cvalue};${expires}path=/`;
}

//pega um cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

//salva o estado atual do site
function saveState(tabname, target = null) {
    if (!target) {
        target = this;
    }
    localStorage.setItem(tabname, target.innerHTML);
}

//carrega o estado atual do site
function loadState(tabname) {
    let content = localStorage.getItem(tabname);
    if (content) {
        return content;
    }
    return undefined;
}