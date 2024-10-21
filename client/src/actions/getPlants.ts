"use server"

export const getPlants = async(symptoms: string, page: number): Promise<string[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/plants?symptoms=${symptoms}&page=${page}`)
        const data = await response.json();
        return data.plants
    } catch {
        return []
    }
}