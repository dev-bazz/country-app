import { Text, View } from 'react-native';
import { UIText } from './text';

const TextCountry = (props: {
	theme: 'light' | 'dark';
	widthScaleFactor: number;
	title: string;
	value: string;
}) => {
	const { theme, widthScaleFactor, title, value } = props;
	return (
		<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
			<UIText
				colorType={theme}
				fontSize={`${16 * widthScaleFactor}px`}>
				{title}
			</UIText>
			<Text
				style={{
					color: theme === 'dark' ? '#f2f4f7aa' : '#00000099',
					fontSize: 16 * widthScaleFactor,
					flexWrap: 'wrap',
				}}>
				{value}
			</Text>
		</View>
	);
};

export default TextCountry;
