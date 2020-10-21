import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import {useTranslation} from "react-i18next";
import {postHoax} from '../api/apiCalls';
import {useApiProgress} from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";

const HoaxSubmit = () => {

    const {image} = useSelector(store => ({image: store.image}));
    const [focused, setFocused] = useState(false);
    const [hoax, setHoax] = useState('');
    const [errors, setErrors] = useState({})
    const {t} = useTranslation();

    useEffect(() => {
        if (!focused) {
            setHoax('');
            setErrors({});
        }
    }, [focused]);

    useEffect(()=>{
        setErrors({});
    },[hoax]);

    const pendingApiCall = useApiProgress('post', '/api/1.0/hoaxes');

    const onClickHoaxify = async () => {
        const body = {
            content: hoax
        };

        try {
            await postHoax(body);
            setFocused(false);
        } catch (err) {
            if (err.response.data.validationErrors) {
                setErrors(err.response.data.validationErrors);
            }
        }
    }

    let textAreaClass = 'form-control';
    if(errors.content){
        textAreaClass += ' is-invalid';
    }

    return (
        <div className="card p-1 flex-row">
            <ProfileImageWithDefault
                image={image}
                width="32"
                height="32"
                className="rounded-circle mr-1"/>
            <div className="flex-fill">
                <textarea className={textAreaClass}
                          rows={focused ? "3" : "1"}
                          onChange={event => setHoax(event.target.value)}
                          onFocus={() => setFocused(true)}
                          value={hoax}/>
                <div className="invalid-feedback">{errors.content}</div>
                {focused && (
                    <div className="text-right mt-1">
                        <ButtonWithProgress
                            onClick={onClickHoaxify}
                            className="btn btn-primary"
                            pendingApiCall={pendingApiCall}
                            disabled={pendingApiCall}
                            text="Hoaxify">
                        </ButtonWithProgress>
                        <button
                            className="btn btn-light d-inline-flex ml-1"
                            disabled={pendingApiCall}
                            onClick={() => setFocused(false)}>
                            <span className="material-icons">cancel</span>{t('Cancel')}
                        </button>
                    </div>)}
            </div>

        </div>
    );
};

export default HoaxSubmit;