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
        default:
            return newState;
    }
}
