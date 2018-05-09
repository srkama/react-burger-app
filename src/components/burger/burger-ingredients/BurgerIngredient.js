import React from 'react';
import PropTypes from 'prop-types';
import classes from './burger-ingredients.css';
import Aux from '../../hoc/aux';

const BurgerIngredient =  (props) => {
    let ingredient = null;

    if(props.ingredient === "bottom-bread") {
        ingredient = <div className={classes.BreadBottom}></div>
    } else if (props.ingredient === "top-bread") {
        ingredient = 
        <Aux>
            <div className={classes.BreadTop}>
                <div className={classes.Seeds1}></div>
                <div className={classes.Seeds2}></div>
            </div>
        </Aux>
    } else if (props.ingredient === "meat") {
        ingredient = <div className={classes.Meat}></div>
    } else if (props.ingredient === "cheese") {
        ingredient = <div className={classes.Cheese}></div>
    } else if (props.ingredient === "salad") {
        ingredient = <div className={classes.Salad}></div>
    } else if (props.ingredient === "bacon") {
        ingredient = <div className={classes.Bacon}></div>
    }

    return ingredient;
}

export default BurgerIngredient;

BurgerIngredient.propTypes = {
    ingredient:PropTypes.oneOf(['salad', 'bacon', 'cheese', 'meat', 'top-bread', 'bottom-bread']),
}