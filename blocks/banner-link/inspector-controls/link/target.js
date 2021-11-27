import { BaseControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	isOpenInNewTab,
	toggleOpenInNewTab,
	getLinkRel,
} from '@ystdtb/helper/link';

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
		<BaseControl>
			<ToggleControl
				label={ __( '新しいタブで開く', 'ystandard-toolbox' ) }
				onChange={ handleOnChange }
				checked={ isOpenInNewTab( link?.linkTarget ) }
			/>
		</BaseControl>
	);
};
export default Target;
