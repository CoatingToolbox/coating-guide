import { Tablet } from '../actions/tablet-actions.js';

const updateTablet = (state, prop, value) => {
    let tablet = new Tablet(state);
    tablet[prop] = value;
    return tablet;
};

export default function tabletReducer(state = new Tablet(), action) {
    
    switch(action.type) {
        case "SET_TABLET_PRODUCT_NAME": 
            return Object.assign({}, state, {productName: action.value});
        case "SET_TABLET_ACTIVE_NAME": 
            return Object.assign({}, state, {activeName: action.value});
        case "SET_TABLET_FORMULATION_NAME": 
            return Object.assign({}, state, {formulationName: action.value});
        case "SET_TABLET_DOSAGE_FORM": 
            return Object.assign({}, state, {dosageForm: action.value});
        case "SET_TABLET_PRODUCT_TYPE": 
            return Object.assign({}, state, {productType: action.value});
        case "SET_TABLET_COMPANY_LOCATION": 
            return Object.assign({}, state, {companyLocation: action.value});
        case "SET_TABLET_COMPANY_NAME": 
            return Object.assign({}, state, {companyName: action.value});
        case "SET_TABLET_CONTACT_NAME": 
            return Object.assign({}, state, {contactName: action.value});
        case "SET_TABLET_CONTACT_EMAIL": 
            return Object.assign({}, state, {contactEmail: action.value});
        case "SET_TABLET_SHAPE": 
            return updateTablet(state, 'shape', action.value);
        case "SET_TABLET_LENGTH": 
            return updateTablet(state, 'length', action.value);
        case "SET_TABLET_WIDTH": 
            return updateTablet(state, 'width', action.value);
        case "SET_TABLET_TOTAL_THICKNESS": 
            return updateTablet(state, 'totalThickness', action.value);
        case "SET_TABLET_BAND_THICKNESS": 
            return updateTablet(state, 'bandThickness', action.value);
        case "SET_TABLET_WEIGHT": 
            return updateTablet(state, 'weight', action.value);
        case "SET_TABLET_WEIGHT_STDEV": 
            return updateTablet(state, 'weightStdev', action.value);
        case "SET_TABLET_BULK_DENSITY": 
            return updateTablet(state, 'bulkDensity', action.value);
        default:
            return state;
    }
}
