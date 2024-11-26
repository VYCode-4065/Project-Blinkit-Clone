import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "./SummaryApi";
import axios from "axios";


const UserLogout = async () => {

    const response = await Axios({ ...SummaryApi.logout });

    if (response.data.success) {
        toast.success(response.data.message)
    }


    return response;
}

export default UserLogout;