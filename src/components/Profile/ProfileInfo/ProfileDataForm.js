import React from "react";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import {Field, reduxForm} from "redux-form";

const ProfileDataForm = ({profile, handleSubmit, error}) => {

  return (
    <form onSubmit={handleSubmit}>
      {error && <span className="auth__error">{error}</span>}
      <button>Save</button>

      <div>
        <strong>Full name: </strong>
        <Field validate={[]} className="" component={Input} name={"fullName"} placeholder={"Full name"}/>
      </div>

      <div>
        <strong>Looking for a job: </strong>
        <Field component={"input"} name={"lookingForAJob"} className="" type="checkbox"/>
      </div>

      <div>
        <strong>My professional skills: </strong>
        <Field
          component={Textarea}
          placeholder="Enter your skills..."
          name="lookingForAJobDescription"
          validate={[]}
        />
      </div>

      <div>
        <strong>About me: </strong>
        <Field
          component={Textarea}
          placeholder="All about you..."
          name="aboutMe"
          validate={[]}
        />
      </div>
      <div>

        <strong>Contacts: </strong>
        <span>
            {Object.keys(profile.contacts).map(item => {
              return (
                <div key={item}>
                  <strong>{item}: </strong>
                  <Field validate={[]} className="" component={Input} name={"contacts." + item} placeholder={item}/>
                </div>
              )
            })}
          </span>
      </div>
    </form>
  )
}

const ProfileDataFormReduxForm = reduxForm({form: "edit-profile"})(ProfileDataForm);

export default ProfileDataFormReduxForm;