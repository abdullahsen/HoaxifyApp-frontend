import React from "react";
import { useTranslation } from 'react-i18next'

const Input = (props) => {
    const {label, error, name, onChange, type, defaultValue} = props;
    let className = 'form-control';
    if(type==='file'){
        className+='-file';
    }
    if(error!==undefined){
        className+=' is-invalid';
    }
    const { t } = useTranslation();
    return (
        <div className="form-group">
            <label>{t(label)}</label>
            <input
                className={className}
                name={name}
                onChange={onChange}
                type={type}
                defaultValue={defaultValue}/>
            <div className="invalid-feedback">{error}</div>
        </div>
    )
}
export default Input;