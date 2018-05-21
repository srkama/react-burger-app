import _ from 'lodash';
import { actoinTypes } from '../actions/actions';


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
    totalCost:BASE_PRICE,
    burgerIntializeError:false,
    orderID:'',
    purchaseStatus:'0'
}



const getCountOfIngredients = (ingredients) => {
    const burger = _.countBy(ingredients);
    return burger;
}

const burgerReducer = (state = initialState, action) => {

    console.log(action);

    switch (action.type) {

        case actoinTypes.ADD_INGREDIENT:
            let ingredients = [...state.ingredients, action.ingredient];
            let totalCost = state.totalCost + INGREDIENT_PRICES[action.ingredient];
            return {
                ...state,
                ingredients:ingredients,
                burger:getCountOfIngredients(ingredients), 
                totalCost
            }

        case actoinTypes.REMOVE_INGREDIENT:
            let index = state.ingredients.indexOf(action.ingredient);
            ingredients = [...state.ingredients];
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
        
        case actoinTypes.INITIALIZE_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                burger: action.burger,
                purchaseStatus: 0
            }

        case actoinTypes.BURGER_INITIALIZE_ERROR:
            return {
                ...state,
                burgerIntializeError: true
            }

        case actoinTypes.START_PURCHASE:
            return {
                ...state,
                purchaseStatus: 1
            }

        case actoinTypes.PURCHASE_COMPLETED:
            return {
             ...state,
             orderID:action.order,
             purchaseStatus: 2
            }
        
        case actoinTypes.PURCHASE_INIT:
            return {
                ...initialState
            }


        default:
            return state
    }
}

export default burgerReducer;