import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../components/hoc/aux';
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/build-controls/BuildControls';
import OrderSummary from '../../components/order-summary/OrderSummary';
import Button from '../../components/user-interface/button/Button';
import classes from './burger-builder.css';
import axiosInstance from '../../axios';
import errorHandler from '../../components/hoc/errorHandler';
import { burgerActions } from '../../store/actions/actions';

class BugerBuilder extends Component {

    state = {
        purchaseStatus: 0,
        purchaseInProgress: false
    }

    componentWillMount() {
        this.props.initializeIngredients();
    }

    initiatePurchase = () => {
        this.setState ({
            purchaseStatus: 1
        })
    }

    cancelPruchase = () => {
        console.log(this.state);
        this.setState({
            purchaseStatus: 0
        })
    }

    checkoutCart = () => {
        console.log(this.props);
        this.props.history.push('/checkout')
    }



    render() {
        console.log(this.state);
        const orderSummary = this.state.purchaseStatus === 1 ? 
                                    <OrderSummary 
                                        purchaseInProgress={this.state.purchaseInProgress} 
                                        orderCompleteAction={this.checkoutCart} 
                                        showAction={this.initiatePurchase} 
                                        closeAction={this.cancelPruchase} 
                                        ingredients={this.props.ingredientCount}/> :
                                    null;
        return (
            <Aux>
                <Burger ingredients={this.props.ingredients}/>
                <p className={classes.totalCost}> 
                    Total Price: Rs. {this.props.totalCost} 
                </p>
                <BuildControls 
                    addIngredient={this.props.onAddIngredient} 
                    removeIngredient={this.props.onRemoveIngredient} 
                    ingredientCount={this.props.ingredientCount}/>
                <div className={classes.orderButton}>
                    <Button type='success' 
                            clicked={this.initiatePurchase} 
                            disabled={!this.props.ingredients.length}> Order Now </Button>
                </div>
                {orderSummary}
            </Aux>
        );
    }

}

const mapPropsToStates = state => {
    return {
        ingredients : state.ingredients,
        ingredientCount: state.burger,
        totalCost: state.totalCost
    }
};

const mapPropsToDispatches = dispatch => {
    return {
        onAddIngredient : (ingredientName) => dispatch(burgerActions.addIngredient(ingredientName)),
        onRemoveIngredient : (ingredientName) => dispatch(burgerActions.removeIngredient(ingredientName)),
        initializeIngredients: () => dispatch(burgerActions.initializeIngredients())
    }   
}

export default connect(mapPropsToStates, mapPropsToDispatches)(errorHandler(BugerBuilder, axiosInstance));