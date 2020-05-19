// import React, { useState } from 'react';
import React from 'react';
import './ProfileInfo.css'
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from '../ProfileStatus/ProfileStatus';
import userPhoto from '../../../../src/assets/img/userPhoto.png';

const Contacts = ({contactTitle, contactValue}) => {
  return (
    <p><span style={{minWidth: "100px", display: "inline-block"}}>{contactTitle}</span>: {contactValue ? contactValue : "---"}</p>
  )
};

const ProfileData = (props) => {
  return (
    <div>
      <p><strong>Looking for a job: </strong>{props.profile.lookingForAJob ? "yes" : "no"}</p>
      {props.profile.lookingForAJob && <p><strong>My professional skills: </strong>{props.profile.lookingForAJobDescription}</p>}
      {props.profile.aboutMe && <p><strong>About me: </strong>{props.profile.aboutMe}</p>}
      {props.profile.contacts && 
        <p>
          <strong>Contacts: </strong>
          <span>
            {Object.keys(props.profile.contacts).map(item => {
              return <Contacts key={item} contactTitle={item} contactValue={props.profile.contacts[item]} />
            })}
          </span>
        </p>
      }
    </div>
  )
}

const ProfileDataForm = (props) => {
  return (
    <div>
      <p><strong>Looking for a job: </strong>{props.profile.lookingForAJob ? "yes" : "no"}</p>
      {props.profile.lookingForAJob && <p><strong>My professional skills: </strong>{props.profile.lookingForAJobDescription}</p>}
      {props.profile.aboutMe && <p><strong>About me: </strong>{props.profile.aboutMe}</p>}
      {props.profile.contacts && 
        <p>
          <strong>Contacts: </strong>
          <span>
            {Object.keys(props.profile.contacts).map(item => {
              return <Contacts key={item} contactTitle={item} contactValue={props.profile.contacts[item]} />
            })}
          </span>
        </p>
      }
    </div>
  )
}

const ProfileInfo = (props) => {

  // const [editMode, setEditMode] = useState(false);
  const editMode = false;

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    } 
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
        {editMode ? <ProfileDataForm profile={props.profile}/> : <ProfileData profile={props.profile}/>}
      </div>
    </div>
  )
}

export default ProfileInfo;