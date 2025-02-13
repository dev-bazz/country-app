import { SectionHeader, UIText } from '@/components/text';
import { useAppContext } from '@/context';
import { fetchDX } from '@/lib/advance-fetch';
import type { CountryType } from '@/types/countries';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import {
	ActivityIndicator,
	Pressable,
	SafeAreaView,
	SectionList,
	View,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useMediaAndPlatform } from '@/hooks';
const HomeScreenModule = () => {
	const { theme } = useAppContext();
	const { widthScaleFactor } = useMediaAndPlatform();
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['countries'],
		queryFn: async () => {
			const data = await fetchDX<CountryType[]>({
				url: 'https://restcountries.com/v3.1/all',
				options: {
					method: 'GET',
				},
			});
			const arrageAlphabetically = data.reduce(
				(acc: { data: CountryType[]; type: string }[], curre) => {
					const firstLetter = curre.name.common.charAt(0);
					if (!acc.find((item) => item.type === firstLetter)) {
						acc.push({
							type: firstLetter,
							data: [curre],
						});
					} else {
						acc.find((item) => item.type === firstLetter)?.data.push(curre);
					}
					return acc;
				},
				[],
			);
			console.log('arrageAlphabetically: ', arrageAlphabetically);

			return (
				arrageAlphabetically.sort((a, b) =>
					a.type.localeCompare(b.type),
				) ?? []
			);
		},
		enabled: true,
	});
	// console.log( 'error: ', error );

	return (
		<SafeAreaView>
			{isLoading ? (
				<ActivityIndicator
					size={'large'}
					color={'blue'}
				/>
			) : (
				data && (
					<SectionList
						stickySectionHeadersEnabled
						ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
						contentContainerStyle={{
							paddingInline: 24,
							paddingBottom: 24,
							backgroundColor:
								theme === 'dark' ? 'hsla(216, 99%, 7%, 1)' : 'white',
						}}
						ListHeaderComponent={
							<View style={{ paddingTop: 20 }}>
								<Pressable
									style={({ pressed }) => [
										{
											padding: 16,
											borderRadius: 4 * widthScaleFactor,
											backgroundColor: 'hsla(220, 22%, 96%, 1)',
											flexDirection: 'row',
											justifyContent: 'center',
											alignItems: 'center',
											alignSelf: 'center',
										},
										pressed && {
											backgroundColor: pressed
												? 'hsla(220, 22%, 96%, 1)'
												: 'hsla(220, 22%, 84%, 1)',
										},
									]}>
									<Feather
										name="search"
										size={24}
										color="black"
										style={{}}
									/>
									<UIText
										colorType={theme}
										fontSize="14px">
										Search Country
									</UIText>
								</Pressable>
							</View>
						}
						renderSectionHeader={({ section }) => (
							<SectionHeader colorType={theme}>
								<UIText
									fontSize={'16px'}
									colorType={theme}>
									{section.type}
								</UIText>
							</SectionHeader>
						)}
						sections={data}
						renderItem={({ item }) => (
							<Link
								href={{
									pathname: '/country/[name]',
									params: { name: item.name.common },
								}}>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										gap: 16,
									}}>
									<View>
										<Image
											source={`${item.flags.png}`}
											style={{
												width: 50,
												height: 50,
												aspectRatio: '1',
												objectFit: 'fill',
												borderRadius: 50,
											}}
										/>
									</View>
									<View>
										<UIText
											fontSize={'16px'}
											colorType={theme}>
											{item.name.common}
										</UIText>
									</View>
								</View>
							</Link>
						)}
					/>
				)
			)}
		</SafeAreaView>
	);
};

export default HomeScreenModule;
