import React from 'react';
import {withTranslation} from 'react-i18next';
import { login } from '../api/apiCalls';
import Input from "../components/Input";
import LanguageSelector from '../components/LanguageSelector';

class UserLoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            pendingApiCall: false
        }
    }

    onChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]:value
        })
    }

    onClickLogin = async (event) => {
        event.preventDefault();
        const {username, password} = this.state;
        const body = {username, password};
        this.setState({pendingApiCall:true});
        try {
            const response = await login(body);
        }catch (e) {

        }
        this.setState({pendingApiCall:false});
    }

    render() {
        const {username, password, pendingApiCall} = this.state;
        const {t} = this.props;

        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t("Login")}</h1>
                    <Input
                        name="username"
                        label={t("Username")}
                        error={username}
                        onChange={this.onChange}/>

                    <Input
                        name="password"
                        label={t("Password")}
                        error={password}
                        onChange={this.onChange}
                        type="password"/>


                    <div className="text-center">
                        <button
                            disabled={pendingApiCall}
                            className="btn btn-primary"
                            onClick={this.onClickLogin}>
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                            {t("Login")}
                        </button>
                    </div>
                    <LanguageSelector/>
                </form>
            </div>
        )
    }
}

export default withTranslation()(UserLoginPage);