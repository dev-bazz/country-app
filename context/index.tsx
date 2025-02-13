import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { handleExpoStorage } from "@/lib/storage";

const AppGlobalContext = createContext<AppContextType | null>( null );
const queryClient = new QueryClient();

export const AppGlobalProvider = ( { children }: { children: ReactNode; } ) => {
  useReactQueryDevTools( queryClient );
  const [ theme, setTheme ] = useState<"light" | "dark">( "light" );
  const handleSignal = useCallback( () => {
    console.log( "Logining From Context" );
  }, [] );
  const handleToggleTheme = useCallback( ( theme: "light" | "dark" ) => {
    handleExpoStorage( "theme", theme );
    setTheme( theme );
  }, [] );
  useEffect( () => {
    console.log( theme, "current theme" );
  }, [ theme ] );
  return <>
    <QueryClientProvider client={ queryClient }>
      <AppGlobalContext.Provider value={ {
        handleSignal, theme,
        handleToggleTheme
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
  theme: "light" | "dark";
  handleSignal: () => void;
  handleToggleTheme: ( theme: "light" | "dark" ) => void;
};
