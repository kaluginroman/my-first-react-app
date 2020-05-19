import React from 'react';
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {HashRouter, Route, withRouter} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from "./components/Header/HeaderContainer";
import Preloader from "./components/common/Preloader/Preloader";
import Sidebar from './components/Sidebar/Sidebar';
import Login from "./components/Login/Login";
import {initializeApp} from "./redux/app-reducer";
import './App.css';
import store from "./redux/redux-store";
import {WithSuspenseComponent} from "./hoc/WithSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return (
        <Preloader/>
      )
    }

    return (
      <div className="App-wrapper">
        <HeaderContainer/>
        <Sidebar/>
        <div className="App-content">
          <Route path="/profile/:userId?" render={WithSuspenseComponent(ProfileContainer)}/>
          <Route path="/dialogs" render={WithSuspenseComponent(DialogsContainer)}/>
          <Route path="/users" render={() => <UsersContainer/>}/>
          <Route path="/login" render={() => <Login/>}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
};

const AppContainer = compose(withRouter,
  connect(mapStateToProps, {initializeApp}))(App);

const MainApp = (props) => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    </HashRouter>
  )
}

export default MainApp
