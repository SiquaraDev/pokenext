import styles from "../styles/Navbar.module.css"

import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link href="/" legacyBehavior>
                <div className={styles.logo}>
                    <Image src="/images/pokeball.png" width={30} height={30} alt="pokeball img"/>
                    <h1>PokeNext</h1>
                </div>
            </Link>
            <ul className={styles.link_items}>
                <li>
                    <Link href="/" legacyBehavior>
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/about" legacyBehavior>
                        <a>About</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}