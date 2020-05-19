import React from 'react';
import preloader from '../../../assets/img/preloader.svg';

const Preloader = (props) => {
    return (
        <div className="App-preloader">
            <img className="App-preloader-icon" src={preloader} alt="preloader"/>
        </div>
    )
}
export default Preloader;