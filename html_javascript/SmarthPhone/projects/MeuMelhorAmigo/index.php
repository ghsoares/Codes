<?php
    session_start();
    include("php/getuservalues.php");
    
    if(!$_SESSION['usuario']) {
        header('Location: login.php');
        exit();
    }
?>
<!DOCTYPE html>

<html>

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="fonts/bottom-navbar-buttons/style.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script src="js/live.js"></script>
    <script src="js/jquery-3.4.1.js"></script>
    <script src="js/tab.js"></script>
    <script src="js/cookie.js"></script>
    <script src="js/script.js"></script>
</head>

<body onload="ready()">
    <div id="main">
        <div id="app-main">
            <iframe id="page" src="">

            </iframe>
        </div>
        <div id="viewport">
            <div id="viewport-center">
                <div id="alert">
                    <h1 id="alert-title"> title </h1>
                    <p id="alert-text"> text </p>
                </div>
                <div id="loading">
                    <svg id="loading-svg" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 33.867 33.867">
                        <path d="M25.718 25.014c-1.505-2.013-3.513-2.22-4.56-2.253-1.586-.05-2.108-.007-4.225-.007-3.175 0-5.82-2.606-5.82-5.821a5.82 5.82 0 0 1 5.82-5.82c2.117 0 2.647.048 4.234 0 1.046-.034 3.054-.24 4.559-2.255m3.907 8.075a12.7 12.7 0 0 1-12.7 12.7 12.7 12.7 0 0 1-12.7-12.7 12.7 12.7 0 0 1 12.7-12.7 12.7 12.7 0 0 1 12.7 12.7z" fill="none" stroke="#fff" stroke-width="4.0" stroke-opacity=".566"/>
                        <path d="M25.718 25.014c-1.505-2.013-3.513-2.22-4.56-2.253-1.586-.05-2.108-.007-4.225-.007-3.175 0-5.82-2.606-5.82-5.821a5.82 5.82 0 0 1 5.82-5.82c2.117 0 2.647.048 4.234 0 1.046-.034 3.054-.24 4.559-2.255m3.907 8.075a12.7 12.7 0 0 1-12.7 12.7 12.7 12.7 0 0 1-12.7-12.7 12.7 12.7 0 0 1 12.7-12.7 12.7 12.7 0 0 1 12.7 12.7z" fill="none" stroke="#000" stroke-width="2.5" stroke-opacity=".566"/>
                    </svg>
                </div>
            </div>
            <div id="viewport-bottom">
                <ul id="bottom-navbar">
                    <li>
                        <button class="bottom-navbar-button" id="home-button">
                            <i class="icon-home"></i>
                        </button>
                    </li>
                    <li>
                        <button class="bottom-navbar-button" id="search-button">
                            <i class="icon-search"></i>
                        </button>
                    </li>
                    <li>
                        <button id="main-button">
                            <span></span>
                        </button>
                    </li>
                    <li>
                        <button class="bottom-navbar-button" id="like-button">
                            <i class="icon-like"></i>
                        </button>
                    </li>
                    <li>
                        <button class="active bottom-navbar-button" id="profile-button">
                            <i class="icon-profile"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</body>

</html>