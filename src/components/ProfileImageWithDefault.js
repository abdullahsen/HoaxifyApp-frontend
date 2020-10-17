import React from 'react';
import defaultPicture from '../assets/profile.png'

const ProfileImageWithDefault = (props) => {
    const {width=32, heigth=32, image, tempImage } = props


    let userImage = defaultPicture;
    if (image){
        userImage = image;
    }
    return (
        <img
            className="rounded-circle shadow"
            width={width}
            heigth={heigth}
            src={tempImage || userImage}
            alt={`picture of profilee`}/>

    );
};

export default ProfileImageWithDefault;