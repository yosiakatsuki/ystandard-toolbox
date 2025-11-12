/*
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	withColors,
	useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';

/*
 * Block Dependencies
 */
import type { IconListEditProps } from './types';
import { getBlockClasses, getBlockStyles } from './utils';
import { InspectorControls } from './inspector-controls';
import './style-editor.scss';

// @ts-ignore.
function Edit( props: IconListEditProps ): JSX.Element {
	const { attributes, iconColor } = props;
	const blockProps = useBlockProps( {
		className: getBlockClasses( {
			...attributes,
			iconColor: '',
		} ),
		style: getBlockStyles( {
			...attributes,
			iconColor: '',
			customIconColor: iconColor?.color,
		} ),
	} );
	return (
		<>
			<InspectorControls { ...props } />
			<ul { ...blockProps }>
				<li>アイコンブロック移行中</li>
			</ul>
		</>
	);
}

export default compose( [
	withColors( {
		iconColor: 'iconFontColor',
	} ),
] )( Edit );
