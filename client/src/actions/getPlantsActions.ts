"use server"

export async function getPlants (symptoms: string, page: number): Promise<string[]> {
    const response = await fetch(`http://localhost:8080/plants?symptoms=${symptoms}&page=${page}`)
    const data = await response.json();
    return data.plants
}