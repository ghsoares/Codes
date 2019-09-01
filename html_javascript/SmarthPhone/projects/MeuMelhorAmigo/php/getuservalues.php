<?php
/* Inclui o arquivo responsável pela conexão */
include("conexao.php");

if(isset($_SESSION['usuario'])) {
    $query = "select usuario_id, nome_usuario, email, imagem_perfil from usuario where nome_usuario = '{$_SESSION['usuario']}'";
    $result = mysqli_query($conexao, $query);
    $result = mysqli_fetch_object($result);
    $_SESSION['usuario_values'] = $result;
}

