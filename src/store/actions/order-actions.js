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
        axiosInstance.post("/order.son", order)
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

export const fetchOrderInitiateDispatcher = () => {
    return {
        type: actionTypes.INITIALIZE_FETCH_ORDERS
    }
}

export const fetchOrderSuccessDispatcher = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderErrorDispatcher = () => {
    return {
        type: actionTypes.FETCH_ORDER_ERROR
    }
}

export const fetchOrders = () => {
    return dispatch => {
        let tempOrders = []
        dispatch(fetchOrderInitiateDispatcher());
        axiosInstance.get('/orders.json')
            .then(response=>{
                for(var obj in response.data) {
                    tempOrders.push({
                        ...response.data[obj],
                        key:obj
                    })
                }
                dispatch(fetchOrderSuccessDispatcher(tempOrders));
            })
            .catch(error=>{dispatch(fetchOrderErrorDispatcher())});
    }
}