import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
const persistor = persistStore(store)

export { store, persistor }
