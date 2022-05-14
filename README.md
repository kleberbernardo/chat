# ChatHub

![GitHub repo size](https://img.shields.io/github/repo-size/kleberbernardo/README-template?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/kleberbernardo/README-template?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/kleberbernardo/README-template?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/kleberbernardo/README-template?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/kleberbernardo/README-template?style=for-the-badge)

<img src="https://github.com/kleberbernardo/chat/blob/main/public/assets/img/ilutration.png" alt="Chathub">

> Esse é um projeto de um Chat, chamado Chathub. Nele você coloca o seu usuário do Github e pode se comunicar em tempo real com outro Chat aberto.

> É um projeto focado e indicado para estudos e aperfeiçoamento nas tecnologias trabalhadas. Você também pode utilizar esse projeto para desenvolver aplicações reais, usando a mesma de base.

### :space_invader: Tecnologias utilizadas

Nesse projeto utilizei algumas tecnologias de base, são elas:

- [x] HTML 5
- [x] CSS 3
- [x] Tailwind CSS
- [x] Socket.IO
- [x] TypeScript
- [x] ZOD (TS Run Time)
- [x] Express
- [x] Code Style: Eslint (Airbnb) e Prettier

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- NodeJs instalado.
- Uma boa IDE. Recomendo VS CODE.

## 🚀 Instalando ChatHub

Para instalar o ChatHub siga estas etapas:

- Versione o projeto
- Após versionado, digite o comando abaixo no terminal, dentro da pasta raiz do projeto.

```
npm i
```

## ☕ Usando ChatHub

Para usar ChatHub, siga estas etapas:

- Digite o comando abaixo no terminal, dentro da pasta raiz para startar o servidor.

```
npm run dev:server
```

- Feito isso acesse hhtp://localhost:5500, e pode brincar com o projeto

## :flower_playing_cards: Alterando o projeto

Se você desejar alterar ou modificar o projeto em sua máquina, precisará também dos comandos abaixo:

- Para alterar as classes do Tailwind, precisa manter o compilador de pé. Faça isso com o comando abaixo.

```
npm run tw:build:w
```

- Para alterar o TypeScript do Front, precisa manter o compilador de pé. Faça isso com o comando abaixo.

```
npm run tsc:chat
```

- O projeto tem controle de padrão de código, com o Eslint. Para checar o padrão, digite o comando abaixo:

```
npm run code:style
```

- Para subir o servidor Socket.IO, e ficar escutando alterações no código utilize:

```
npm run dev:server:w
```

- Se desejar um comando único que já faz tudo isso e fica escutando alterações no código, digite:

```
npm run dev:server:start
```

Porém, o processo de codificação fica um pouco mais lento pela demora no restart automatico.

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

[⬆ Voltar ao topo](#nome-do-projeto)<br>
