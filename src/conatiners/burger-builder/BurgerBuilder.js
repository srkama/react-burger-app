import React, { Component } from 'react';
import _ from 'lodash';
import querystring from 'query-string';
import Aux from '../../components/hoc/aux';
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/build-controls/BuildControls';
import OrderSummary from '../../components/order-summary/OrderSummary';
import Button from '../../components/user-interface/button/Button';
import classes from './burger-builder.css';
import axiosInstance from '../../axios';
import errorHandler from '../../components/hoc/errorHandler';




const INGREDIENT_PRICES = {
    'meat': 10,
    'salad': 5,
    'bacon': 4,
    'cheese': 2
};

const BASE_PRICE = 3;

class BugerBuilder extends Component {

    state = {
        ingredients: [],
        ingredientCount: {},
        totalCost: BASE_PRICE,
        purchaseStatus: 0,
        purchaseInProgress: false
    }

    addIngredient = (ingredient) => {
        const ingredients = [ingredient, ...this.state.ingredients];
        const totalCost = this.state.totalCost + INGREDIENT_PRICES[ingredient];
        this.setState ({
            ingredients,
            totalCost
        }, this.getCountOfIngredients);
    }

    componentWillMount() {
        axiosInstance.get('/ingredients.json')
            .then(response=>{
                console.log(response);
                let ingredients = [];
                ingredients = ingredients.concat.apply([],
                    Object.keys(response.data).map((ingredient, key)=>{
                        return Array(response.data[ingredient]).fill(ingredient);
                    })
                );
                console.log(ingredients)

                this.setState({
                    ingredientCount: response.data,
                    ingredients: ingredients
                })
            })
            .catch(error=>{
                console.log(error);
                
            })
    }

    removeIngredient = (ingredient) => {
        let index = this.state.ingredients.indexOf(ingredient);
        const ingredients = [...this.state.ingredients];
        if (index > -1) {
            const totalCost = this.state.totalCost - INGREDIENT_PRICES[ingredient];
            ingredients.splice(index,1);
            this.setState ({
                ingredients,
                totalCost
            }, this.getCountOfIngredients);
        }
    }

    getCountOfIngredients() {
        const ingredientCount = _.countBy(this.state.ingredients);
        this.setState({
            ingredientCount
        })
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
        this.props.history.push('/checkout?'+querystring.stringify(this.state.ingredientCount))
    }



    render() {
        console.log(this.state);
        const orderSummary = this.state.purchaseStatus === 1 ? 
                                    <OrderSummary 
                                        purchaseInProgress={this.state.purchaseInProgress} 
                                        orderCompleteAction={this.checkoutCart} 
                                        showAction={this.initiatePurchase} 
                                        closeAction={this.cancelPruchase} 
                                        ingredients={this.state.ingredientCount}/> :
                                    null;
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <p className={classes.totalCost}> 
                    Total Price: Rs. {this.state.totalCost} 
                </p>
                <BuildControls 
                    addIngredient={this.addIngredient} 
                    removeIngredient={this.removeIngredient} 
                    ingredientCount={this.state.ingredientCount}/>
                <div className={classes.orderButton}>
                    <Button type='success' 
                            clicked={this.initiatePurchase} 
                            disabled={!this.state.ingredients.length}> Order Now </Button>
                </div>
                {orderSummary}
            </Aux>
        );
    }

}

export default errorHandler(BugerBuilder, axiosInstance);