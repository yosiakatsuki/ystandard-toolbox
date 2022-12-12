import type { HTMLProps, ReactNode } from 'react';

interface FlexProps {
	justifyBetween?: boolean;
	justifyCenter?: boolean;
	justifyRight?: boolean;
	justifyLeft?: boolean;
	alignTop?: boolean;
	alignCenter?: boolean;
	alignBottom?: boolean;
	gap?: string;
	isGapSmall?: boolean;
	isGapLarge?: boolean;
	style?: object;
	children: ReactNode;
}

type FlexPropsType = HTMLProps< HTMLElement > & FlexProps;

interface FlexItemProps {
	flexGrow?: boolean;
	flexShrink?: boolean;
	flexBasis?: boolean;
	children: ReactNode;
}

type FlexItemPropsType = HTMLProps< HTMLElement > & FlexItemProps;

export const Flex = ( {
	justifyBetween,
	justifyCenter,
	justifyRight,
	justifyLeft,
	alignTop,
	alignCenter,
	alignBottom,
	gap,
	isGapSmall,
	isGapLarge,
	style,
	children,
	...props
}: FlexPropsType ) => {
	let justifyContent;
	let alignItems;
	let _gap;
	if ( justifyBetween ) {
		justifyContent = 'space-between';
	}
	if ( justifyCenter ) {
		justifyContent = 'center';
	}
	if ( justifyRight ) {
		justifyContent = 'flex-end';
	}
	if ( justifyLeft ) {
		justifyContent = 'flex-start';
	}
	if ( alignTop ) {
		alignItems = 'flex-start';
	}
	if ( alignCenter ) {
		alignItems = 'center';
	}
	if ( alignBottom ) {
		alignItems = 'flex-end';
	}
	if ( isGapSmall ) {
		_gap = '0.5em';
	}
	if ( isGapLarge ) {
		_gap = '1em';
	}
	if ( gap ) {
		_gap = gap;
	}
	const blockProps = {
		...props,
		style: {
			display: 'flex',
			justifyContent,
			alignItems,
			gap: _gap,
			...style,
		},
	};
	return <div { ...blockProps }>{ children }</div>;
};

export const FlexItem = ( {
	flexGrow,
	flexShrink,
	flexBasis,
	style,
	children,
	...props
}: FlexItemPropsType ) => {
	const blockProps = {
		...props,
		style: {
			flexGrow,
			flexShrink,
			flexBasis,
			...style,
		},
	};
	return <div { ...blockProps }>{ children }</div>;
};
