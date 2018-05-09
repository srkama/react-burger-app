import React from 'react';
import BurgerIngredient from './burger-ingredients/BurgerIngredient'
import classes from './burger.css';

const Burger = (props)=>{
    let ingredients = props.ingredients;
    let burgerIngredients = ingredients.map((value, key)=>{
        return <BurgerIngredient ingredient={value} key={key}/>
    })
    return(
        <div className={classes.burger}>
            <BurgerIngredient ingredient="top-bread"/>
                {burgerIngredients}
            <BurgerIngredient ingredient="bottom-bread"/>
        </div>
    );
}

export default Burger;