import React from 'react';
import {signup} from '../api/apiCalls';
import Input from "../components/Input";

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


    onChange = event => {
        const {name, value} = event.target;
        const errors = {...this.state.errors};

        if (name === 'password' || name === 'passwordRepeat'){
            if ( name === 'password' && value !== this.state.passwordRepeat){
               errors.passwordRepeat = 'Passwords mismatch';
            }else if (name === 'passwordRepeat' && value !==this.state.password){
                errors.passwordRepeat = 'Passwords mismatch';
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

    onClickSignup = async (event) => {
        event.preventDefault();
        const {username, displayName, password} = this.state;
        const body = {
            username,
            displayName,
            password
        }
        this.setState({pendingApiCall: true });

        try {
            const response = await signup(body);
        }catch (err) {
            if(err.response.data.validationErrors){
                this.setState({
                    errors:err.response.data.validationErrors
                })
            }
        }

        this.setState({pendingApiCall: false});
    }

    render() {
        const { pendingApiCall, errors } = this.state;
        const { username, displayName, password, passwordRepeat } = errors;
        return (

            <div className="container">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <Input
                        name="username"
                        label="Username"
                        error={username}
                        onChange={this.onChange}/>
                    <Input
                        name="displayName"
                        label="Display Name"
                        error={displayName}
                        onChange={this.onChange}/>
                    <Input
                        name="password"
                        label="Password"
                        error={password}
                        onChange={this.onChange}
                        type="password"/>
                    <Input
                        name="passwordRepeat"
                        label="Password Repeat"
                        error={passwordRepeat}
                        onChange={this.onChange}
                        type="password"/>

                    <div className="text-center">
                        <button
                            disabled={pendingApiCall || passwordRepeat !== undefined}
                            className="btn btn-primary"
                            onClick={this.onClickSignup}>
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                            Sign Up
                        </button>
                    </div>

                </form>
            </div>

        )
    }
}

export default UserSignupPage;