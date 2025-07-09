import { fetchFromApi } from "@/app/utility/apiRequests";

export default async function StationPage({
    params,
}: {
    params: Promise<{ stationCrs: string }>
}) {
    const { stationCrs } = await params;
    const details = await fetchFromApi(`stationDetails/${stationCrs}`);

    return (
        <>
            <div>Welcome to the details page for {stationCrs}</div>
            <Location details={details}></Location>
            <OpeningTimes details={details}></OpeningTimes>
        </>
    );
}

function Location(stationInfo: any) {
    return (
        <div>
            The location of the station is {stationInfo?.details?.location?.addressLines}, {stationInfo?.details?.location?.postCode}
        </div>
    )
}

function OpeningTimes(stationInfo: any) {
    return (
        <div>
            The ticket office's opening times are: {stationInfo?.details?.facilities?.fares?.ticketOffice?.openingTimes}
        </div>
    );
}