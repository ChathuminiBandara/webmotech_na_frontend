import {combineReducers} from 'redux';
import loadingReducer from './loadingReducer';
import cartReducer from './cartReducer';
import totalReducer from "../../redux/reducers/calculationReducer";

const rootReducer = combineReducers({
    loading: loadingReducer,
    cartAdding: cartReducer,
    totalReducer: totalReducer,
});

export default rootReducer;