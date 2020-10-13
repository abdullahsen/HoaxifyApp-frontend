import React, {Component} from 'react';

export const Authentication = React.createContext();

class AuthenticationContext extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn : false,
            username : undefined,
            displayName: undefined,
            image: undefined,
            password: undefined
        }
    }

    onLoginSuccess = authState => {
        this.setState({
            isLoggedIn: true,
            ...authState
        })
    }

    onLogoutSuccess = () => {
        this.setState({
            isLoggedIn: false,
            username : undefined,
            displayName: undefined,
            image: undefined,
            password: undefined
        })
    }

    render() {
        return (
           <Authentication.Provider value={{
               state: {...this.state},
               onLoginSuccess: this.onLoginSuccess,
               onLogoutSuccess: this.onLogoutSuccess
           }} >
               {this.props.children}
           </Authentication.Provider>
        );
    }
}

export default AuthenticationContext;