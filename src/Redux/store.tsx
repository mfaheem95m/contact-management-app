// store
import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

// Define the root state type
export type RootState = ReturnType<typeof reducer>;

// Create the store with middleware
const store: Store<RootState> = createStore(reducer, applyMiddleware(thunk));

export default store;
