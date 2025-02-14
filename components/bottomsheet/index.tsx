import {
	BottomSheetModalProvider,
	BottomSheetModal,
	BottomSheetView,
	BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import { Text } from 'react-native';
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
		const snapPoint = useMemo(
			() => props.snapPoints ?? ['25%', '50%', '90%', '100%'],
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
		return (
			<BottomSheetModalProvider>
				<BottomSheetModal
					backdropComponent={renderBackdrop}
					ref={ref}
					snapPoints={snapPoint}
					index={1}
					backgroundStyle={[]}
					handleIndicatorStyle={[{ backgroundColor: 'black' }]}>
					<BottomSheetView style={[]}>
						<Text>Awesome 🎉</Text>
					</BottomSheetView>
				</BottomSheetModal>
			</BottomSheetModalProvider>
		);
	},
);

export default BottomSheetModal;
