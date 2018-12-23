# Readable

Este projeto foi desenvolvido em React com Redux, consumindo uma API fornecida pela Udacity no Nanodegree Desenvolvedor React.

Após seguir todos os passos para a instalação e inicialização do projeto, você será capaz de criar postagens, comentar em todas as postagens disponíveis, gerenciar as postagens e comentários com as opções de voto negativo/positivo e também editar/excluir qualquer conteúdo.

- Este projeto foi criado com [Create React App](https://github.com/facebook/create-react-app).
- Foi utilizado [yarn](https://yarnpkg.com/pt-BR/) para gerenciar as dependências e rodar o projeto. Fique à vontade para utilizar o `npm`.


## Servidor

Esta API foi disponibilizada pela equipe da Udacity, sendo indispensável para rodar o projeto Readable.

No terminal, acesse o diretório do projeto `readable-app` e siga os passos abaixo:

`cd api-server`
`yarn install`
`yarn start`

Para mais informações sobre esta API  [acesse](https://github.com/udacity/reactnd-project-readable-starter).

## Instalando as dependências

Agora abra outro terminal e acesse o projeto `readable-app`.

No diretório do projeto, rode o comando `npm` ou `yarn` para instalar todas as dependências necessárias:

`yarn install`

## Iniciando o projeto

Ainda no diretório do projeto, rode o comando `npm` ou `yarn` para iniciar:

```yarn start```

Neste momento, o projeto deverá abrir na url: [http://localhost:3000](http://localhost:3000)

## Pacotes adicionais

`@material-ui/core`
`react-animated-css`
`react-icons`
`react-loader-spinner`
`react-markdown`
`react-redux-loading-bar`
`react-social-sharing`

## Novas funcionalidades

- Filtro adicional de posts ordenando por comentários (crescente e decrescente para todos os filtros);
- Compartilhamento de posts nas redes sociais FaceBook e Tweeter;
- Validação nos formulários `<FormPost />` e `<FormComment />` para cadastro e edição, onde exibe uma mensagem com `Snackbar` do pacote `@material-ui/core` quando algum campo de texto não é preenchido;
- Markdown do pacote `react-markdown` para escrever o body dos posts com estilo.
