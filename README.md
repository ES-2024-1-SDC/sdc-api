![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![AdonisJS](https://img.shields.io/badge/adonisjs-%23220052.svg?style=for-the-badge&logo=adonisjs&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

# SDC API

API de um sistema de caronas desenvolvida em NodeJS, usando o framework AdonisJS, para a disciplina de Engenharia de Software II 2024.1 da Universidade Federal Fluminense.

## Estrutura do projeto

```
.
├── app/                          // contém código da aplicação
│   ├── controllers/
│   ├── exceptions/
│   ├── middleware/
│   └── models/
├── bin/
├── config/                       // contém os arquivos de configuração da aplicação
├── database/
│   └── migrations/               // contém o versionamento do banco de dados da aplicação
├── start/
│   ├── env.ts                    // valida e expôe as variáveis de ambiente para a aplicação
│   ├── kernel.ts
│   └── routes.ts                 // define os endpoints da aplicação
├── tests/
├── .editorconfig
├── .env                          // define as variáveis de ambiente da aplicação
├── .gitignore                    // arquivo gitignore
├── ace.js
├── adonisrc.ts
├── LICENSE
├── package.json                  // contém a configuração de dependencias do projeto
├── README.md                     // arquivo Readme
└── tsconfig.json                 // configuração das opções do compilador de TypeScript
```

## Instruções

### Primeiros passos

Após clonar o projeto, é necessário executar o comando `npm install` ou `npm i`.

### Executando o projeto

#### Servidor de desenvolvimento

Execute `node ace serve` para criação de um servidor local. O endereço do servidor criado será exibido no terminal (`http://localhost:3333/`).

#### Build

Execute `node ace build` para criar uma build do projeto. Os artefatos da build serão armazenados no diretório `build/`.

## Desenvolvimento

O repositório contem 5 branches principais:

+ main: contém a todo momento a versão estável do projeto. Branch da versão de produção.
+ stg: branch que contém as features em estágio de homologação. Normalmente contém funcionalidades que já passaram pelo QA e estão sendo avaliadas.
+ develop: branch que contém as features que estão sendo desenvolvidas. Normalmente esta branch contém funcionalidades inestáveis, porém deve-se ter muito cuidado ao criar os pull requests. A partir desta branch os pull requests só devem ser feitos tendo como destino a branch `test`.
+ hotfix: branch na qual serão corrigidos os bugs detectados na versão do sistema que está em produção. A partir desta branch os pull request só podem ser feito tendo como destino ao branch `master`.
+ test: branch que contém as versões candidatas à entrarem em homologação e estão sendo avaliadas pelo QA. A partir desta branch, os pull requests só devem ser feitos tendo como testin9o a branch `stg`.

Deve-se desenvolver sempre a partir de `develop`.

### Documentação da API

Para documentação da API é utilizado o Swagger (`http://localhost:3333/docs`)

### Code scaffolding

Execute `node ace make:controller|model|migration` para criar um novo controller, model ou migration. Esses scripts atualizam automaticamente os módulos de importação e dependências.

## Referências

[AdonisJS](https://docs.adonisjs.com/guides)

## Registro de alterações

### v0.0.0.alpha20241005

+ Versão inicial