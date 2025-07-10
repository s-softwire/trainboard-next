import { notFound } from "next/navigation";

export async function fetchFromApi(path: string): Promise<any> {
    const res = 
        await fetch(
            `${process.env.API_BASE_URL}/${path}`,
            { headers: { "x-api-key": `${process.env.API_KEY}` } }
        )
    console.log(`>>>>>>>>>>>>>>>>>>>>>>>> ${res.status}`)
    if (!res.ok) {
        notFound();
    }
    return res.json();
}

export async function postToApi(path: string, body: any) {
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
        )
    if (!res.ok) {
        notFound();
    }
    return res.json();
}