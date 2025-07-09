export default async function StationPage({
    params,
}: {
    params: Promise<{ stationCrs: string }>
}) {
    const { stationCrs } = await params;
    const res = 
        await fetch(
            `https://int-dev1.tram.softwire-lner-dev.co.uk/v1/stationDetails/crs?=${stationCrs}`,
        {
            headers: { "x-api-key": `${process.env.API_KEY}` }
        })
    const details = await res.json();

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
            The location of the station is {stationInfo.details.location.addressLines}, {stationInfo.details.location.postCode}
        </div>
    )
}

function OpeningTimes(stationInfo: any) {
    return (
        <div>
            The ticket office's opening times are: {stationInfo.details.facilities.fares.ticketOffice.openingTimes}
        </div>
    );
}