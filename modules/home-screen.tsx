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
	StatusBar,
	View,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useMediaAndPlatform } from '@/hooks';
import { useCallback, useRef } from 'react';
import { ModalBottomSheet } from '@/components/bottomsheet';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const HomeScreenModule = () => {
	const { theme, handleSetCountries } = useAppContext();
	const { widthScaleFactor } = useMediaAndPlatform();
	const searchCountyRef = useRef<BottomSheetModal | null>(null);
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['countries'],
		queryFn: async () => {
			const data = await fetchDX<CountryType[]>({
				url: 'https://restcountries.com/v3.1/all',
				options: {
					method: 'GET',
				},
			});
			handleSetCountries(data);
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

			return (
				arrageAlphabetically.sort((a, b) =>
					a.type.localeCompare(b.type),
				) ?? []
			);
		},
		enabled: true,
	});
	//
	const handleSearchModal = useCallback(() => {
		searchCountyRef.current?.present();
		console.log('searchCountyRef: ', searchCountyRef);
	}, []);
	return (
		<GestureHandlerRootView>
			<SafeAreaView>
				<StatusBar
					backgroundColor={
						theme === 'dark' ? 'hsla(216, 99%, 7%, 1)' : 'white'
					}
					animated
					barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
				/>
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
										onPressIn={handleSearchModal}
										style={({ pressed }) => [
											{
												padding: 16,
												borderRadius: 4 * widthScaleFactor,
												backgroundColor:
													theme === 'light'
														? 'hsla(220, 22%, 96%, 1)'
														: 'rgba(197, 197, 197, 0.164)',
												flexDirection: 'row',
												justifyContent: 'center',
												alignItems: 'center',
												position: 'relative',
											},
											pressed && {
												backgroundColor: 'rgba(75, 75, 75, 0.252)',
											},
										]}>
										<Feather
											name="search"
											size={24}
											color={theme === 'light' ? 'black' : 'white'}
											style={{ position: 'absolute', left: 24 }}
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
													aspectRatio: '2/1.5',
													objectFit: 'fill',
													borderRadius: 4,
													borderWidth: 1,
													borderColor: 'rgb(165, 165, 165)',
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
				<ModalBottomSheet ref={searchCountyRef} />
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default HomeScreenModule;
