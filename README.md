# 🎮 PokeNext

> Uma Pokédex moderna construída com **Next.js** e a **PokéAPI**, listando os 151 Pokémons da primeira geração com detalhes completos de cada um.

---

## Sobre o Projeto

O **PokeNext** é uma aplicação web que consome a [PokéAPI](https://pokeapi.co/) para exibir informações sobre os 151 Pokémons originais. O projeto foi desenvolvido como introdução ao **Next.js**, explorando recursos como geração estática de páginas (SSG), roteamento dinâmico e otimização de imagens.

---

## Tecnologias

| Tecnologia                     | Uso                                   |
| ------------------------------ | ------------------------------------- |
| [Next.js](https://nextjs.org/) | Framework React com SSG e roteamento  |
| [React](https://reactjs.org/)  | Biblioteca de interface               |
| [PokéAPI](https://pokeapi.co/) | Fonte de dados dos Pokémons           |
| CSS Modules                    | Estilização com escopo por componente |
| `next/image`                   | Otimização automática de imagens      |
| `next/link`                    | Navegação client-side                 |

---

## Funcionalidades

- ✅ Listagem dos 151 Pokémons da 1ª geração
- ✅ Cards com sprite, número e nome de cada Pokémon
- ✅ Página de detalhes com tipo, altura e peso
- ✅ Badges coloridos por tipo de Pokémon
- ✅ Geração estática de todas as páginas no build (SSG)
- ✅ Layout consistente com Navbar e Footer em todas as páginas
- ✅ Imagens otimizadas com o componente `next/image`
- ✅ Navegação client-side com `next/link`

---

## Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v14 ou superior
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pokenext.git

# Acesse a pasta do projeto
cd pokenext

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Build para produção

```bash
# Gera as páginas estáticas
npm run build

# Inicia o servidor de produção
npm start
```

> **Nota:** Durante o `build`, o Next.js busca os dados da PokéAPI e gera estaticamente todas as **153 páginas** (1 home + 1 about + 151 páginas de Pokémons).

---

## Estrutura de Pastas

```
pokenext/
│
├── components/
│   ├── Card.js
│   ├── Footer.js
│   ├── Layout.js
│   └── Navbar.js
│
├── pages/
│   ├── _app.js
│   ├── index.js
│   ├── about.js
│   └── pokemon/
│       └── [pokemonId].js
│
├── public/
│   └── images/
│
└── styles/
```

Para documentação técnica detalhada, consulte [DOCUMENTATION.md](./DOCUMENTATION.md).

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ usando [Next.js](https://nextjs.org/) e [PokéAPI](https://pokeapi.co/)
