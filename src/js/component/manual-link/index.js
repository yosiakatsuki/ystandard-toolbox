import { Book } from "react-feather";
import { __ } from '@wordpress/i18n';

function getManualUrl( path ) {
	if ( 0 === path.indexOf( 'http' ) ) {
		return path;
	}
	return `https://wp-ystandard.com/manual${ path }`;
}

const ManualLink = ( { path, ...props } ) => {
	return (
		<div className="ystdtb-component-manual-link" { ...props }>
			<a
				href={ getManualUrl( path ) }
				target={ '_blank' }
				rel={ 'noreferrer noopener nofollow' }
			>
				<Book/>
				{ __( 'マニュアル', 'ystandard-toolbox' ) }
			</a>
		</div>
	);
}
export default ManualLink;
