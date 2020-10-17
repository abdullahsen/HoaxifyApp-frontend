import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux'
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import {useApiProgress} from '../shared/ApiProgress';
import {loginHandler} from '../redux/authActions';

const LoginPage = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const {t} = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        setError(undefined);
    }, [username, password])


    const pendingApiCall = useApiProgress('post','/api/1.0/auth');
    const buttonEnabled = username && password;

    const onClickLogin = async (event) => {

        event.preventDefault();

        const {history} = props;
        const {push} = history;

        const creds = {username, password};

        setError(undefined);

        try {
            await dispatch(loginHandler(creds));
            push('/');
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <div className="container">
            <form>
                <h1 className="text-center">{t("Login")}</h1>
                <Input
                    label={t("Username")}
                    onChange={(event) => setUsername(event.target.value)}/>

                <Input
                    label={t("Password")}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"/>
                {error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>}

                <div className="text-center">
                    <ButtonWithProgress
                        disabled={pendingApiCall || !buttonEnabled}
                        onClick={onClickLogin}
                        pendingApiCall={pendingApiCall}
                        text={t("Login")}
                    />
                </div>
            </form>
        </div>
    )
}

export default LoginPage;