import { fetchFromApi, postToApi } from "@/app/utility/apiRequests";
import { StationDetails } from "@/app/utility/apiResponses";

export default async function StationPage({
    params,
}: {
    params: Promise<{ stationCrs: string }>
}) {
    const { stationCrs } = await params;
    const details: StationDetails = await fetchFromApi(`stationDetails/${stationCrs}`);

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
    let liveDepartures = await postToApi("liveTrainsBoard/departures", { "crs": stationCrs });

    return <div>{JSON.stringify(liveDepartures)}</div>;
}