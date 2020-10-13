import React from 'react';
import {withTranslation} from 'react-i18next';
import { connect } from 'react-redux'
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import {withApiProgress} from "../shared/ApiProgress";
import {loginHandler} from '../redux/authActions';



class LoginPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            error: null
        }
    }


    onChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]:value,
            error: null
        })
    }

    onClickLogin = async (event) => {
        event.preventDefault();
        const {username, password} = this.state;
        const creds = {username, password};
        const { history, dispatch } = this.props;
        const { push } = history;

        this.setState({error:null});

        try {
            await dispatch(loginHandler(creds));
            push('/');
        }catch (e) {

            this.setState({
                error: e.response.data.message
            })
        }
    }

    render() {
        const { username, password, error} = this.state;
        const buttonEnabled = username && password;
        const {t, pendingApiCall} = this.props;

        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t("Login")}</h1>
                    <Input
                        name="username"
                        label={t("Username")}
                        onChange={this.onChange}/>

                    <Input
                        name="password"
                        label={t("Password")}
                        onChange={this.onChange}
                        type="password"/>
                    {error && <div className="alert alert-danger" role="alert">
                        {error}
                    </div>}

                    <div className="text-center">
                        <ButtonWithProgress
                            disabled={pendingApiCall || !buttonEnabled}
                            onClick={this.onClickLogin}
                            pendingApiCall={pendingApiCall}
                            text={t("Login")}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

const LoginPageWithTranslation = withTranslation()(LoginPage);

const LoginPageWithApiProgress = withApiProgress(LoginPageWithTranslation, '/api/1.0/auth')

export default connect()(LoginPageWithApiProgress);