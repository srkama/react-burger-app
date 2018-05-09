import React from 'react';
import classes from './checkout-summary.css';

const checkoutSummary = (props) => {
    console.log(props);
    return (
        <div className={classes.checkoutSummary}>
            <table>
                <thead>
                    <tr>
                        <th>Ingredients</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            Object.keys(props.ingredients).map((item,key)=>{
                                return <tr key={key}><td>{item}</td><td>{props.ingredients[item]}</td></tr>
                            })
                        }
                </tbody>
            </table>
        </div>
    )
}


export default checkoutSummary;