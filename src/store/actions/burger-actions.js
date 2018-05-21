import axiosInstance from '../../axios';

import * as actionTypes from './action-types';

export const addIngredient  = (ingredient) => {
    return {
        type:actionTypes.ADD_INGREDIENT, 
        ingredient:ingredient
    }
}

export const removeIngredient = (ingredient) => {
    return {
        type:actionTypes.REMOVE_INGREDIENT, 
        ingredient:ingredient
    }
}

const initializeIngredientsDispatcher = (ingredientCount, ingredients) => {
    return {
        type:actionTypes.INITIALIZE_INGREDIENTS,
        burger: ingredientCount,
        ingredients: ingredients
    }
}

const burgerInitializeErrorDispatcher = () => {
    return {
        type: actionTypes.BURGER_INITIALIZE_ERROR
    }
}

export const initializeIngredients = () => {
    return ( dispatch ) => {

       axiosInstance.get('/ingredients.json')
        .then(response => {
            console.log(response);

            let ingredients = [];
            ingredients = ingredients.concat.apply([],
                Object.keys(response.data).map((ingredient, key)=>{
                    return Array(response.data[ingredient]).fill(ingredient);
                })
            );

            dispatch(initializeIngredientsDispatcher(response.data, ingredients));
        })

        .catch(error => {
            console.log(error);
            dispatch(burgerInitializeErrorDispatcher());
        });
    }
}
