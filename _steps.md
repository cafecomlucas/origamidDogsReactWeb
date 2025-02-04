### Inicialização do projeto | GIT

Arquivo `README.md` criado, adicionado ao repositório e enviado ao GitHub:

```bash
echo "# origamidDogsReactWeb" >> README.md
git init
git branch -M main
git add .
git commit -m "Inicializa GIT"
git remote add origin git@github.com:cafecomlucas/origamidDogsReactWeb.git
git push -u origin main
```

---

### Criação da estrutura inicial | Vite

O NPM possui o cli onde é possível gerar um projeto automáticamente utilizando o Vite. O Vite é uma alternativa ao Webpack (com os loaders de CSS, imagens, etc), que utiliza ES modules, é mais pertormático e vem com o CSS modules pronto pra uso. Novo projeto criado e dependências instaladas:

```bash
npm create vite@latest .
npm install
```

---

### Estrutura inicial | Edição/Limpeza de arquivos

O arquivos padrão `index.html`/`index.jsx`/`App.jsx` foram limpos e os arquivos desnecessários foram removidos.

---

### Estrutura inicial | Criação de componentes/CSS

#### Primeiros arquivos de componentes

Os primeiros componentes foram criados na pasta `src/Components`. Arquivos:

```bash
./src/Components/Header.jsx
./src/Components/Home.jsx
./src/Components/Footer.jsx
```

#### Primeiros arquivos CSS

O CSS específicos dos componentes `Header` e `Footer` foram criados na pasta `src/Components` utilizando o CSS modules. Não foi necessário um arquivo CSS pro Componente `Home`. Arquivos:

```bash
./src/Components/Header.module.css
./src/Components/Footer.module.css
```

O CSS de uso global foi criado na pasta `src`. Arquivo:

```bash
./src/App.css
```

---

### Componente Login | Configuração do react-router-dom

O Componente `Login` foi criado com a estrutura inicial para poder exibir a página de login. Arquivo:

```bash
./src/Components/Login/Login.jsx
```

O pacote `react-router-dom` foi instalado para poder lidar com diferentes rotas no browser:

```bash
npm install react-router-dom
```

O Componente `App` foi alterado para utilizar o `react-router-dom` e mostrar o Componente `Home` na rota `/` e exibir o Componente `Login` na rota `/login`. Como os componentes `Header` e `Footer` se repetem em todas as páginas, a alteração foi feita para que apenas o "miolo" de cada página mude ao acessar cada rota.

No Componente `Header` foram incluídos links para as rotas das páginas `Home` e `Login`.

---

### Configuração do vite-plugin-svgr | Header: Componente e estilos

Para importação de imagens svg foi instalado o plugin svgr do Vite:

```bash
npm install vite-plugin-svgr
```

Após a instalação a configuração foi atualizada no arquivo `vite.config.js` e o Componente `src/Components/Header.jsx` foi atualizado com a importação de arquivo SVG.

Também foi definida a estilização específica do `Header` e foram feitos ajustes no CSS global.

---

### Configuração das rotas de Login | Correção na config de rotas no App

No Componente `Login` foram configuradas rotas internas (nested routes) e os arquivos iniciais para os componentes:

- logar/autenticação (`LoginForm`)
- criação de novo usuário (`LoginNewAccount`)
- recuperação da senha do usuário (`LoginRecoveryPassword`)
- reset da senha do usuário (`LoginResetPassword`)

Foi necessário modificar o Componente `App` para a rota de `login` aceitar as rotas internas.

Também foi feita uma correção no `App`. A configuração inicial das rotas estava utilizando a propriedade 'Component' e foi feito o ajuste para utilizar a propriedade 'element'.

---

### LoginForm | Obtendo o token da API

Foi criada a estrutura do Componente de autenticação com o nome de usuário (`username`) e senha (`password`) sendo enviados para API, que retorna o token de autenticação.

Dados para teste (já cadastrados na API):

- username: `dog`
- password: `dog`

---

