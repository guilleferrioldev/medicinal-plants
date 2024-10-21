"use client"

import styles from "@/styles/home.module.css"

export default function Header () {
    const handleClick = (anchor: string) => {
        const seccion = document.getElementById(anchor);
        seccion?.scrollIntoView({ behavior: 'smooth' });
    } 

    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <button onClick={() => handleClick("buscar")}>Buscar</button>
                <button onClick={() => handleClick("plantas")}>Plantas</button>
            </nav>
        </header>
    )
}