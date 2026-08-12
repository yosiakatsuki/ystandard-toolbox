/**
 * WordPress Dependencies
 */
import { registerPlugin } from '@wordpress/plugins';

/**
 * Plugin Dependencies
 */
import PostSettingsModal from './post-settings-modal';

registerPlugin( 'ystandard-toolbox-post-settings', {
	render: PostSettingsModal,
} );
