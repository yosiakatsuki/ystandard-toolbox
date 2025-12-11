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
			const { margin } = attributes;
			const isResponsiveMargin =
				margin &&
				typeof margin === 'object' &&
				( margin.tablet || margin.mobile );
			return {
				...attributes,
				margin: ! isResponsiveMargin ? margin?.desktop : undefined,
				responsiveMargin: isResponsiveMargin ? margin : undefined,
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
