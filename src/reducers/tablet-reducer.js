import { Tablet } from '../actions/tablet-actions.js';


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
            let tablet = new Tablet(state);
            tablet.shape = action.value;
            return Object.assign({}, tablet);
        // case "SET_TABLET":
        //     tablet = action.tablet;
        //     break;
        // case "RESET_TABLET":
        //     tablet = Object.assign({}, state);
        //     break;
        // case "SAVE_TABLET_TO_FIREBASE":
        //     /*global firebase */
        //     action.tablet.firebaseKey = firebase.database().ref('tablets/').push().key;
        //     firebase.database().ref(`tablets/${action.tablet.firebaseKey}`).set(action.tablet);
        //     tablet = action.tablet;
        //     break;
        // case "REPLACE_TABLET_ON_FIREBASE":
        //     if(action.tablet.firebaseKey) {
        //       /*global firebase */
        //       firebase.database().ref(`tablets/${action.tablet.firebaseKey}`).set(action.tablet);
        //     } else {
        //       console.log('could not replace firebase so loaded as new');
        //         action.tablet.firebaseKey = firebase.database().ref('tablets/').push().key;
        //         firebase.database().ref(`tablets/${action.tablet.firebaseKey}`).set(action.tablet);
        //     }
        //     tablet = action.tablet;
        //     break;
        default:
            return state;
    }
}
