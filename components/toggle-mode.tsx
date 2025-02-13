import { useAppContext } from "@/context";

import Feather from '@expo/vector-icons/Feather';

import { useState } from "react";
import { Pressable, useColorScheme } from "react-native";
const ToggleTheme = () => {
  const colorTheme = useColorScheme();
  const [ isDark, setIsDark ] = useState( colorTheme === "dark" );
  const { handleToggleTheme } = useAppContext();
  const iconSize = 24;
  return ( <Pressable style={ ( { pressed } ) => [ pressed && { opacity: 0.5, backgroundColor: "red" } ] } onPress={ () => {
    setIsDark( !isDark );
    handleToggleTheme( isDark ? "light" : "dark" );
  } }>
    { !isDark ? <Feather name="sun" size={ iconSize } color="black" /> : <Feather name="moon" size={ iconSize } color="white" /> }
  </Pressable> );
};

export default ToggleTheme;
