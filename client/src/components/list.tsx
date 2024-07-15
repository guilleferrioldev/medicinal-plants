"use client"

import { getPlants } from "@/actions/getPlantsActions";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ListOfPlants ({symptoms}: {symptoms: string}) {
    const { ref, inView } = useInView();
    const [plants, setPlants] = useState<string[]>([])
    const page = useRef(1)

    useEffect(() => {
        setPlants([])
        page.current = 1
    }, [symptoms]);

    useEffect(() => {
        if (inView) {
            const fetchPlants = async () => {
                const newPlants = await getPlants(symptoms, page.current)
                page.current += 1
                setPlants(prevPlants => [...prevPlants, ...newPlants ?? []])
            }
            fetchPlants()
        }
    }, [inView, symptoms]);

    return (
        <>
            {
            plants?.map((plant: string, index: number) => (
                <li style={{ height: 200 }} key={index}>{plant}</li>
                ))
            }

            <div ref={ref} style={{ opacity: 0 }}>
                <span>Loading</span>
            </div>
        </>
    )
}