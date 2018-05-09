import React, { Component } from 'react';
import Layout from '../layout/layout';
import BurgerBuilder from "../burger-builder/BurgerBuilder";
import { Route }  from 'react-router-dom';
import Checkout  from '../checkout/Checkout';
import OrderList from '../order-list/OrderList';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Route path="/orders-list" exact component={OrderList}></Route>
        <Route path="/checkout" component={Checkout}></Route>
      </Layout>
    );
  }
}

export default App;
