import ToggleTheme from '@/components/toggle-mode';
import { appColorsEnv } from '@/constants/Colors';
import { useAppContext } from '@/context';
import { getExpoStorage } from '@/lib/storage';
import {
	ThemeProvider,
	DarkTheme,
	DefaultTheme,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { ThemeProvider as ETP } from '@emotion/react';
import { Image } from 'expo-image';
import { BrandImages } from '@/constants/images';
import { useMediaAndPlatform } from '@/hooks';

export default function LayoutNav() {
	const { widthScaleFactor } = useMediaAndPlatform();
	const { theme } = useAppContext();
	getExpoStorage('theme').then((res) => {});

	return (
		<ThemeProvider
			value={
				theme === 'dark'
					? {
							...DarkTheme,
							colors: { ...appColorsEnv.dark },
					  }
					: { ...DefaultTheme, ...appColorsEnv.light }
			}>
			<ETP
				theme={{ light: appColorsEnv.light, dark: appColorsEnv.dark }}>
				<Stack screenOptions={{}}>
					<Stack.Screen
						name="index"
						options={{
							headerRight(props) {
								return <ToggleTheme />;
							},
							title: '',
							headerLeft: () => (
								<View>
									<Image
										style={{
											width: 88 * widthScaleFactor,
											aspectRatio: '98/24',
										}}
										source={
											theme === 'dark' ? BrandImages.dark : BrandImages.light
										}
									/>
								</View>
							),
							headerShadowVisible: true,
						}}
					/>
				</Stack>
			</ETP>
		</ThemeProvider>
	);
}
