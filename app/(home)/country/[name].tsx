import { useAppContext } from '@/context';
import CountryDetails from '@/modules/view-country';
import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native';

const ViewCountryDetails = () => {
	const { name } = useLocalSearchParams();
	const { countries } = useAppContext();
	const detail = countries.find(
		(predicate) => predicate.name.common === name,
	);

	return (
		<SafeAreaView>
			<Stack.Screen
				options={{
					title: `${detail?.flag} ${detail?.name.common}`,
					headerTitleAlign: 'center',
				}}
			/>
			{detail && <CountryDetails details={detail} />}
		</SafeAreaView>
	);
};

export default ViewCountryDetails;
