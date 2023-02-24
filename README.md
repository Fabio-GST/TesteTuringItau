# teste-turing

## teste-turing-api
Esta é uma API de usuários e transações, desenvolvida em typescript com Node.js, Express e SQLite. Ela permite a criação e gerenciamento de usuários e transações financeiras.


### Instalação
Para instalar a API, siga os passos abaixo:

Clone o repositório em sua máquina local:
```
https://github.com/Fabio-GST/teste-turing
```
vá para o diretorio da api
```
cd ./teste-turing-api/
```
Instale as dependências do projeto utilizando o gerenciador de pacotes npm:

npm install


Inicie a API:

npm start

A API estará disponível na porta 8091 do localhost:

http://localhost:3000

## Endpoints

### Usuários
GET /usuario: Retorna uma lista de todos os usuários cadastrados.
GET /usuario/:id: Retorna as informações de um usuário específico, com base no seu ID.
POST /usuario/autenticar: Permite que um usuário faça login na API, enviando seu e-mail e senha.
POST /usuario: Cria um novo usuário na API.
DELETE /usuario/:id: Remove um usuário específico, com base no seu ID.
POST /usuario/saldo: Permite que um usuário altere seu saldo na API, enviando seu ID e o valor a ser adicionado ou subtraído.

### Transações
GET /transacao/:id: Retorna uma lista de todas as transações de um usuário específico, com base no seu ID.
GET /transacao/extrato/:id: Retorna um extrato de transações de um usuário específico, com base no seu ID.
POST /transacao: Cria uma nova transação financeira na API.
Exemplo de uso
Para criar um novo usuário, faça uma requisição POST para o endpoint /usuario, enviando as informações do usuário no corpo da requisição:

```
POST /usuario
{
    "nome": "Fulano",
    "login": "fulano@exemplo.com",
    "senha": "123456",
    "saldo": 50
}
```
