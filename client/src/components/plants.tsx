import styles from "@/components/home.module.css"

export default function Plants ({children}: {children?: React.ReactNode}) {
    return (
        <section className={styles.sec} id='plantas'>
            <h2>Plantas recomendadas</h2>
            <div>
                {children}
            </div>
        </section>
    )
}