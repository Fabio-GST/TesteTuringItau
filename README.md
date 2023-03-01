# teste-turing

## teste-turing-api
Esta é uma API de usuários e transações, desenvolvida em typescript com Node.js, Express e SQLite. Ela permite a criação e gerenciamento de usuários e transações financeiras.


### Instalação
Para instalar a API, siga os passos abaixo:

Clone o repositório em sua máquina local:
```
https://github.com/Fabio-GST/TesteTuringItau
```
vá para o diretorio da api
```
cd ./teste-turing-api/
```
Instale as dependências do projeto utilizando o gerenciador de pacotes npm:
```
npm install
```

Inicie a API:
```
npm start
```
A API estará disponível na porta 8091 do localhost:

http://localhost:8091

## Endpoints

### Usuários
GET /usuario: Retorna uma lista de todos os usuários cadastrados.
GET /usuario/id : Retorna as informações de um usuário específico, com base no seu ID.
POST /usuario/autenticar: Permite que um usuário faça login na API, enviando seu e-mail e senha.
POST /usuario: Cria um novo usuário na API.
DELETE /usuario/":"id: Remove um usuário específico, com base no seu ID.
POST /usuario/saldo: Permite que um usuário altere seu saldo na API, enviando seu ID e o valor a ser adicionado ou subtraído.

### Transações
GET /transacao/id : Retorna uma lista de todas as transações de um usuário específico, com base no seu ID.
GET /transacao/extrato/id : Retorna um extrato de transações de um usuário específico, com base no seu ID.
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

## teste-turing-web
A aplicação teste-turing-web é uma interface web para consumo da API teste-turing-api. Ela foi desenvolvida em React  e permite que o usuário realize transferências financeiras entre os usuários cadastrados na API.

### Instalação
Para instalar a aplicação web, siga os passos abaixo:


Vá para o diretório da aplicação web:

```
cd ./teste-turing-web/
```

Instale as dependências do projeto utilizando o gerenciador de pacotes npm:

```
npm install
```

Inicie a aplicação:

```
npm start
```

A aplicação estará disponível na porta 3000 do localhost:

```
http://localhost:3000
```

### Utilização
Ao acessar a aplicação, será exibida a tela de login. O usuário deve informar seu login e senha cadastrados na API para ter acesso à aplicação.

Na tela principal da aplicação, é possível visualizar a lista de usuários cadastrados na API e seu respectivo saldo. Para realizar uma transferência, basta selecionar o usuário de origem, o usuário de destino e o valor a ser transferido.

Ao clicar no botão "Transferir", a aplicação realizará uma requisição à API para efetuar a transferência.

Além disso, é possível visualizar o extrato de transações do usuário logado. Será exibida uma lista das transações realizadas por aquele usuário, incluindo o valor, a data 
