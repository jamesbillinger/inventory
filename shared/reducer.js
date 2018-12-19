import { combineReducers } from "redux";
import findIndex from 'lodash/findIndex';
import { reducer as formReducer } from "redux-form";


const initialState = {
  popovers: []
};
function inventory(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_AUTH":
      return Object.assign({}, state, {
        user: action.err ? undefined : action.user,
        authErr: action.err,
        authEmail: action.email,
        groups: action.groups || state.groups,
        initialLoadComplete:
          state.initialLoadComplete || (!action.user || !!action.groups)
      });

    case "FETCH_USERS":
      return Object.assign({}, state, {
        users: action.users || {}
      });

    case "FETCH_ITEMS":
      return Object.assign({}, state, {
        items: action.items || {}
      });

    case "FETCH_SALES":
      return Object.assign({}, state, {
        sales: action.items || {}
      });

    case "FETCH_CUSTOMERS":
      return Object.assign({}, state, {
        customers: action.items || {}
      });

    case "UPDATE_USER":
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          uid: action.uid,
          ...action.update
        })
      });

    case "OPEN_POPOVER":
      var newKey = 0;
      if (state.popovers && state.popovers.length > 0) {
        state.popovers.map(p => {
          if (p.key > newKey) {
            newKey = p.key;
          }
        });
        newKey++;
      }
      return Object.assign({}, state, {
        popovers: [
          ...(state.popovers || []),
          {
            key: newKey,
            component: action.component,
            props: action.props,
            children: action.children
          }
        ]
      });
    case "CLOSE_POPOVER":
      var i = findIndex(state.popovers, { key: action.key });
      if (i > -1) {
        return Object.assign({}, state, {
          popovers: [
            ...state.popovers.slice(0, i),
            ...state.popovers.slice(i + 1)
          ]
        });
      } else {
        return state;
      }

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  inventory,
  form: formReducer
});

export default rootReducer;
