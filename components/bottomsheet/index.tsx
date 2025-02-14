import {
	BottomSheetModalProvider,
	BottomSheetModal,
	BottomSheetBackdrop,
	BottomSheetFlatList,
	BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { UIText } from '../text';
import { useAppContext } from '@/context';
import { View } from 'react-native';
import { useMediaAndPlatform } from '@/hooks';
import type { CountryType } from '@/types/countries';
import { Link } from 'expo-router';
type forwardRefType = BottomSheetModal | null;
interface Props {
	snapPoints?: string[];
}
/**
 * The Modal Component must be wrapped with a Gesture Component
 * @example ```tsx
 *   <GestureHandlerRootView >
 *  <ModalBottomSheet ref={ modalRef } />
 *   </GestureHandlerRootView>
 * ```
 *
 * Pass a BottomSheetModal as Ref
 * @example```ts
 * const modalRef = useRef<BottomSheetModal | null>( null );
 * ```
 *
 *use this method to present the modal @example
 ```ts
 const handlePresentModalPress = useCallback( () => {
     modalRef.current?.present();
   }, [] );
```
 */
export const ModalBottomSheet = forwardRef<forwardRefType, Props>(
	(props, ref) => {
		const { theme, countries } = useAppContext();
		const [searchRes, setSearchRes] = useState<CountryType[]>([]);
		const { widthScaleFactor } = useMediaAndPlatform();
		const snapPoint = useMemo(
			() => props.snapPoints ?? ['50%', '80%', '100%'],
			[props.snapPoints],
		);
		const renderBackdrop = useCallback(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(props: any) => (
				<BottomSheetBackdrop
					{...props}
					disappearsOnIndex={0}
					appearsOnIndex={1}
				/>
			),
			[],
		);

		const handleSearch = useCallback(
			(text: string) => {
				const searchRes = text
					? countries.filter((i) => {
							return i.name.common
								.toLowerCase()
								.includes(text.toLowerCase());
					  })
					: [];
				setSearchRes(searchRes);
			},
			[countries],
		);
		useEffect(() => {
			return () => {
				setSearchRes([]);
			};
		}, []);

		return (
			<BottomSheetModalProvider>
				<BottomSheetModal
					backdropComponent={renderBackdrop}
					ref={ref}
					snapPoints={snapPoint}
					index={1}
					enablePanDownToClose
					backgroundStyle={[
						{ backgroundColor: theme === 'dark' ? '#000F24' : 'white' },
					]}
					handleIndicatorStyle={[
						{ backgroundColor: theme === 'dark' ? 'white' : 'black' },
					]}>
					<View style={{ paddingInline: 16, paddingBlock: 12 }}>
						<BottomSheetTextInput
							placeholder="Search for a country..."
							placeholderTextColor={theme === 'dark' ? 'white' : 'black'}
							style={{
								textAlignVertical: 'top',
								textAlign: 'center',
								backgroundColor: 'rgba(160, 160, 160, 0.15)',
								paddingInline: 16,
								height: 40,
								borderRadius: 4,
								color: theme === 'dark' ? 'white' : 'black',
							}}
							onChangeText={(newText) => handleSearch(newText)}
							keyboardAppearance={theme}
						/>
					</View>
					<BottomSheetFlatList
						data={searchRes}
						contentContainerStyle={{ paddingInline: 16 }}
						ListEmptyComponent={
							<UIText
								fontSize={`${16 * widthScaleFactor}px`}
								colorType={theme}>
								No data
							</UIText>
						}
						renderItem={(i) => (
							<>
								<Link
									onPressIn={() => {
										if (ref && 'current' in ref) {
											ref.current?.dismiss();
										}
									}}
									href={{
										pathname: '/country/[name]',
										params: {
											name: i.item.name.common,
										},
									}}>
									<UIText
										fontSize={`${16 * widthScaleFactor}px`}
										colorType={theme}>
										{i.item.name.common}
									</UIText>
								</Link>
							</>
						)}
					/>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		);
	},
);

export default BottomSheetModal;
