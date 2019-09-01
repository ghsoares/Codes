<?php
    session_start();
?>
<!DOCTYPE html>

<html>

<head>
    <base target="_parent">
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="../fonts/bottom-navbar-buttons/style.css">
    <link rel="stylesheet" type="text/css" href="../css/tab.css">
    <link rel="stylesheet" type="text/css" href="../css/user.css">
    <script src="../js/live.js"></script>
    <script src="../js/jquery-3.4.1.js"></script>
    <script src="../js/tab.js"></script>
    <script src="../js/cookie.js"></script>
    <script src="../js/user.js"></script>
</head>

<body onload="ready()">
    <div id="profile-container">
        <div id="profile-image-container">
            <img id="profile-image" src=<?php echo $_SESSION['usuario_values']->imagem_perfil ?>/>
            <img id="edit" src="https://static.thenounproject.com/png/120704-200.png"/>
        </div>
        <h1 id="profile-name">
            <?php echo $_SESSION['usuario_values']->nome_usuario ?>
        </h1>
        <div id="posts-grid-container">
            <?php include("../php/retrieveposts.php") ?>
        </div>
    </div>
</body>

</html>