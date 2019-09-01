<?php
session_start();
/* Inclui o arquivo responsável pela conexão */
include('conexao.php');

/* Caso algum campo do form estiver vazio */
if(empty($_POST['NickName'])) {
    header('Location: ../login.php');
    $_SESSION['log_status'] = 'O campo Nickname está vazio';
    exit();
}
if(empty($_POST['Password'])) {
    header('Location: ../login.php');
    $_SESSION['log_status'] = 'O campo Password está vazio';
    exit();
}

/* Nickname e senha */
$nickname = mysqli_real_escape_string($conexao, $_POST['NickName']);
$senha = mysqli_real_escape_string($conexao, $_POST['Password']);

/* Comando de query usado pelo banco de dados */
$query = "select usuario_id, nome_usuario, email from usuario where nome_usuario = '{$nickname}' and senha = md5('${senha}')";

/* Resultado do query */
$result = mysqli_query($conexao, $query);

/* Para verificar se o login está correto, o número de colunas tem que ser igual a um */
$rows = mysqli_num_rows($result);
if($rows == 1) {
    header('Location: ../index.php');
    $_SESSION['usuario'] = $nickname;
    exit();
} else {
    header('Location: ../login.php');
    $_SESSION['log_status'] = 'O usuario e/ou senha está(ão) incorreto(s)';
    exit();
}