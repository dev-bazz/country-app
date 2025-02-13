import ToggleTheme from "@/components/toggle-mode";
import { appColorsEnv } from "@/constants/Colors";
import { useAppContext } from "@/context";
import { getExpoStorage } from "@/lib/storage";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function LayoutNav () {
  const colorScheme = useColorScheme();
  const { theme } = useAppContext();
  getExpoStorage( "theme" ).then( ( res ) => {
    console.log( "res", res );
  } );
  const jj = {
    dark: true,
    colors: {
      primary: 'rgb(10, 132, 255)',
      background: 'rgb(1, 1, 1)',
      card: 'rgb(18, 18, 18)',
      text: 'rgb(229, 229, 231)',
      border: 'rgb(39, 39, 41)',
      notification: 'rgb(255, 69, 58)',
    },
  };
  return (
    <ThemeProvider value={ theme === 'dark' ? {
      ...DarkTheme, ...appColorsEnv.dark
    } : { ...DefaultTheme, ...appColorsEnv.light } }>
      <Stack>
        <Stack.Screen name="index" options={ {
          headerTitle: "Explore", headerRight ( props ) {
            return <ToggleTheme />;
          },
        } } />
      </Stack>
    </ThemeProvider>
  );
}
