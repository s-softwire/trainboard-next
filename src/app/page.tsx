import Link from 'next/link'
import { getFromApi } from './utility/apiRequests';
import { StationIdentifiers, StationList } from './utility/apiResponses';

export default function Home() {

    const stationCodes = ["KGX","EDB"];

    return (
        <>
            <div className={"w-full text-center bg-red-800"}>
                <h1 className={"text-3xl py-3 text-white"}>TrainBoard</h1>
            </div>
            <div>
                I&apos;m a simple train board, short and no longer lacking innovation.
            <div
                className="">
                {stationCodes.map((stationName) => (
                    <div className={"flex flex-row gap-4"} key={stationName}>
                        <div>Station Code:</div>
                        <div>{stationName}</div>
                    </div>
                ))}
            </div>
            <div className={"w-full text-left" }>
                <form> 
                    <label>
                        From:
                        <input className="outline " type="text" name="fromStation" />
                    </label>
                    <label>
                        To:
                        <input className='outline' type="text" name="toStation" />
                    </label>
                    <input type="submit" value="Find fares" />
                </form>
            </div>
            </div>
            <br/>
            <GetStationList/>
        </>
    );
}

async function GetStationList() {
    const stationList: StationList = await getFromApi("stations")
    const validStations: StationIdentifiers[] = filterValidStations(stationList);
    const stationListHtml = validStations.map((station: StationIdentifiers) => {
        let stationPath = `/station/${station.crs}`
        return <div key={station.crs}>{station.name}, <Link href={stationPath}>{station.crs}</Link></div>;
    })

    return <div>{stationListHtml}</div>;
}

function filterValidStations(stationList: StationList): StationIdentifiers[] {
    let crsSet = new Set<string>();
    let validStations: StationIdentifiers[] = [];
    for (let station of stationList.stations ?? []) {
        if (station.crs && !crsSet.has(station.crs)) {
            validStations.push(station);
            crsSet.add(station.crs);
        }
    }
    return validStations;
}
