import _ from 'lodash';
import * as actions from './actions';


const initialState = {
    ingredients: [],
    ingredientCount:{},
    totalPrice:0
}

const getCountOfIngredients = (ingredients) => {
    const ingredientCount = _.countBy(ingredients);
    return ingredientCount;
}

const burgerReducer = (state = initialState, action) => {

    console.log(action);

    switch (action.type) {

        case actions.ADD_INGREDIENT:
            let ingredients = [...state.ingredients, action.ingredient];
            console.log(ingredients)
            return {
                ...state,
                ingredients:ingredients,
                ingredientCount:getCountOfIngredients(ingredients)
            }

        case actions.REMOVE_INGREDIENT:
            let index = state.ingredients.indexOf(action.ingredient);
            ingredients = [...state.ingredients];
            console.log(index)
            if (index !== -1) {
                ingredients.splice(index,1)
                console.log(ingredients)
            }
            return {
                ...state,
                ingredients: ingredients,
                ingredientCount:getCountOfIngredients(ingredients)
            }

        default:
            return state
    }
}

export default burgerReducer;