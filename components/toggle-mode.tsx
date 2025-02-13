import { useAppContext } from "@/context";

import Feather from '@expo/vector-icons/Feather';

import { useCallback, useState } from "react";
import { Pressable, useColorScheme } from "react-native";
import { useMediaAndPlatform } from "@/hooks";
const ToggleTheme = () => {
  const colorTheme = useColorScheme();
  const [ isDark, setIsDark ] = useState( colorTheme === "dark" );
  console.log( 'isDark: ', isDark );
  const { handleToggleTheme } = useAppContext();
  const { widthScaleFactor, heightScaleFactor } = useMediaAndPlatform();
  const iconSize = 24 * widthScaleFactor;
  const handleToggle = useCallback( () => {
    setIsDark( !isDark );
    console.log( "Hello" );
    handleToggleTheme( isDark ? "light" : "dark" );
  }, [ handleToggleTheme, isDark ] );
  return ( <Pressable style={ ( { pressed } ) => [ pressed && { opacity: 0.5, } ] } onPressIn={ handleToggle }>
    { !isDark ? <Feather name="sun" size={ iconSize } color="black" /> : <Feather name="moon" size={ iconSize } color="white" /> }
  </Pressable> );
};

export default ToggleTheme;
