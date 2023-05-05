const  axios = require('axios');
const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default
const createStore = redux.legacy_createStore
const applyMiddleWare = redux.applyMiddleware

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

function fetchUsersRequested() {
    return {
        type: FETCH_USERS_REQUESTED
    }
}
function fetchUsersSucceeded(users) {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users
    }
}
function fetchUsersFailed(error) {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
        }
        case FETCH_USERS_SUCCEEDED:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILED:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

function fetchUsers() {
    return function(dispatch) {
        dispatch(fetchUsersRequested())
        axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            const users = res.data.map(user => user.id)
            dispatch(fetchUsersSucceeded(users))
        }).catch(err => {
            dispatch(fetchUsersFailed(err.message))
        })
    }
}

const store = createStore(reducer,applyMiddleWare(thunkMiddleware));

const unSubscribe = store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(fetchUsers())

// unSubscribe()