# teste-backend

## Description

Api de sistema para o gerenciamento de registros de Ponto dos colaboradores de uma empresa.

System API for the management of time records of employees of a company.

## Prerequisites

Você precisará do Docker. Então se não tiver o Docker clique [Aqui](https://docs.docker.com/install/) e instale-o.
Com o Docker instalado, clone este repositório e abra-o. No terminal:

You will need Docker. So if don't have Docker click [Here](https://docs.docker.com/install/) and install it.
With Docker installed, clone this repository and open it. In terminal type:

```bash
# installation database
docker-compose up

```

Para adicionar usuário administrador e alguns mocks de filmes

To add Admin User:

```bash
# run seed
$ yarn db:run
```

## Running the Tests

```bash
# unit tests
$ yarn run test or npm run test

```

### Built With

As seguintes ferramentas foram utilizadas na construção do projeto:

The following tools were used in building the project:

- [NestJs](https://nestjs.com/) - The framework NestJs used {exp 3 anos}
- [TypeScript](https://www.typescriptlang.org/) - The TypeScript used {exp 3 anos}
- [TypeOrm](https://typeorm.io/) - The TypeOrm used {exp 3 anos}
- [PostgreSQL](https://www.postgresql.org/) - The database Postegres used {exp 3 anos}
- [Redis](https://redis.io/) - The database cache used Redis {exp 2 anos}
- [BcryptJs](https://www.npmjs.com/package/bcryptjs) - The cryptography Bcrypt used
- [Swagger](https://swagger.io/) - The swagger used
- [Jwt](https://jwt.io/) - The JSON Web Tokens used
- [Docker](https://www.docker.com/) - The Docker used {exp 3 anos}
