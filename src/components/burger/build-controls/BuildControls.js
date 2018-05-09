import React from 'react';
import BuildControl from './build-control/BuildControl';
import classes from './build-controls.css';



const BuildControls =  (props) => {
    const ingredients = ['meat', 'cheese', 'bacon', 'salad'];
    return (
        <div className={classes.buildControls}>
           {ingredients.map((ingredient, index)=> {
               return <BuildControl 
                        key={index} 
                        ingredient={ingredient} 
                        addIngredient={props.addIngredient} 
                        removeIngredient={props.removeIngredient} 
                        count={props.ingredientCount[ingredient] ? props.ingredientCount[ingredient] : 0 } />;
           })}
        </div>
    );
}

export default BuildControls;

