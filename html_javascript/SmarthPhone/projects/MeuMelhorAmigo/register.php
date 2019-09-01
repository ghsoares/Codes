<?php
    session_start();
    /* Vai checar se já está autenticado */
    if(isset($_SESSION['usuario'])) {
        header('Location: index.php');
        exit();
    }
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="../fonts/bottom-navbar-buttons/style.css">
    <link rel="stylesheet" type="text/css" href="../css/tab.css">
    <link rel="stylesheet" type="text/css" href="../css/register.css">
    <script src="../js/live.js"></script>
    <script src="../js/jquery-3.4.1.js"></script>
    <script src="../js/tab.js"></script>
    <script src="../js/cookie.js"></script>
    <script src="../js/register.js"></script>
</head>

<body onload="ready()">
    <div id="register-container">
        <h1 id="title"> SIGN UP </h1>
        <?php
            if(isset($_SESSION['log_status'])):
        ?>
        <h1 id="log-status">
            <?php echo $_SESSION['log_status'] ?>
        </h1>
        <?php
            endif;
            unset($_SESSION['log_status']);
        ?>
        <form action="php/register.php" method="POST">
            <input spellcheck="false" type="text" placeholder="Nick-Name" name="NickName">
            <input spellcheck="false" type="text" placeholder="Email" name="Email">
            <input spellcheck="false" type="password" placeholder="Password" name="Password">
            <input spellcheck="false" type="password" placeholder="Repeat Password" name="RepeatedPassword">
            <input type="submit" value="GET STARTED">
        </form>
    </div>
    <button id="redirect" onclick="window.location.href = 'login.php'">
        I already have an account
    </button>
</body>

</html>