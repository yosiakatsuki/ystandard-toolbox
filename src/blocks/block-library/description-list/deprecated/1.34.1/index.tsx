import classnames from 'classnames';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import { getResponsiveMarginStyle } from './utils';

// @ts-ignore.
export const deprecated1341 = [
	{
		attributes: {
			margin: {
				type: 'object',
			},
		},
		supports: {
			anchor: false,
			align: false,
			className: false,
		},
		migrate: ( attributes: any ) => {
			const { margin, ...rest } = attributes;
			const isResponsiveMargin =
				margin &&
				typeof margin === 'object' &&
				( margin.tablet || margin.mobile );

			let newMargin = {};

			if ( isResponsiveMargin ) {
				newMargin = {
					desktop: {
						top: margin.desktop?.top,
						bottom: margin.desktop?.bottom,
					},
					tablet: {
						top: margin.tablet?.top,
						bottom: margin.tablet?.bottom,
					},
					mobile: {
						top: margin.mobile?.top,
						bottom: margin.mobile?.bottom,
					},
				};
			} else {
				newMargin = {
					top: margin?.desktop?.top,
					bottom: margin?.desktop?.bottom,
				};
			}

			return {
				...rest,
				margin: ! isResponsiveMargin ? newMargin : undefined,
				responsiveMargin: isResponsiveMargin ? newMargin : undefined,
			};
		},
		save( { attributes }: { attributes: any } ) {
			// @ts-ignore.
			const { margin } = attributes;
			const blockProps = useBlockProps.save( {
				className: classnames( 'ystdtb-dl', {
					'has-margin': !! getResponsiveMarginStyle( margin ),
				} ),
				style: {
					...getResponsiveMarginStyle( margin ),
				},
			} );

			return (
				<dl { ...blockProps }>
					<InnerBlocks.Content />
				</dl>
			);
		},
	},
];
