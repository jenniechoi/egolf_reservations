import React from 'react';

const Navigation = ({onRouteChange, isSignedIn, onSignOut}) => {

    const clickSignOut = () => {
        onSignOut()
        localStorage.setItem("remembered", false)
        onRouteChange('Signin')
    }

    if (isSignedIn) {
        return (
            <nav style ={{display: 'flex', justifyContent: 'flex-end', paddingRight: '45px'}}>
                <p onClick = {() => clickSignOut()} className = 'f3 link dim black underline pointer'>Sign Out</p>
            </nav>
        )
    } else {
        return (
            null
        )
    }
        
}

export default Navigation;