import React, { Component } from 'react';
import Order from '../../components/order/Order';
import axiosInstance from '../../axios';
import classes from './order-list.css';





class OrderList extends Component {

    state = {
        orders:[]
    }

    componentDidMount() {
        let tempOrders = []
        axiosInstance.get('/orders.json')
            .then(response=>{
                for(var obj in response.data) {
                    tempOrders.push({
                        ...response.data[obj],
                        key:obj
                    })
                }
                console.log(tempOrders)
                this.setState({orders:tempOrders})
                console.log(tempOrders);
            })
            .catch(error=>{console.log(error)});
    }

    render() {
        let content="<b> No Content  </b>"
        if(this.state.orders) {
          content =  <div className={classes.orderList}>
                {
                this.state.orders.map((item,key)=>{
                    return <Order order={item} key={key}/>
                })
                }
            </div>
        }
        console.log(content)
        return(
            content
        )
    }
}


export default OrderList;