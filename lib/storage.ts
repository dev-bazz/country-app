import * as SecureStore from "expo-secure-store";

export const handleExpoStorage = async (key: string, value: string | null) => {
	try {
		if (value == null) {
			const res = await SecureStore.deleteItemAsync(key);

			return res ?? false;
		}
		const res = await SecureStore.setItemAsync(key, value);

		return res ?? true;
	} catch (error) {

	}
};

export const getExpoStorage = async (key: string) => {
	try {
		const res = await SecureStore.getItemAsync(key);

		return res ?? null;
	} catch (error) {

	}
};
