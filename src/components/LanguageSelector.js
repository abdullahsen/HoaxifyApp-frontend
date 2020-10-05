import React from 'react';
import {withTranslation} from 'react-i18next';
import {changeLanguage} from '../api/apiCalls';

const LanguageSelector = (props) => {

    const onChangeLanguage = (language) => {
        const {i18n} = props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }

    return (
        <div>
            <img
                src="https://www.countryflags.io/tr/flat/24.png"
                alt="Turkish"
                onClick={() => onChangeLanguage('tr')}
                style={{cursor: 'pointer'}}/>
            <img
                src="https://www.countryflags.io/gb/flat/24.png"
                alt="English"
                onClick={() => onChangeLanguage('en')}
                style={{cursor: 'pointer'}}/>
        </div>
    )

}

export default withTranslation()(LanguageSelector);