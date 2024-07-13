import Home from "@/components/home";
import styles from "@/components/style.module.css"

export default function HomePage() {
  return (
    <main>
      <Home/>
      <section className={styles.sec} id='sec'>
        <h2>Plantas recomendadas</h2>
      </section>
    </main>
  );
}
