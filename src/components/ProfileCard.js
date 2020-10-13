import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username;
    const loggedInUsername = props.username;
    let message = 'We can not edit';
    if(pathUsername === loggedInUsername){
        message = 'We can edit';
    }

    return (
        <div>
            {message}
        </div>
    );
};

const mapStateToProps = store => {
    return {
        username: store.username
    }
}

export default connect(mapStateToProps,null)(withRouter(ProfileCard));