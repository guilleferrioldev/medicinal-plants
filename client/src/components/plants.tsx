import styles from "@/components/home.module.css"

export default function Plants ({children, text}: {children?: React.ReactNode, text: string}) {
    return (
        <section className={styles.sec} id='plantas'>
            <h2>{text}</h2>
            <div>
                <ul>
                    {children}
                </ul>
            </div>
        </section>
    )
}