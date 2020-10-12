import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withTranslation} from 'react-i18next'
import logo from '../assets/hoaxify.png';

class TopBar extends Component {


    render() {
        const {t} = this.props;
        return (
            <div className="shadow-sm bg-light mb-2">
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="60" alt="logo"/> Hoaxify
                    </Link>
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
                </nav>
            </div>
        );
    }
}

export default withTranslation()(TopBar);