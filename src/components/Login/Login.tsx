import React from 'react';
import './Login.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnProps = {
  captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
  return (
    <form className="auth__form" onSubmit={handleSubmit}>
      {error && <span className="auth__error">{error}</span>}
      <Field validate={[required]} className="auth__input" component={Input} name={"email"} placeholder={"Email"}/>
      <Field validate={[required]} className="auth__input" component={Input} type={"password"} name={"password"}
             placeholder={"Password"}/>
      <div className="auth__container">
        <Field component={"input"} name={"rememberMe"} className="auth__checkbox" type="checkbox"/>
        <span className="auth__checkbox-text">Remember me</span>
      </div>
      {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
      {captchaUrl &&
      <Field validate={[required]} className="auth__input" component={Input} name={"captcha"} placeholder={"Captcha"}/>}

      <button className="auth__button">Login</button>
    </form>
  )
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: 'Login'
})(LoginForm);

type MapStatePropsType = {
  captchaUrl: string | null,
  isAuth: boolean
}
type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void,
}
type LoginFormValuesType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
}
type LoginFormPropertiesType = {

}
const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

  let onSubmit = (formData: LoginFormValuesType) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"}/>
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
  )
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {login})(Login);