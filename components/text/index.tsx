import type { colorTheme } from '@/constants/Colors';
import styled from '@emotion/native';
type colorType = 'light' | 'dark';
export const SectionHeader = styled.View<{
	theme?: colorTheme;
	colorType: colorType;
}>`
	background-color: ${(props) =>
		(props.theme as colorTheme)[props.colorType].background};
	padding-block: 16px;
`;

export const UIText = styled.Text<{
	fontSize: string;
	colorType: colorType;
	theme?: colorTheme;
}>`
	color: ${(props) =>
		(props.theme as colorTheme)[props.colorType].text};
	font-size: ${(props) => props.fontSize};
	flex-wrap: wrap;
`;
