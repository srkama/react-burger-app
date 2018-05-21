import axiosInstance from '../../axios';

import * as actionTypes from './action-types';

export const orderCompleteDispatcher = (order) => {
    return {
        type: actionTypes.PURCHASE_COMPLETED,
        order
    }
}

export const startPurchaseDispatcher = () => {
    return {
        type: actionTypes.START_PURCHASE
    }
}

export const orderBurger = (order) => {
    return dispatch => {
        dispatch(startPurchaseDispatcher())
        console.log(order);
        axiosInstance.post("/order.json", order)
            .then(response=>{
                console.log(response)})
            .catch(error => {
                console.log(error)})
    }
}

export const purchaseErrorDispatcher = () => {
    return {
        type: actionTypes.PURCHASE_ERROR
    }
}

