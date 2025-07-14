import {StationIdentifiers, StationListStruct} from "../utility/apiResponses";
import { getFromApi } from "../utility/apiRequests";
import {FareForm} from "@/app/search/form";
import {filterValidStations} from "@/app/page";

export default async function Search() {
    const stationList: StationIdentifiers[] = filterValidStations(await getFromApi<StationListStruct>("stations"));
    return <FareForm stationList={stationList}></FareForm>
}



