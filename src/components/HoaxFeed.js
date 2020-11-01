import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {getHoaxes, getNewHoaxCount, getOldHoxes, getNewHoaxes} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import HoaxView from "./HoaxView";
import {useApiProgress} from "../shared/ApiProgress";
import Spinner from "./Spinner";


const HoaxFeed = () => {
    const [hoaxPage, setHoaxPage] = useState({content: [], last: true, number: 0});
    const [newHoaxCount, setNewHoaxCount] = useState(0);
    const {t} = useTranslation();
    const {username} = useParams()

    const path = username ? `/api/1.0/users/${username}/hoaxes?page=` : '/api/1.0/hoaxes?page=';
    const initialHoaxLoadProgress = useApiProgress('get', path);

    let lastHoaxId = 0;
    let firstHoaxId = 0;
    if (hoaxPage.content.length > 0) {
        firstHoaxId = hoaxPage.content[0].id;
        const lastHoaxIndex = hoaxPage.content.length - 1;
        lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
    }

    const loadOldHoaxPath = username ? `/api/1.0/users/${username}/hoaxes/` : '/api/1.0/hoaxes/';
    const loadOldHoaxProgress = useApiProgress('get', loadOldHoaxPath + lastHoaxId, true);

    const newHoaxPath = username
        ? `/api/1.0/users/${username}/hoaxes/${firstHoaxId}?direction=after`
        : `/api/1.0/hoaxes/${firstHoaxId}?direction=after`;
    const loadNewHoaxProgress = useApiProgress('get', newHoaxPath, true);

    useEffect(() => {

        const getCount = async () => {
            const response = await getNewHoaxCount(firstHoaxId, username);
            setNewHoaxCount(response.data.count);
        }

        let looper = setInterval(getCount, 5000)

        return function cleanup() {
            clearInterval(looper);
        }


    }, [firstHoaxId, username])

    useEffect(() => {
        const loadHoaxes = async (page) => {
            try {
                const response = await getHoaxes(username, page);
                setHoaxPage((previousHoaxPage) => ({
                    ...response.data,
                    content: [...previousHoaxPage.content, ...response.data.content]
                }))
            } catch (err) {

            }
        };
        loadHoaxes();
    }, [username])


    const loadOldHoaxes = async () => {

        try {
            const response = await getOldHoxes(lastHoaxId, username);
            setHoaxPage((previousHoaxPage) => ({
                ...response.data,
                content: [...previousHoaxPage.content, ...response.data.content]
            }))
        } catch (err) {
            console.log(err)
        }
    }

    const loadNewHoaxes = async () => {
        try {
            const response = await getNewHoaxes(firstHoaxId, username);
            setHoaxPage(previousHoaxPage => ({
                ...previousHoaxPage,
                content: [...response.data, ...previousHoaxPage.content]
            }))
            setNewHoaxCount(0);

        } catch (err) {
            console.log(err);
        }
    }

    const onDeleteHoaxSuccess = id => {
        setHoaxPage(previousHoaxPage => ({
            ...previousHoaxPage,
            content: previousHoaxPage.content.filter(hoax => hoax.id !== id)
        }))
    }


    const {content, last} = hoaxPage;

    if (content.length < 1) {
        return <div className="alert alert-secondary text-center">{initialHoaxLoadProgress ?
            <Spinner/> : t('There is not hoax')}</div>
    }

    return (
        <div>
            {newHoaxCount > 0 && <div
                className="alert alert-secondary text-center mb-1"
                style={{cursor: loadNewHoaxProgress ? "not-allowed" : "pointer"}}
                onClick={loadNewHoaxProgress ? () => {
                } : loadNewHoaxes}>
                {loadNewHoaxProgress ? <Spinner/> : t('There are new hoaxes')}
            </div>}
            {content.map(hoax => <HoaxView hoax={hoax} key={hoax.id} onDeleteHoax={onDeleteHoaxSuccess}/>)}
            {!last && (
                <div
                    className="alert alert-secondary text-center"
                    style={{cursor: loadOldHoaxProgress ? "not-allowed" : "pointer"}}
                    onClick={loadOldHoaxProgress ? () => {
                    } : loadOldHoaxes}>
                    {loadOldHoaxProgress ? <Spinner/> : t('Load old hoaxes')}
                </div>)}
        </div>

    );
};

export default HoaxFeed;