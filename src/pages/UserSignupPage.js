import React from 'react';
import { withTranslation } from 'react-i18next';
import {signup} from '../api/apiCalls';
import Input from "../components/Input";
import ButtonWithProgress from '../components/ButtonWithProgress';

class UserSignupPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            displayName: null,
            password: null,
            passwordRepeat: null,
            pendingApiCall: false,
            errors: {}
        }
    }


    //Inputlarda degisiklik oldugu zaman
    onChange = event => {
        const {name, value} = event.target;
        const errors = {...this.state.errors};
        const { t } = this.props;

        if (name === 'password' || name === 'passwordRepeat'){
            if ( name === 'password' && value !== this.state.passwordRepeat){
               errors.passwordRepeat = t('Passwords mismatch');
            }else if (name === 'passwordRepeat' && value !==this.state.password){
                errors.passwordRepeat = t('Passwords mismatch');
            }else{
                errors.passwordRepeat = undefined;
            }
        }
        errors[name] = undefined;
        this.setState({
            [name]: value,
            errors
        })
    }

    //kayit ol butonu tiklandigi zaman
    onClickSignup = async (event) => {
        event.preventDefault();
        const {username, displayName, password} = this.state;
        const body = {username, displayName, password};
        this.setState({pendingApiCall: true });
        try {
            const response = await signup(body);
        }catch (err) {
            if(err.response.data.validationErrors){
                this.setState({errors:err.response.data.validationErrors})}
        }
        this.setState({pendingApiCall: false});
    }



    render() {
        const { t } = this.props;
        const { pendingApiCall, errors } = this.state;
        const { username, displayName, password, passwordRepeat } = errors;
        return (

            <div className="container">
                <form>
                    <h1 className="text-center">{t("Sign Up")}</h1>
                    <Input
                        name="username"
                        label={t("Username")}
                        error={username}
                        onChange={this.onChange}/>
                    <Input
                        name="displayName"
                        label={t("Display Name")}
                        error={displayName}
                        onChange={this.onChange}/>
                    <Input
                        name="password"
                        label={t("Password")}
                        error={password}
                        onChange={this.onChange}
                        type="password"/>
                    <Input
                        name="passwordRepeat"
                        label={t("Password Repeat")}
                        error={passwordRepeat}
                        onChange={this.onChange}
                        type="password"/>

                    <div className="text-center">
                        <ButtonWithProgress
                            disabled={pendingApiCall || passwordRepeat !== undefined}
                            onClick={this.onClickSignup}
                            pendingApiCall={pendingApiCall}
                            text={t("Sign Up")}
                        />
                    </div>
                </form>
            </div>

        )
    }
}

export default withTranslation()(UserSignupPage);