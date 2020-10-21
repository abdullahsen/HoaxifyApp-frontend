import React from 'react';

const HoaxView = (props) => {
    const {content} = props.hoax;
    return (
        <div className="card p-1">
            {content}
        </div>
    );
};

export default HoaxView;