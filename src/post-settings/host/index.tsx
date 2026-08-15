/**
 * WordPress Dependencies
 */
import { registerPlugin } from '@wordpress/plugins';

/**
 * Plugin Dependencies
 */
import PostSettingsModal from './post-settings-modal';

const context = window.ystdtbPostSettingsHost;

if ( context?.apiVersion === 1 ) {
	registerPlugin( 'ystandard-toolbox-post-settings', {
		render: () => <PostSettingsModal context={ context } />,
	} );
}
