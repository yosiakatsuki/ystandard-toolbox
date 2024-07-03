export interface CustomBorder {
	desktop?: SplitBorders;
	tablet?: SplitBorders;
	mobile?: SplitBorders;
}

export interface SplitBorders {
	top?: FlatBorder;
	right?: FlatBorder;
	bottom?: FlatBorder;
	left?: FlatBorder;
}

export interface FlatBorder {
	color?: string;
	style?: string;
	width?: string;
}

export interface BorderControlProps {}
