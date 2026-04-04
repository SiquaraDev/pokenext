# 📚 Documentação Técnica — PokeNext

---

## Índice

- [Páginas e Rotas](#páginas-e-rotas)
- [Componentes](#componentes)
- [Estratégia de Renderização (SSG)](#estratégia-de-renderização-ssg)
- [Integração com a API](#integração-com-a-api)
- [Demonstração das Páginas](#demonstração-das-páginas)

---

## Páginas e Rotas

| Rota           | Arquivo                        | Descrição                          |
| -------------- | ------------------------------ | ---------------------------------- |
| `/`            | `pages/index.js`               | Home com grid de todos os Pokémons |
| `/about`       | `pages/about.js`               | Sobre o projeto                    |
| `/pokemon/:id` | `pages/pokemon/[pokemonId].js` | Detalhes de um Pokémon específico  |

A rota `/pokemon/:id` é **dinâmica** — o Next.js gera uma página estática para cada um dos 151 Pokémons durante o build, usando `getStaticPaths`.

---

## Componentes

### `<Layout>` — `components/Layout.js`

Wrapper global aplicado em todas as páginas via `pages/_app.js`. Inclui o `<Head>` com favicon e título, envolve o conteúdo com `<Navbar>` e `<Footer>`.

```jsx
// pages/_app.js
function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
```

**Props:**

| Prop       | Tipo        | Descrição                |
| ---------- | ----------- | ------------------------ |
| `children` | `ReactNode` | Conteúdo da página atual |

---

### `<Navbar>` — `components/Navbar.js`

Barra de navegação fixa no topo. Exibe o logo (ícone pokeball + texto "PokeNext") e os links de navegação para **Home** e **About**. Usa `next/link` para navegação client-side sem recarregar a página.

Sem props — componente estático.

---

### `<Card>` — `components/Card.js`

Card individual para cada Pokémon exibido na home. Carrega o sprite do repositório público do PokeAPI e exibe número, nome e um link para a página de detalhes.

```jsx
<Card pokemon={{ id: 25, name: "pikachu" }} />
```

**Props:**

| Prop           | Tipo     | Descrição                                                    |
| -------------- | -------- | ------------------------------------------------------------ |
| `pokemon.id`   | `number` | ID do Pokémon (usado na URL do sprite e no link de detalhes) |
| `pokemon.name` | `string` | Nome do Pokémon                                              |

**URL do sprite gerada internamente:**

```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png
```

---

### `<Footer>` — `components/Footer.js`

Rodapé simples com o nome do projeto e o ano atual. O ano é calculado dinamicamente com `new Date().getFullYear()`, sem necessidade de atualização manual.

Sem props — componente estático.

---

## Estratégia de Renderização (SSG)

O projeto usa **Static Site Generation (SSG)** em todas as páginas com dados, via `getStaticProps` e `getStaticPaths`. Isso significa que todas as páginas são pré-renderizadas em HTML no momento do `build`, resultando em carregamento instantâneo e zero dependência da API em tempo de execução.

### `pages/index.js` — `getStaticProps`

Busca a lista dos 151 Pokémons e injeta como props da página.

```js
export async function getStaticProps() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
    const data = await res.json();

    // A API de listagem não retorna o ID — ele é inferido pelo índice
    data.results.forEach((item, index) => {
        item.id = index + 1;
    });

    return { props: { pokemons: data.results } };
}
```

### `pages/pokemon/[pokemonId].js` — `getStaticPaths` + `getStaticProps`

`getStaticPaths` define quais IDs devem ter páginas geradas (1 a 151). `getStaticProps` busca os dados completos de cada Pokémon pelo ID.

```js
export async function getStaticPaths() {
    // Gera paths para /pokemon/1, /pokemon/2, ..., /pokemon/151
    const paths = Array.from({ length: 151 }, (_, i) => ({
        params: { pokemonId: (i + 1).toString() },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`,
    );
    const data = await res.json();
    return { props: { pokemon: data } };
}
```

`fallback: false` faz com que qualquer rota fora do intervalo 1–151 retorne uma página 404.

---

## Integração com a API

O projeto consome dois endpoints da [PokéAPI v2](https://pokeapi.co/):

### Endpoint 1 — Listagem

```
GET https://pokeapi.co/api/v2/pokemon/?limit=151
```

Usado em `getStaticProps` da home. Retorna um array `results` com `name` e `url` de cada Pokémon. O campo `id` **não é retornado** neste endpoint — ele é calculado a partir do índice do array (`index + 1`).

**Resposta (simplificada):**

```json
{
    "results": [
        { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
        { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" }
    ]
}
```

---

### Endpoint 2 — Detalhes

```
GET https://pokeapi.co/api/v2/pokemon/{id}
```

Usado em `getStaticProps` da página de detalhes. Retorna o objeto completo do Pokémon.

**Campos utilizados pelo projeto:**

| Campo    | Tipo     | Uso                                                |
| -------- | -------- | -------------------------------------------------- |
| `id`     | `number` | Número da Pokédex e URL do sprite                  |
| `name`   | `string` | Nome exibido na página                             |
| `types`  | `array`  | Badges de tipo (`item.type.name`)                  |
| `height` | `number` | Altura em decímetros — convertida para cm (`× 10`) |
| `weight` | `number` | Peso em hectogramas — convertido para kg (`÷ 10`)  |

**Resposta (simplificada):**

```json
{
    "id": 25,
    "name": "pikachu",
    "height": 4,
    "weight": 60,
    "types": [{ "slot": 1, "type": { "name": "electric", "url": "..." } }]
}
```

---

### Sprites (Imagens)

Os sprites são servidos pelo repositório público do PokeAPI no GitHub — sem autenticação ou rate limit:

```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png
```

Exemplos:

- Pikachu (#25): `.../pokemon/25.png`
- Charizard (#6): `.../pokemon/6.png`

---

## Demonstração das Páginas

### 🏠 Home — `/`

Grid com todos os 151 Pokémons. Cada card exibe sprite, número e nome, e contém um link para a página de detalhes.

```
/
└── Grid de cards
    ├── Sprite (120×120)
    ├── #001 — bulbasaur
    └── Botão "Detalhes" → /pokemon/1
```

### 🔍 Detalhes — `/pokemon/:id`

Página individual com todas as informações do Pokémon.

```
/pokemon/25
├── Nome: pikachu
├── Sprite (200×200)
├── Número: #25
├── Tipo: electric  ← badge colorido
├── Altura: 40 cm
└── Peso: 6 kg
```

### ℹ️ About — `/about`

Página estática com descrição do projeto e imagem do Charizard. Não consome nenhuma API.
