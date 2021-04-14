## Marvel Challenge Backend

### :information_source: Sobre
API de Geranciamento de Usuário construída em NodeJS utilizando Typescript, Typeorm, autenticação de token JWT e banco de dados MySql. Permite realizar o CRUD dos dados do usuário e o controle dos Personagens e Comics por ele favoritados.

Exemplo dos Models

***users***
id                  | name        | email               | password
------------------  | ------------| --------------------| ----------
1                   | admin       | admin@admin.com.br  | asd123


***favorites_characters***
id                  | userId        | characterId     | name        | thumbPath   | thumbExt
------------------  | --------------| ----------------| ------------| ------------| -------------
59                  | 1             | 1009268         | Deadpool    | 'http://marvel/i/img/9/0533' | jpg


***favorites_comics***
id                  | userId        | comicId     | name        | thumbPath   | thumbExt
------------------  | --------------| ----------------| ------------| ------------| -------------
65                  | 1             | 22506         | Avengers    | 'http://prod/marvel/i/img/7/1265' | jpg


### :gear: Instalações
```
## Clone este repositório
$ git clone https://github.com/orlando-messias/marvel-challenge-backend.git

## Instale todas as dependências
$ npm install

## Inicialize o projeto
$ npm start

```

A API utiliza a porta **3001**.

### :hammer_and_wrench: Tecnologias
- [NodeJS](https://nodejs.org/en)
- [Express](https://expressjs.com)
- [JWT](https://jwt.io/)
- [Typeorm](https://typeorm.io/)
- [MySql](https://www.mysql.com/)


#
> Developed by Orlando Messias [linkedin.com/in/orlando-messias-dev](https://www.linkedin.com/in/orlando-messias-dev)

