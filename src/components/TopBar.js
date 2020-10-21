import React, {Component, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'
import logo from '../assets/hoaxify.png';
import {logoutSuccess} from '../redux/authActions';
import ProfileImageWithDefault from "./ProfileImageWithDefault";


const TopBar = (props) => {


    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isLoggedIn, username, displayName, image} =
        useSelector((store) => (
            {
                isLoggedIn: store.isLoggedIn,
                username: store.username,
                displayName: store.displayName,
                image: store.image
            }));
    const [menuVisible, setMenuVisible] = useState(false);
    const menuArea = useRef(null);

    useEffect(() => {
        document.addEventListener('click', menuClickTracker);
        return () => {
            document.removeEventListener('click', menuClickTracker);
        }
    },[isLoggedIn])

    const menuClickTracker = (event) => {
        if (menuArea.current === null || !menuArea.current.contains(event.target)) {
            setMenuVisible(false);
        }

    }

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
        let dropDownClass = "dropdown-menu p-0 shadow";

        if (menuVisible) {
            dropDownClass += " show";
        }

        links = (
            <ul className="navbar-nav ml-auto" ref={menuArea}>
                <li className="nav-item dropdown">
                    <div className="d-flex" style={{cursor: "pointer"}} onClick={() => setMenuVisible(true)}>
                        <ProfileImageWithDefault className="rounded-circle m-auto" image={image} width="32"
                                                 heighth="32"/>
                        <span className="nav-link dropdown-toggle">{displayName}</span>
                    </div>
                    <div className={dropDownClass}>
                        <Link className="dropdown-item d-flex p-2" to={`/user/${username}`} onClick={()=>setMenuVisible(false)}><span
                            className="material-icons text-info mr-2">person</span>{t('My Profile')}</Link>
                        <span className="dropdown-item d-flex p-2" style={{cursor: "pointer"}}
                              onClick={onLogoutSuccess}>
                           <span className="material-icons text-danger mr-2">exit_to_app</span> {t('Logout')}
                        </span>
                    </div>
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