import React, { useState } from 'react';
import './ProfileInfo.css'
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from '../ProfileStatus/ProfileStatus';
import userPhoto from '../../../../src/assets/img/userPhoto.png';
import ProfileDataForm from "./ProfileDataForm";

const Contacts = ({contactTitle, contactValue}) => {
  return (
    <div><span style={{minWidth: "100px", display: "inline-block"}}>{contactTitle}</span>: {contactValue ? contactValue : "---"}</div>
  )
};

const ProfileData = (props) => {
  return (
    <div>
      {props.isOwner && <button onClick={props.goToEditMode}>Edit</button> }
      <div><strong>Full name: </strong>{props.profile.fullName}</div>
      <div><strong>Looking for a job: </strong>{props.profile.lookingForAJob ? "yes" : "no"}</div>
      <div><strong>My professional skills: </strong>{props.profile.lookingForAJobDescription}</div>
      {props.profile.aboutMe && <div><strong>About me: </strong>{props.profile.aboutMe}</div>}
      {props.profile.contacts && 
        <div>
          <strong>Contacts: </strong>
          <span>
            {Object.keys(props.profile.contacts).map(item => {
              return <Contacts key={item} contactTitle={item} contactValue={props.profile.contacts[item]} />
            })}
          </span>
        </div>
      }
    </div>
  )
}

const ProfileInfo = (props) => {

  const {saveProfile} = props;

  const [editMode, setEditMode] = useState(false);

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    } 
  };

  let onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false)
    })
  };

  if (!props.profile) {
    return <Preloader/>
  }
  return (
    <div>
      <div className="profile-info">
        <div>
          <img className="profile-avatar" src={props.profile.photos.large ? props.profile.photos.large : userPhoto} alt="avatar"/>
          {props.isOwner && <input onChange={onMainPhotoSelected} type="file"/>}
        </div>
        <div className="profile-description">
          <span className="profile-name">{props.profile.fullName}</span>
          <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
        </div>
        {editMode
          ? <ProfileDataForm profile={props.profile}
                             onSubmit={onSubmit}
                             initialValues={props.profile}/>
          : <ProfileData profile={props.profile}
                         isOwner={props.isOwner}
                         goToEditMode={() => {setEditMode(true)}}/>}
      </div>
    </div>
  )
}

export default ProfileInfo;