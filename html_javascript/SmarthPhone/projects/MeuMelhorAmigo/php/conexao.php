<?php
/* Constantes */
define('HOST', '127.0.0.1');
define('USUARIO', 'root');
define('SENHA', 'ifsp');
define('DB', 'mma');

/*cria conexão com o banco de dados*/
$conexao = mysqli_connect(HOST, USUARIO, SENHA, DB) or die ('Não foi possível conectar com o banco de dados');


