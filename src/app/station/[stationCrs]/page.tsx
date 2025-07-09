export default async function StationPage({
    params,
}: {
    params: Promise<{ stationCrs: string }>
}) {
    const { stationCrs } = await params 
    return <div>Welcome to the details page for {stationCrs}</div>
}