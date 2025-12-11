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
			return {
				...attributes,
			};
		},
		save( { attributes: any } ) {
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
