import styles from "@/styles/home.module.css"
import { Suspense } from "react"

export default function Plants ({children, text}: Readonly<{children?: React.ReactNode, text: string}>) {
    return (
        <section className={styles.sec} id='plantas'>
            <h2>{text}</h2>
            <div>
                <ul>
                    <Suspense>
                    {children}
                    </Suspense>
                </ul>
            </div>
        </section>
    )
}