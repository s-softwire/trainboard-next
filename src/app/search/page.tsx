"use client"

import { JSX} from "react";
import { Journey, JourneyLeg, Journeys, TicketObj } from "../utility/apiResponses";
import { getFromApi } from "../utility/apiRequests";
import { useSearchParams } from "next/navigation";

export default function Search() {
    return <FareForm></FareForm>
}

function FareForm(): JSX.Element {
    const params = useSearchParams();

    return (<form id="form" action="/search/results">
        <label className="block text-gray-700 text-sm font-bold mb-2"> 
            From: 
            <input id="from" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2" type="text" name="originStation" />
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

