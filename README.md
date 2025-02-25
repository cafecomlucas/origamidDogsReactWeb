# Dogs App | Vida de cachorro

Aplicação Front-End responsiva com ReactJS que utiliza a API da Origamid e simula um "Instagram para cachorros". A aplicação autentica, acessa rotas, lista/adiciona/remove postagens, adiciona comentários nas postagens e exibe gráficos dinâmicos.

![Demonstração - Faz login, adiciona/remove foto, exibe gráfico](.github/dogsweb.gif)

\_

---

# Links

- Acesso online: [dogsweb.vercel.app](https://dogsweb.vercel.app)

  > (obs: qualquer alteração via API é descartada a cada 10 minutos)

- Passo a passo documentado: [github.com/cafecomlucas/origamidDogsReactWeb/blob/main/\_steps.md](https://github.com/cafecomlucas/origamidDogsReactWeb/blob/main/_steps.md)

\_

---

# Usuário padrão

```
username: dog
password: dog
```

\_

---

# Objetivos

Aplicação desenvolvida para revisitar e colocar em prática conceitos de:

- Criação/Manutenção de SPA (Single Page Application);
- Lógica de Componentização e ciclo de vida;
- Autenticação/login via JWT e auto login;
- Roteamento no Front-end;
- Requisições REST para API externa;
- Listagem, adição e remoção de itens via API;
- Gerenciamento de estado (local/global);
- Exibição de gráficos de estatísticas;
- Criação de hooks próprios (custom Hooks).

\_

---

# Funcionalidades por rotas públicas (usuário deslogado)

### Rota: raiz - listagem

- **Acesso: [/](https://dogsweb.vercel.app/)**
  > Nessa tela é exibida a lista das fotos as visualizações de cada foto de todas as contas disponíveis. Ao acessar uma foto, um modal é exibido com mais detalhes.

### Rota: raiz - modal

- **Acesso: [/](https://dogsweb.vercel.app/)**
  > Ao abrir um modal são exibidos os detalhes como: autor do post, número de visualizações, nome do cachorro, peso, idade e comentários.

### Rota: detalhes da foto

- **Acesso: [/photo/:id](https://dogsweb.vercel.app/profile/cat)**
  > Nessa tela é exibido o mesmo conteúdo do modal, mas em uma página própria e com uma estilização diferente. Rota acessível via modal, ao clicar no título (nome do cachorro).

### Rota: perfil do autor

- **Acesso: [/profile/:author](https://dogsweb.vercel.app/profile/cat)**
  > Nessa tela é exibida uma página própria para listar apenas as fotos do autor clicado. Rota acessível via modal, ao clicar no nome do autor.

### Rota: Login

- **Acesso: [/login](https://dogsweb.vercel.app/login)**

  > Nessa tela é possível acessar a conta de usuário, acessar a tela de recuperação de senha ou a tela de cadastro. Rota acessível via no link de "Login" do lado direito do cabeçalho. Usuário/senha padrão: `dog`/`dog` (dados descartados a cada 10 minutos).

### Rota: Cadastre-se

- **Acesso: [/login/new-account](https://dogsweb.vercel.app/login/new-account)**
  > Nessa tela é possível digitar o nome de usuário, e-mail e senha para criação de um novo cadastro. Rota acessível via a tela inicial de Login (`/login`) ao clicar no link "Cadastre-se".

### Rota: Recuperar senha

- **Acesso: [/login/recovery-password](https://dogsweb.vercel.app/login/recovery-password)**
  > Nessa tela é possível digitar o nome de usuário (e-mail), que envia um e-mail de recuperação com o link para redefinição de senha. Rota acessível via a tela inicial de Login (`/login`) no link "Perdeu a senha? Recupere aqui".

### Rota: Redefinir senha

- **Acesso: [/login/reset-password](https://dogsweb.vercel.app/login/reset-password)**
  > Nessa tela é possível definir a nova senha. A chave (`key`) e o e-mail recebidos via query params permitem essa alteração. Rota acessível via e-mail que é recebido após preenchimento da tela de Recuperar Senha (`/login/recovery-password`).

### Rota: Página não encontrada (404)

- **Acesso: [/xyz](https://dogsweb.vercel.app/xzy)**
  > Tela padrão para páginas que não existem na aplicação.

\_

---

# Funcionalidades por rotas privadas (usuário logado)

### Rota: Minhas fotos

- **Acesso: [/account](https://dogsweb.vercel.app/account)**
  > Nessa tela é exibida uma página própria para listar apenas as fotos do usuário logado. É possível ver os detalhes de cada foto via modal. No modal é possível deletar a foto ou adicionar comentário. Rota acessível após o login e ao clicar no link com o nome do usuário do lado direito do cabeçalho.

### Rota: Minhas fotos

- **Acesso: [/account/new-photo](https://dogsweb.vercel.app/account/new-photo)**
  > Nessa tela é possível preencher o nome, idade, peso e imagem de um cachorro para postar na conta do usuário logado. Rota acessível via menu responsivo ao lado direito do título (link com sinal de "+").

### Rota: Estatísticas

- **Acesso: [/account/stats](https://dogsweb.vercel.app/account/stats)**
  > Nessa tela é possível ver gráfico com os dados dos posts, como o total de visualizações, os posts cadastrados e uma comparação dos posts mais acessados. Gráficos gerados via lib externa "Victory". Rota acessível via menu responsivo ao lado direito do título (link com ícone de gráfico).

### Outras rotas

- Se o usuário estiver logado também é possível acessar e comentar em qualquer foto de usuário.
