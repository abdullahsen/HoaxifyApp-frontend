import React from 'react';
import { useTranslation } from 'react-i18next';

const Spinner = () => {
    const {t} = useTranslation();

    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-black-50">
                <span className="sr-only">{t('Loading...')}</span>
            </div>
        </div>
    );
};

export default Spinner;