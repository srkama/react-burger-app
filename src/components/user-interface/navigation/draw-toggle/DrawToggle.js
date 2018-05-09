import React from 'react';
import menuHamBurger from '../../../../assets/svgs/menu-hb.svg';
import classes from './drawtoggle.css';

const drawToggle = (props) => {
    return (
        <div className={classes.hambrugerMenu} onClick={props.clicked}>
            <img src={menuHamBurger} alt="Menu"/> 
        </div>
    )
}


export default drawToggle;