import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';

const UserListItem = (props) => {
    const { username, image, displayName } = props.user;

    return (
        <Link to={`/user/${username}`} className="list-group-item list-group-item-action">
            <ProfileImageWithDefault heigth={32} width={32} className="rounded-circle shadow" user={{username, image, displayName}}/>
            <span className="pl-2">
            {`${displayName} @${username}`}
            </span>
        </Link>

    );
};

export default UserListItem;