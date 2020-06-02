import React from 'react';
import logo from './svg/carpincho.png';



export default function Header() {
    return (
    <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
           {/*eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <h1> ➕➖Math Quiz➖➕</h1>
    </div>
    );
    
}