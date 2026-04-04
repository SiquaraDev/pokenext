# 🎮 PokeNext

> Uma Pokédex moderna construída com **Next.js** e a **PokéAPI**, listando os 151 Pokémons da primeira geração com detalhes completos de cada um.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Demonstração](#demonstração)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Executar](#como-executar)
- [Páginas e Rotas](#páginas-e-rotas)
- [Componentes](#componentes)
- [Integração com a API](#integração-com-a-api)

---

## Sobre o Projeto

O **PokeNext** é uma aplicação web que consome a [PokéAPI](https://pokeapi.co/) para exibir informações sobre os 151 Pokémons originais. O projeto foi desenvolvido como introdução ao **Next.js**, explorando recursos como geração estática de páginas (SSG), roteamento dinâmico e otimização de imagens.

---

## Demonstração

### 🏠 Página Inicial — Lista de Pokémons

A home exibe cards com todos os 151 Pokémons da 1ª geração, cada um com imagem, número e nome.

```
/
└── Grid de cards com todos os 151 Pokémons
    ├── Imagem do sprite oficial
    ├── Número (#001, #002...)
    ├── Nome
    └── Botão "Detalhes" → navega para a página individual
```

### 🔍 Página de Detalhes — Pokémon Individual

Ao clicar em "Detalhes", o usuário é levado à página do Pokémon com informações completas.

```
/pokemon/[id]
├── Nome
├── Imagem (sprite oficial, 200x200)
├── Número de Pokédex
├── Tipo(s) — com badge colorido por tipo
├── Altura (em cm)
└── Peso (em kg)
```

### ℹ️ Página Sobre

Uma página simples descrevendo o projeto, com uma imagem do Charizard.

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

## Estrutura de Pastas

```
pokenext/
│
├── components/
│   ├── Card.js          # Card individual de cada Pokémon
│   ├── Footer.js        # Rodapé com ano dinâmico
│   ├── Layout.js        # Wrapper global (Navbar + main + Footer)
│   └── Navbar.js        # Barra de navegação com logo e links
│
├── pages/
│   ├── _app.js          # Componente raiz — aplica o Layout globalmente
│   ├── index.js         # Home — lista todos os Pokémons
│   ├── about.js         # Página "Sobre o Projeto"
│   └── pokemon/
│       └── [pokemonId].js  # Página dinâmica de detalhes do Pokémon
│
├── public/
│   ├── favicon.ico
│   └── images/
│       ├── pokeball.png
│       └── charizard.png
│
├── styles/
│   ├── globals.css
│   ├── Card.module.css
│   ├── Footer.module.css
│   ├── Home.module.css
│   ├── Navbar.module.css
│   ├── About.module.css
│   └── Pokemon.module.css
│
└── README.md
```

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

## Páginas e Rotas

| Rota           | Arquivo                        | Descrição                          |
| -------------- | ------------------------------ | ---------------------------------- |
| `/`            | `pages/index.js`               | Home com grid de todos os Pokémons |
| `/about`       | `pages/about.js`               | Sobre o projeto                    |
| `/pokemon/1`   | `pages/pokemon/[pokemonId].js` | Detalhes do Pokémon #1 (Bulbasaur) |
| `/pokemon/25`  | `pages/pokemon/[pokemonId].js` | Detalhes do Pokémon #25 (Pikachu)  |
| `/pokemon/151` | `pages/pokemon/[pokemonId].js` | Detalhes do Pokémon #151 (Mew)     |

---

## Componentes

### `<Layout>`

Envolve todas as páginas da aplicação. Aplicado globalmente via `_app.js`.

```jsx
<Layout>
    {/* Navbar */}
    <main>{children}</main>
    {/* Footer */}
</Layout>
```

### `<Navbar>`

Exibe o logo (pokeball + nome "PokeNext") e links para **Home** e **About**. Usa `next/link` para navegação sem recarregar a página.

### `<Card>`

Recebe um objeto `pokemon` como prop e exibe o sprite, número e nome. O botão "Detalhes" redireciona para `/pokemon/[id]`.

```jsx
<Card pokemon={{ id: 25, name: "pikachu" }} />
```

### `<Footer>`

Exibe o nome do projeto e o ano atual, calculado dinamicamente com `new Date().getFullYear()`.

---

## Integração com a API

O projeto utiliza dois endpoints da [PokéAPI](https://pokeapi.co/):

### 1. Listagem — `getStaticProps` em `index.js`

```
GET https://pokeapi.co/api/v2/pokemon/?limit=151
```

Retorna os 151 primeiros Pokémons. O `id` é inferido pelo índice do array, já que a API não retorna esse campo na listagem.

### 2. Detalhes — `getStaticProps` em `[pokemonId].js`

```
GET https://pokeapi.co/api/v2/pokemon/{id}
```

Retorna todos os dados do Pokémon: tipos, altura, peso, sprites, etc.

### Sprites (Imagens)

Os sprites são carregados diretamente do repositório público do PokeAPI no GitHub:

```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ usando [Next.js](https://nextjs.org/) e [PokéAPI](https://pokeapi.co/)
