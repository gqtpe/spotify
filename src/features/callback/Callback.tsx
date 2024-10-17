import {Navigate, useSearchParams} from "react-router-dom";
import {setItem} from "../../common/utils/localStorage.ts";

const Callback = () => {
    const [URLSearchParams] = useSearchParams()
    const token = URLSearchParams.get('token')
    const refreshToken = URLSearchParams.get('refresh_token')
    const expiredIn = URLSearchParams.get('expired_in')
    const tokenType = URLSearchParams.get('token_type')
    const scope = URLSearchParams.get('scope')
    if (token && refreshToken && expiredIn && tokenType && scope) {
        const newExpirationTime = (Date.now() + Number(expiredIn) * 1000).toString()
        setItem('auth_token', token)
        setItem('refresh_token', refreshToken)
        setItem('expiration_time', newExpirationTime)
        setItem('token_type', tokenType)
        setItem('scope', scope)
        return <Navigate to="/" replace/>
    }else{
        console.warn('no token found')
    }

    return <div>Loading...</div>;
};

export default Callback;
