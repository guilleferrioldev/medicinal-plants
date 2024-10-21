"use server"

import { Plant } from "@/types";

export const getPlantByName = async (name: string): Promise<Plant | undefined> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/plants/${name}`)
        const data = await response.json();

        if (data.status === "success") {
            return data.plant
        } 
    } catch {
        return 
    }
}