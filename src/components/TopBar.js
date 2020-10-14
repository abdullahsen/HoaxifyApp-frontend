import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation} from 'react-i18next'
import logo from '../assets/hoaxify.png';
import {logoutSuccess} from '../redux/authActions';


const TopBar = (props) => {


        const { t } = useTranslation();
        const dispatch = useDispatch();
        const { isLoggedIn, username } = useSelector((store)=>({isLoggedIn:store.isLoggedIn, username: store.username}));

        const onLogoutSuccess = () => {
            dispatch(logoutSuccess());
        }

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

export default TopBar;