import { fetchFromApi, postToApi } from "@/app/utility/apiRequests";
import { APIError, DepartureDetails, DepartureList, DepartureStatus, StationDetails } from "@/app/utility/apiResponses";

export default async function StationPage({
    params,
}: {
    params: Promise<{ stationCrs: string }>
}) {
    const { stationCrs } = await params;
    const details: StationDetails = await fetchFromApi(`stationDetails/${stationCrs}`);
    console.log(details);

    return (
        <>
            <div>Welcome to the details page for {stationCrs}</div>
            <Location stationInfo={details}></Location>
            <OpeningTimes stationInfo={details}></OpeningTimes>
            <LiveDepartures stationCrs={stationCrs}></LiveDepartures>
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
    let liveDepartures: DepartureList = await postToApi("liveTrainsBoard/departures", { "crs": stationCrs });
    const departureHtmls = liveDepartures.trainServices.map(departure => formatDeparture(departure));
    return departureHtmls;
}

function formatDeparture(departureDetails: DepartureDetails) {
    const rid: string = departureDetails.rid
    const departureTime: string = departureDetails.std.split("T").pop()?.split(".")[0] ?? "Unavailable";
    const platform: string = departureDetails.platform ?? "Unavailable";
    const status: DepartureStatus = departureDetails.status;
    const destination: string = departureDetails.destination[0].name;

    return (
        <div key={rid}>
            Departure time: {departureTime} <br></br>
            Platform: {platform} <br></br>
            Status: {status} <br></br>
            Destination: {destination} <br></br>
            <br></br>
        </div>
    )
}