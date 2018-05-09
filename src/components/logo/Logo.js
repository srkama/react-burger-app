import React from 'react';
import classes from './logo.css';
import burger from '../../assets/svgs/burger.svg';

const logo = (props) => {
    return (
        <div className={classes.logo}>
            <img src = {burger} alt='logo'/>
        </div>
    )
}


export default logo;