<?php
    /* Inicia sessão */
    session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="css/index.css">
        <link rel="stylesheet" type="text/css" href="fonts/bottom-navbar-buttons/style.css">
        <script src="js/jquery-3.4.1.js"></script>
        <script src="js/animation.js"></script>
        <script src="js/index.js"></script>
    </head>
    <body onload="ready()">
        <div id="main">
            <div id="app">
                <ul id="tab-list">
                    <li>
                        <iframe class="tab" id="tab1"></iframe>
                    </li>
                    <li>
                        <iframe class="tab" id="tab2"></iframe>
                    </li>
                </ul>
            </div>
            <div id="fixed-ui">
                <div id="ui-bottom">
                    <ul id="bottom-navbar">
                        <li>
                            <button class="bottom-navbar-button" id="home-button">
                                <i class="icon-home"></i>
                            </button>
                        </li>
                        <li>
                            <div id="main-button-container">
                                <button id="main-button">
                                    <i class="icon-main_button"></i>
                                </button>
                            </div>
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