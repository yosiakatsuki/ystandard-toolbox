export interface CustomBorder {
	desktop?: Border;
	tablet?: Border;
	mobile?: Border;
}

export interface Border {
	top?: BorderProperty;
	right?: BorderProperty;
	bottom?: BorderProperty;
	left?: BorderProperty;
}

export interface BorderProperty {
	color?: string;
	style?: string;
	width?: string;
}
