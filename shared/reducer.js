import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const initialState = {};
function inventory(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_AUTH':
      return Object.assign({}, state, {
        user: action.err ? undefined : action.user,
        authErr: action.err,
        authEmail: action.email,
        groups: action.groups || state.groups,
        initialLoadComplete: state.initialLoadComplete || (!action.user || !!action.groups)
      });

    case 'FETCH_USERS':
      return Object.assign({}, state, {
        users: action.users || {}
      });

    case 'FETCH_ITEMS':
      return Object.assign({}, state, {
        items: action.items || {}
      });

    case 'FETCH_SALES':
      return Object.assign({}, state, {
        sales: action.items || {}
      });

    case 'FETCH_CUSTOMERS':
      return Object.assign({}, state, {
        customers: action.items || {}
      });

    case 'UPDATE_USER':
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          uid: action.uid,
          ...action.update
        })
      });


    default:
      return state;
  }
}


const rootReducer = combineReducers({
  inventory,
  form: formReducer
});

export default rootReducer;