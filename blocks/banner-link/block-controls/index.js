import { BlockControls } from '@wordpress/block-editor';
import LinkButton from './link-button';
import ContentPosition from './content-position';
import BlockPosition from './block-position';

export const BannerLinkBlockControls = ( props ) => {
	return (
		<BlockControls>
			<LinkButton { ...props } />
			<BlockPosition { ...props } />
			<ContentPosition { ...props } />
		</BlockControls>
	);
};
