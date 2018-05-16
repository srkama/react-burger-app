import _ from 'lodash';
import * as actions from './actions';


const INGREDIENT_PRICES = {
    'meat': 10,
    'salad': 5,
    'bacon': 4,
    'cheese': 2
};

const BASE_PRICE = 3;

const initialState = {
    ingredients: [],
    burger:{},
    totalCost:BASE_PRICE
}



const getCountOfIngredients = (ingredients) => {
    const burger = _.countBy(ingredients);
    return burger;
}

const burgerReducer = (state = initialState, action) => {

    console.log(action);

    switch (action.type) {

        case actions.ADD_INGREDIENT:
            let ingredients = [...state.ingredients, action.ingredient];
            let totalCost = state.totalCost + INGREDIENT_PRICES[action.ingredient];
            console.log (totalCost)
            return {
                ...state,
                ingredients:ingredients,
                burger:getCountOfIngredients(ingredients), 
                totalCost
            }

        case actions.REMOVE_INGREDIENT:
            let index = state.ingredients.indexOf(action.ingredient);
            ingredients = [...state.ingredients];
            console.log(index)
            totalCost = state.totalCost
            if (index !== -1) {
                ingredients.splice(index,1)
                totalCost = totalCost - INGREDIENT_PRICES[action.ingredient];
                console.log(ingredients)
            }
            
            return {
                ...state,
                ingredients: ingredients,
                burger:getCountOfIngredients(ingredients),
                totalCost
            }

        default:
            return state
    }
}

export default burgerReducer;