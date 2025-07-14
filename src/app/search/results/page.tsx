import { getFromApi } from "@/app/utility/apiRequests";
import { Journey, JourneyLeg, Journeys, TicketObj } from "@/app/utility/apiResponses";
import { JSX } from "react";

interface FareQuery {
    fromStation?: string,
    toStation?: string,
    adults?: string,
    children?: string
}

export default async function Results({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
    const params = await searchParams;
    return <FindFares params={params}></FindFares>
}

async function FindFares({params}: {params: FareQuery}) {
    return <FareSuggestions params={params}/>
}

async function FareSuggestions({params}:{params: FareQuery}): Promise<JSX.Element> {
    const path: string = "fares";
    let queryParams: URLSearchParams = new URLSearchParams();
    Object.entries(params).forEach(([param, value]) => queryParams.append(param, value))
    queryParams.append("outboundNow", "true")
    const fareSuggestions: Journeys = await getFromApi<any>(path, queryParams);
    return (<div className="table w-full">
        <div className="table-header-group">
            <div className="table-cell outline p-2"> Departure Time </div>
            <div className="table-cell outline p-2"> Arrival Time </div>
            <div className="table-cell outline p-2"> Status </div>
            <div className="table-cell outline p-2"> Duration </div>
            <div className="table-cell outline p-2"> Legs </div>
            <div className="table-cell outline p-2"> Tickets </div>
         </div>
         <div className="table-row-group">
            {fareSuggestions.outboundJourneys.map((journey) => <FareOption key={journey.journeyId} fareSuggestion={journey}/>)}
         </div>
    </div>)
}

function FareOption({fareSuggestion}:{fareSuggestion: Journey}): JSX.Element {
    const departureTime = fareSuggestion.departureTime;
    const arrivalTime = fareSuggestion.arrivalTime;
    const status = fareSuggestion.status;
    const duration = fareSuggestion.journeyDurationInMinutes;
    return (<div className="table-row">
        <div className="table-cell outline p-2"> {departureTime} </div>
        <div className="table-cell outline p-2"> {arrivalTime} </div>
        <div className="table-cell outline p-2"> {status} </div>
        <div className="table-cell outline p-2"> {duration} </div>
        <div className="table-cell outline p-2"> {
            fareSuggestion.legs.map((leg) => <Leg key={leg.legId} leg={leg} />)} 
        </div>
        <div className="table-cell outline p-2"> {
            fareSuggestion.tickets.map((ticket) => <Ticket key={ticket.fareId} ticket={ticket} />)} 
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
        <div className="table-cell pl-4"> {price} </div>
        <div className="table-cell pl-4"> {ticket.numberOfTickets} </div>
    </div>)
}
