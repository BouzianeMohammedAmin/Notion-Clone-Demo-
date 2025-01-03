import { createContext, useContext, ReactNode } from "react";
import { usePageState } from "./usePageState";
import { Page } from "../utils/types";

type AppStateContextType = ReturnType<typeof usePageState>;
const AppStateContext = createContext<AppStateContextType>(
  {} as AppStateContextType,
);

type AppStateContextProviderType = {
  children: ReactNode;
  initialState: Page;
};

export const AppStateProvider = ({
  children,
  initialState,
}: AppStateContextProviderType) => {
  const pageStateHandlers = usePageState(initialState);
  return (
    <AppStateContext.Provider value={pageStateHandlers}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
