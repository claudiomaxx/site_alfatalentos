<?php
$retorno = array(
    'usuario' => array(
        'nome' => "Claudio Antonio Silva Santos",
        'email' => "claudio@solee.com.br",
        'dataNascimento' =>  "09/02/1987",
        'sexo' =>  "M",
        'estadoCivil' => array('codigo' => 2, 'descricao' => "Casado(a)"),
        'filhos' => '1',
        'habilitacao' =>  "AB",
        'fumante' =>  "N",
        'veiculo' =>  "S",
        'pretensaoSalarial' =>  "10.000,00",
        'estado' =>  "DF",
        'cidade' =>  "Brasília",
        'endereco' =>  "Rua 24 Norte",
        'complemento' =>  "LT 9/11",
        'bairro' =>  "Águas Claras",
        'cep' =>  "71916-750",
        'telefoneResidencial' =>  "61 3254 0699",
        'telefoneComercial' =>  "61 81570669",
        'telefoneCelular' =>  "61 91090039"
    )
);

/*
$retorno = array(
    'mensagem' => 'Usuário não encontrado.'
);
*/
echo json_encode($retorno);