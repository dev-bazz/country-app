import { Text } from 'react-native';
import { useCallback, useMemo, forwardRef } from 'react';
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetView,
} from '@gorhom/bottom-sheet';

interface Props {
	snapPoints?: string[];
}
type forwardT = BottomSheet;
/**
 * The Modal Component must be wrapped with a Gesture Component
 * @example ```tsx
 *   <GestureHandlerRootView >
 *  <ModalBottomSheet ref={ modalRef } />
 *   </GestureHandlerRootView>
 * ```

```
 */
export const BottomSheetComp = forwardRef<forwardT, Props>(
	(props, ref) => {
		const snapPoints = useMemo(
			() => props.snapPoints ?? ['25%', '50%', '90%', '100%'],
			[props.snapPoints],
		);
		// callbacks
		const handleSheetChange = useCallback((index: number) => {
			console.log('handleSheetChange', index);
			//snap to certain index
			//     sheetRef.current?.snapToIndex( index );
			//     sheetRef.current?.close();
		}, []);
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
			<BottomSheet
				style={[]}
				backdropComponent={renderBackdrop}
				ref={ref}
				snapPoints={snapPoints}
				enableDynamicSizing={false}
				onChange={handleSheetChange}
				index={0}
				enablePanDownToClose={false}
				backgroundStyle={[]}
				enableContentPanningGesture={true}
				handleIndicatorStyle={[{ backgroundColor: 'black' }]}>
				<BottomSheetView>
					<Text>Awesome 🔥</Text>
				</BottomSheetView>
			</BottomSheet>
		);
	},
);
