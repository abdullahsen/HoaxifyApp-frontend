import React from 'react';
import { Link } from 'react-router-dom';
import defaultPicture from '../assets/profile.png'

const UserListItem = (props) => {
    const { username, image, displayName } = props.user;
    let userImage = defaultPicture;

    if(image){
        userImage = image;
    }
    return (
        <Link to={`/user/${username}`} className="list-group-item list-group-item-action">
            <img className="rounded-circle" width="32" height="32" src={userImage} alt={`picture of ${displayName}`}/>
            <span className="pl-2">
            {`${displayName} @${username}`}
            </span>
        </Link>

    );
};

export default UserListItem;