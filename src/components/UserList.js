import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next'
import {getUsers} from '../api/apiCalls';
import UserListItem from './UserListItem';
import {useApiProgress} from "../shared/ApiProgress";

const UserList = () => {

    const [page, setPage] = useState({
        content: [],
        size: 3,
        number: 0
    })

    const [loadFailure, setLoadFailure] = useState(false);
    const pendingApiCall = useApiProgress('/api/1.0/users?page');
    const {content: users, last, first} = page;
    const {t} = useTranslation();

    useEffect(() => {
        loadUsers();
    }, [])


    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);

    };

    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadUsers(previousPage);
    }

    const loadUsers = async (page) => {
        setLoadFailure(false);
        try {
            const response = await getUsers(page);
            setPage(response.data);
        } catch (e) {
            setLoadFailure(true);
        }

    };

    let actionDiv = (
        <div>
            {first === false &&
            <button onClick={onClickPrevious} className="btn btn-sm btn-light">{t("Previous")}</button>}
            {last === false &&
            <button onClick={onClickNext} className="btn btn-sm btn-light float-right">{t("Next")}</button>}
        </div>)

    if (pendingApiCall) {
        actionDiv = (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-black-50">
                    <span className="sr-only">{t('Loading...')}</span>
                </div>
            </div>)
    }

    return (
        <div className="card">
            <h3 className="card-header text-center">{t('Users')}</h3>
            <div className="list-group-flush">
                {users.map((user, index) => (
                    <UserListItem user={user} key={user.username}/>
                ))}
            </div>
            {actionDiv}
            {loadFailure && <div className="text-center text-danger">{t('Load Failure')}</div>}

        </div>
    );

}

export default UserList;