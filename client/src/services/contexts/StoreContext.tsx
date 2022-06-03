import { createContext, useContext } from "react";
import type { FC, ReactNode } from "react";

import Store from "../store/store";

interface IStoreState {
  store: Store;
}

const store = new Store();

const ContextStore = createContext<IStoreState>({ store });

const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <ContextStore.Provider value={{ store }}>{children}</ContextStore.Provider>;
};

export const useStore = () => useContext(ContextStore);

export default StoreProvider;
