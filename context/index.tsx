import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useCallback, useContext, type ReactNode } from "react";
import { useReactQueryDevTools } from '@dev-plugins/react-query';

const AppGlobalContext = createContext<AppContextType | null>( null );
const queryClient = new QueryClient();

export const AppGlobalProvider = ( { children }: { children: ReactNode; } ) => {
  useReactQueryDevTools( queryClient );
  const handleSignal = useCallback( () => {
    console.log( "Logining From Context" );
  }, [] );
  return <>
    <QueryClientProvider client={ queryClient }>
      <AppGlobalContext.Provider value={ {
        handleSignal
      } }>
        { children }
      </AppGlobalContext.Provider>
    </QueryClientProvider></>;
};

export const useAppContext: () => AppContextType = () => {
  const context = useContext( AppGlobalContext );
  if ( context === null ) {
    throw new Error( "useAppContext must be used within a AppProvider" );
  }
  return context;
};
type AppContextType = {
  handleSignal: () => void;
};
