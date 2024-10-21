"use client"

import { getPlants } from "@/actions/getPlants";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CardList } from "@/components";
import { useSearchParams } from "next/navigation";

export default function ListOfPlants ({symptoms}: Readonly<{symptoms: string}>) {
    const searchParams = useSearchParams();
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
                try {
                    const newPlants = await getPlants(symptoms, page.current)
                    page.current += 1
                    setPlants(prevPlants => [...prevPlants, ...newPlants ?? []])
                } catch {
                    setPlants([])
                }
            }
            fetchPlants()
        }
    }, [inView, symptoms]);

    return (
        <>
            {!plants.length && searchParams.get("sintomas") && <h3>Los síntomas no corresponden con ninguna planta</h3>}

            {
            plants?.map((plant: string, index: number) => (
                <CardList key={index} plant={plant} index={index}/>
                ))
            }

            <div ref={ref} style={{ opacity: 0}}>
                <span>Loading</span>
            </div>
        </>
    )
}