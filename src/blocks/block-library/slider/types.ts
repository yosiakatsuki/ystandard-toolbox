export interface SliderEditProps {
	attributes: SliderBlockAttributes;
	setAttributes: ( attributes: Partial< SliderBlockAttributes > ) => void;
	clientId: string;
	updateChildAttributes: ( childAttributes: Record< string, any > ) => void;
}

/**
 * スライダーブロックの属性型定義
 */
export interface SliderBlockAttributes {
	sliderId?: string;
	effect?: string;
	speed?: number;
	loop?: boolean;
	slideFunction?: string;
	autoplay?: boolean;
	autoplayDelay?: number;
	autoplayPauseOnMouse?: boolean;
	autoplayDisableOnInteraction?: boolean;
	autoplayReverseDirection?: boolean;
	ratio?: string;
	height?: Record< string, any >;
	slides?: Record< string, any >;
	breakpoints?: Record< string, any >;
	hasNavigation?: boolean;
	navigationColor?: string;
	customNavigationColor?: string;
	paginationType?: string;
	paginationColor?: string;
	previewType?: string;
}
