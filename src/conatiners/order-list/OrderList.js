import React, { Component } from 'react';
import Order from '../../components/order/Order';
import axiosInstance from '../../axios';
import classes from './order-list.css';
import { orderActions } from '../../store/actions/actions';
import { connect } from 'react-redux';
import errorHandler from '../../components/hoc/errorHandler';





class OrderList extends Component {

    componentDidMount() {
        this.props.fetchOrders();    
    }

    render() {
        let content="<b> No Content </b>"
        if(this.props.orders) {
          content =  <div className={classes.orderList}>
                {
                this.props.orders.map((item,key)=>{
                    return <Order order={item} key={key}/>
                })
                }
            </div>
        }
        return(
            content
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        fetchOrders: () => dispatch(orderActions.fetchOrders())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(OrderList, axiosInstance));