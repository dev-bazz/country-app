import * as SecureStore from "expo-secure-store";

export const handleExpoStorage = async (key: string, value: string | null) => {
	try {
		if (value == null) {
			const res = await SecureStore.deleteItemAsync(key);
			console.log("Deleted from storage", key);
			return res ?? false;
		}
		const res = await SecureStore.setItemAsync(key, value);
		console.log("Added to Storage", key);
		return res ?? true;
	} catch (error) {
		console.log("Failed to save to storage", (error as Error).message);
	}
};

export const getExpoStorage = async (key: string) => {
	try {
		const res = await SecureStore.getItemAsync(key);
		console.log(`Retrieved Item from Storage ${key}:`, res);
		return res ?? null;
	} catch (error) {
		console.log("error: Getting from storage", (error as Error).message);
	}
};
