import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi, { baseURL } from "./SummaryApi";

const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.userDetails
        })

        return response.data;

    } catch (error) {
        AxiosToastError(error)

    }
}

export default fetchUserDetails;