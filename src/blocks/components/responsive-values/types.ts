export interface ResponsiveValues {
	desktop?: string;
	tablet?: string;
	mobile?: string;
}
export type MayBeResponsiveValue =
	| string
	| number
	| ResponsiveValues
	| undefined;

export const RESPONSIVE_KEYS = [ 'desktop', 'tablet', 'mobile' ] as const;
