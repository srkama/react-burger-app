import React from 'react';
import classes from './navigation-item.css'
import { Link } from 'react-router-dom'

const naviationItem = (props) => {
    return (
        <li className={classes.navigationItem}>
            <Link to={props.link}>{props.children}</Link>
        </li>
    )
}


export default naviationItem;