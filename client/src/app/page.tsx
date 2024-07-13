import styles from "@/components/style.module.css"
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <section className={styles.parallax}>
        <h2 className={styles.delete}>Parallax Website</h2>
        <Image src="/hill1.png" alt="hill1" width={500} height={500}></Image>
      </section>
      
    </main>
  );
}
