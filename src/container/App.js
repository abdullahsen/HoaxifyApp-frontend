import React from 'react';
import { HashRouter, Route, Redirect, Switch} from 'react-router-dom'
import { useSelector } from 'react-redux';
import UserSignupPage from '../pages/UserSignupPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from "../components/LanguageSelector";
import UserPage from "../pages/UserPage";
import HomePage from "../pages/HomePage";
import TopBar from "../components/TopBar";

const App = () =>  {

        const { isLoggedIn } = useSelector((store) => ({isLoggedIn: store.isLoggedIn}));

        return (
            <div>
                <HashRouter>
                    <TopBar/>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        {!isLoggedIn && <Route path="/login" component={LoginPage}/>}
                        <Route path="/signup" component={UserSignupPage}/>
                        <Route path="/user/:username" component={UserPage}/>
                        <Redirect to="/"/>
                    </Switch>
                </HashRouter>
                <LanguageSelector/>
            </div>
        );

}


export default App;
