import Button from "../../../common/components/Button/Button.tsx";
import {scopes} from "../../../api/scopes.ts";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const RESPONSE_TYPE = import.meta.env.VITE_RESPONSE_TYPE;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const authEndpoint = import.meta.env.VITE_AUTH_ENDPOINT;

const Login = () => {
    console.log('Login')
    const endpoint = `${authEndpoint}/?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '12px 0'}}>
            <Button variant="filled" link={endpoint}>Log In</Button>
        </div>
    );
};

export default Login;