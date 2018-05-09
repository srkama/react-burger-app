import React from 'react';
import Modal from '../user-interface/modal/Modal';
import Button from '../user-interface/button/Button';

import classes from '../order-summary/ordersummary.css'

const orderSummary = (props) => {
    return (
        <Modal show={true} showAction={props.showAction} closeAction={props.closeAction}>
            <div className={classes.orderSummary}>
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
            <div className={classes.orderSummary}>
            Proceed to checkOut? 
            <Button type="success" clicked={props.orderCompleteAction}> {props.purchaseInProgress ? 'Placing Order!' : 'Ok'} </Button>
            <Button type="cancel" clicked={()=>console.log("order dropped")}> Cancel </Button>
            </div>
        </Modal>
    )
}


export default orderSummary;