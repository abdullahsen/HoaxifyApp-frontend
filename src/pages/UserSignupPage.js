import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import {signupHandler} from '../redux/authActions';

const UserSignupPage = (props) => {

    const [form, setForm] = useState({
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null
    });
    const [errors, setErrors] = useState({});
    const {t} = useTranslation();
    const dispatch = useDispatch();


    //Inputlarda degisiklik oldugu zaman
    const onChange = (event) => {
        const {name, value} = event.target;
        setErrors((previousErrors) => ({...previousErrors, [name]: undefined}));
        setForm((previousForm) => ({...previousForm, [name]: value}));
    }

    //kayit ol butonu tiklandigi zaman
    const onClickSignup = async (event) => {
        event.preventDefault();

        const {history } = props;
        const {push} = history;

        const {username, displayName, password} = form;

        const body = {username, displayName, password};

        try {
            await dispatch(signupHandler(body));
            push('/')

        } catch (err) {

            if (err.response.data.validationErrors) {
                setErrors(err.response.data.validationErrors);
            }
        }
    }

    const pendingApiCallForSignup = useApiProgress('post','/api/1.0/users');
    const pendingApiCallForLogin = useApiProgress('post','/api/1.0/auth');
    const pendingApiCall = pendingApiCallForLogin || pendingApiCallForSignup


    let passwordRepeatError;
    if (form.password !== form.passwordRepeat) {
        passwordRepeatError = t('Password mismatch');

    }
    const {
        username: usernameError,
        displayName: displayNameError,
        password: passwordError
    } = errors;
    return (

        <div className="container">
            <form>
                <h1 className="text-center">{t("Sign Up")}</h1>
                <Input
                    name="username"
                    label={t("Username")}
                    error={usernameError}
                    onChange={onChange}/>
                <Input
                    name="displayName"
                    label={t("Display Name")}
                    error={displayNameError}
                    onChange={onChange}/>
                <Input
                    name="password"
                    label={t("Password")}
                    error={passwordError}
                    onChange={onChange}
                    type="password"/>
                <Input
                    name="passwordRepeat"
                    label={t("Password Repeat")}
                    error={passwordRepeatError}
                    onChange={onChange}
                    type="password"/>

                <div className="text-center">
                    <ButtonWithProgress
                        disabled={pendingApiCall || passwordRepeatError !== undefined}
                        onClick={onClickSignup}
                        pendingApiCall={pendingApiCall}
                        text={t("Sign Up")}
                    />
                </div>
            </form>
        </div>

    )

}

export default UserSignupPage;