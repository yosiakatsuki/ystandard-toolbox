import { BlockControls, useBlockEditingMode } from '@wordpress/block-editor';
import LinkButton from './link-button';
import ContentPosition from './content-position';
import BlockPosition from './block-position';

export const BannerLinkBlockControls = ( props ) => {
	const blockEditingMode = useBlockEditingMode();

	if ( 'contentOnly' === blockEditingMode ) {
		return null;
	}

	return (
		<BlockControls>
			<LinkButton { ...props } />
			<BlockPosition { ...props } />
			<ContentPosition { ...props } />
		</BlockControls>
	);
};
