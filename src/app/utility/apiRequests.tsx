export async function fetchFromApi(path: string) {
    const res = 
        await fetch(
            `${process.env.API_BASE_URL}/${path}`,
            { headers: { "x-api-key": `${process.env.API_KEY}` } }
        )
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
    return res.json();
}