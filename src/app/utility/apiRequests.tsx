import { notFound } from "next/navigation";

export async function getFromApi<T>(path: string): Promise<T> {
    const res = 
        await fetch(
            `${process.env.API_BASE_URL}/${path}`,
            { headers: { "x-api-key": `${process.env.API_KEY}` } }
        );
    if (!res.ok) {
        notFound();
    }
    return res.json();
}

export async function postToApi<T>(path: string, body: any): Promise<T> {
    const res = 
        await fetch(
            `${process.env.API_BASE_URL}/${path}`,
            { 
                method: "POST",
                headers: { 
                    "x-api-key": `${process.env.API_KEY}`,
                    "content-type": "application/json" 
                },
                body: JSON.stringify(body)
            }
        );
    if (!res.ok) {
        notFound();
    }
    return res.json();
}