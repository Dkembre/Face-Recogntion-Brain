import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './Brain.png'; 

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br100 shadow-2" options={{max: 55}} style={{height: 120, width:120}}>
                <div className="pa3">
                    <img style={{paddingTop:'6px'}}src={brain} alt='brain'/> 
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;