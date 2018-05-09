import React from 'react';
import PropTypes from 'prop-types';
import classes from './build-control.css';


const BuildControl =  (props) => {
    
    let ingredient = null;
    let control = null;
    let count = props.count ? props.count : 0;

   if (props.ingredient === "meat") {
        ingredient = classes.steak
    } else if (props.ingredient === "cheese") {
        ingredient = classes.cheese
    } else if (props.ingredient === "salad") {
        ingredient = classes.salad
    } else if (props.ingredient === "bacon") {
        ingredient = classes.bacon
    }

    if(ingredient) {
        control = 
        <div className={classes.buildControl}>
                <div className={ingredient}></div>
                <div className={classes.count}>{count}</div>
                <div>
                    <button className={classes.incOrdec} onClick={()=>props.removeIngredient(props.ingredient)}>-</button>
                    <button className={classes.incOrdec} onClick={()=>props.addIngredient(props.ingredient)}>+</button>
                </div>
        </div>
    }

    return control;
}

export default BuildControl;

BuildControl.propTypes = {
    ingredient:PropTypes.oneOf(['salad', 'bacon', 'cheese', 'meat']),
}