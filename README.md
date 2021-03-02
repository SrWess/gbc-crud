<h1 align="center">
	Teste Avaliativo Grupo GBC
</h1>

## :rocket: Desenvolver um sistema que realiza cadastramento de médicos

Sistema tem que suportar seguintes operações:
- INSERT
- UPDATE
- SELECT
- SOFT DELETE

## :page_facing_up: Cadastro deve ser realizado da seguinte forma:
- Nome do Médico - *máximo 120 caracteres*
- CRM - *somente números e no formato (00.000.00)*
- Telefone Fixo
- Telefone Celular
- CEP *- Formatado (00000-000) => Ao cadastrar o Cep deve ser feita uma requisição via XHR para a api dos correios e retornar todos os dados de endereço do cliente.*
- Especialidade médica *(ao mínimo duas especialidades)*

## :rocket: Esse projeto foi desenvolvido com as seguintes tecnologias:
- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/) | [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [PostgreSQL](https://www.postgresql.org/)

\* Para mais detalhes, veja o <kbd>[package.json](./package.json)</kbd>

## :zap: Rodando o projeto

### Docker

Necessário ter o [Docker](https://www.docker.com/) instaldo em sua máquina. Após a instalação, rodar os seguintes comandos:

```bash
# Criação de um container para o Banco de Dados (PostgresSQL):
$ docker run --name gcb-postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Após executar os comandos acima, verificar se as imagens estão rodando no terminal:
$ docker ps

# Se não tiver rodando, utilize o comando para executar:
$ docker start gcb-postgres
```

### Executando

```bash
# Faça o clone do repositório
$ git clone https://github.com/SrWess/gbc-crud.git

# Entre na raiz do projeto e execute:
$ yarn install

# Ainda na raiz do projeto, rodar o comando:
$ yarn dev:server
```
## :notebook: Rotas API

Execute utilizando Insomnia:
## [![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=&uri=https://raw.githubusercontent.com/SrWess/gbc-crud/master/insomnia-crud.json)

> #### Rotas
> **Rota GET**: http://localhost:3333/ - Lista todos os médicos cadastrados no sistema, para pesquisa específca utiliza opção Query

> **Rota POST**: http://localhost:3333/doctors - Realiza cadastramento do médico enviando JSON com seguintes dados: name, crm,	landline, mobilePhone, zipCode, specialties

> **Rota PUT**: http://localhost:3333/doctors/:id - Faz alteração de uma ou mais informação do médico, necessário informar ID do médico

> **Rota DELETE**: http://localhost:3333/doctors/:id - Exclução do médico conforme ID informado


