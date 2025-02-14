import { UIText } from '@/components/text';
import TextCountry from '@/components/text-view';
import { useAppContext } from '@/context';
import { useMediaAndPlatform } from '@/hooks';
import type { CountryType } from '@/types/countries';
import { Image } from 'expo-image';
import { useCallback } from 'react';
import { ScrollView, View } from 'react-native';

const CountryDetails = (props: { details: CountryType }) => {
	const {
		details: {
			name,
			flags,
			continent,
			capital,
			currency,
			continents,
			population,
			size,
			states,
			current_president,
			region,
			coatOfArms,
			phone_code,
		},
	} = props;
	const { widthScaleFactor } = useMediaAndPlatform();
	const { theme } = useAppContext();
	const formatNumber = useCallback(() => {}, []);
	return (
		<ScrollView
			style={{
				paddingInline: 16,
				paddingTop: 24,
			}}>
			<Image
				source={flags.png}
				style={{
					width: 'auto',
					aspectRatio: '2/1.2',
					borderRadius: 8,
					objectFit: 'scale-down',
					marginInline: 'auto',
				}}
			/>
			<View
				style={{
					paddingBlock: 24,
					flexDirection: 'row',
					gap: 8,
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}>
				<UIText
					colorType={theme}
					fontSize={`${24 * widthScaleFactor}px`}>
					Coat of Arms
				</UIText>
				<Image
					source={coatOfArms.png}
					style={{
						width: 60 * widthScaleFactor,
						aspectRatio: '1',
						borderRadius: 8,
						objectFit: 'scale-down',
					}}
				/>
			</View>
			<View style={{ gap: 8, paddingBlock: 24 }}>
				<TextCountry
					theme={theme}
					widthScaleFactor={widthScaleFactor}
					title="Official Name"
					value={name.official}
				/>
				<TextCountry
					theme={theme}
					widthScaleFactor={widthScaleFactor}
					title="Capital"
					value={capital}
				/>
				<TextCountry
					theme={theme}
					widthScaleFactor={widthScaleFactor}
					title="Population"
					value={population}
				/>
				<TextCountry
					theme={theme}
					widthScaleFactor={widthScaleFactor}
					title="Region"
					value={region}
				/>
				<TextCountry
					theme={theme}
					widthScaleFactor={widthScaleFactor}
					title="Continent"
					value={continents[0]}
				/>
			</View>
		</ScrollView>
	);
};

export default CountryDetails;
