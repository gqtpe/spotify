import {AxiosError} from "axios";
import toast, {ToastOptions} from "react-hot-toast";

const toastOptions: ToastOptions = {}

export const handleError = (e: AxiosError<any>, rejectWithValue: Function) => {
    let error = e.message ? e.message : e.status;
    if (e.response && e.response.data) {
        error = e.response.data.error.message
    }
    toast.error(error + '', toastOptions)
    return rejectWithValue(error)
}
export const throwMessage = (message: string, success?: boolean, rejectWithValue?: Function) => {
    if (success) toast.success(message, toastOptions)
    else toast(message, toastOptions)
    if (rejectWithValue) {
        return rejectWithValue
    }
}