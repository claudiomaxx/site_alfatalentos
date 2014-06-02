<?php
/*
$user = json_decode(file_get_contents('php://input'));

//echo strstr($user->email, "@");

if($user->tipoCadastro == "") {
    echo "Tipo de cadastro não informado";

} else if($user->nome == "") {
    echo "Nome não informado";
    
} else if($user->email == "") {
    echo "Email não informado";
    
} else if(strstr($user->email, "@") == "" || strstr($user->email, ".") == "") {
    echo "Email inválido.";
    
} else if($user->senha == "") {
    echo "Senha não informada";
}
*/

echo json_encode(array('mensagem' => ''));