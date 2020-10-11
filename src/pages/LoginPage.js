import React from 'react';
import {withTranslation} from 'react-i18next';
import { login } from '../api/apiCalls';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import axios from 'axios'


class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            pendingApiCall: false,
            error: null
        }
    }

    componentDidMount() {
        axios.interceptors.request.use( (request) => {
            this.setState({
                pendingApiCall: true
            });
            return request;
        });

        axios.interceptors.response.use((response)=> {
            this.setState({pendingApiCall: false});
            return response;
        }, (error)=> {
            this.setState({pendingApiCall: false});
            throw error;
        })
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
        this.setState({error:null});
        this.setState({pendingApiCall:true});

        try {
            const response = await login(creds);
        }catch (e) {
            this.setState({
                error: e.response.data.message
            })
        }
        this.setState({pendingApiCall:false});
    }

    render() {
        const { username, password, error, pendingApiCall} = this.state;
        const buttonEnabled = username && password;
        const {t} = this.props;

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

export default withTranslation()(LoginPage);