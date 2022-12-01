import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
        if (isSignedIn) {
            return (
        <nav onClick={() => onRouteChange('signin')}>
            <p>Sign Out</p>
        </nav>
            )
        } else {
            return (
            <nav >
                <p onClick={() => onRouteChange('signin')}>Sign In</p>
                <p onClick={() => onRouteChange('register')}>Register</p>
            </nav>
            
            )
        }
}

export default Navigation;