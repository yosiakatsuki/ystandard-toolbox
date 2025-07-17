import { BaseControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Reset = ( { setAttributes } ) => {
	const handleOnClick = () => {
		setAttributes( {
			link: undefined,
		} );
	};
	return (
		<BaseControl>
			<Button isDestructive isTertiary isSmall onClick={ handleOnClick }>
				{ __( 'リセット', 'ystandard-toolbox' ) }
			</Button>
		</BaseControl>
	);
};
export default Reset;