### LoginForm | Componetizando e estilizando os itens do formulário

Os elementos `input` e `button` foram transformados em componentes para reutilização. Cada Componente foi criado com a própria estrutura e estilização.

Para os campos de formulário foram criados os arquivos:

- `...Components/Forms/Input.jsx`
- `...Components/Forms/Input.module.css`

Para os botões foram criados os os arquivos:

- `...Components/Forms/Button.jsx`
- `...Components/Forms/Button.module.css`

---

### LoginForm | useForm | Custom Hook pro estado dos inputs | Isolando a lógica

Os campos dos inputs `username` e `password` possuem a mesma lógica para modificar o próprio estado. Na função de callback para o onChange do input, o valor de `target.value` é resgatado e passado para o modificador do estado (`setUsername` ou `setPassword`).

Por possuirem a mesma lógica, é possível usar um custom Hook para evitar a replicação de modificadores do estado para cada input existente.

No novo custom Hook `useForm`, ao invés de `username` ou `password` foi criado um estado mais genérico chamado `value` e também o modificador `setValue`. Nesse custom Hook também foi criado também o método `onChange` que utiliza o `setValue` para modificar o próprio estado.

Dessa forma, na exportação do objeto do custom Hook `useForm` é necessário expor apenas o método `onChange`, que é passado diretamente para o callback onChange do input, sem precisar se preocupar com o modificador individual de cada estado (`setUsername` ou `setPassword`).

Então o modificador do estado ficou isolado dentro do custom Hook `useForm`, o que evita a passagem de um modificador diferente para cada função de callback do onChange do input.

Em outras palavras:

- a lógica do `setUsername` e `setPassword` foi isolada no `setValue`
- `setValue` não precisa ir "direto" pro callback onChange do input
- agora quem vai direto pro callback onChange do input é o onChange do `useForm`
- o onChange do `userForm` cuida da alteração de valor, sem precisar expor o próprio modificador (`setValue`)

---

### LoginForm | Custom Hook | Método para validação

No custom Hook `useForm` foi criado o método `validate`, que valida se o `value` do campo modificado possui algum valor preenchido. Esse método é utilizado em 3 situações:

- quando o usuário altera o campo (evento onChange)
- quando o usuário sai do campo (evento onBlur)
- quando o usuário tenta enviar o formulário (evento onSubmit)

#### No evento de callback `onChange`

O estado de `value` ainda é alterado ao final do método e a validação é precisa ser feita antes dessa alteração, por isso o valor utilizado para validação é o de target.value (o último valor do campo) por ser o mais atual que o estado de `value`.

#### No evento de callback `onBlur`

No evento `onBlur`: O valor utilizado para validação é o último valor do estado de `value`. O custom Hook `useForm` exporta o método com o nome `onBlur`, que chama o método interno `validate` e passa o `value` interno como parâmetro (assim não é necessário passar o value ao chamar o método `onBlur` externamente).A validação é feita através da chamada do método `onBlur` (sem precisar passar parâmetros) no disparo evento de callback `onBlur`.

#### No evento de callback `onSubmit`

