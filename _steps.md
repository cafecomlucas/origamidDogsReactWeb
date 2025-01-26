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
