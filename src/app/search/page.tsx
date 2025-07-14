import {StationListStruct} from "../utility/apiResponses";
import { getFromApi } from "../utility/apiRequests";
import {FareForm} from "@/app/search/form";

export default async function Search() {
    const stationList: StationListStruct = await getFromApi<StationListStruct>("stations");
    return <FareForm stationList={stationList}></FareForm>
}



