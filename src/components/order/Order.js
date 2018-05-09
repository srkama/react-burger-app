import React from 'react';
import classes from './order.css'

const order = (props) => {
    const ingredients = Object.keys(props.order.burger);
    console.log(ingredients);
    const ingredientsTable =  ingredients.map((ingredient, key)=>{
        return <tr key={key}><td>{ingredient}</td><td>{props.order.burger[ingredient]}</td></tr>
    });
    console.log(ingredientsTable);
    return (
        <div className={classes.order}>
            <table>
                <thead>
                    <tr>
                        <td>Ingredient</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                {
                    ingredientsTable
                }
                </tbody>
            </table>
            <div className={classes.priceAmount}>
                Amount
            </div>
        </div>
    )
}


export default order;