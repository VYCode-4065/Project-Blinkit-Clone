import toast from "react-hot-toast"

const AxiosToastError = (error) => {
    toast.error(
        error?.response?.data?.message
    )
}

const AxiosToastError2 = (error) => {
    toast.error(
        error?.response
    )
}
export default AxiosToastError