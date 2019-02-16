import React from 'react';

const ButtonDate = ({onRouteChange}) => {
    return (
        <div className="ph3" style ={{display: 'flex', justifyContent: 'flex-start'}}>
            <a onClick = {() =>onRouteChange('Selectdate')} className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray bg-white" href="#0">
                Select Date
            </a>
        </div>    
    )
}

export default ButtonDate;