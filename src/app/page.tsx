import Link from 'next/link'
import { getFromApi } from './utility/apiRequests';
import { StationIdentifiers, StationListStruct } from './utility/apiResponses';
import { JSX } from 'react';

export default function Home() {

    return (
        <>
            <div className={"w-full text-center bg-red-800"}>
                <h1 className={"text-3xl py-3 text-white"}>TrainBoard</h1>
            </div>
            <div className="block text-gray-700 text-sm m-2">
                I&apos;m a simple train board, short and no longer lacking innovation.
                <div className={"w-full text-left m-2"}>
                    <form>
                        <label className="block text-gray-700 text-sm font-bold mb-2"> 
                            From: 
                            <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2" type="text" name="fromStation" />
                        </label>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            To: 
                            <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2" type="text" name="toStation" />
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

async function StationList(): Promise<JSX.Element> {
    const stationList: StationListStruct = await getFromApi<StationListStruct>("stations")
    const validStations: StationIdentifiers[] = filterValidStations(stationList);
    const StationListItem: React.FC<{station: StationIdentifiers}> = ({station}) => 
        <div key={station.crs}>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={`/station/${station.crs}`}>{station.name}, {station.crs}</Link>
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

async function FareSuggestions({params}:{params: string[2][]}): Promise<JSX.Element> {
    const path: string = "/fares";
    let queryParams: URLSearchParams = new URLSearchParams();
    params.map((param: string[2]) => {
        queryParams.append(param[0],param[1]);
    });
    const fareSuggestions = await getFromApi
}
