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
