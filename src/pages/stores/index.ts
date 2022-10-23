import { accounts } from './accounts/index';
import { createContext, useContext } from 'react';
import { userStore } from './users/index';

export const Store = {
	userStore,
	accounts,
};
const Context = createContext(Store);
export const ContextProvider = Context.Provider;
export const useStore = () => useContext(Context);
