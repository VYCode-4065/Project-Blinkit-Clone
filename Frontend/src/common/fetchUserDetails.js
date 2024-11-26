import Axios from "../utils/Axios";
import SummaryApi, { baseURL } from "./SummaryApi";

const fetchUserDetails = async () => {
    try {
        const response = await Axios.get('/api/user/user-details');

        return response.data;

    } catch (error) {
        console.log(error);

    }
}

export default fetchUserDetails;