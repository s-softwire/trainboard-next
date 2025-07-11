import Link from 'next/link'
import { getFromApi } from './utility/apiRequests';
import { StationIdentifiers, StationListStruct } from './utility/apiResponses';

export default function Home() {

    const stationCodes = ["KGX", "EDB"];

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
                <div className={"w-full text-left"}>
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
            <br />
            <StationList />
        </>
    );
}

async function StationList() {
    const stationList: StationListStruct = await getFromApi<StationListStruct>("stations")
    const validStations: StationIdentifiers[] = filterValidStations(stationList);
    const StationListItem: React.FC<{station: StationIdentifiers}> = ({station}) => 
        <div key={station.crs}>
            <Link href={`/station/${station.crs}`}>{station.name}, {station.crs}</Link>
        </div>
    
    return (<div>
            {validStations.map((station: StationIdentifiers) => 
                <StationListItem key={station.crs} station={station}/>
            )}
        </div>);
}

function filterValidStations(stationList: StationListStruct): StationIdentifiers[] {
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
