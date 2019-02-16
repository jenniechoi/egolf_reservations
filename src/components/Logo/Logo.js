import React from 'react';
import './Logo.css';
import egolf_logo from './egolflogo.png';

const Logo = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
        return (
            <div onClick = {() =>onRouteChange('Calendar')} className = 'logo'>
                <img alt = "logo" src = {egolf_logo}/>
            </div>
        )
    } else {
        return (
            <div className = 'logo'>
                <img alt = "logo" src = {egolf_logo}/>
            </div>
        )
    }
}

export default Logo;