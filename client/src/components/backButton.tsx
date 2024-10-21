"use client"

import { useRouter } from "next/navigation"
import styles from "@/styles/intercept.module.css"

const Button = ({handleClick}: {handleClick: () => void}) => {
    return (
        <div className={styles.back}>
            <button onClick={handleClick}>
                <svg width="60px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 12H18M6 12L11 7M6 12L11 17" />
                    </g>
                </svg>
            </button>
        </div>
    )
}

export function ButtonToBack () {
    const router = useRouter()

    const handleClick = () => {
        router.back()
    }

    return <Button handleClick={handleClick}/>
}

export function ButtonToReturn () {
    const router = useRouter()

    const handleClick = () => {
        router.replace("/")
    }

    return <Button handleClick={handleClick}/>
}