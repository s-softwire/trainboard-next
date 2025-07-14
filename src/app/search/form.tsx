"use client"

import {ChangeEvent, JSX, useState} from "react";
import {StationIdentifiers, StationListStruct} from "@/app/utility/apiResponses";

export function FareForm({stationList}: {stationList: StationListStruct}): JSX.Element {
    const [prefix, setPrefix] = useState("");
    const [suggestion, setSuggestion] = useState([]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrefix(e.target.value);
        const filteredList = filterStationList(stationList);
        setSuggestion(filteredList);
    }

    return (<form id="form" action="/search/results">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            From:
            <input
                id="from"
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2"
                type="text"
                name="originStation"
                value={prefix}
                onChange={onChange}

            />
            <div className="block absolute min-w-40 px-12 py-16 z-1">
                {
                    suggestion.map(stationIdentifier => <div key={stationIdentifier.crs}>

                    </div>)
                }
            </div>
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
            To:
            <input id="to" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2" type="text" name="destinationStation" />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
            Adults:
            <input id="adults" defaultValue="1" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2" type="text" name="numberOfAdults" />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
            Children:
            <input id="children" defaultValue="0" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2" type="text" name="numberOfChildren" />
        </label>
        <input type="submit" name="Submit" value="Find fares" />
    </form>)
}

function filterStationList(stationList: StationListStruct, prefix: string): StationIdentifiers[]{
    return (stationList.stations ?? []).filter(station => (station.name?.startsWith(prefix)) ?? false);
}