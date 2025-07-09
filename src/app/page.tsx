import Link from 'next/link'
import { fetchFromApi } from './utility/apiRequests';

export default function Home() {

    const stationCodes = ["KGX","EDB"];

    return (
        <>
            <div className={"w-full text-center bg-red-800"}>
                <h1 className={"text-3xl py-3 text-white"}>TrainBoard</h1>
            </div>
            <div>
                I&apos;m a simple train board, short and lacking innovation.
            <div
                className="">
                {stationCodes.map((stationName) => (
                    <div className={"flex flex-row gap-4"} key={stationName}>
                        <div>Station Code:</div>
                        <div>{stationName}</div>
                    </div>
                ))}
            </div>
            </div>
            <br></br>
            <StationList></StationList>
        </>
    );
}

async function StationList() {
    const stationList = await fetchFromApi("stations/tod")

    const stationListHtml = stationList.todStations.map((station: any) => {
        let stationPath = `/station/${station.crs}`
        return <div key={station.crs}>{station.name}, <Link href={stationPath}>{station.crs}</Link></div>;
    })

    return <div>{stationListHtml}</div>;
}
