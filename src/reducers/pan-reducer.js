import { Pan } from '../actions/pan-actions.js';


const updatePan = (state, prop, value) => {
    let pan = new Pan(state);
    pan[prop] = value;
    return pan;
};

export default function panReducer(state = new Pan(), action) {
    
    switch(action.type) {
        case "SET_PAN_NICKNAME":
            return Object.assign({}, state, {nickname: action.value});
        case "SET_PAN_MODEL_NAME":
            return Object.assign({}, state, {modelName: action.value});
        case "SET_PAN_MANUFACTURER_NAME":
            return Object.assign({}, state, {manufacturerName: action.value});
        case "SET_PAN_COMPANY_NAME":
            return Object.assign({}, state, {companyName: action.value});
        case "SET_PAN_CONTACT_NAME":
            return Object.assign({}, state, {contactName: action.value});
        case "SET_PAN_CONTACT_EMAIL":
            return Object.assign({}, state, {contactEmail: action.value});
        case "SET_PAN_COMPANY_LOCATION":
            return Object.assign({}, state, {companyLocation: action.value});
        case "SET_PAN_BAFFLE_TYPE":
            return Object.assign({}, state, {baffleType: action.value});
        case "SET_PAN_BAFFLE_COUNT":
            return Object.assign({}, state, {baffleCount: action.value});
        case "SET_PAN_BAFFLE_HEIGHT":
            return Object.assign({}, state, {baffleHeight: action.value});
        case "SET_PAN_GUN_MAKE":
            return Object.assign({}, state, {gunMake: action.value});
        case "SET_PAN_GUN_MODEL":
            return Object.assign({}, state, {gunModel: action.value});
        case "SET_PAN_GUN_DISTANCE":
            return Object.assign({}, state, {gunToGunDistance: action.value});
        case "SET_PAN_MAX_AIRFLOW":
            return Object.assign({}, state, {maxAirflow: action.value});
        case "SET_PAN_AIRFLOW_TYPE":
            return Object.assign({}, state, {airflowType: action.value});
        case "SET_PAN_PERFORATION_TYPE":
            return Object.assign({}, state, {perforationType: action.value});
        case "SET_PAN_MAIN_DIAMETER":
            return updatePan(state, 'mainDiameter', action.value);
        case "SET_PAN_OPENING_DIAMETER":
            return updatePan(state, 'openingDiameter', action.value);
        case "SET_PAN_WALL_WIDTH":
            return updatePan(state, 'wallWidth', action.value);
        case "SET_PAN_BRIM_WIDTH":
            return updatePan(state, 'brimWidth', action.value);
        case "LOAD_PAN_FROM_LIBRARY":
            return new Pan(action.value);
        default:
            return state;
    }
}