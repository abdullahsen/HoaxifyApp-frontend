import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import Input from "./Input";
import {updateUser} from '../api/apiCalls';
import {useApiProgress} from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";


const ProfileCard = (props) => {

    const [user, setUser] = useState({});
    const {username: loggedInUsername} = useSelector((store) => ({username: store.username}));
    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const [editable, setEditable] = useState(false);
    const [newImage, setNewImage] = useState();
    const routeParams = useParams();
    const {t} = useTranslation();
    const pathUsername = routeParams.username;


    useEffect(() => {
        setUser(props.user)
    }, [props.user])


    useEffect(()=>{
        setEditable(pathUsername === loggedInUsername)
    },[pathUsername, loggedInUsername]);

    const {username, displayName, image} = user;

    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);

    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined);
            setNewImage(undefined);
        } else {
            setUpdatedDisplayName(displayName);
        }

    }, [inEditMode, displayName])

    const onChangeFile = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    const onClickSave = async (event) => {
        event.preventDefault();
        try {
            const body = {displayName: updatedDisplayName}
            const response = await updateUser(username, body);
            setUser(response.data);
            setInEditMode(false);
        } catch (e) {

        }
    }

    return (
        <div className="card text-center">
            <div className="card-header">
                <ProfileImageWithDefault
                    image={image}
                    tempImage={newImage}
                    heigth={196}
                    width={196}/>
            </div>
            <div className="card-body">
                {!inEditMode && (
                    <>
                        <h3>{`${displayName} @${username}`}</h3>
                        {editable && <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
                            <span className="material-icons">
                                create
                            </span>{t('Edit')}
                        </button>}
                    </>
                )}
                {
                    inEditMode && (
                        <div>
                            <Input label="Change Display Name" defaultValue={displayName} onChange={(event) => {
                                setUpdatedDisplayName(event.target.value)
                            }}/>
                            <input type="file" onChange={onChangeFile}/>
                            <div>
                                <ButtonWithProgress
                                    className="btn btn-primary d-inline-flex"
                                    onClick={onClickSave}
                                    disabled={pendingApiCall}
                                    pendingApiCall={pendingApiCall}
                                    text={
                                        <>
                                            <span className="material-icons">save</span>{t('Save')}
                                        </>
                                    }>

                                </ButtonWithProgress>
                                <button
                                    disabled={pendingApiCall}
                                    className="btn btn-light d-inline-flex ml-1"
                                    onClick={() => setInEditMode(false)}>
                                    <span className="material-icons">cancel</span>{t('Cancel')}
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};


export default (ProfileCard);