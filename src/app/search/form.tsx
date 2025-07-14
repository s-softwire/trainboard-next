
"use client"

import {JSX, useState} from "react";
import {StationIdentifiers} from "@/app/utility/apiResponses";

export function FareForm({stationList}: {stationList: StationIdentifiers[]}): JSX.Element {
    const [prefix, setPrefix] = useState("");
    const [suggestion, setSuggestion] = useState(new Array<StationIdentifiers>());
    const [suggestionLimit, setSuggestionLimit] = useState(5)

    const [toPrefix, setToPrefix] = useState("");
    const [toSuggestion, setToSuggestion] = useState(new Array<StationIdentifiers>());
    const [toSuggestionLimit, setToSuggestionLimit] = useState(5)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSuggestionLimit(5);
        setPrefix(e.target.value);
        const filteredList: StationIdentifiers[] = filterStationList(stationList, prefix);
        setSuggestion(filteredList);
    }

    const onChangeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToSuggestionLimit(5);
        setToPrefix(e.target.value);
        const filteredList: StationIdentifiers[] = filterStationList(stationList, toPrefix);
        setToSuggestion(filteredList);
    }


    return (<form id="form" action="/search/results">
        <div>
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
            <div className="block absolute min-w-40 px-12 py-1 z-1">
                {
                    suggestion.slice(0,suggestionLimit).map((stationIdentifier: StationIdentifiers) => <div className={"outline"}
                        key={stationIdentifier.crs}
                        onClick={e => {
                            setPrefix(stationIdentifier.crs ?? prefix);
                            setSuggestionLimit(0);
                        }}>
                        {stationIdentifier.name}
                    </div>)
                }
            </div>
        </label>
        </div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
            To:
            <input
                id="to"
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2"
                type="text"
                name="destinationStation"
                value={toPrefix}
                onChange={onChangeTo}

            />
            <div className="block absolute min-w-40 px-12 py-1 z-1">
                {
                    toSuggestion.slice(0, toSuggestionLimit).map((stationIdentifier: StationIdentifiers) => <div className={"outline"}
                    key={stationIdentifier.crs}
                    onClick={e => {
                        setToPrefix(stationIdentifier.crs ?? prefix);
                        setToSuggestionLimit(0);
                    }}>
                        {stationIdentifier.name}
                    </div>)
                }
            </div>
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

function filterStationList(stationList: StationIdentifiers[], prefix: string): StationIdentifiers[]{
    return (stationList ?? []).filter(station => (station.name?.toLowerCase().startsWith(prefix.toLowerCase())) ?? false);
}