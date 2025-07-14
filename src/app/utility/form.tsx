"use client"

import { JSX, useState } from "react";
import { Journey, JourneyLeg, Journeys, TicketObj } from "./apiResponses";
import { getFromApi } from "./apiRequests";

async function FareForm(): Promise<JSX.Element> {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    return (<form id="form">
        <label className="block text-gray-700 text-sm font-bold mb-2"> 
            From: 
            <input id="from" onChange={e => setFrom(e.target.value)} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2" type="text" name="fromStation" />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
            To: 
            <input id="to" onChange={e => setTo(e.target.value)} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2" type="text" name="toStation" />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2"> 
            Adults:
            <input id="adults" onChange={e => setAdults(Number(e.target.value))} defaultValue="1" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2" type="text" name="fromStation" />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
            Children:
            <input id="children" onChange={e => setChildren(Number(e.target.value))} defaultValue="0" className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2" type="text" name="toStation" />
        </label>
        <input type="submit" name="Submit" value="Find fares" onClick={e => findFares(from,to,adults,children)} />
    </form>)
}

function findFares(from: string, to: string, adults: number, children: number) {
    const params = [["from",from],["to",to],["adults",adults.toString()],["children",children.toString()]];
    return <FareSuggestions params={params}/>
}

async function FareSuggestions({params}:{params: string[][]}): Promise<JSX.Element> {
    const path: string = "/fares";
    let queryParams: URLSearchParams = new URLSearchParams();
    params.map((param: string[]) => {
        queryParams.append(param[0],param[1]);
    });
    const fareSuggestions: Journeys = await getFromApi(path, queryParams);
    return (<div className="table w-full">
        <div className="table-header-group">
            <div className="table-cell text-left"> Departure Time </div>
            <div className="table-cell"> Arrival Time </div>
            <div className="table-cell"> Status </div>
            <div className="table-cell"> Duration </div>
            <div className="table-cell"> Legs </div>
            <div className="table-cell"> Tickets </div>
         </div>
         <div className="table-row-group">
            {fareSuggestions.outboundJourneys.map((journey) => <FareOption fareSuggestion={journey}/>)}
         </div>
    </div>)
}

function FareOption({fareSuggestion}:{fareSuggestion: Journey}): JSX.Element {
    const departureTime = fareSuggestion.departureTime;
    const arrivalTime = fareSuggestion.arrivalTime;
    const status = fareSuggestion.status;
    const duration = fareSuggestion.journeyDurationInMinutes;
    return (<div className="table-row">
        <div className="table-cell"> {departureTime} </div>
        <div className="table-cell"> {arrivalTime} </div>
        <div className="table-cell"> {status} </div>
        <div className="table-cell"> {duration} </div>
        <div className="table-cell"> {
            fareSuggestion.legs.map((leg) => <Leg leg={leg} />)} 
        </div>
        <div className="table-cell"> {
            fareSuggestion.tickets.map((ticket) => <Ticket ticket={ticket} />)} 
        </div>
    </div>)

}

function Leg({leg}:{leg: JourneyLeg}): JSX.Element {
    return (<div className="table-row">
        <div className="table-cell"> {leg.mode} </div>
        <div className="table-cell"> {leg.origin.displayName} </div>
        <div className="table-cell"> {leg.destination.displayName} </div>
        <div className="table-cell"> {leg.durationInMinutes} </div>
        <div className="table-cell"> {leg.departureDateTime ?? ""} </div>
        <div className="table-cell"> {leg.arrivalDateTime ?? ""} </div>
    </div>)
}

function Ticket({ticket}:{ticket:TicketObj}): JSX.Element {
    const price: string = new Intl.NumberFormat(undefined, {style:'currency', currency:'GBP'}).format(ticket.priceInPennies)
    return (<div className="table-row">
        <div className="table-cell"> {ticket.name} </div>
        <div className="table-cell"> {price} </div>
        <div className="table-cell"> {ticket.numberOfTickets} </div>
    </div>)
}