import type { ResponsiveValues } from '@aktk/block-components/types';
import type { UnitType } from '@aktk/block-components/wp-controls/unit-control';

export type CustomSizeResponsiveValues = ResponsiveValues;

export interface CustomSizeControlProps {
	value: string | undefined;
	responsiveValue?: CustomSizeResponsiveValues;
	onChange: ( newValue: string | undefined ) => void;
	onChangeResponsive?: (
		newValue: CustomSizeResponsiveValues | undefined
	) => void;
	responsiveControlStyle?: 'vertical' | 'horizontal';
	units?: UnitType[];
	useResponsive?: boolean;
	showResetButton?: boolean;
	additionalContent?: ( isResponsive: boolean ) => React.ReactNode;
}
