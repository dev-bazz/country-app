import { useWindowDimensions, Platform } from "react-native";

export const useMediaAndPlatform = () => {
	const { width, height, fontScale } = useWindowDimensions();
	const defaultDesignWidth = 428;
	const defaultDesignHeight = 926;

	const widthScaleFactor = Number(defaultDesignWidth / width);
	const heightScaleFactor = Number(defaultDesignHeight / height);

	const getResponsiveFontSize = (fontSize: number) => {
		const calculatedFontSize = fontSize * Number(widthScaleFactor) * fontScale;
		return `${Math.floor(calculatedFontSize)}px`;
	};
	return {
		width,
		height,
		platform: Platform.OS,
		getResponsiveFontSize,
		widthScaleFactor,
		heightScaleFactor,
	};
};
