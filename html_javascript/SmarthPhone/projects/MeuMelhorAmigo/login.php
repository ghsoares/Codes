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
    <link rel="stylesheet" type="text/css" href="../css/login.css">
    <script src="../js/live.js"></script>
    <script src="../js/jquery-3.4.1.js"></script>
    <script src="../js/tab.js"></script>
    <script src="../js/cookie.js"></script>
    <script src="../js/login.js"></script>
</head>

<body onload="ready()">
    <div id="register-container">
        <h1 id="title"> SIGN IN </h1>
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
        <form action="php/login.php" method="POST">
            <input spellcheck="false" type="text" placeholder="Nick-Name" name="NickName">
            <input spellcheck="false" type="password" placeholder="Password" name="Password">
            <input type="submit" value="LOGIN">
        </form>
    </div>
    <button id="redirect" onclick="window.location.href = 'register.php'">
        I don't have an account
    </button>
</body>

</html>