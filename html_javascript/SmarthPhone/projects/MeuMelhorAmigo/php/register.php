<?php
session_start();
/* Inclui o arquivo responsável pela conexão */
include('conexao.php');

/* Caso algum campo do form estiver vazio */
if(empty($_POST['NickName'])) {
    header('Location: ../register.php');
    $_SESSION['log_status'] = 'O Campo NickName está vazio';
    exit();
}
if(empty($_POST['Email'])) {
    header('Location: ../register.php');
    $_SESSION['log_status'] = 'O Campo Email está vazio';
    exit();
}
if(empty($_POST['Password'])) {
    header('Location: ../register.php');
    $_SESSION['log_status'] = 'O Campo Password está vazio';
    exit();
}
if(empty($_POST['RepeatedPassword'])) {
    header('Location: ../register.php');
    $_SESSION['log_status'] = 'O Campo Repeat Password está vazio';
    exit();
}

/* Valores do form */
$nickname = mysqli_real_escape_string($conexao, $_POST['NickName']);
$email = mysqli_real_escape_string($conexao, $_POST['Email']);
$senha1 = mysqli_real_escape_string($conexao, $_POST['Password']);
$senha2 = mysqli_real_escape_string($conexao, $_POST['RepeatedPassword']);

/* Caso já tenha um nickname ou email igual no banco de dados */
$query = "select * from usuario where nome = '{$nickname}' or email = '{$email}'";
$result = mysqli_query($conexao, $query);
if(mysqli_num_rows($result) != 0) {
    header('Location: ../register.php');
    $_SESSION['log_status'] = 'O Nickname ou email já exite(m)';
    exit();
}

/* Verifica se a senha1 é igual a senha2 */
if ($senha1 != $senha2) {
    header('Location: ../register.php');
    $_SESSION['log_status'] = 'As senhas não correspondem';
    exit();
}

/* Comando de query usado pelo banco de dados */
$query = "insert into usuario (nome, email, senha) values ('{$nickname}', '{$email}', md5('{$senha1}'))";

/* Insere no banco de dados o query */
if(mysqli_query($conexao, $query)) {
    header('Location: ../index.php');
    $_SESSION['usuario'] = $nickname;
    exit();
} else {
    header('Location: ../register.php');
    $_SESSION['log_status'] = 'As senhas não correspondem';
    exit();
}