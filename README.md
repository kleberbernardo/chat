# README

Projeto Chat - TailwindCSS + Express + Typescript + Socket.IO

## Start Local

Após versionar o projeto, digite o comando abaixo no terminal, dentro da pasta raiz (node_ws/) do projeto.

```bash
  npm i
```

Isso irá criar a pasta node_modules com os módulos do nodeJs.

## Subindo o servidor

Para subir o servidor em ambiente de desenvolvimento execute o comando abaixo no terminal, dentro da raiz do projeto.

```bash
  npm run dev:server
```

Já para rodar apontado para produção utilize:

```bash
  npm run prod:server
```

## Executando teste de code style

Para verificar se o código escrito está no padrão eslint, execute o comando no terminal:

```bash
  npm run code:style
```

## Subindo o servidor DEV com restart e checagem de code style automatico

Para não ter que ficar rodando na mão checagem de code style ou restartando o servidor sempre que alterar o código,
podemos utilizar o comando abaixo que já se encarrega que verificar se houve alterações no código e realizar o
restart e checagem automaticamente.

```bash
  npm run dev:server:start
```
