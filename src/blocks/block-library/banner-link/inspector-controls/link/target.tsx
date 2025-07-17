/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Plugin Dependencies
 */
import {
	isOpenInNewTab,
	toggleOpenInNewTab,
	getLinkRel,
} from '@aktk/helper/link';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';

const Target = ( props ) => {
	const { attributes, setAttributes } = props;

	const { link } = attributes;

	const handleOnChange = ( value ) => {
		let target = link?.linkTarget;
		if ( isOpenInNewTab( target ) !== isOpenInNewTab( value ) ) {
			target = toggleOpenInNewTab( target );
		}
		const newLink = {
			linkTarget: target,
			rel: getLinkRel( target, link?.rel ),
		};

		setAttributes( {
			link: {
				...link,
				...newLink,
			},
		} );
	};
	return (
		<BaseControl id="link-target">
			<ToggleControl
				label={ __( '新しいタブで開く', 'ystandard-toolbox' ) }
				onChange={ handleOnChange }
				checked={ isOpenInNewTab( link?.linkTarget ) }
			/>
		</BaseControl>
	);
};
export default Target;
