import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import Input from "./Input";
import {updateUser, deleteUser} from '../api/apiCalls';
import {useApiProgress} from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";
import {logoutSuccess, updateSuccess} from '../redux/authActions'
import Modal from "./Modal";


const ProfileCard = (props) => {

    const [user, setUser] = useState({});
    const {username: loggedInUsername} = useSelector((store) => ({username: store.username}));
    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const [editable, setEditable] = useState(false);
    const [newImage, setNewImage] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const routeParams = useParams();
    const {t} = useTranslation();
    const pathUsername = routeParams.username;
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        setUser(props.user)
    }, [props.user])


    useEffect(() => {
        setEditable(pathUsername === loggedInUsername)
    }, [pathUsername, loggedInUsername]);

    const {username, displayName, image} = user;

    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);
    const pendingApiCallForDeleteUser = useApiProgress('delete',`/api/1.0/users/${username}`,true);

    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined);
            setNewImage(undefined);
        } else {
            setUpdatedDisplayName(displayName);
        }

    }, [inEditMode, displayName]);

    useEffect(() => {
        setValidationErrors((previousValidationErrors) => (
            {...previousValidationErrors, displayName: undefined}))
    }, [updatedDisplayName]);

    useEffect(() => {
        setValidationErrors((previousValidationErrors) => (
            {...previousValidationErrors, image: undefined}))
    }, [newImage])

    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    const onClickSave = async (event) => {
        event.preventDefault();

        let image;
        if (newImage) {
            image = newImage.split(',')[1];
        }

        try {
            const body = {displayName: updatedDisplayName, image};
            const response = await updateUser(username, body);
            setUser(response.data);
            setInEditMode(false);
            dispatch(updateSuccess(response.data))
        } catch (error) {
            setValidationErrors(error.response.data.validationErrors);
        }
    }


    const onClickCancel = ( ) => {
        setModalVisible(false);
    }

    const onClickDelete =  async () => {
        await deleteUser(username);
        setModalVisible(false);
        dispatch(logoutSuccess());
        history.push("/")
    }

    const {displayName: displayNameError, image: imageError} = validationErrors;

    return (
        <div className="card text-center">
            <div className="card-header">
                <ProfileImageWithDefault
                    className="rounded-circle shadow"
                    image={image}
                    tempimage={newImage}
                    alt={`${username} profile`}
                    heigth={196}
                    width={196}/>
            </div>
            <div className="card-body">
                {!inEditMode && (
                    <>
                        <h3>{`${displayName} @${username}`}</h3>
                        {editable &&
                        (<>
                                <div>
                                    <button className="btn btn-success d-inline-flex"
                                            onClick={() => setInEditMode(true)}>
                                        <span className="material-icons">
                                            create
                                        </span>{t('Edit')}
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={()=>setModalVisible(true)}
                                        className="btn btn-danger m-2">
                                        <span className="material-icons">person_remove</span>{t('Delete My Account')}
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}
                {
                    inEditMode && (
                        <div>
                            <Input
                                label="Change Display Name"
                                defaultValue={displayName}
                                error={displayNameError}
                                onChange={(event) => {
                                    setUpdatedDisplayName(event.target.value)
                                }}/>
                            <Input
                                error={imageError}
                                type="file"
                                onChange={onChangeFile}/>
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
            <Modal
                okButton={t('Delete User')}
                onClickCancel={onClickCancel}
                onClickOk={onClickDelete}
                pendingApiCall={pendingApiCallForDeleteUser}
                title={t('Delete User')}
                message={<div>
                    <div>
                        <strong>{t('Are you sure to delete your profile?')}</strong>
                    </div>
                    <span>{username}</span>
                </div>
                }
                visible={modalVisible}/>
        </div>
    );
};


export default (ProfileCard);