import {Navigate} from "react-router-dom";
import Button from "../../../common/components/Button/Button";
import {useLogin} from "./useLogin.ts";

const authEndpoint = import.meta.env.VITE_AUTH_ENDPOINT
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const RESPONSE_TYPE = import.meta.env.VITE_RESPONSE_TYPE;
const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL;

const Login = () => {
    const {loggedIn, fromPage} = useLogin()
    if (loggedIn) {
        return <Navigate to={fromPage} replace/>
    }
    return (
        <div>
            <Button variant="filled"
                    link={`${authEndpoint}/?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URL}`}>Log
                In</Button>
        </div>
    );
};

export default Login;