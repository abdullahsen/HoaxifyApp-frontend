import React from 'react';
import defaultPicture from '../assets/profile.png'

const ProfileImageWithDefault = (props) => {
    const {image, tempImage } = props


    let imageSource = defaultPicture;
    if (image){
        imageSource = 'images/'+image;
    }
    return (
        <img
            src={tempImage || imageSource}
            {...props}
            onError={(event)=>{
                event.target.src = defaultPicture
            }}/>
    );
};

export default ProfileImageWithDefault;