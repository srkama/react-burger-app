import React from 'react';
import classes from './button.css';

const button = (props) => {
    let type = "";

    if (props.type === "success") {
        type = classes.success 
     } else if (props.type === "cancel") {
        type = classes.cancel
     }

    return (
        <button className={type} onClick={(event)=>{event.stopPropagation(); props.clicked();}}disabled={props.disabled}>
            {props.children}
        </button>
    )
}

export default button;