import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import {withTranslation} from 'react-i18next'
import logo from '../assets/hoaxify.png';
import {logoutSuccess} from '../redux/authActions';
class TopBar extends Component {


    render() {
        const {t, isLoggedIn, username, onLogoutSuccess} = this.props;


        let links = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-link">
                    <Link to="/login">
                        {t('Login')}
                    </Link>
                </li>
                <li className="nav-link">
                    <Link to="/signup">
                        {t('Sign Up')}
                    </Link>
                </li>
            </ul>
        );

        if (isLoggedIn) {
            links = (
                <ul className="navbar-nav ml-auto">
                    <li>
                        <Link className="nav-link" to={`/user/${username}`}>{username}</Link>
                    </li>
                    <li className="nav-link" style={{cursor: "pointer"}} onClick={onLogoutSuccess}>
                        {t('Logout')}
                    </li>
                </ul>
            )
        }




        return (
            <div className="shadow-sm bg-light mb-2">
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="60" alt="logo"/> Hoaxify
                    </Link>
                    {links}
                </nav>
            </div>
        );


    }
}

const TopBarWithTranslation = withTranslation()(TopBar);

const mapStateToProps = (store) => {
    return{
        isLoggedIn: store.isLoggedIn,
        username:store.username
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onLogoutSuccess:function () {
            return dispatch(logoutSuccess());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBarWithTranslation);