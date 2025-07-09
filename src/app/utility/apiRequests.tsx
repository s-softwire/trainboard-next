export async function fetchFromApi(path: string) {
    const res = 
        await fetch(
            `${process.env.API_BASE_URL}/${path}`,
            { headers: { "x-api-key": `${process.env.API_KEY}` } }
        )
    return res.json();
}