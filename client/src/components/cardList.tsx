import styles from "@/styles/home.module.css"
import Link from "next/link"
import { MotionDiv } from "@/components"

export default function CardList ({plant, index}: Readonly<{plant: string, index: number}>) {
    return (
        <li>
            <Link href={`/${plant}`} className={styles.Link}>
                <MotionDiv className={styles.cardList}
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                }}
                transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut", 
                }}
                >
                    <h2>
                        {plant}
                    </h2>
                </MotionDiv>
            </Link>
        </li>
    )
}