O valor utilizado para validação é o último valor do estado de `value`. O custom Hook `useForm` exporta o método com o nome `validate`, que chama o método interno e passa o `value` interno como parâmetro (assim não é necessário passar o value ao chamar o método externamente). No Componente `LoginForm` a validação é feita através da chamada do método `validate` (sem precisar passar parâmetros) no disparo evento de callback `onSubmit.

---

### LoginForm | Isolando configs/lógica da API | TOKEN_POST

Antes de começar a utilizar outros endpoints da API os dados da API e a lógica das requisições foram isoladas no arquivo `api.jsx`, assim é possível manter os endpoints e as requisições em um só lugar.

O Componente `LoginForm` foi modificado para o utilizar o novo jeito de realizar uma requisição.

---

### LoginForm | Obtendo usuário | API | GET_USER

No arquivo `api.jsx` foi adicionado a config de um novo endpoint para obter o usuário. No Componente `LoginForm` o endpoint é chamado através do novo método `getUser` logo após o envio do formulário.

---

### ContextAPI | Config do estado global do usuário | Teste no Header

Como vai ser necessário verificar se o usuário está logado e acessar os dados dele em qualquer ponto da aplicação, o arquivo `UserContext` foi criado para configurar um estado global.

O Componente `App` foi modificado para que a aplicação inteira tenha acesso aos dados globais do usuário setados no contexto de `UserContext`.

O acesso ao estado global foi confirmado no Componente `Header` ao importar o contexto e exibir os dados globais de `user` no console.

---

### ContextAPI | Isolando a lógica de obtenção do token e do usuário

A lógica da obtenção to token e de obtenção do usuário foi movida para dentro do Componente `UserContextStorage`.

O Componente `UserContextStorage` disponibiliza o método global `userLogin`, que obtem o token e chama o método interno `getUser`, que faz a requisição para obtenção dos dados do usuário.

Com os dados do usuário dentro do Componente de contexto, foi possível setar os dados de usuário no estado global `userData`, ficando disponível para toda a aplicação.

Dessa forma as importações das configs da API foram movidas direto para o arquivo de contexto, não precisando mais estar dentro do Componente `LoginForm`.

---

### Header | Account | Nova rota para a página da conta do usuário

No Componente `Header` foi criado um link condicional que:

- envia para a rota `/login` se os dados do usuário não estiverem definidos (usuário deslogado)
- envia para a rota `/account` se os dados de usuário estiverem definidos (usuário logado)

Foi criada a estrutura inicial do Componente `Account`. O Componente `Account` foi associado a rota `/account` no Componente `App`.

---

### UserContext | LoginForm | Definindo se a aplicação está carregando

No Componente `UserContextStorage` foi criado o novo estado `isAppLoading` que guarda o status de carregamento da aplicação. O estado foi:

- setado para `true` quando o `userLogin` é chamado
- setado para `false` na última linha do `getUser`

O estado `isAppLoading` é disponibilizado pra toda a aplicação no retorno do Componente `UserContextStorage`.

O botão dentro do `LoginForm` usa o estado `isAppLoading` para exibir o botão habilitado ou desabilitado.

---

### UserContext (método userLogin) | Definindo se a aplicação está com erro

No Componente `UserContextStorage` foi criado o novo estado `appError` que guarda o status de erro da aplicação.

No método `userLogin` foi criado um try/catch para setar a mensagem de erro no `appError` caso a API retorne algum erro.

Se cair no erro, o catch seta a mensagem de erro no `appError`. Ao final do catch o estado de `isAppLoading` é setado para false.

O estado `appError` é disponibilizado pra toda a aplicação no retorno do Componente `UserContextStorage` para uso externo.

O Componente `LoginForm` usa o estado de `appError` para exibir a mensagem de erro, no caso dela existir.

Dessa forma, se existir algum erro ao executar o fetch para obter o token dentro do método `userLogin`, o processo é interrompido antes da chamada do método `getUser` (então a requisição para obter os dados do usuário é evitada).

---

### UserContext | Login | Definindo se o usuário está logado

No Componente `UserContextStorage` foi criado o novo estado `isUserLoggedIn` que guarda o status de usuário logado.

No Componente `Login` é verificado se o usuário está logado. Se estiver o usuário é redirecionado automaticamente para a página da conta dele (rota `/account`).

---

### UserContext | Header | Account | Deslogando o usuário

No Componente `UserContextStorage` foi criado o novo método `userLogout` que reseta todos os dados globais da aplicação. O método `userLogout` foi disponibilizado globalmente.

No Componente `Header` foi criado um botão de `sair` que ativa o método `userLogout` e reseta todos os dados.

Para evitar um erro na aplicação após os dados apagados, no Componente `Account` (rota `/account`) foi adicionada uma condição que verifica se o usuário ainda está logado (checando o estado global `isUserLoggedIn`). Se o usuário estiver deslogado ele é redirecionado para a página de Login.

---

### UserContext | API | Autologin ao entrar na aplicação

No Componente `UserContext`:

- o método `userLogin` foi alterado para guardar o token localmente assim que ele for criado.
- o método `userLogout` foi modificado para apagar o token ao deslogar um usuário.
- foi criado o novo método `autoLogin` que obtem o token local, caso exista e verificar se o token é válido através de uma nova chamada pra api. Se o token for válido, tenta obter o usuário. Se o token for inválido, faz o logout do usuário.

No arquivo `api` foi configurada a nova rota que faz a validação do token.

---

### Ajustes | UserContext (useCallback) | LoginForm (lógica de validação)

Ajuste feito no Componente `UserContextStorage` para utilização do `React.useCallback` em todos os métodos.

Ajuste feito no Componente `LoginForm` para validar corretamente o formulário no evento de envio.

---

### Login | Estilização padrão

Foi definido um novo arquivo CSS para o componente `Login`, setando os estilos padrões (e responsividade) para toda a área de login.

---

### LoginForm | LoginNewAccount | Página de nova conta

No Componente `LoginForm` foi criado um novo link pra página de nova conta. Também foram definidos novos estilos para exibição do bloco que contém o link. O estilo do botão de login foi reaproveitado no link de nova conta.

No Componente `LoginNewAccount` foi criada a estrutura dos campos de cadastro, reaproveitando o componente `Input` e o custom Hook `useForm`.

---

### Login | LoginForm | Ajuste nos estilos dos títulos/subtítulos

O estilo global dos estilos dos títulos foi ajustado no css do `App`. Também foi ajustado o estilo específico do subtítulo do `LoginForm`. Alguns estilos setados em elementos foram substituídos por estilos setados em classes.

---

### LoginForm | LoginNewAccount | Animação de transição de página

No `App.css` foi criada uma animação de transisção que acontece ao acessar uma página. A animação foi aplicada no Componente `LoginForm` e no Componente `LoginNewAccount` através da classe `animeLeft`.

---

### LoginNewAccount | useForm | Validando o e-mail no cadasro de conta

No custom Hook `useForm` foi criada uma nova regra pra validação de e-mail. Com essa modificação caso o parâmetro types esteja definido com o tipo `email`, um regex é utilizado para fazer a validação e retornar uma mensagem de erro se o e-mail não for válido.

No Componente `useForm` o novo parâmetro foi informado para o campo de e-mail para fazer essa validação.

---

### LoginNewAccount | API | Criando nova conta

No arquivo `api.jsx` foi adicionada uma nova rota pra criação de uma nova conta.

No Componente `LoginNewAccount` a validação foi incluída no `handleSubmit` e a nova rota é chamada passando os dados do formulário. Se o cadastro for bem sucedido o usuário é logado automaticamente. Também foram criados os estados de `loading` e `error` (que ainda vão ser otimizados).

---

### ErrorBox | Componente para exibir erros de requisição

Para exibir erros de requisição, o Componente `ErrorBox` foi criado junto com uma estilização global no `App.css`.

As áreas onde exibem esses erros foram modificadas nos componentes `LoginForm` e `LoginNewAccount`.

---

### useFetch | Custom Hook pro fetch | Isolando a lógica e o estado

Foi criado o arquivo `useFetch` para isolar a lógica de cada requisição.

Agora ao invés de criar um try/catch em cada local onde é feito uma requisição, essa parte foi movida pra dentro do `useFetch`. Fazendo isso foi possível remover o try/catch do componente `LoginNewAccount`.

Além disso, também foi possível mover os estados de `loading` e `error`, que agora são atualizados dentro do próprio custom Hook.

Com esse novo hook também é possível reutilizar a mesma lógica sem repetição de código em requisições que forem criadas no futuro.

---

### Refactory | UserContext | Aplicando useFetch no getUser

No componente `UserContextStorage` o método `getUser` foi modificado para utilizar o custom Hook `useFetch`. Nesse método ainda não existia um try/catch e nem precisou pois o custom Hook `useFetch` já possui essa lógica internamente.

---

### Refactory | UserContext | Aplicando useFetch no userLogin

No Componente `UserContextStorage` o método `userLogin` foi modificado para utilizar o custom Hook `useFetch`. O try/catch foi removido.

Os estados `isAppLoading` e `appError` também foram removidos por não serem mais necessários, já que agora o `useFetch` já possui esses dados internamente e disponibiliza no seu retorno.

Ao final do componente `UserContextStorage` os estados de loading e error ainda são retornados, mas agora utilizando os dados internos no `useFetch`.

---

### Refactory | UserContext | Aplicando useFetch no autoLogin

No Componente `UserContextStorage` o método `autoLogin` foi modificado para utilizar o custom Hook `useFetch`. O try/catch foi removido.

---

### Bugfix | LoginNewAccount | Botão saindo do 'Cadastrando...' antes do tempo

No componente `LoginNewAccount` ocorre 2 requests, um após o outro, o primeiro request tenta cadastrar o usuário e se o usuário for cadastrado com sucesso ocorre o segundo request. No segundo request é feito o login do usuário através do método `userLogin`.

Ocorre que como o 1º request está no nível do próprio componente `LoginNewAccount` e o 2º request ocorre internamente dentro do componente `UserContextStorage`, existem 2 loadings diferentes (um pro cadastro e outro pra autenticação no app).

Como só o loading do 1º request estava sendo verificado antes de exibir o botão, o botão "Cadastrar" acendia de novo logo após a conclusão da primeira request (antes do tempo).

Para corrigir isso foi necessário importar o estado o loading do `UserContextStorage` (`isAppLoading`) e adicionar a condição de exibição do botão "Cadastrando...".

---

### AppWrapper | Setando animação na opacidade do app ao autenticar

Foi criado o Componente utilitário `AppWrapper` que incluí a classe `isAppLoading` em uma div que engloba a aplicação inteira. Assim, sempre que o estado `isAppLoading` é aplicada uma estilização que anima a opacidade, indicando o carregamento de autenticação.

---

### Account | Estrutura inicial | Componentes das páginas | bugfix nas rotas

Foram criados Componentes e configuradas as rotas para cada tela da conta do usuário:

- `/account` que carrega o Feed de fotos (Componente `AccountPhotosFeed`)
- `/account/new-photo` que adiciona uma foto (Componente `AccountNewPhoto`)
- `/account/stats` que carrega as estatísticas (Componente `AccountStats`)

#### bugfix nas rotas:

Também foi necessário fazer um ajuste na lógica de verificação do usuario logado pois quando qualquer tela era acessada pela primeira vez, mesmo estando logado, ainda era feito o redirecionamento pra `/login`, para depois voltar para `/account`. Também ocorria esse problema ao acessar outra rota dentro de `/account` como `/account/new-photo`.

O estado que verifica se o usuário está logado (`isUserLoggedIn`) precisou ser alterado para ter o valor inicial `null`, que é quando qualquer tela é acessada pela primeira vez (ou quando é feito um refresh). No Componente `Account` é verificado especificamente se o `isUserLoggedIn` é `false` (quando é `false` é porque a aplicação já iniciou).

Se o estado `isUserLoggedIn` for `null` o Componente só renderiza a rota que foi acessada (sem nenhum dado carregado) até a conclusão automática do `autoLogin`.

---

### Account | Estrutura inicial | Componentizando o header (título + nav)

O cabeçalho das telas da conta do usuário seguem um padrão de título + navegação, por isso foi criado o novo Componente `AccountScreen` para isolar a parte padrão e deixar apenas o "miolo" que vai ser alterado para o corpo de cada tela.

Os Componentes de cada tela (`feed`, `new-photo`, `stats`) foram ajustados e ficaram bem enxutos, apenas com o conteúdo principal.

---

### Account | Estrutura inicial | Links de navegação

No novo componente `AccountHeaderNav` foi adicionada a estrutura, as imagens e os estilos dos links do menu interno da conta do usuário.

O botão para deslogar foi removido do Header da aplicação e adicionado no Header da conta do usuário

---

### Custom Hook useMedia | AccountHeaderNav | Menu alternativo

Foi criado o custom Hook `useMedia` que verifica determinado tamanho de tela via JavaScript e retorna o estado `mediaMatch` que indica se está ou não dentro do tamanho de tela informado na inicialização do deste hook.

Neste custom Hook é atribuida a função `checkMediaMatch` assim que o hook é inicializado (no `useEffect`) e essa atribuição é removida assim que o hook deixa de existir (no retorno do `useEffect`).

No Componente `AccountHeaderNav` foram adicionados textos condicionais para cada item de navegação, onde o texto só é exibido se estiver dentro do tamanho de tela definido no custom Hook `useMedia`. Ainda foi criada uma classe CSS específica que só é aplicada pro tamanho de tela definido.

---

### AccountHeaderNav | Menu alternativo | Botão que mostra/esconde

No Componente `AccountHeaderNav` foi criado a estrutura e a estilização de um botão de abertura (estilo hambúrguer) para mostrar ou esconder o menu. Esse novo botão só é exibido na página quando o critério do `mediaMatch` for atendido. Foi criado um novo estado chamado `menuTggOn`, que indica se o botão está ativado ou desativado.

Dessa forma:

Se o critério de `mediaMatch` for verdadeiro:

- O botão fica visível, e os links de navegação só ficam visíveis/ocultos ao clique do botão hambúrguer (estado de `menuTggOn`)

Se o critério de `mediaMatch` for falso:

- O botão fica oculto, e os links de navegação ficam sempre visíveis (o estado de `menuTggOn` não é considerado).

---

### AccountNewPhoto | Cadastro de nova foto | Estrutura inicial

Para o cadastro de uma nova foto, no Componente `AccountNewPhoto` foi criada a estrutura inicial com:

- os campos de formulário, utilizando o Componente `Input`
- o campo de envio de arquivo do tipo `file`
- o estilo do campo tipo `file`
- o botão de enviar, utilizando o Componente `Button`
- a validação inicial utilizando o custom Hook `useForm`
- o estilo do container geral

---

### AccountNewPhoto | Preview da foto escolhida

No Componente `AccountNewPhoto` foi criada uma div para mostrar o preview da foto escolhida.

Utilizando o método global `URL.createObjectURL` é setado um background com a imagem escolhida.

No CSS, para a div ocupar a altura total foi utilizado um macete no pseudo-elemento `after` com `padding-bottom: 100%`.

---

### AccountNewPhoto | custom Hook useFile | validação

Para lidar com os dados do arquivo de upload e com os dados de validação/erro foi criado o custom Hook `useFile` para isolar essa lógica (semelhante ao custom Hook `useForm`, só que para os dados dos campos de upload).

No Componente `AccountNewPhoto` foram feitos os ajustes:

- Utilização dos estados definidos no custom Hook `useFile`
- Método `handleChangeFile` / `onChange` do input file foi movido pra dentro do custom Hook
- Validação do input file incluída no envio do formulário (método `validate`)

---

### AccountNewPhoto | custom Hook useFile | ajuste na validação

O custom Hook `useFile` foi ajustado para a validação ocorrer não apenas no envio do formulário, mas também na alteração do campo pois o erro continuava em tela mesmo após a seleção do arquivo.

---

### AccountNewPhoto | Novo Componente InputFile

Foi criado o Componente `InputFile` para isolar a estrutura do envio de arquivos (semelhante ao `Input`, mas com o tipo específico `file`).

Dessa forma:

- O estado que vem do custom Hook `useFile` é passado diretamente para o Componente `InputFile` via desestruturação
- O Componente `AccountNewPhoto` ficou mais limpo

---
