<?php
$retorno = array(
    'usuario' => array(
        'nome' => "Claudio Antonio Silva Santos",
        'email' => "claudio@teste.com.br",
        'dataNascimento' =>  "01/02/2001",
        'sexo' =>  "M",
        'estadoCivil' => array('codigo' => 2, 'descricao' => "Casado(a)"),
        'filhos' => '1',
        'habilitacao' =>  "AB",
        'fumante' =>  "N",
        'veiculo' =>  "S",
        'pretensaoSalarial' =>  "10.000,00",
        'estado' =>  "DF",
        'cidade' =>  "Brasília",
        'endereco' =>  "Rua das Casas",
        'complemento' =>  "LT 125",
        'bairro' =>  "Águas do Norte",
        'cep' =>  "70999-001",
        'telefoneResidencial' =>  "61 33333333",
        'telefoneComercial' =>  "61 99999999",
        'telefoneCelular' =>  "61 90909090"
    )
);

/*
$retorno = array(
    'mensagem' => 'Usuário não encontrado.'
);
*/
echo json_encode($retorno);