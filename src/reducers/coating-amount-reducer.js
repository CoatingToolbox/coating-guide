import { CoatingAmount } from '../actions/coating-amount-actions.js';

const updateAmount = (state, prop, value) => {
    let coat = new CoatingAmount(state);
    coat[prop] = value;
    return coat;
};

export default function coatingAmountReducer(state = new CoatingAmount(), action, tablet, coating) {
    
    let newState = updateAmount(state, 'filmDensity', coating.filmDensity);
    newState = updateAmount(newState, 'percentTio2', coating.percentTio2);
    newState = updateAmount(newState, 'tabletWeight', tablet.weight);
    newState = updateAmount(newState, 'tabletArea', tablet.totalArea);

    switch(action.type) {
        case "SET_COATING_AMOUNT_COATING_WEIGHT": 
            return updateAmount(state, 'coatingWeight', action.value);
        case "SET_COATING_AMOUNT_WEIGHT_GAIN":
            return updateAmount(state, 'weightGain', action.value);
        case "SET_COATING_AMOUNT_COATING_COVERAGE":
            return updateAmount(state, 'coatingCoverage', action.value);
        case "SET_COATING_AMOUNT_FILM_THICKNESS":
            return updateAmount(state, 'filmThickness', action.value);
        case "SET_COATING_AMOUNT_FILM_OPACITY":
            return updateAmount(state, 'filmOpacity', action.value);
        default:
            return newState;
    }
}
