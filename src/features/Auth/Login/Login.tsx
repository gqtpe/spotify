import Button from "../../../common/components/Button/Button.tsx";

const authEndpoint = import.meta.env.VITE_AUTH_ENDPOINT;

const Login = () => {
    const authorize = authEndpoint + '/authorize'
    console.log(authorize)
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '12px 0'}}>
            <Button variant="filled" link={authorize}>Log In</Button>
        <div className="login">
            <div className="login__hint">
                <div className="login__hint-login">
                    <span>login</span>
                </div>
                <div className="login__hint-password">
                    <span>password</span>
                </div>
            </div>
        </div>
    );
};

export default Login;