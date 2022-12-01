import styles from '../../styles/Pokemon.module.css'

import Image from 'next/image'

export async function getStaticPaths() {
    const maxPokemons = 151
    const url = 'https://pokeapi.co/api/v2/pokemon'

    const res = await fetch(`${url}/?limit=${maxPokemons}`)
    const data = await res.json()

    const paths = data.results.map((pokemon, index) => {
        return {
            params: { pokemonId: (index + 1).toString() },
        }
    })

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const id = context.params.pokemonId
    const url = 'https://pokeapi.co/api/v2/pokemon'

    const res = await fetch(`${url}/${id}`)
    const data = await res.json()

    return {
        props: { pokemon: data },
    }
}

export default function Pokemon({ pokemon }) {

    const url = 'https://cdn.traction.one/pokedex/pokemon'

    return (
        <div className={styles.pokemon_container}>
            <h1 className={styles.title}>{pokemon.name}</h1>
            <Image src={`${url}/${pokemon.id}.png`} width={200} height={200} alt={pokemon.name}/>
            <div>
                <h3>Número:</h3>
                <p>#{pokemon.id}</p>
            </div>
            <div>
                <h3>Tipo:</h3>
                <div className={styles.types_container}>
                    {pokemon.types.map((item, index) => (
                        <span key={index} className={`${styles.type} ${styles['type_' + item.type.name]}`}>{item.type.name}</span>
                    ))}
                </div>
            </div>
            <div className={styles.data_container}>
                <div className={styles.data_height}>
                    <h3>Altura:</h3>
                    <p>{pokemon.height * 10} cm</p>
                </div>
                <div>
                    <h3>Peso:</h3>
                    <p>{pokemon.weight / 10} Kg</p>
                </div>
            </div>
        </div>    
    )
}