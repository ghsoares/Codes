<?php
/* Inclui o arquivo responsável pela conexão */
include("conexao.php");

$query = "select * from posts where usuario_id = {$_SESSION['usuario_values']->usuario_id}";
$result = mysqli_query($conexao, $query);
$results = mysqli_fetch_all($result, MYSQLI_ASSOC);

/* passa por cada post */
foreach($results as $col => $row) {
    /* pega os caminhos */
    $paths = str_replace('[', '', $row['images_paths']);
    $paths = str_replace(']', '', $paths);
    $paths = explode(',', $paths);
    /* Novo div */
    print_r("<div class='post-item'>");
    /* Nova imagem */
    print_r("<img src={$paths[0]}/>");
    print_r("</div>");
}