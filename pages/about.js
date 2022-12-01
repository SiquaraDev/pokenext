import styles from "../styles/About.module.css"

import Image from "next/image"

export default function About() {
    return (
        <div className={styles.about}>
            <h1>Sobre o projeto</h1>
            <p>Este é meu primeiro projeto usando Next.js</p>
            <Image src="/images/charizard.png" width={300} height={300} alt="charizard" />
        </div>
    )
}