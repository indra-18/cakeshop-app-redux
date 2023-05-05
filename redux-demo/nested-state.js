const redux = require('redux');
const createStore = redux.legacy_createStore
const UPDATED_STREET = 'UPDATED_STREET'
const produce = require('immer').produce

const initialState = {
    name: 'Indra',
    address: {
        street: '123 Main Street',
        city:'Boston',
        state: 'MA'
    },
}

const updateStreet = (newStreet) =>  {
    return {
    type: UPDATED_STREET,
    payload: newStreet
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATED_STREET:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
        
            return produce(state, (draft) => { // immutable => mutable
                draft.address.street = action.payload
            })
        default:
            return state
    }
}

const store = createStore(reducer);
console.log('Initial State', store.getState());

const unSubscribe = store.subscribe(() => {
    console.log('Updated State', store.getState());
});

store.dispatch(updateStreet('456 street'));
store.dispatch(updateStreet('789 street'));

unSubscribe()