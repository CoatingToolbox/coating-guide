import { Coating } from '../actions/coating-actions.js';

const updateCoating = (state, prop, value) => {
    let coat = new Coating(state);
    coat[prop] = value;
    return coat;
};

export default function coatingReducer(state = new Coating(), action) {

    switch(action.type) {
        case 'SET_COATING_PRODUCT_NAME':
            return Object.assign({}, state, {productName: action.value});
        case 'SET_COATING_FORMULA_NAME':
            return Object.assign({}, state, {formulaName: action.value});
        case 'SET_COATING_COLOR':
            return Object.assign({}, state, {color: action.value});
        case 'SET_COATING_RELEASE_TYPE':
            return Object.assign({}, state, {releaseType: action.value});
        case 'SET_COATING_FILM_DENSITY':
            return updateCoating(state, 'filmDensity', action.value);
        case 'SET_COATING_OPACITY':
            return updateCoating(state, 'opacity', action.value);
        case 'SET_COATING_PERCENT_TIO2':
            return updateCoating(state, 'percentTio2', action.value);
        case 'SET_COATING_VISCOSITY_EXPONENT':
            return updateCoating(state, 'viscosityExponent', action.value);
        case 'SET_COATING_VISCOSITY_INTERCEPT':
            return updateCoating(state, 'viscosityIntercept', action.value);
        case 'LOAD_COATING_FROM_LIBRARY':
            return new Coating(action.value);
        default:
            return state;
    }
}
