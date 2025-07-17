/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

const Reset = ( { setAttributes } ) => {
	const handleOnClick = () => {
		setAttributes( {
			link: undefined,
		} );
	};
	return (
		<BaseControl id="link-reset">
			<Button isDestructive isTertiary isSmall onClick={ handleOnClick }>
				{ __( 'リセット', 'ystandard-toolbox' ) }
			</Button>
		</BaseControl>
	);
};
export default Reset;
