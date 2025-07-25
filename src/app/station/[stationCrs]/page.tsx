import Link from 'next/link'
import { getFromApi, postToApi } from "@/app/utility/apiRequests";
import { APIError, DepartureDetails, DepartureList, DepartureStatus, StationDetails } from "@/app/utility/apiResponses";

export default async function StationPage({
    params,
}: {
    params: Promise<{ stationCrs: string }>
}) {
    const { stationCrs } = await params;
    const details: StationDetails = await getFromApi<StationDetails>(`stationDetails/${stationCrs}`);
    console.log(details);

    return (
        <>
            <div>Welcome to the details page for {stationCrs}</div>
            <Location stationInfo={details}/>
            <OpeningTimes stationInfo={details}/>
            <LiveDepartures stationCrs={stationCrs}/>
        </>
    );
}

function Location({stationInfo}: {stationInfo: StationDetails}) {
    return (
        <div>
            The location of the station is {stationInfo.location.addressLines}, {stationInfo.location.postCode}
        </div>
    )
}

function OpeningTimes({stationInfo}: {stationInfo: StationDetails}) {
    return (
        <div>
            The ticket office's opening times are: {stationInfo.facilities.fares?.ticketOffice?.openingTimes ?? "Unavailable"}
        </div>
    );
}

async function LiveDepartures({stationCrs}: {stationCrs: string}) {
    let liveDepartures: DepartureList = await postToApi<DepartureList>("liveTrainsBoard/departures", { "crs": stationCrs });
    return liveDepartures.trainServices.map(departure => <FormatDeparture departureDetails={departure}/>);
}

function FormatDeparture({departureDetails}: {departureDetails: DepartureDetails}) {
    const rid: string = departureDetails.rid
    const departureTime: string = departureDetails.std.split("T").pop()?.split(".")[0] ?? "Unavailable";
    const platform: string = departureDetails.platform ?? "Unavailable";
    const status: DepartureStatus = departureDetails.status;
    const destination: string = departureDetails.destination[0].name;

    return (
        <div key={rid}>
            Departure time: {departureTime} <br/>
            Platform: {platform} <br/>
            Status: {status} <br/>
            Destination: {destination} <br/>
            <br/>
        </div>
    )
}