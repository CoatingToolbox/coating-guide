import { Batch } from '../actions/batch-actions.js';

const updateBatch = (state, prop, value) => {
    let batch = new Batch(state);
    batch[prop] = value;
    return batch;
};

export default function coatingReducer(state = new Batch(), action, pan, tablet) {

    
    let newState = updateBatch(state, 'bulkDensity', tablet.bulkDensity);
    newState = updateBatch(state, 'tabletWeight', tablet.weight);
    newState = Object.assign({}, newState, new Batch(pan));

    switch(action.type) {
        case "SET_BATCH_VOLUME":
            return updateBatch(newState, 'batchVolume', action.value);
        case "SET_BATCH_TABLET_COUNT":
            return updateBatch(newState, 'tabletCount', action.value);
        case "SET_BATCH_WEIGHT":
            return updateBatch(state, 'batchWeight', action.value);
        case "SET_BATCH_VOLUME_PERCENT":
            return updateBatch(newState, 'batchFillVolumePercent', action.value);
        default:
            return newState;
    }
}
