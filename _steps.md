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

O CSS específicos dos componentes `Header` e `Footer` foram criados na pasta `src/Components` utilizando o CSS modules. Não foi necessário um arquivo CSS pro componente `Home`. Arquivos:

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

No componente `Login` foram configuradas rotas internas (nested routes) e os arquivos iniciais para os componentes:

- logar/autenticação (`LoginForm`)
- criação de novo usuário (`LoginNewUser`)
- recuperação da senha do usuário (`LoginRecoveryPassword`)
- reset da senha do usuário (`LoginResetPassword`)

Foi necessário modificar o Componente `App` para a rota de `login` aceitar as rotas internas.

Também foi feita uma correção no `App`. A configuração inicial das rotas estava utilizando a propriedade 'Component' e foi feito o ajuste para utilizar a propriedade 'element'.

---

### LoginForm | Obtendo o token da API

Foi criada a estrutura do componente de autenticação com o nome de usuário (`username`) e senha (`password`) sendo enviados para API, que retorna o token de autenticação.

Dados para teste (já cadastrados na API):

- username: `dog`
- password: `dog`

---

### LoginForm | Componetizando e estilizando os itens do formulário

Os elementos `input` e `button` foram transformados em componentes para reutilização. Cada componente foi criado com a própria estrutura e estilização.

Para os campos de formulário foram criados os arquivos:

- `...Components/Forms/Input.jsx`
- `...Components/Forms/Input.module.css`

Para os botões foram criados os os arquivos:

- `...Components/Forms/Button.jsx`
- `...Components/Forms/Button.module.css`

---

### LoginForm | Custom Hook pro estado dos inputs | Isolando a lógica

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

O valor utilizado para validação é o último valor do estado de `value`. O custom Hook `useForm` exporta o método com o nome `validate`, que chama o método interno e passa o `value` interno como parâmetro (assim não é necessário passar o value ao chamar o método externamente). No componente `LoginForm` a validação é feita através da chamada do método `validate` (sem precisar passar parâmetros) no disparo evento de callback `onSubmit.
